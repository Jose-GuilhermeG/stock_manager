import axios, { type AxiosResponse } from "axios";

const BASEURL = "http://127.0.0.1:8000"


interface Product{
    id : number
    name : string,
    price : number,
    quantity : number,
    productDetailUrl : string,
    productPhoto? : string
}

export async function getProductsService() : Promise<AxiosResponse<Product[]>>{
    const path = "/products/"
    const url = BASEURL + path
    return await axios.get(url)
}