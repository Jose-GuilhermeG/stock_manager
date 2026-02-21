export interface LoginData{
    email : string,
    password : string
}

export interface FormErr{
    hasErr : boolean,
    field : string,
    message? : string
}