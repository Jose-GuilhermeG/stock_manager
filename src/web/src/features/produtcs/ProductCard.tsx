import { Card , CardHeader , CardTitle , CardDescription , CardAction , CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight , Box } from "lucide-react";

import type { Product } from "@/types/stockTypes";


export function ProductCard({product} : {product : Product}){
    return (
        <Card className="h-[50vh] w-sm relative cursor-pointer hover:scale-105">
            <div className="w-full max-w-sm inset-0 mx-auto pt-0">
                {product.productPhoto ? 
                    <img src={product.productPhoto} className="w-full h-full aspect-video"/> :
                    <Box className="w-full h-full aspect-video"/>
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {product.name}
                </CardTitle>
                <CardAction>
                    {product.price} R$
                </CardAction>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <ul>
                        <li className="text-black font-medium my-2">
                            Quantidade em estoque : {product.quantity}
                        </li>
                    </ul>
                    <Button size="lg" className="w-full">
                        Ver Detalhes
                        <ArrowRight/>
                    </Button>
                </CardDescription>
            </CardContent>
        </Card>
    )
}