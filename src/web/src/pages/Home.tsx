import { useEffect, useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { TopHeader } from "@/components/TopHeader";
import { StatsCards } from "@/components/StatsCards";
import { SalesChart } from "@/components/SalesChart";

// Simulated API response shape
interface DashboardData {
  avgSales: number;
  revenue: number;
  stockLevel: number; // 0-100 from API
}

async function fetchDashboardData(): Promise<DashboardData> {
  // Replace with your real API call:
  // const res = await fetch("/api/dashboard");
  // return res.json();
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          avgSales: 342,
          revenue: 128_450.75,
          stockLevel: 67,
        }),
      600
    )
  );
}

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-screen bg-neutral-50 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader userName="Guilherme" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
            <p className="text-sm text-neutral-400 mt-0.5">
              Visão geral do seu estoque e vendas
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
            </div>
          ) : data ? (
            <div className="flex flex-col gap-5">
              <StatsCards
                avgSales={data.avgSales}
                revenue={data.revenue}
                stockLevel={data.stockLevel}
              />

              <SalesChart />
            </div>
          ) : (
            <p className="text-sm text-red-500">
              Erro ao carregar os dados. Tente novamente.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}