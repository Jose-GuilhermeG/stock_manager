import { useState , useEffect , useContext } from "react";
import camelcaseKeys from "camelcase-keys";

import { Empty , EmptyHeader , EmptyMedia , EmptyContent , EmptyTitle , EmptyDescription } from "@/components/ui/empty";
import { FieldSet , Field , FieldLabel , FieldLegend , FieldGroup  } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { CircleSlash2 , ArrowRight , Search } from "lucide-react";
import ErrAlert from "@/features/errAlert";
import Loading from "@/features/Loading";
import { type ApiErr } from "@/types/generalTYpes";

import { getProductsService } from "@/services/stockServices";
import { AuthContext , type AuthContextType } from "@/context/userContext";
import { SelectEnterpriseContext , type EnterpriseContextType } from "@/context/enterpriseContext";
import type { StockItem } from "@/types/stockTypes";
import { ProductCard } from "@/features/produtcs/ProductCard";

export default function StockPage() {
    const [loading , setLoading] = useState<boolean>(true)
    const {accessToken} = useContext(AuthContext) as AuthContextType
    const {enterpriseSelected} = useContext(SelectEnterpriseContext) as EnterpriseContextType
    const [products , setProducts] = useState<StockItem[]>([])
    const [Err , setErr] = useState<ApiErr>({
        hasErr : false ,
        code : 200,
    })


    useEffect(()=>{
        getProductsService(enterpriseSelected?.id || 0, accessToken).then(res=>{
            const data : StockItem[] = camelcaseKeys(res.data) as StockItem[]
            setProducts(data)
        })
        .catch(err=>{
            let statusCode = 500

            if(err.response){
                statusCode = err.response.status
            }

            setErr({
                hasErr : true,
                code : statusCode
            })
        })
        .finally(()=>setLoading(false))
        return 
    },[])

    if(loading) return <Loading/>

    const empytMessage = (
        <div className="w-full h-full">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <CircleSlash2/>
                    </EmptyMedia>
                    <EmptyContent>
                        <EmptyTitle>
                            Nenhum Produto Selecionando No estoque
                        </EmptyTitle>
                        <EmptyDescription>
                            Selecione produtos para monitorar
                        </EmptyDescription>
                        <Button className="cursor-pointer">
                            Selecionar
                            <ArrowRight/>
                        </Button>
                    </EmptyContent>
                </EmptyHeader>
            </Empty>
        </div>
    )

    return (
      <main className="flex-1 overflow-y-auto p-6">
        <section className="w-4/5 m-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-neutral-900">Estoque</h1>
                <p className="text-sm text-neutral-400 mt-0.5">
                  Produtos monitorados no estoque e seus detalhes
                </p>
              </div>
              <ErrAlert {...Err}/>
              <form action="">
                  <FieldSet className="my-10">
                    <FieldLegend>
                        Filtrar Produtos
                    </FieldLegend>
                    <FieldGroup className="w-full grid grid-cols-2 grid-rows-3">
                        <Field className="col-start-1 col-end-3">
                            <FieldLabel htmlFor="productSearch">
                                Busque o produto pelo Nome
                            </FieldLabel>
                            <Input id="productSearch" className="bg-white" placeholder="Pesquisar Produto"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="stockQuantity">
                                Quantidade no estoque
                            </FieldLabel>
                            <Input id="stockQuantity" className="bg-white" type="number" min="0" placeholder="0"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="status">
                                Status de vendas
                            </FieldLabel>
                            <Input id="status" className="bg-white"/>
                        </Field>
                        <Field className="col-start-1 col-end-3">
                            <Button className="w-full cursor-pointer" size="lg">
                                Filtrar
                                <Search className="w-16 h-16"/>
                            </Button>
                        </Field>
                    </FieldGroup>
                  </FieldSet>
              </form>
            {
                !products.length ? empytMessage :
                <div className="gap-10 grid grid-cols-3 m-auto max-lg:grid-cols-1">
                    {products.map(element=>(
                        <ProductCard product={element.product} />
                    ))}
                </div>
            }
        </section>
      </main>
    );
}