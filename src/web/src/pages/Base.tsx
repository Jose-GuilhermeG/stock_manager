//imports
import {Outlet , useLocation} from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Settings,
  Truck,
  Users,
  PackageSearch
} from "lucide-react";
import type { ElementType } from "react";
import { useContext } from 'react';

import { AuthContext , type AuthContextType } from "@/context/userContext";


//components
import { Sidebar } from "@/layout/SideBar";
import { TopHeader } from "@/layout/TopHeader";

interface NavItems{
  id : string,
  label : string,
  icon : ElementType,
  href : string ,
  active? : boolean
}

const navItems : Array<NavItems> = [
  { id : "dasboard" , label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id : "stock" , label: "Estoque", icon: Package, href: "/stock" },
  { id : "products" , label: "Produtos", icon: PackageSearch, href: "/products" },
  { id : "Vendas" , label: "Vendas", icon: ShoppingCart, href: "/vendas" },
  { id : "Relatórios" , label: "Relatórios", icon: BarChart2, href: "/relatorios" },
  { id : "Fornecedores" , label: "Fornecedores", icon: Truck, href: "/fornecedores" },
  { id : "Clientes" , label: "Clientes", icon: Users, href: "/clientes" },
  { id : "Configurações" , label: "Configurações", icon: Settings, href: "/configuracoes" },
];

export default function BasePage(){
    const location = useLocation();
    const {username} = useContext(AuthContext) as AuthContextType 

    const items = navItems.map(item => ({...item,
    active: location.state?.current_tab === item.id 
            || (!location.state?.current_tab && item.id === "dasboard")
    }));

    return (
        <div className="flex h-screen bg-neutral-50 font-sans overflow-hidden">
            <Sidebar navItems={items} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopHeader userName={username} />
                <Outlet/>
            </div>
        </div>
    )
}