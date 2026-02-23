import { useEffect, useState, type FormEvent } from "react";
import { StatsCards } from "@/components/StatsCards";
import { SalesChart } from "@/components/SalesChart";

import { AlertDialog , AlertDialogHeader , AlertDialogContent ,AlertDialogAction  , AlertDialogMedia} from "@/components/ui/alert-dialog";
import { RadioGroup , RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { SquareCheckBig , Building2 } from "lucide-react";

interface DashboardData {
  avgSales: number;
  revenue: number;
  stockLevel: number;
}

interface UserEnterprise{
  id : number;
  name : string;
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
  const [loading, setLoading] = useState(true);
  const [selectEnterprise , setSelectEnterprise] = useState<UserEnterprise | null>(null)
  const [userEnterprises , setUserEnterprises] = useState<UserEnterprise[]>([
  {id : 1 , name : "Empresa A"},
  {id : 2 , name : "Empresa B"},
  {id : 3 , name : "Empresa C"},
  {id : 4 , name : "Empresa D"},
])

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .finally(() => setLoading(false));
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
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="m-auto text-white bg-black my-5">
              <Building2/>
            </AlertDialogMedia>
            <h1 className="flex text-2xl m-auto items-center ">
              Escolha a Empresa 
              <SquareCheckBig className="mx-2"/>
            </h1>
          </AlertDialogHeader>
          <form className="" onSubmit={enterpriseHandler}>
            <RadioGroup name="enterprise" defaultValue={userEnterprises[0].id.toString()}>
                {
                  userEnterprises.map(element=>(
                    <div className="w-full flex justify-between items-center hover:bg-neutral-50 py-3">
                      <Label htmlFor={element.name} className="w-full text-[16px] cursor-pointer">
                        {element.name}
                      </Label>
                      <RadioGroupItem id={element.name} value={element.id.toString()}/>
                    </div>
                  ))
                }
            </RadioGroup>
          <Button className="my-2 w-full">
            Selecionar
          </Button>
        </form>
        </AlertDialogContent>
      </AlertDialog>
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
  );
}