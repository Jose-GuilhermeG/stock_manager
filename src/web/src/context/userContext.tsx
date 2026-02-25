import { createContext , useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type  AccessTokenPlayload } from "@/types/AccountTypes";

export interface AuthContextType{
    accessToken : string;
    refreshToken : string;
    setAccessToken : (access : string) => void
    setRefreshToken : (refrash : string) => void
    username : string;
    setUsername : (username : string)=>void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children} : {children : React.ReactNode}){
    
    const [accessToken , setAccessTokenState] = useState<string>((localStorage.getItem("accessToken") || ''))
    const [refreshToken , setRefreshTokenState] = useState<string>((localStorage.getItem("refreshToken") || ''))
    const [username , setUsernameState] = useState<string>((localStorage.getItem("username") || 'unknow'))
    
    const setToken = (token : string , tokenName : 'accessToken' | 'refreshToken') : void => localStorage.setItem(tokenName , token)
    
    const setAccessToken = (token : string) => {
        setToken(token , 'accessToken')
        setAccessTokenState(token)
    }

    const setRefreshToken = (token : string) => {
        setToken(token , 'refreshToken')
        setRefreshTokenState(token)
    }

    const setUsername = (data : string) =>{
        let name = 'unknow'
        try{
            name = jwtDecode<AccessTokenPlayload>(data).username
            setUsername(name)
        }catch(e){
            console.log(e)
        }finally{
            localStorage.setItem('username',name)
        }
    }

    return (
        <AuthContext.Provider value={{accessToken , setAccessToken , refreshToken , setRefreshToken , username , setUsername}}>
            {children}
        </AuthContext.Provider>
    )
} 