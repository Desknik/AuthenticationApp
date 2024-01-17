"use client"
import React, { useState,useMemo, useEffect } from 'react'
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

import { BsFillEyeSlashFill , BsEyeFill } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function Form() {

    /* Values */

    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

    /* Email */
    const validateEmail = (value : string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const emailIsInvalid = useMemo(() => {
        if (emailValue === "") return false

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    /* Passwords */

    const [isVisible, setIsVisible] = useState(false)

    const passwordIsInvalid = useMemo(() => {
        return (passwordValue !== confirmPasswordValue)

    }, [passwordValue, confirmPasswordValue]);

    /* Form */
    const formIsInvalid = useMemo(() => {

        return (emailValue === "" || emailIsInvalid || passwordValue === "" || passwordIsInvalid) ? true : false;
        
    }, [emailValue, emailIsInvalid, passwordValue, passwordIsInvalid]);

    /* Sign up */

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const router = useRouter()

    async function sendValues(){
        const data = {name: nameValue, email: emailValue, password: passwordValue, confirmPassword: confirmPasswordValue}

        setIsLoading(true)

        const req = await fetch('/api/users', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const res = await req.json()
        
        if(!req.ok){
            setErrorMessage(res.message)

            setTimeout(() => {
                setErrorMessage("")
            },3000)
        }
        else{
            const res = await signIn<"credentials">("credentials", {
                ...data,
                redirect: false
            })

            if(res?.error){
                setErrorMessage("Ocorreu um erro!")

                setTimeout(() => {
                    setErrorMessage("")
                },3000)
            }
            else{
                router.push("/")
            }
        }

        setIsLoading(false)
    }

  return (
    <div className="relative">
        <Card className='z-20 overflow-visible'>
            <CardHeader className='relative overflow-visible '>
                <h2 className='font-semibold text-lg'>Sign Up</h2>
                
                <div className="absolute -right-6 -top-10">
                    <Image className='rotate-6' alt="logo" src="/assets/logo.png" width={80} height={80} priority></Image>
                </div>

            </CardHeader>

            <CardBody>
                <div className="flex justify-between gap-3">
                    <Button className='py-6 px-12' onClick={() => {signIn("github", {callbackUrl: "/"})}}>
                        <FaGithub/> Github
                    </Button>
                    <Button className='py-6 px-12'><FaGoogle/>Google</Button>
                </div>

                <span className='text-gray-400 my-2 mx-auto'>or</span>

                <div className="flex flex-col justify-center gap-3">
                    <Input type='Name' label='Name' 
                        value={nameValue} onValueChange={setNameValue} isClearable autoCapitalize='sentences'
                        autoComplete='Name'
                        />

                    <Input type='Email' label='Email' 
                        isInvalid={emailIsInvalid} errorMessage={emailIsInvalid && "Please enter a valid email"}
                        value={emailValue} onValueChange={setEmailValue} isClearable
                        autoComplete='Email'
                    />

                    <Input type={isVisible? "text" : "password"} label='Password'
                        endContent={
                            <button
                                onClick={() => {setIsVisible(!isVisible)}}
                            >{isVisible ? <BsFillEyeSlashFill/> : <BsEyeFill/>}</button>
                        }
                        value={passwordValue} onValueChange={setPasswordValue}
                        autoComplete='Password'
                    />

                    <Input type={isVisible? "text" : "password"} label='Confirm Password'
                        endContent={
                            <button
                                onClick={() => {setIsVisible(!isVisible)}}
                            >{isVisible ? <BsFillEyeSlashFill/> : <BsEyeFill/>}</button>
                        }
                        isInvalid={passwordIsInvalid} errorMessage={passwordIsInvalid && "Passwords don't match"}
                        value={confirmPasswordValue} onValueChange={setConfirmPasswordValue}
                        autoComplete='ConfirmPassword'
                    />
                </div>

                <div className="flex justify-end mt-3 mb-6">
                    <Link href={{}} className='text-primary text-sm underline'>Forgot Password?</Link>
                </div>

                <Button color='primary' variant='shadow' disabled={formIsInvalid} isLoading={isLoading} onClick={() => sendValues()}>Sign up</Button>

                {errorMessage && <p className='text-danger text-center mt-2 capitalize'>{errorMessage}</p>}

                <div className="mt-6 mb-1">
                    <span className='block text-center text-gray-400'>Already have an account?</span>           
                    <Link className='block text-center text-sm text-primary' href={"/login"}>
                        Log in
                    </Link>
                </div>
            </CardBody>

        </Card>

        <div className="absolute w-80 h-80 rounded-full dark:bg-sky-900 dark:opacity-80 bg-sky-100 -bottom-20 -right-28 blur-3xl z-0"/>
        <div className="absolute w-96 h-96 rounded-full dark:bg-violet-800 dark:opacity-60 bg-violet-100 top-0 -left-20 blur-3xl z-0"/>
        <span className='absolute top-10 -left-10 pb-2 z-0 -rotate-90 bg-primary bg-opacity-20 rounded-md text-primary text-end text-sm px-2'>Desknik</span>
    </div>
  )
}
