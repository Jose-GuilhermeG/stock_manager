import { createContext , useState } from "react";
import { type UserEnterprise } from "@/types/AccountTypes";

export interface EnterpriseContextType{
    enterpriseSelected? : UserEnterprise
    setEnterpriseSelected : (enterprise : UserEnterprise) => void
}

export const SelectEnterpriseContext = createContext<EnterpriseContextType | null>(null)

export function EnterpriseProvider({children} : {children : React.ReactNode}){
    
    const [enterpriseSelected , setEnterpriseSelectedState] = useState<UserEnterprise>(localStorage.getItem("enterpriseSelected") ? JSON.parse(localStorage.getItem("enterpriseSelected") as string) : undefined)
    
    function setEnterpriseSelected(enterprise : UserEnterprise){
        setEnterpriseSelectedState(enterprise)
        localStorage.setItem("enterpriseSelected", JSON.stringify(enterprise))
    }

    return (
        <SelectEnterpriseContext.Provider value={{enterpriseSelected , setEnterpriseSelected}}>
            {children}
        </SelectEnterpriseContext.Provider>
    )
} 