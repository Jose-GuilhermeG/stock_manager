//imports
import {Outlet} from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Settings,
  Truck,
  Users,
} from "lucide-react";

//components
import { Sidebar } from "@/components/SideBar";
import { TopHeader } from "@/components/TopHeader";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { label: "Estoque", icon: Package, href: "/estoque" },
  { label: "Vendas", icon: ShoppingCart, href: "/vendas" },
  { label: "Relatórios", icon: BarChart2, href: "/relatorios" },
  { label: "Fornecedores", icon: Truck, href: "/fornecedores" },
  { label: "Clientes", icon: Users, href: "/clientes" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

export default function BasePage(){
    return (
        <div className="flex h-screen bg-neutral-50 font-sans overflow-hidden">
            <Sidebar navItems={navItems} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopHeader userName="Guilherme" />
                <Outlet/>
            </div>
        </div>
    )
}