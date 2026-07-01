import { Pencil, Plus, RefreshCcw, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getApiErrorMessage, toMoney } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Brand, Category, Product } from "../../types/api";

const initialForm = {
  nome: "",
  descricao: "",
  preco: "",
  categoria_id: "",
  marca_id: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const [productsData, categoriesData, brandsData] = await Promise.all([
        storeApi.products(),
        storeApi.categories(),
        storeApi.brands(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setEditingId("");
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      nome: product.nome,
      descricao: product.descricao ?? "",
      preco: String(product.preco),
      categoria_id: product.categoria_id,
      marca_id: product.marca_id,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      preco: Number(form.preco),
      categoria_id: form.categoria_id,
      marca_id: form.marca_id,
    };

    try {
      if (editingId) {
        await storeApi.updateProduct(editingId, payload);
      } else {
        await storeApi.createProduct(payload);
      }

      resetForm();
      await loadProducts();
    } catch (saveError) {
      setError(getApiErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError("");

    try {
      await storeApi.deleteProduct(id);
      await loadProducts();
      if (editingId === id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    }
  }

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.nome])),
    [categories],
  );
  const brandById = useMemo(() => new Map(brands.map((brand) => [brand.id, brand.nome])), [brands]);

  return (
    <Layout>
      <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">{editingId ? "Editar produto" : "Novo produto"}</h2>
              <p className="text-sm text-zinc-500">Categorias e marcas vêm direto da API.</p>
            </div>
            {editingId && (
              <button onClick={resetForm} className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50">
                <X size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-700">
              Nome
              <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} required minLength={3} />
            </label>

            <label className="block text-sm font-semibold text-zinc-700">
              Descricao
              <textarea className="mt-1 min-h-24 w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-yellow-500" value={form.descricao} onChange={(event) => setForm({ ...form, descricao: event.target.value })} required minLength={5} />
            </label>

            <label className="block text-sm font-semibold text-zinc-700">
              Preco
              <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="0.01" step="0.01" value={form.preco} onChange={(event) => setForm({ ...form, preco: event.target.value })} required />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <label className="block text-sm font-semibold text-zinc-700">
                Categoria
                <select className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={form.categoria_id} onChange={(event) => setForm({ ...form, categoria_id: event.target.value })} required>
                  <option value="">Selecione</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.nome}</option>)}
                </select>
              </label>

              <label className="block text-sm font-semibold text-zinc-700">
                Marca
                <select className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={form.marca_id} onChange={(event) => setForm({ ...form, marca_id: event.target.value })} required>
                  <option value="">Selecione</option>
                  {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.nome}</option>)}
                </select>
              </label>
            </div>

            <button disabled={saving} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-60">
              <Plus size={18} />
              {saving ? "Salvando..." : editingId ? "Salvar produto" : "Cadastrar produto"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">Produtos</h2>
              <p className="text-sm text-zinc-500">{products.length} produtos cadastrados</p>
            </div>

            <button onClick={loadProducts} className="flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
              <RefreshCcw size={16} />
              Atualizar
            </button>
          </div>

          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Categoria</th>
                  <th className="px-4 py-3 font-semibold">Marca</th>
                  <th className="px-4 py-3 font-semibold">Preco</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3 font-semibold text-zinc-900">{product.nome}</td>
                    <td className="px-4 py-3">{categoryById.get(product.categoria_id) ?? "-"}</td>
                    <td className="px-4 py-3">{brandById.get(product.marca_id) ?? "-"}</td>
                    <td className="px-4 py-3">{toMoney(product.preco)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {product.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(product)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && products.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">Nenhum produto encontrado</td></tr>}
                {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">Carregando...</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
