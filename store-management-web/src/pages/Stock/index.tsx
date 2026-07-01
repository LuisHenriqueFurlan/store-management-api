import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getApiErrorMessage } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Product, ProductVariation } from "../../types/api";

const initialForm = {
  produto_id: "",
  tamanho: "",
  quantidade_estoque: "",
  estoque_minimo: "3",
};

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  async function loadStock() {
    try {
      const [productsData, variationsData] = await Promise.all([
        storeApi.products(),
        storeApi.variations(),
      ]);
      setProducts(productsData);
      setVariations(variationsData);
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    }
  }

  useEffect(() => {
    loadStock();
  }, []);

  const productById = useMemo(() => new Map(products.map((product) => [product.id, product.nome])), [products]);

  function resetForm() {
    setForm(initialForm);
    setEditingId("");
  }

  function startEdit(variation: ProductVariation) {
    setEditingId(variation.id);
    setForm({
      produto_id: variation.produto_id,
      tamanho: variation.tamanho,
      quantidade_estoque: String(variation.quantidade_estoque),
      estoque_minimo: String(variation.estoque_minimo),
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        produto_id: form.produto_id,
        tamanho: form.tamanho,
        quantidade_estoque: Number(form.quantidade_estoque),
        estoque_minimo: Number(form.estoque_minimo),
      };

      if (editingId) {
        await storeApi.updateVariation(editingId, {
          tamanho: payload.tamanho,
          quantidade_estoque: payload.quantidade_estoque,
          estoque_minimo: payload.estoque_minimo,
        });
      } else {
        await storeApi.createVariation(payload);
      }

      resetForm();
      await loadStock();
    } catch (saveError) {
      setError(getApiErrorMessage(saveError));
    }
  }

  async function handleDelete(id: string) {
    try {
      await storeApi.deleteVariation(id);
      await loadStock();
      if (editingId === id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    }
  }

  return (
    <Layout>
      <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">{editingId ? "Editar variacao" : "Nova variacao"}</h2>
              <p className="text-sm text-zinc-500">Controle tamanho, saldo e estoque minimo.</p>
            </div>
            {editingId && (
              <button onClick={resetForm} className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50">
                <X size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-700">
              Produto
              <select disabled={Boolean(editingId)} className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500 disabled:bg-zinc-100" value={form.produto_id} onChange={(event) => setForm({ ...form, produto_id: event.target.value })} required>
                <option value="">Selecione</option>
                {products.map((product) => <option key={product.id} value={product.id}>{product.nome}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <label className="block text-sm font-semibold text-zinc-700">
                Tam.
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={form.tamanho} onChange={(event) => setForm({ ...form, tamanho: event.target.value.toUpperCase() })} required maxLength={10} />
              </label>
              <label className="block text-sm font-semibold text-zinc-700">
                Estoque
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="0" value={form.quantidade_estoque} onChange={(event) => setForm({ ...form, quantidade_estoque: event.target.value })} required />
              </label>
              <label className="block text-sm font-semibold text-zinc-700">
                Min.
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="0" value={form.estoque_minimo} onChange={(event) => setForm({ ...form, estoque_minimo: event.target.value })} required />
              </label>
            </div>

            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
              <Plus size={18} />
              {editingId ? "Salvar variacao" : "Cadastrar variacao"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Estoque</h2>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-200">
            <table className="w-full min-w-[780px] text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Produto</th>
                  <th className="px-4 py-3 font-semibold">Tamanho</th>
                  <th className="px-4 py-3 font-semibold">Estoque</th>
                  <th className="px-4 py-3 font-semibold">Minimo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {variations.map((variation) => {
                  const isLow = variation.quantidade_estoque <= variation.estoque_minimo;

                  return (
                    <tr key={variation.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-semibold text-zinc-900">{productById.get(variation.produto_id) ?? "Produto"}</td>
                      <td className="px-4 py-3">{variation.tamanho}</td>
                      <td className="px-4 py-3">{variation.quantidade_estoque}</td>
                      <td className="px-4 py-3">{variation.estoque_minimo}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isLow ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                          {isLow ? "Baixo" : "Ok"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(variation)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(variation.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {variations.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">Nenhuma variacao encontrada</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
