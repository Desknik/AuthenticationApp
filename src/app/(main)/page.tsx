import Table from '@/components/Table'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { redirect } from 'next/navigation'

import { getCurrentuser } from '@/lib/session'
import { prismaCli as prisma } from '@/lib/prismaInstance'
import Teste from '@/components/teste'


export default async function Home() {

  const userIsLogged = await getCurrentuser()

  const user = {
    image: userIsLogged?.image || "",
    name: userIsLogged?.name || "",
    email: userIsLogged?.email,
  }

  if(!userIsLogged){
    redirect('/login')
  }

  const getDate = () => {
    const mounthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const today = new Date();
  
    const day = today.getDate();
    const mounth = mounthNames[today.getMonth()];
    const year = today.getFullYear();
  
    return `${day}, ${mounth}, ${year}`;
  }

  const users = await prisma.user.findMany({
    include:{
      accounts:{
        select:{
          provider: true,
        }
      }
    }
  })

  await prisma.$disconnect()

  const formattedUsers = users.map((user) => {
    return{
      id:(parseInt(user.id)),
      user: user.name,
      email: user.email,
      providers: user.accounts.map((account) => account.provider),
      role: user.role,
      avatar: user.image
    }
  });


  return (
    <div className="w-full flex flex-col items-center gap-10 p-10 rounded-s-2xl">
      
      <div className="w-full rounded-lg p-5 bg-gradient-to-r from-emerald-300 via-blue-400 to-purple-300 dark:from-emerald-700 dark:from-10% dark:via-blue-900 dark:to-purple-800 shadow-lg">
        <div className="flex justify-between items-end">
          <div>
            <p className='font-semibold text-sm text-white'>Olá {user.name}!</p>
            <p className='font-semibold text-sm text-white'>{getDate()}</p>
          </div>

          <Card isBlurred className='bg-white/30 border border-white/40 col-end-5'>
            <CardHeader className='flex justify-end items-end'>
              <p className='font-bold text-4xl text-white'>3212</p>
            </CardHeader>
            <CardBody>
              
              <h2 className='font-semibold text-md text-gray-100'>Registered Users</h2>

            </CardBody>
          </Card>
        </div>
      </div>


      <div className="w-full h-full">

        <Table users={formattedUsers}/>

        <Teste></Teste>
      </div>
      
    </div>
  )
}
