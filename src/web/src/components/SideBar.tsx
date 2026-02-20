import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Settings,
  Truck,
  Users,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { label: "Estoque", icon: Package, href: "/estoque" },
  { label: "Vendas", icon: ShoppingCart, href: "/vendas" },
  { label: "Relatórios", icon: BarChart2, href: "/relatorios" },
  { label: "Fornecedores", icon: Truck, href: "/fornecedores" },
  { label: "Clientes", icon: Users, href: "/clientes" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

export function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-neutral-900 text-neutral-100 flex flex-col py-6 px-3 shrink-0">
      <nav className="flex flex-col gap-1 mt-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group",
              item.active
                ? "bg-neutral-700 text-white"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            )}
          >
            <item.icon size={17} className="shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.active && (
              <ChevronRight size={14} className="text-neutral-400" />
            )}
          </a>
        ))}
      </nav>

      <div className="mt-auto px-3 py-3 border-t border-neutral-800">
        <p className="text-xs text-neutral-500">Stock Manager v1.0</p>
      </div>
    </aside>
  );
}