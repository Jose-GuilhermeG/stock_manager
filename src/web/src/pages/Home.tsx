import { useEffect, useState, useContext, type FormEvent } from "react";
import { StatsCards } from "@/components/StatsCards";
import { SalesChart } from "@/components/SalesChart";
import SelectEnterprise from "@/features/enterprise/SelectEnterprise";
import { AuthContext , type AuthContextType } from "@/context/userContext";
import { type UserEnterprise } from "@/types/AccountTypes";
import { getUserEnterprises } from "@/services/enterpriseServices";
import Loading from "@/features/Loading";

interface DashboardData {
  avgSales: number;
  revenue: number;
  stockLevel: number;
}

async function fetchDashboardData(): Promise<DashboardData> {
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
  const {accessToken} = useContext(AuthContext) as AuthContextType
  const [loadingDashboardData, setLoadingDashboardData] = useState(true);
  const [loadingUserEnterpriseData, setLoadingUserEnterpriseData] = useState<boolean>(true);
  const [selectEnterprise , setSelectEnterprise] = useState<UserEnterprise | null>(null)
  const [userEnterprises , setUserEnterprises] = useState<UserEnterprise[]>([])

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoadingDashboardData(false));

    getUserEnterprises(accessToken).then(res=>{
      setUserEnterprises(res.data)
    }).finally(()=>{
      setLoadingUserEnterpriseData(false)
    })
  }, []);

  const enterpriseHandler = (e : FormEvent<HTMLFormElement>) : void =>{
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const selected = formData.get("enterprise")?.toString()
    const enterprise = userEnterprises.find(element=>element.id.toString() == selected) as UserEnterprise
    setSelectEnterprise(enterprise)
  }

  if (!selectEnterprise ) return (
    <main>
    <section> 
      <SelectEnterprise formHandler={enterpriseHandler} enterprises={userEnterprises} loading={loadingUserEnterpriseData}/>
    </section>
    </main>
  )

  return (
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
            <p className="text-sm text-neutral-400 mt-0.5">
              Visão geral do seu estoque e vendas
            </p>
          </div>

          {loadingDashboardData ?
            <Loading/>
          : data ? (
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
  );
}