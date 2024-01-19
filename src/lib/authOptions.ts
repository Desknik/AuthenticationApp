import { Providers } from '@/providers';
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider  from "next-auth/providers/github";
import Google from "next-auth/providers/google"

import { prismaCli as prisma } from "@/lib/prismaInstance"
import bcrypt from "bcrypt"

interface ExtendedSession {
    linkedAccounts?: string[];
  }

export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma as any),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        Google({ 
            clientId: process.env.GOOGLE_CLIENT_ID!, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! 
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
        
    },
    callbacks: {
        async signIn({user, account, profile}) {
          // Verifica se o e-mail já está vinculado a outra conta

          if(account!.type === "oauth"){
            const existingUser = await prisma.user.findUnique({
                where: {
                  email: user.email!,
                },
              });

            if (existingUser && existingUser.id !== user.id) {
            // Vincula a conta ao usuário existente
                const newLinkedAccount = await prisma.account.create({
                    data: {
                    userId: existingUser.id,
                    type: account!.type,
                    provider: account!.provider,
                    providerAccountId: account!.providerAccountId,
                    access_token: account!.access_token,
                    expires_at: account!.expires_at || null,
                    scope: account!.scope,
                    id_token: account!.id_token || null,
                    session_state: account!.session_state || null
                    },
                });


                if(existingUser.image === null){
                    await prisma.user.update({
                        where:{
                            id: existingUser.id,
                        },
                        data:{
                            // @ts-ignore
                            image:profile!.avatar_url || profile!.picture || profile!.image
                        }
                    })
                }
                
                return true;
            }
        }
        
        return true;
          
        },
        async session({ session, user, token }) {
            
            if(session.user?.email){
                const linkedAccounts = await prisma.user.findUnique({
                    where:{
                        email: session.user?.email
                    },
                    select:{
                        accounts:{
                            select:{
                                provider:true
                            }
                        }
                    }
                })

                //@ts-ignore
                session.linkedAccounts = linkedAccounts

                return session

            }
            
            return session
          },
    }
}