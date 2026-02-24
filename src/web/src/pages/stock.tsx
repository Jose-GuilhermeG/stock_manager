import { useState , useEffect } from "react";
import camelcaseKeys from "camelcase-keys";

import { Empty , EmptyHeader , EmptyMedia , EmptyContent , EmptyTitle , EmptyDescription } from "@/components/ui/empty";
import { Card , CardHeader , CardTitle , CardDescription , CardAction , CardContent } from "@/components/ui/card";
import { FieldSet , Field , FieldLabel , FieldLegend , FieldGroup  } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { CircleSlash2 , ArrowRight , Box , Search } from "lucide-react";
import ErrAlert from "@/features/errAlert";
import { type ApiErr } from "@/types/generalTYpes";

import { getProductsService } from "@/services/stockServices";

interface Product{
    id : number
    name : string,
    price : number,
    quantity : number,
    productDetailUrl : string,
    productPhoto? : string
}

export default function StockPage() {
    const [loading , setLoading] = useState<boolean>(true)
    const [products , setProducts] = useState<Product[]>([])
    const [Err , setErr] = useState<ApiErr>({
        hasErr : false ,
        code : 200,
    })

    useEffect(()=>{
        getProductsService().then(res=>{
            const data : Product[] = camelcaseKeys(res.data) as Product[]
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

    if(loading) return (
        <div className="w-full h-full">
            <div className="flex items-center justify-center h-48">
              <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
            </div>
        </div>
    )

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
                <div className="gap-10 grid grid-cols-3 m-auto">
                    {products.map(element=>(
                        <Card className="h-[50vh] relative cursor-pointer">
                            <div className="w-full max-w-sm inset-0 mx-auto pt-0">
                                {element.productPhoto ? 
                                    <img src={element.productPhoto} className="w-full h-full aspect-video"/> :
                                    <Box className="w-full h-full aspect-video"/>
                                }
                            </div>
                            <CardHeader>
                                <CardTitle>
                                    {element.name}
                                </CardTitle>
                                <CardAction>
                                    {element.price} R$
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    <ul>
                                        <li className="text-black font-medium my-2">
                                            Quantidade em estoque : {element.quantity}
                                        </li>
                                    </ul>
                                    <Button size="lg" className="w-full">
                                        Ver Detalhes
                                        <ArrowRight/>
                                    </Button>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            }
        </section>
      </main>
    );
}