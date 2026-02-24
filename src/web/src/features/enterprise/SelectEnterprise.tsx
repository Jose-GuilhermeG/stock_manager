import { AlertDialog , AlertDialogHeader , AlertDialogContent ,AlertDialogAction  , AlertDialogMedia} from "@/components/ui/alert-dialog";
import { RadioGroup , RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { SquareCheckBig , Building2 } from "lucide-react";

import { type UserEnterprise } from "@/types/AccountTypes";
import type { SubmitEventHandler } from "react";
import Loading from "../Loading";

export default function SelectEnterprise({formHandler , enterprises , loading } : {formHandler : SubmitEventHandler<HTMLFormElement> , enterprises : UserEnterprise[] , loading : boolean}){

    const EmptyMessage = ()=>(
        <div>
            <h1 className="m-auto text-center text-[20px] text-wrap w-3/4 capitalize ">
                Você não esta em nenhuma empresa no momento
            </h1>
        </div>
    )

    const Form = ()=>(
        <form className="" onSubmit={formHandler}>
                {
                    enterprises.length?
                    <div>
                        <RadioGroup name="enterprise" defaultValue={enterprises[0].id.toString()}>
                            {
                            enterprises.map(element=>(
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
                    </div>:
                <EmptyMessage/>
                }
        </form>
    )

    return (
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
          {
            loading ? 
            <Loading/> :
            <Form/>
        }
        </AlertDialogContent>
      </AlertDialog>
    )
}