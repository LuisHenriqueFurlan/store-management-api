import {
  Boxes,
  CreditCard,
  Layers3,
  LayoutDashboard,
  LogOut,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingCart,
  Tags,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { appConfig } from "../../config/app";
import { useAuth } from "../../hooks/useAuth";
import { routePaths } from "../../routes/paths";
import { cn } from "../../lib/cn";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", path: routePaths.dashboard },
  { icon: Package, label: "Produtos", path: routePaths.products },
  { icon: Layers3, label: "Categorias", path: routePaths.categories },
  { icon: Tags, label: "Marcas", path: routePaths.brands },
  { icon: Boxes, label: "Estoque", path: routePaths.stock },
  { icon: ShoppingCart, label: "Vendas", path: routePaths.sales },
  { icon: CreditCard, label: "Pagamentos", path: routePaths.payments },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate(routePaths.login);
  }

  return (
    <aside
      className={cn(
        "border-b border-zinc-200 bg-white text-zinc-900 shadow-sm transition-[width] duration-300 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r",
        collapsed ? "lg:w-[88px]" : "lg:w-72",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 border-b border-zinc-100 px-4 py-4 lg:min-h-[172px]",
          collapsed ? "lg:flex-col lg:justify-center lg:px-3" : "lg:flex-col lg:gap-3 lg:px-5 lg:py-7",
        )}
      >
        <div className="flex w-full items-center justify-between gap-3 lg:justify-center">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg bg-zinc-950 ring-1 ring-zinc-200 transition-all",
              collapsed ? "h-12 w-12" : "h-20 w-20",
            )}
          >
            <img
              src="/logo-jota.png"
              alt="Jota Store"
              className={cn("object-contain transition-all", collapsed ? "h-9 w-9" : "h-16 w-16")}
            />
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Abrir menu lateral" : "Fechar menu lateral"}
            title={collapsed ? "Abrir menu" : "Fechar menu"}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950 lg:flex"
          >
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
        </div>

        <div className={cn("min-w-0 lg:text-center", collapsed && "lg:hidden")}>
          <h1 className="truncate text-xl font-bold tracking-wide text-zinc-950 lg:text-2xl">
            {appConfig.name}
          </h1>

          <span className="text-sm font-semibold text-yellow-600">
            {appConfig.description}
          </span>
        </div>
      </div>

      <nav className={cn("overflow-x-auto px-4 py-4 lg:flex-1 lg:overflow-visible lg:py-6", collapsed ? "lg:px-3" : "lg:px-4")}>
        <ul className="flex gap-2 lg:block lg:space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex min-w-max items-center rounded-lg text-sm transition-all duration-200 lg:w-full lg:text-[15px]",
                      collapsed ? "justify-center gap-0 px-0 py-3" : "gap-3 px-4 py-3",
                      isActive
                        ? "bg-yellow-400 font-semibold text-zinc-950 shadow-sm shadow-yellow-500/20"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                    )
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn("flex gap-2 border-t border-zinc-100 p-4 lg:block lg:space-y-2", collapsed && "lg:px-3")}>
        <button
          type="button"
          title={collapsed ? "Configuracoes" : undefined}
          className={cn(
            "flex w-full items-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950",
            collapsed ? "justify-center gap-0 px-0 py-3" : "gap-4 px-4 py-3",
          )}
        >
          <Settings size={20} />
          <span className={cn(collapsed && "lg:hidden")}>Configuracoes</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Sair" : undefined}
          className={cn(
            "flex w-full items-center rounded-lg text-red-600 transition hover:bg-red-50 hover:text-red-700",
            collapsed ? "justify-center gap-0 px-0 py-3" : "gap-4 px-4 py-3",
          )}
        >
          <LogOut size={20} />
          <span className={cn(collapsed && "lg:hidden")}>Sair</span>
        </button>
      </div>
    </aside>
  );
}
