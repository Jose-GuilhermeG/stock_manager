import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { day: "01/02", vendas: 120 },
  { day: "03/02", vendas: 98 },
  { day: "05/02", vendas: 145 },
  { day: "07/02", vendas: 110 },
  { day: "09/02", vendas: 190 },
  { day: "11/02", vendas: 160 },
  { day: "13/02", vendas: 205 },
  { day: "15/02", vendas: 178 },
  { day: "17/02", vendas: 220 },
  { day: "19/02", vendas: 195 },
];

interface SalesChartProps {
  data?: { day: string; vendas: number }[];
}

export function SalesChart({ data = mockData }: SalesChartProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Vendas no Período
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">Últimos 30 dias</p>
        </div>
        <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full font-medium">
          Fevereiro 2025
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#404040" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#404040" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#fff",
            }}
            itemStyle={{ color: "#d4d4d4" }}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="vendas"
            stroke="#262626"
            strokeWidth={2}
            fill="url(#salesGradient)"
            dot={{ r: 3, fill: "#262626", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#262626" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}