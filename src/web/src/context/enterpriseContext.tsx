import { createContext , useState } from "react";
import { type UserEnterprise } from "@/types/AccountTypes";

export interface EnterpriseContextType{
    enterpriseSelected? : UserEnterprise
    setEnterpriseSelected : (enterprise : UserEnterprise) => void
}

export const SelectEnterpriseContext = createContext<EnterpriseContextType | null>(null)

export function EnterpriseProvider({children} : {children : React.ReactNode}){
    
    const [enterpriseSelected , setEnterpriseSelected] = useState<UserEnterprise>()
    

    return (
        <SelectEnterpriseContext.Provider value={{enterpriseSelected , setEnterpriseSelected}}>
            {children}
        </SelectEnterpriseContext.Provider>
    )
} 