import { type JSX } from "react"

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

export interface ComponentesProps{
    className? : string;
    onClick? : (e : React.MouseEvent<HTMLDivElement>)=>void;
    props? : JSX.ElementAttributesProperty
}

export interface HasChildrenProps extends ComponentesProps{
    children : JSX.Element | JSX.Element[] | string;
}