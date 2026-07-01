import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getApiErrorMessage } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Category } from "../../types/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nome, setNome] = useState("");
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      setCategories(await storeApi.categories());
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function resetForm() {
    setNome("");
    setEditingId("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await storeApi.updateCategory(editingId, nome);
      } else {
        await storeApi.createCategory(nome);
      }
      resetForm();
      await loadCategories();
    } catch (saveError) {
      setError(getApiErrorMessage(saveError));
    }
  }

  async function handleDelete(id: string) {
    try {
      await storeApi.deleteCategory(id);
      await loadCategories();
      if (editingId === id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError));
    }
  }

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">{editingId ? "Editar categoria" : "Nova categoria"}</h2>
              <p className="text-sm text-zinc-500">Agrupe seus produtos para facilitar a operacao.</p>
            </div>
            {editingId && (
              <button onClick={resetForm} className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50">
                <X size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500"
              placeholder="Nome da categoria"
              required
              minLength={3}
            />
            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
              <Plus size={18} />
              {editingId ? "Salvar categoria" : "Cadastrar categoria"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Categorias</h2>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="mt-5 overflow-hidden rounded-lg border border-zinc-200">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 last:border-b-0 hover:bg-zinc-50">
                <span className="font-semibold text-zinc-900">{category.nome}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(category.id); setNome(category.nome); }} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-white">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="py-8 text-center text-zinc-500">Nenhuma categoria cadastrada</p>}
          </div>
        </section>
      </div>
    </Layout>
  );
}
