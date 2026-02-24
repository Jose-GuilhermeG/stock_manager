export interface AcessToken{
    access : string;
}

export interface RefreshToken{
    refresh : string
}

export interface LoginRespose extends AcessToken , RefreshToken{}

export interface UserEnterprise{
  id : number;
  name : string;
}

export interface LoginData{
    email : string,
    password : string
}

export interface AccessTokenPlayload{
    exp: number ;
    iat: number;
    jti: string ;
    token_type: "access";
    user_id: string;
    username: string;
}

export interface FormErr{
    hasErr : boolean,
    field : string,
    message? : string
}

export interface TokenVerifyData{
    token : string;
}


export interface HttpHeader{
    headers : Record<string , string>
}

export interface AuthorizationHeader extends HttpHeader{
    headers : {
        Authorization : string
    }
} 

