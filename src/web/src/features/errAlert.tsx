import { AlertDialog , AlertDialogContent , AlertDialogHeader , AlertDialogMedia , AlertDialogTitle , AlertDialogDescription , AlertDialogFooter , AlertDialogAction } from "@/components/ui/alert-dialog";

import {CircleAlert , SquareX} from 'lucide-react'
import { type ApiErr } from "@/types/generalTYpes";

export default function ErrAlert({hasErr = false ,code , message = "Tente novamente mais tarde" , fields} : ApiErr){
    const ServerErrMessage = "Ouve um erro inesperado"
    const UserErrMEssage = "Opa , ouve um pequeno erro"
    const ErrIcon = code < 500 ? SquareX : CircleAlert
    const ErrMesage = code < 500 ? UserErrMEssage : ServerErrMessage

    if(!hasErr) return (<></>)

    return (
        <AlertDialog open>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="text-red-500 bg-red-200">
                            <ErrIcon/>
                        </AlertDialogMedia>
                        <AlertDialogTitle>
                            {ErrMesage}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {code < 500 && <AlertDialogAction className="col-start-1 col-end-3 cursor-pointer" variant="default">
                            Tentar novamente
                        </AlertDialogAction>}
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}