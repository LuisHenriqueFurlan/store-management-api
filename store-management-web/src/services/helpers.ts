import axios from "axios";

export function toMoney(value: number | string | null | undefined) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function toDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getApiErrorMessage(error: unknown) {
  if (!axios.isAxiosError<{ message?: string; error?: string }>(error)) {
    return "Nao foi possivel concluir a operacao.";
  }

  const data = error.response?.data;

  return data?.message ?? data?.error ?? "Nao foi possivel concluir a operacao.";
}
