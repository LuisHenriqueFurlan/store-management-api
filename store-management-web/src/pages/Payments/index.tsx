import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getApiErrorMessage, toDate, toMoney } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Payment, Sale } from "../../types/api";

const initialForm = {
  venda_id: "",
  forma_pagamento: "PIX" as "PIX" | "CARTAO" | "DINHEIRO",
  valor: "",
  parcelas: "1",
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  async function loadPayments() {
    try {
      const [paymentsData, salesData] = await Promise.all([
        storeApi.payments(),
        storeApi.sales(),
      ]);
      setPayments(paymentsData);
      setSales(salesData);
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  const saleById = useMemo(() => new Map(sales.map((sale) => [sale.id, sale])), [sales]);

  function resetForm() {
    setForm(initialForm);
    setEditingId("");
  }

  function startEdit(payment: Payment) {
    setEditingId(payment.id);
    setForm({
      venda_id: payment.venda_id,
      forma_pagamento: payment.forma_pagamento as "PIX" | "CARTAO" | "DINHEIRO",
      valor: String(payment.valor),
      parcelas: String(payment.parcelas),
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        venda_id: form.venda_id,
        forma_pagamento: form.forma_pagamento,
        valor: Number(form.valor),
        parcelas: Number(form.parcelas),
      };

      if (editingId) {
        await storeApi.updatePayment(editingId, {
          forma_pagamento: payload.forma_pagamento,
          valor: payload.valor,
          parcelas: payload.parcelas,
        });
      } else {
        await storeApi.createPayment(payload);
      }

      resetForm();
      await loadPayments();
    } catch (saveError) {
      setError(getApiErrorMessage(saveError));
    }
  }

  async function handleDelete(id: string) {
    try {
      await storeApi.deletePayment(id);
      await loadPayments();
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
              <h2 className="text-xl font-bold text-zinc-950">{editingId ? "Editar pagamento" : "Novo pagamento"}</h2>
              <p className="text-sm text-zinc-500">Registre recebimentos vinculados a vendas.</p>
            </div>
            {editingId && (
              <button onClick={resetForm} className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50">
                <X size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-zinc-700">
              Venda
              <select disabled={Boolean(editingId)} className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500 disabled:bg-zinc-100" value={form.venda_id} onChange={(event) => setForm({ ...form, venda_id: event.target.value })} required>
                <option value="">Selecione</option>
                {sales.filter((sale) => sale.status !== "CANCELADA").map((sale) => (
                  <option key={sale.id} value={sale.id}>
                    {sale.id.slice(0, 8)} | {sale.status} | {toMoney(sale.valor_final)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-zinc-700">
              Forma de pagamento
              <select className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" value={form.forma_pagamento} onChange={(event) => setForm({ ...form, forma_pagamento: event.target.value as "PIX" | "CARTAO" | "DINHEIRO" })}>
                <option value="PIX">PIX</option>
                <option value="CARTAO">Cartao</option>
                <option value="DINHEIRO">Dinheiro</option>
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-semibold text-zinc-700">
                Valor
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="0.01" step="0.01" value={form.valor} onChange={(event) => setForm({ ...form, valor: event.target.value })} required />
              </label>
              <label className="block text-sm font-semibold text-zinc-700">
                Parcelas
                <input className="mt-1 h-11 w-full rounded-lg border border-zinc-300 px-3 outline-none focus:border-yellow-500" type="number" min="1" max="12" value={form.parcelas} onChange={(event) => setForm({ ...form, parcelas: event.target.value })} required />
              </label>
            </div>

            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
              <Plus size={18} />
              {editingId ? "Salvar pagamento" : "Registrar pagamento"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-zinc-950">Pagamentos</h2>
            <p className="text-sm text-zinc-500">Total recebido: {toMoney(payments.reduce((total, payment) => total + Number(payment.valor), 0))}</p>
          </div>
          {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="overflow-x-auto rounded-lg border border-zinc-200">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pagamento</th>
                  <th className="px-4 py-3 font-semibold">Venda</th>
                  <th className="px-4 py-3 font-semibold">Forma</th>
                  <th className="px-4 py-3 font-semibold">Valor</th>
                  <th className="px-4 py-3 font-semibold">Parcelas</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 text-right font-semibold">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {payments.map((payment) => {
                  const sale = saleById.get(payment.venda_id);

                  return (
                    <tr key={payment.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-semibold">{payment.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">{payment.venda_id.slice(0, 8)} {sale ? `| ${sale.status}` : ""}</td>
                      <td className="px-4 py-3">{payment.forma_pagamento}</td>
                      <td className="px-4 py-3">{toMoney(payment.valor)}</td>
                      <td className="px-4 py-3">{payment.parcelas}</td>
                      <td className="px-4 py-3 text-zinc-500">{toDate(payment.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(payment)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(payment.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {payments.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-zinc-500">Nenhum pagamento encontrado</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
