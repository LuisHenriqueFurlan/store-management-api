import { Ban, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getApiErrorMessage, toDate, toMoney } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Product, ProductVariation, Sale, SaleItem } from "../../types/api";

const itemInitialForm = {
  produto_variacao_id: "",
  quantidade: "1",
  desconto_percentual: "0",
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [selectedSaleId, setSelectedSaleId] = useState("");
  const [itemForm, setItemForm] = useState(itemInitialForm);
  const [error, setError] = useState("");

  async function loadSales() {
    try {
      const [salesData, itemsData, productsData, variationsData] = await Promise.all([
        storeApi.sales(),
        storeApi.saleItems(),
        storeApi.products(),
        storeApi.variations(),
      ]);

      setSales(salesData);
      setItems(itemsData);
      setProducts(productsData);
      setVariations(variationsData);

      if (!selectedSaleId && salesData.length > 0) {
        setSelectedSaleId(salesData[0].id);
      }
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    }
  }

  useEffect(() => {
    loadSales();
  }, []);

  const selectedSale = sales.find((sale) => sale.id === selectedSaleId);
  const saleItems = items.filter((item) => item.venda_id === selectedSaleId);
  const productById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const variationById = useMemo(() => new Map(variations.map((variation) => [variation.id, variation])), [variations]);

  function getVariationLabel(variation: ProductVariation) {
    const product = productById.get(variation.produto_id);
    return `${product?.nome ?? "Produto"} | Tam. ${variation.tamanho} | ${variation.quantidade_estoque} un.`;
  }

  function getItemProductLabel(item: SaleItem) {
    const variation = variationById.get(item.produto_variacao_id);
    const product = variation ? productById.get(variation.produto_id) : undefined;
    return `${product?.nome ?? "Produto"}${variation ? ` | Tam. ${variation.tamanho}` : ""}`;
  }

  async function handleCreateSale() {
    setError("");

    try {
      const sale = await storeApi.createSale();
      await loadSales();
      setSelectedSaleId(sale.id);
    } catch (createError) {
      setError(getApiErrorMessage(createError));
    }
  }

  async function handleAddItem(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!selectedSaleId) {
      setError("Crie ou selecione uma venda antes de adicionar itens.");
      return;
    }

    try {
      await storeApi.createSaleItem({
        venda_id: selectedSaleId,
        produto_variacao_id: itemForm.produto_variacao_id,
        quantidade: Number(itemForm.quantidade),
        desconto_percentual: Number(itemForm.desconto_percentual),
      });
      setItemForm(itemInitialForm);
      await loadSales();
    } catch (itemError) {
      setError(getApiErrorMessage(itemError));
    }
  }

  async function handleDeleteItem(id: string) {
    try {
      await storeApi.deleteSaleItem(id);
      await loadSales();
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    }
  }

  async function handleFinalizeSale() {
    if (!selectedSaleId) {
      return;
    }

    try {
      await storeApi.finalizeSale(selectedSaleId);
      await loadSales();
    } catch (finalizeError) {
      setError(getApiErrorMessage(finalizeError));
    }
  }

  async function handleCancelSale() {
    if (!selectedSaleId) {
      return;
    }

    try {
      await storeApi.cancelSale(selectedSaleId);
      await loadSales();
    } catch (cancelError) {
      setError(getApiErrorMessage(cancelError));
    }
  }

  return (
    <Layout>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">Operacao de venda</h2>
              <p className="text-sm text-zinc-500">Crie uma venda e adicione itens ao carrinho.</p>
            </div>
            <button onClick={handleCreateSale} className="flex h-10 items-center gap-2 rounded-lg bg-yellow-400 px-4 text-sm font-semibold text-black hover:bg-yellow-300">
              <Plus size={16} />
              Nova
            </button>
          </div>

          {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <label className="block text-sm font-semibold text-zinc-700">
            Venda
            <select className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={selectedSaleId} onChange={(event) => setSelectedSaleId(event.target.value)}>
              <option value="">Selecione</option>
              {sales.map((sale) => (
                <option key={sale.id} value={sale.id}>
                  {sale.id.slice(0, 8)} | {sale.status} | {toMoney(sale.valor_final)}
                </option>
              ))}
            </select>
          </label>

          {selectedSale && (
            <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-zinc-50 p-4 text-sm">
              <div>
                <p className="text-zinc-500">Status</p>
                <strong>{selectedSale.status}</strong>
              </div>
              <div>
                <p className="text-zinc-500">Final</p>
                <strong>{toMoney(selectedSale.valor_final)}</strong>
              </div>
              <div>
                <p className="text-zinc-500">Itens</p>
                <strong>{saleItems.length}</strong>
              </div>
            </div>
          )}

          <form onSubmit={handleAddItem} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold text-zinc-700">
              Produto / variacao
              <select className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={itemForm.produto_variacao_id} onChange={(event) => setItemForm({ ...itemForm, produto_variacao_id: event.target.value })} required>
                <option value="">Selecione</option>
                {variations.map((variation) => <option key={variation.id} value={variation.id}>{getVariationLabel(variation)}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-semibold text-zinc-700">
                Quantidade
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="1" value={itemForm.quantidade} onChange={(event) => setItemForm({ ...itemForm, quantidade: event.target.value })} required />
              </label>
              <label className="block text-sm font-semibold text-zinc-700">
                Desconto %
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="0" max="100" step="0.01" value={itemForm.desconto_percentual} onChange={(event) => setItemForm({ ...itemForm, desconto_percentual: event.target.value })} required />
              </label>
            </div>

            <button disabled={!selectedSaleId || selectedSale?.status !== "PENDENTE"} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40">
              <Plus size={18} />
              Adicionar item
            </button>
          </form>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button disabled={!selectedSaleId || selectedSale?.status !== "PENDENTE"} onClick={handleFinalizeSale} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-500 disabled:opacity-40">
              <CheckCircle2 size={18} />
              Finalizar
            </button>
            <button disabled={!selectedSaleId || selectedSale?.status === "CANCELADA"} onClick={handleCancelSale} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 font-semibold text-white hover:bg-red-500 disabled:opacity-40">
              <Ban size={18} />
              Cancelar
            </button>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-950">Itens da venda</h2>
            <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-zinc-50 text-left text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Produto</th>
                    <th className="px-4 py-3 font-semibold">Qtd.</th>
                    <th className="px-4 py-3 font-semibold">Unitario</th>
                    <th className="px-4 py-3 font-semibold">Desc.</th>
                    <th className="px-4 py-3 font-semibold">Subtotal</th>
                    <th className="px-4 py-3 text-right font-semibold">Acoes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {saleItems.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-semibold">{getItemProductLabel(item)}</td>
                      <td className="px-4 py-3">{item.quantidade}</td>
                      <td className="px-4 py-3">{toMoney(item.preco_unitario)}</td>
                      <td className="px-4 py-3">{Number(item.desconto_percentual).toFixed(2)}%</td>
                      <td className="px-4 py-3">{toMoney(item.subtotal)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button onClick={() => handleDeleteItem(item.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {saleItems.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">Nenhum item nessa venda</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-950">Historico de vendas</h2>
            <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-zinc-50 text-left text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Venda</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Bruto</th>
                    <th className="px-4 py-3 font-semibold">Final</th>
                    <th className="px-4 py-3 font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {sales.map((sale) => (
                    <tr key={sale.id} onClick={() => setSelectedSaleId(sale.id)} className="cursor-pointer hover:bg-zinc-50">
                      <td className="px-4 py-3 font-semibold">{sale.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">{sale.status}</td>
                      <td className="px-4 py-3">{toMoney(sale.valor_bruto)}</td>
                      <td className="px-4 py-3">{toMoney(sale.valor_final)}</td>
                      <td className="px-4 py-3 text-zinc-500">{toDate(sale.created_at)}</td>
                    </tr>
                  ))}
                  {sales.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500">Nenhuma venda encontrada</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
