import { Bell, Search, UserCircle2 } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { appConfig } from "../../config/app";
import { useAuth } from "../../hooks/useAuth";
import { routePaths } from "../../routes/paths";

const titles: Record<string, string> = {
  [routePaths.dashboard]: "Dashboard",
  [routePaths.products]: "Produtos",
  [routePaths.categories]: "Categorias",
  [routePaths.brands]: "Marcas",
  [routePaths.stock]: "Estoque",
  [routePaths.sales]: "Vendas",
  [routePaths.payments]: "Pagamentos",
};

export default function Header() {
  const location = useLocation();
  const { user } = useAuth();

  const title = useMemo(() => titles[location.pathname] ?? appConfig.name, [location.pathname]);

  return (
    <header className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold leading-tight text-zinc-950 sm:text-[32px]">
            {title}
          </h1>

          <p className="mt-1 truncate text-sm text-zinc-500 sm:text-base">
            Bem-vindo novamente ao sistema da Jota Store.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end xl:w-auto">
          <div className="relative w-full sm:max-w-[460px] xl:w-[420px]">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Pesquisar..."
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm leading-none text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-yellow-500 focus:bg-white focus:shadow-[0_0_0_4px_rgb(250_204_21/0.14)]"
            />
          </div>

          <button className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition hover:bg-zinc-100">
            <Bell size={20} />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-zinc-50" />
          </button>

          <div className="hidden h-10 w-px bg-zinc-200 sm:block" />

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-100 ring-1 ring-yellow-200">
              <UserCircle2 size={32} className="text-yellow-600" />
            </div>

            <div className="min-w-0 max-w-[190px]">
              <h2 className="truncate text-sm font-semibold leading-5 text-zinc-900">
                {user?.nome ?? "Usuario"}
              </h2>

              <p className="truncate text-xs leading-5 text-zinc-500">
                {user?.email ?? "Sessao ativa"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
