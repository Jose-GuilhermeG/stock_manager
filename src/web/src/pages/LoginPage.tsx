//imports
import React from 'react'
import {Navigate} from 'react-router-dom'
import { useState } from 'react'

//components
import { FieldSet , Field , FieldGroup , FieldDescription , FieldLabel , FieldLegend , FieldError , FieldContent , FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

//icons
import { Mail , Eye , EyeOff , User } from "lucide-react"

//types
import { type LoginData , type FormErr } from '@/types/AccountTypes'

export default function LoginPage(){
    const [loginData , setLoginData] = useState<LoginData>()
    const [loading , setLoading] = useState<boolean>(false)
    const [showPass , setShowPass] = useState<boolean>(false)
    const [formErr , setFormErr] = useState<FormErr>({
        hasErr : false,
        field : ""
    })

    const GetFormAttrs = (form : HTMLFormElement) : LoginData =>{
       const formFormat = new FormData(form) 
       const email = formFormat.get("email") as string
       const password = formFormat.get("password") as string
       const message = "esse campo não pode estar vazio"
        
       if(!email.trim().length) setFormErr({hasErr : true , field : "password",message : message})

       if(!password.trim().length) setFormErr({hasErr : true , field : "password",message : message})

       return {
            email : email,
            password : password
       }
    }

    const RealizeLogin = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setFormErr({hasErr : false , field : ""})
        const form = e.target as HTMLFormElement
        setLoginData(GetFormAttrs(form))
        setLoading(true)
    }

    return (
        <div className="w-screen h-screen">
            <main className="w-full h-full bg-neutral-300 flex flex-col justify-start items-center">
                <header className="py-20">
                    <h1 className="text-center text-5xl font-black font-serif text-black tracking-[2px]">
                        Stock manager
                    </h1>
                </header>
                <section className="mt-10">
                    <form 
                        className="w-lg min-h-[60vh] bg-white p-4 rounded-2xl shadow-sm border-neutral-200"
                        onSubmit={(e)=>RealizeLogin(e)}>
                        <FieldSet>
                            <FieldLegend className="w-full flex flex-col justify-center items-center">
                                <h1 className="text-2xl font-bold my-2">
                                    Entrar
                                </h1>
                                <div className="rounded-full bg-black border-black border my-2 p-2">
                                    <User className="w-10 h-10 text-white"/>
                                </div>
                            </FieldLegend>
                            <FieldGroup>
                                <FieldContent>
                                    <Field>
                                        <FieldLabel>
                                            Email
                                        </FieldLabel>
                                        <div className="relative">
                                            <Mail className="absolute right-2 bottom-[20%] text-neutral-300"/>
                                            <Input type="email" placeholder="Email@example.com" required id='email' name='email'/>
                                        </div>
                                        <FieldDescription>
                                            Coloque o Email da sua conta
                                        </FieldDescription>
                                        {formErr.field == "email" &&
                                            <FieldError>
                                                {formErr.message}
                                            </FieldError>
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel>
                                            Senha
                                        </FieldLabel>
                                        <div className="relative">
                                            {
                                                showPass ? 
                                                <EyeOff 
                                                    className="absolute right-2 bottom-[20%] text-neutral-300 cursor-pointer z-10" 
                                                    onClick={()=>setShowPass(false)} /> :
                                                <Eye 
                                                    className="absolute right-2 bottom-[20%] text-neutral-300 cursor-pointer z-10"
                                                    onClick={()=>setShowPass(true)}/> 
                                            }
                                            <Input 
                                            type={showPass ? "text" : "password"}
                                            id='password'
                                            name='password'
                                            placeholder="Sua senha" required/>
                                        </div>
                                        <FieldDescription>
                                            Coloque sua senha
                                        </FieldDescription>
                                        {formErr.field == "password" &&
                                            <FieldError>
                                                {formErr.message}
                                            </FieldError>
                                        }
                                    </Field>
                                    <div className='flex flex-col justify-around min-h-[20vh]'>
                                        <Field>
                                            <Button size="lg" className='relative'>
                                                Entrar
                                            </Button>
                                        </Field>

                                        {loading &&(
                                            <div className="flex items-center justify-center h-10">
                                            <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
                                            </div>
                                        )}
                                        <FieldSeparator>
                                            Não tem Uma conta?
                                        </FieldSeparator>
                                        <Field>
                                            <Button variant="outline" size="lg" onClick={()=>Navigate({to : "/account/register/"})}>
                                                Criar Conta
                                            </Button>
                                        </Field>
                                    </div>
                                </FieldContent>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </section>
            </main>
        </div>
    )
}