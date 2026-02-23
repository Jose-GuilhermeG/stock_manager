import { createContext , useState } from "react";

export interface AuthContextType{
    accessToken : string;
    refrashToken : string;
    setAccessToken : (access : string) => void
    setRefrashToken : (refrash : string) => void
    username : string;
    setUsername : (username : string)=>void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children} : {children : React.ReactNode}){
    const [accessToken , setAccessToken] = useState<string>('')
    const [refrashToken , setRefrashToken] = useState<string>('')
    const [username , setUsername] = useState<string>('')

    return (
        <AuthContext.Provider value={{accessToken , setAccessToken , refrashToken , setRefrashToken , username , setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}