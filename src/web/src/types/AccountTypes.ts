export interface LoginData{
    email : string,
    password : string
}

export interface LoginRespose{
    access : string;
    refrash : string
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