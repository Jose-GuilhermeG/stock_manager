//imports 
import axios , {type AxiosResponse} from "axios";

//types  imports
import { type LoginData , type LoginRespose , type TokenVerifyData , type AcessToken , type RefreshToken } from "@/types/AccountTypes";

const BASEURL = "http://127.0.0.1:8000"

export const LoginService = async (data : LoginData) : Promise<AxiosResponse<LoginRespose>> => {
    const urlPath : string = "/account/login/";
    const url : string = BASEURL + urlPath;
    return await axios.post(url , data)
}

export const IsAuthenticateService = async (accesstoken : string ) : Promise<AxiosResponse<null>> =>{
    const urlPath : string = "/account/token/verify/";
    const url : string = BASEURL + urlPath;
    const data : TokenVerifyData = {
        token : accesstoken
    }
    return await axios.post(url , data)
}

export const getAcessTokenByRefresh = async (refreshToken : string) : Promise<AxiosResponse<AcessToken>>=>{
    const urlPath : string = "/account/token/refresh/";
    const url : string = BASEURL + urlPath;
    const data : RefreshToken = {
        refresh : refreshToken
    }
    return await axios.post(url , data)
}