import type { ElementType } from "react";
import {ChevronRight} from 'lucide-react'
import { cn } from "@/lib/utils";
import {Link} from 'react-router-dom'

interface NavItems{
  label : string,
  icon : ElementType,
  href : string ,
  active? : boolean
}


export function Sidebar({navItems} : {navItems : Array<NavItems>} ) {
  return (
    <aside className="w-56 min-h-screen bg-neutral-900 text-neutral-100 flex flex-col py-6 px-3 shrink-0">
      <nav className="flex flex-col gap-1 mt-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
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
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-3 py-3 border-t border-neutral-800">
        <p className="text-xs text-neutral-500">Stock Manager v1.0</p>
      </div>
    </aside>
  );
}