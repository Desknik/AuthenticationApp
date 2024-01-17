"use client"

import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";


export const Providers = ({children} : {children: React.ReactNode}) => {
    return(
        <>
            <SessionProvider>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </SessionProvider>
        </>
    )

}