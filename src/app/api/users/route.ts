import React from 'react'

import { NextRequest, NextResponse } from 'next/server'
import { prismaCli as prisma} from '@/lib/prismaInstance'
import bcrypt from 'bcrypt'

export async function GET(){
    const users = await prisma.user.findMany()
    await prisma.$disconnect()

    return NextResponse.json({users}, {status: 200})
}

export async function POST(req: NextRequest) {
  
    const data = await req.json()
    const { name, email, password, confirmPassword, role} = data 

    if (password !== confirmPassword){
        return NextResponse.json({message: "Passwords don't match"}, {status: 400})
    }

    if(!name || !email || !password || !confirmPassword){
        return NextResponse.json({message: "Fields not filled"}, {status: 400})
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        },
    })

    if(existingUser){
        await prisma.$disconnect()
        return NextResponse.json({message: "User already exists"}, {status: 400})
    };

    const capitalizedName = (name: string) =>{
        let words = name.split(' ')

        for (let i = 0; i < words.length; i++){
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
        }

        return words.join(' ')
    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await prisma.user.create({
        data:{
            name: capitalizedName(name),
            email,
            hashedPassword,
            role: (role? role : "Client")  
        }
    })

    
    if(user){
        await prisma.$disconnect()
        return NextResponse.json({message: "User Created Successfully!"}, {status: 200})
    };
    
    await prisma.$disconnect()
    
    return NextResponse.json({message: "An error has occurred"}, {status: 400})
    

    
}
