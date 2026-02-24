export interface HasErr{
    hasErr : boolean
}

export interface ErrorMessage{
    message? : string
}

export interface FieldErr{
    fields : string[]
}

export interface ComponentErr extends HasErr , ErrorMessage , FieldErr {}

export interface CodeErr {
    code : number
}

export interface ApiErr extends CodeErr , ErrorMessage , HasErr{
    fields? : string[]
}