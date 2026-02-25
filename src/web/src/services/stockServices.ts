import axios, { type AxiosResponse } from "axios";
import { type AuthorizationHeader } from "@/types/AccountTypes";
import type { StockItem } from "@/types/stockTypes";

const BASEURL = "http://127.0.0.1:8000"


export async function getProductsService(enterpriseId : number , accessToken : string) : Promise<AxiosResponse<StockItem[]>>{
    const path = `/enterprises/${enterpriseId}/stock/`
    const url = BASEURL + path
    const header : AuthorizationHeader = {
        headers : {
            'Authorization' : `Bearer ${accessToken}`
        }
    }

    return await axios.get(url , header)
}