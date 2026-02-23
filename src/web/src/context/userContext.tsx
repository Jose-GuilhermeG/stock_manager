import { createContext , useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type  AccessTokenPlayload } from "@/types/AccountTypes";

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
    const getUsername = (data : string) : string =>{
        if(data.length) return jwtDecode<AccessTokenPlayload>(data).username
        return 'unknow'
    }

    const [accessToken , setAccessTokenState] = useState<string>((localStorage.getItem("accessToken") || ''))
    const [refrashToken , setRefrashTokenState] = useState<string>((localStorage.getItem("refrashToken") || ''))
    const [username , setUsername] = useState<string>(getUsername(accessToken))

    const setToken = (token : string , tokenName : 'accessToken' | 'refreshToken') : void => localStorage.setItem(tokenName , token)

    const setAccessToken = (token : string) => {
        setToken(token , 'accessToken')
        setAccessTokenState(token)
    }
    const setRefrashToken = (token : string) => {
        setToken(token , 'refreshToken')
        setRefrashTokenState(token)
    }

    return (
        <AuthContext.Provider value={{accessToken , setAccessToken , refrashToken , setRefrashToken , username , setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}