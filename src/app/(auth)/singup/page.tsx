"use client"

import React, { useState,useMemo } from 'react'
import {Card, CardHeader, CardBody, CardFooter, button} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";

import { BsFillEyeSlashFill , BsEyeFill } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {

    /* Values */

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

    function sendValues(){
        console.log({emailValue, passwordValue, confirmPasswordValue});
        
    }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        
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
                        <Card className='flex py-5 px-20 bg-gray-200'></Card>
                        <Card className='flex py-5 px-20 bg-gray-200'></Card>
                    </div>

                    <span className='text-gray-400 my-2 mx-auto'>or</span>

                    <div className="flex flex-col justify-center gap-3">
                        <Input type='Email' label='Email' 
                        isInvalid={emailIsInvalid} errorMessage={emailIsInvalid && "Please enter a valid email"}
                        value={emailValue} onValueChange={setEmailValue} isClearable></Input>

                        <Input type={isVisible? "text" : "password"} label='Password'
                            endContent={
                                <button
                                    onClick={() => {setIsVisible(!isVisible)}}
                                >{isVisible ? <BsFillEyeSlashFill/> : <BsEyeFill/>}</button>
                            }
                            value={passwordValue} onValueChange={setPasswordValue}
                        ></Input>

                        <Input type={isVisible? "text" : "password"} label='Confirm Password'

                            endContent={
                                <button
                                    onClick={() => {setIsVisible(!isVisible)}}
                                >{isVisible ? <BsFillEyeSlashFill/> : <BsEyeFill/>}</button>
                            }
                            isInvalid={passwordIsInvalid} errorMessage={passwordIsInvalid && "Passwords don't match"}
                            value={confirmPasswordValue} onValueChange={setConfirmPasswordValue}
                        ></Input>
                    </div>

                    <div className="flex justify-end mt-3 mb-6">
                        <Link href={{}} className='text-primary text-sm underline'>Forgot Password?</Link>
                    </div>

                    <Button color='primary' variant='shadow' disabled={formIsInvalid} onClick={() => sendValues()}>Sign up</Button>

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

    </div>
  )
}
