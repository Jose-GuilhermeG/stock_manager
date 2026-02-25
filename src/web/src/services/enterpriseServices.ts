import axios , {type AxiosResponse} from "axios";

import { type UserEnterprise } from "@/types/AccountTypes";
import { type AuthorizationHeader } from "@/types/AccountTypes";

const BASEURL = "http://127.0.0.1:8000"

export const getUserEnterprises =(access : string) : Promise<AxiosResponse<UserEnterprise[]>> =>{
    const urlPath = "/account/me/enterprises/"
    const url = BASEURL + urlPath;
    const header : AuthorizationHeader = {
        headers : {
            'Authorization' : `Bearer ${access}`
        }
    }
    return axios.get(url,header)
}

export const getEnterpriseSellsAvg = (access : string , enterpriseId : number) : Promise<AxiosResponse<{avg : number}>> =>{
    const urlPath = `/enterprises/${enterpriseId}/sells/avg/`
    const url = BASEURL + urlPath;
    const header : AuthorizationHeader = {
        headers : {
            'Authorization' : `Bearer ${access}`
        }
    }
    return axios.get(url,header)   
}