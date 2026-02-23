import axios , {type AxiosResponse} from "axios";

import { type UserEnterprise } from "@/types/AccountTypes";

const BASEURL = "http://127.0.0.1:8000"

export const getUserEnterprises =(access : string) : Promise<AxiosResponse<UserEnterprise[]>> =>{
    const urlPath = "/account/me/enterprises/"
    const url = BASEURL + urlPath;
    return axios.get(
        url,
        {
            headers : {
                'Authorization' : `Bearer ${access}`
            }
        }
    )
}