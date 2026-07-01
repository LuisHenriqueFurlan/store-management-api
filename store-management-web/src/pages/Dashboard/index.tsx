import {
  AlertTriangle,
  CircleDollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Layout from "../../components/Layout";
import { cn } from "../../lib/cn";
import { getApiErrorMessage, toDate, toMoney } from "../../services/helpers";
import { storeApi } from "../../services/store";
import type { Payment, Product, ProductVariation, Sale } from "../../types/api";
import { buildPaymentMethodChart, buildRevenueChart, toNumber } from "./dashboard-utils";
import { mockPayments, mockProducts, mockSales, mockVariations } from "./mock";

const chartColors = ["#18181b", "#eab308", "#22c55e", "#3b82f6"];

interface DashboardState {
  payments: Payment[];
  products: Product[];
  sales: Sale[];
  variations: ProductVariation[];
}

const emptyState: DashboardState = {
  payments: [],
  products: [],
  sales: [],
  variations: [],
};

function statusClass(status: string) {
  if (status === "FINALIZADA") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (status === "CANCELADA") {
    return "bg-red-50 text-red-700 ring-red-100";
  }

  return "bg-yellow-50 text-yellow-700 ring-yellow-100";
}

function ChartTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string;
  payload?: Array<{ name: string; value: number }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-lg">
      <p className="mb-1 font-semibold text-zinc-900">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="text-zinc-600">
          {item.name}: {item.name.toLowerCase().includes("receita") ? toMoney(item.value) : item.value}
        </p>
      ))}
    </div>
  );
}

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  description: string;
  icon: ReactNode;
  rightSlot?: ReactNode;
  title: string;
}

function SectionHeader({ description, icon, rightSlot, title }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex min-w-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700 ring-1 ring-yellow-100">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-zinc-950">{title}</h2>
          <p className="mt-1 text-sm leading-5 text-zinc-500">{description}</p>
        </div>
      </div>
      {rightSlot}
    </div>
  );
}

interface MetricCardProps {
  color: string;
  icon: ReactNode;
  subtitle: string;
  title: string;
  value: string;
}

function MetricCard({
  color,
  icon,
  subtitle,
  title,
  value,
}: MetricCardProps) {
  return (
    <DashboardCard className="min-h-[156px] p-6">
      <div className="flex h-full min-w-0 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
              {title}
            </p>
          </div>
          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white shadow-md", color)}>
            {icon}
          </span>
        </div>

        <div className="min-w-0">
          <p className="truncate text-[38px] font-bold leading-none text-zinc-950">
            {value}
          </p>
          <p className="mt-3 truncate text-sm font-medium text-zinc-500">
            {subtitle}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}

interface HeroIndicatorProps {
  label: string;
  value: string | number;
}

function HeroIndicator({ label, value }: HeroIndicatorProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold leading-none">{value}</p>
    </div>
  );
}

