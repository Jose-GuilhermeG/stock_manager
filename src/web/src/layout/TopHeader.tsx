import { Bell, Search } from "lucide-react";

interface TopHeaderProps {
  userName: string;
}

export function TopHeader({ userName }: TopHeaderProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-neutral-900 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">SM</span>
        </div>
        <span className="text-sm font-semibold text-neutral-800 tracking-tight">
          Stock Manager
        </span>
        <span className="hidden sm:block text-neutral-300 mx-1">·</span>
        <span className="hidden sm:block text-sm text-neutral-500">
          {greeting}, <span className="text-neutral-700 font-medium">{userName}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
          <Search size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 bg-neutral-200 rounded-full flex items-center justify-center ml-1">
          <span className="text-xs font-semibold text-neutral-600">
            {userName[0]}
          </span>
        </div>
      </div>
    </header>
  );
}