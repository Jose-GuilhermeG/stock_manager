export interface Product{
    id : number
    name : string,
    price : number,
    quantity : number,
    productDetailUrl : string,
    productPhoto? : string
}

export interface StockItem{
    id : number;
    product : Product;
    updatedAt : string;
    isActive : boolean;
}