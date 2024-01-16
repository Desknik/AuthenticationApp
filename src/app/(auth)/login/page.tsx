"use client"

import React, { useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

import { BsFillEyeSlashFill , BsEyeFill } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {

    /* Values */
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    /* Email */

    const validateEmail = (value : string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const emailIsInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    /* Login */

    function login(){

        console.log({ emailValue, passwordValue });
    }



    const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex justify-center items-center h-screen">
        
        <div className="relative">
            <Card className='overflow-visible z-20'>
                <CardHeader className='relative overflow-visible'>
                    <h2 className='font-semibold text-lg'>Login</h2>
                    
                    <div className="absolute -right-6 -top-10">
                        <Image className='rotate-6' alt="logo" src="/assets/logo.png" width={80} height={80} priority></Image>
                    </div>

                </CardHeader>


                <CardBody>
                    <div className="flex justify-between gap-3">
                        <Card className='flex py-5 px-20 bg-gray-200'></Card>
                        <Card className='flex py-5 px-20 bg-gray-200'></Card>
                    </div>

                    <span className='text-gray-400 my-2 mx-auto'>or</span>

                    <div className="flex flex-col justify-center gap-3">
                        <Input type='Email' label='Email' 
                            isInvalid={emailIsInvalid} errorMessage={emailIsInvalid && "Please enter a valid email"}
                            value={emailValue} onValueChange={setEmailValue} isClearable>
                        </Input>

                        <Input type={isVisible? "text" : "password"} label='Password'
                            value={passwordValue} onValueChange={setPasswordValue}
                            endContent={
                                <button
                                    onClick={() => {setIsVisible(!isVisible)}}
                                >{isVisible ? <BsFillEyeSlashFill/> : <BsEyeFill/>}</button>
                            }>
                        </Input>
                    </div>

                    <div className="flex justify-end mt-3 mb-6">
                        <Link href={{}} className='text-primary text-sm underline'>Forgot Password?</Link>
                    </div>

                    <Button color='primary' variant='shadow' disabled={emailIsInvalid || emailValue ==='' || passwordValue === ""}
                        onClick={() =>{login()}}
                    >Login</Button>

                    <div className="mt-6 mb-1">
                        <span className='block text-center text-gray-400'>Don't have an account?</span>           
                        <Link className='block text-center text-sm text-primary' href={"/singup"}>
                            Create now for free!
                        </Link>
                    </div>
                </CardBody>
            </Card>

            <div className="absolute w-56 h-56 rounded-full dark:bg-sky-900 dark:opacity-90 bg-sky-100 -top-10 -right-16 blur-3xl z-0"/>
            <div className="absolute w-80 h-80 rounded-full dark:bg-violet-900 dark:opacity-80 bg-violet-100 -bottom-20 -right-20 blur-3xl z-0"/>
            <div className="absolute w-96 h-96 rounded-full dark:bg-sky-800 dark:opacity-50 bg-sky-100 bottom-32 -left-32 blur-3xl z-0"/>
            <span className='absolute top-10 -left-10 pb-2 -z-0 -rotate-90 bg-primary bg-opacity-20 rounded-md text-primary text-end text-sm px-2'>Desknik</span>
        </div>
    </div>
  )
}
