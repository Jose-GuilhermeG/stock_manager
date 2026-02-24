import { useEffect , useState , useContext } from "react";
import { IsAuthenticateService  , getAcessTokenByRefresh} from "@/services/accountServices";
import { AuthContext ,type AuthContextType } from "@/context/userContext";

export default function useAuth(){
    const [isAuthenticate , setIsAuthenticate] = useState<boolean>(false)
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const {accessToken , refreshToken , setAccessToken } = useContext(AuthContext) as AuthContextType

    const getNewToken = async(refresh : string)=>{
        try{
            const req = await getAcessTokenByRefresh(refresh)
            if(req.status == 200){
                setAccessToken(req.data.access)
                setIsAuthenticate(true)
                console.log("test")
            }
        }catch(e){
            setAccessToken("")
        }
    }

    const verifyToken = async (token : string , refrashToken : string)=>{
        try{
            const req = await IsAuthenticateService(token)
            if(req.status == 200 ) setIsAuthenticate(true)
        }catch(e){
            await getNewToken(refrashToken)
        }
    }

    useEffect(()=>{
        const verify = async () =>{
            console.log(accessToken , refreshToken)
            if(!accessToken.length || !refreshToken.length) setIsAuthenticate(false)
            else await verifyToken(accessToken , refreshToken)
            setIsLoading(false)
        }
        verify()
    },[accessToken , refreshToken])

    return {isAuthenticate , isLoading}
}