function ChartFrame({ children, className }: DashboardCardProps) {
  return (
    <div className={cn("h-80 flex-1 rounded-lg bg-zinc-50 p-4", className)}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardState>(emptyState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [productsData, variationsData, salesData, paymentsData] = await Promise.all([
          storeApi.products(),
          storeApi.variations(),
          storeApi.sales(),
          storeApi.payments(),
        ]);

        const hasUsefulData =
          productsData.length > 0 ||
          variationsData.length > 0 ||
          salesData.length > 0 ||
          paymentsData.length > 0;

        setUsingMockData(!hasUsefulData);
        setData(
          hasUsefulData
            ? {
                payments: paymentsData,
                products: productsData,
                sales: salesData,
                variations: variationsData,
              }
            : {
                payments: mockPayments,
                products: mockProducts,
                sales: mockSales,
                variations: mockVariations,
              },
        );
      } catch (loadError) {
        setError(getApiErrorMessage(loadError));
        setUsingMockData(true);
        setData({
          payments: mockPayments,
          products: mockProducts,
          sales: mockSales,
          variations: mockVariations,
        });
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const revenue = useMemo(
    () => data.payments.reduce((total, payment) => total + toNumber(payment.valor), 0),
    [data.payments],
  );

  const finalizedSales = useMemo(
    () => data.sales.filter((sale) => sale.status === "FINALIZADA"),
    [data.sales],
  );

  const pendingSales = useMemo(
    () => data.sales.filter((sale) => sale.status === "PENDENTE"),
    [data.sales],
  );

  const lowStock = useMemo(
    () => data.variations.filter((variation) => variation.quantidade_estoque <= variation.estoque_minimo),
    [data.variations],
  );

  const averageTicket = finalizedSales.length > 0 ? revenue / finalizedSales.length : 0;

  const revenueChart = useMemo(
    () => buildRevenueChart(data.payments, data.sales),
    [data.payments, data.sales],
  );

  const paymentMethodChart = useMemo(
    () => buildPaymentMethodChart(data.payments),
    [data.payments],
  );

  const recentSales = useMemo(
    () =>
      [...data.sales]
        .sort((first, second) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime())
        .slice(0, 7),
    [data.sales],
  );

  return (
    <Layout>
      <div className="grid gap-6">
        <DashboardCard className="bg-zinc-950 p-5 text-white sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
                Visao geral
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">
                Controle comercial da loja
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                Acompanhe receita, vendas, estoque e formas de pagamento com indicadores claros.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-80">
              <HeroIndicator label="Ticket medio" value={toMoney(averageTicket)} />
              <HeroIndicator label="Finalizadas" value={finalizedSales.length} />
            </div>
          </div>
        </DashboardCard>

        {(error || usingMockData) && (
          <div
            className={cn(
              "rounded-lg border px-5 py-4 text-sm font-medium",
              error ? "border-red-200 bg-red-50 text-red-700" : "border-yellow-200 bg-yellow-50 text-yellow-800",
            )}
          >
            {error
              ? `${error} Exibindo dados demonstrativos preparados para futura integracao.`
              : "Nenhum dado retornado pela API ainda. Exibindo dados demonstrativos preparados para futura integracao."}
          </div>
        )}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Receita"
            value={toMoney(revenue)}
            subtitle={`${data.payments.length} pagamentos`}
            color="bg-zinc-950"
            icon={<CircleDollarSign size={26} />}
          />
          <MetricCard
            title="Vendas"
            value={String(data.sales.length)}
            subtitle={`${pendingSales.length} pendentes`}
            color="bg-blue-600"
            icon={<ShoppingCart size={26} />}
          />
          <MetricCard
            title="Produtos"
            value={String(data.products.length)}
            subtitle={`${data.variations.length} variacoes`}
            color="bg-yellow-500"
            icon={<Package size={26} />}
          />
          <MetricCard
            title="Estoque baixo"
            value={String(lowStock.length)}
            subtitle={lowStock.length > 0 ? "Requer atencao" : "Sem alertas"}
            color="bg-red-600"
            icon={<AlertTriangle size={26} />}
          />
        </section>

        <section className="grid items-stretch gap-6 lg:grid-cols-1 xl:grid-cols-3">
          <DashboardCard className="xl:col-span-2">
            <SectionHeader
              title="Receita e vendas"
              description="Evolucao dos ultimos 6 dias."
              icon={<TrendingUp size={19} />}
              rightSlot={(
                <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {loading ? "Carregando" : "Atualizado"}
                </span>
              )}
            />

            <ChartFrame>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChart} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.34} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e4e4e7" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    name="Receita"
                    stroke="#ca8a04"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    name="Vendas"
                    stroke="#18181b"
                    strokeWidth={2.5}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              title="Pagamentos"
              description="Distribuicao por forma."
              icon={<WalletCards size={19} />}
            />

            <ChartFrame>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodChart}
                    dataKey="value"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={4}
                  >
                    {paymentMethodChart.map((item, index) => (
                      <Cell key={item.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => toMoney(typeof value === "number" || typeof value === "string" ? value : 0)} />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>

            <div className="mt-6 space-y-3">
              {paymentMethodChart.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    />
                    <span className="font-medium text-zinc-700">{item.name}</span>
                  </div>
                  <strong className="text-zinc-950">{toMoney(item.value)}</strong>
                </div>
              ))}
            </div>
          </DashboardCard>
        </section>

        <section className="grid items-stretch gap-6 lg:grid-cols-1 xl:grid-cols-3">
          <DashboardCard className="xl:col-span-2">
            <SectionHeader
              title="Ultimas vendas"
              description="Movimentacoes recentes registradas no sistema."
              icon={<ShoppingCart size={19} />}
            />

            <div className="overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-zinc-50 text-left text-zinc-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Venda</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Valor bruto</th>
                    <th className="px-5 py-4 font-semibold">Valor final</th>
                    <th className="px-5 py-4 font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-zinc-50">
                      <td className="px-5 py-4 font-semibold text-zinc-900">#{sale.id.slice(0, 8)}</td>
                      <td className="px-5 py-4">
                        <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", statusClass(sale.status))}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-600">{toMoney(sale.valor_bruto)}</td>
                      <td className="px-5 py-4 font-semibold text-zinc-950">{toMoney(sale.valor_final)}</td>
                      <td className="px-5 py-4 text-zinc-500">{toDate(sale.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              title="Estoque critico"
              description="Variacoes abaixo ou no limite minimo."
              icon={<AlertTriangle size={19} />}
            />

            <ChartFrame className="mb-6 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lowStock.slice(0, 6)} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="#e4e4e7" vertical={false} />
                  <XAxis dataKey="tamanho" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="quantidade_estoque" fill="#dc2626" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>

            <div className="space-y-3">
              {lowStock.slice(0, 6).map((variation) => {
                const product = data.products.find((item) => item.id === variation.produto_id);

                return (
                  <div key={variation.id} className="flex items-center justify-between gap-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-zinc-950">{product?.nome ?? "Produto"}</p>
                      <p className="text-sm text-red-700/70">
                        Tam. {variation.tamanho} | minimo {variation.estoque_minimo}
                      </p>
                    </div>
                    <strong className="text-lg text-red-600">{variation.quantidade_estoque}</strong>
                  </div>
                );
              })}

              {lowStock.length === 0 && (
                <p className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-500">
                  Nenhum produto com estoque critico.
                </p>
              )}
            </div>
          </DashboardCard>
        </section>
      </div>
    </Layout>
  );
}
