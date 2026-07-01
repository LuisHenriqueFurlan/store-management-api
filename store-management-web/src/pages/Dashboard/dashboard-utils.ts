import type { Payment, Sale } from "../../types/api";

export interface ChartPoint {
  name: string;
  receita: number;
  vendas: number;
}

export interface PaymentMethodPoint {
  name: string;
  value: number;
}

const dayFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
});

export function toNumber(value: number | string | null | undefined) {
  const numericValue = Number(value ?? 0);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function buildRevenueChart(payments: Payment[], sales: Sale[]): ChartPoint[] {
  const points = new Map<string, ChartPoint>();
  const today = new Date();

  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const key = date.toISOString().slice(0, 10);

    points.set(key, {
      name: dayFormatter.format(date),
      receita: 0,
      vendas: 0,
    });
  }

  payments.forEach((payment) => {
    const key = payment.created_at.slice(0, 10);
    const point = points.get(key);

    if (point) {
      point.receita += toNumber(payment.valor);
    }
  });

  sales.forEach((sale) => {
    const key = sale.created_at.slice(0, 10);
    const point = points.get(key);

    if (point) {
      point.vendas += 1;
    }
  });

  return [...points.values()];
}

export function buildPaymentMethodChart(payments: Payment[]): PaymentMethodPoint[] {
  const totals = payments.reduce<Map<string, number>>((accumulator, payment) => {
    const current = accumulator.get(payment.forma_pagamento) ?? 0;
    accumulator.set(payment.forma_pagamento, current + toNumber(payment.valor));
    return accumulator;
  }, new Map<string, number>());

  return [...totals.entries()].map(([name, value]) => ({
    name,
    value,
  }));
}
