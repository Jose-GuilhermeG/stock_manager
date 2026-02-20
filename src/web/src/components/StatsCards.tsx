import { TrendingUp, DollarSign, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  avgSales: number;
  revenue: number;
  stockLevel: number;
}

function StockBar({ value }: { value: number }) {
  const color =
    value > 60
      ? "bg-emerald-500"
      : value > 30
      ? "bg-amber-400"
      : "bg-red-500";

  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>Nível atual</span>
        <span className={cn(
          "font-semibold",
          value > 60 ? "text-emerald-600" : value > 30 ? "text-amber-500" : "text-red-500"
        )}>
          {value}%
        </span>
      </div>
      <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function StatsCards({ avgSales, revenue, stockLevel }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Média de Vendas
          </p>
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <TrendingUp size={15} className="text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-neutral-900">
          {avgSales.toLocaleString("pt-BR")}
        </p>
        <p className="text-xs text-neutral-400 mt-1">unidades / dia</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Faturamento
          </p>
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <DollarSign size={15} className="text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-neutral-900">
          {revenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="text-xs text-neutral-400 mt-1">acumulado no período</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Nível do Estoque
          </p>
          <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Layers size={15} className="text-neutral-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-neutral-900">{stockLevel}%</p>
        <StockBar value={stockLevel} />
      </div>
    </div>
  );
}