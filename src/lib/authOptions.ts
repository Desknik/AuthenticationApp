import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider  from "next-auth/providers/github";

import { prismaCli as prisma } from "@/lib/prismaInstance"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma as any),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                name:{label:"Name", type:"text", placeholder: "Name"},
                email:{label:"Email", type:"text", placeholder: "example@example.com"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials, req): Promise<any>{

                if(!credentials?.email || !credentials.password) throw new Error("Incomplete data");
                
                const email = credentials?.email
                const password = credentials?.password

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if(!user){
                    throw new Error("User not found")
                }

                if(!user.hashedPassword){
                    throw new Error("User not registered by credentials")
                }

                const matchPassword = await bcrypt.compare(password, user.hashedPassword)

                if(!matchPassword) throw new Error("Incorrect password")

                return user
            }
        })
    ],
    session:{
        strategy: 'jwt',
        
    },
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV ==="development",
    pages:{
        signIn: '/login',
        
    }
}