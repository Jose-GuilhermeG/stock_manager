//imports 
import axios , {type AxiosResponse} from "axios";

//types  imports
import { type LoginData , type LoginRespose } from "@/types/AccountTypes";

const BASEURL = "http://127.0.0.1:8000"

export const LoginService = async (data : LoginData) : Promise<AxiosResponse<LoginRespose>> => {
    const urlPath : string = "/account/login/";
    const url : string = BASEURL + urlPath;
    return await axios.post(url , data)
}