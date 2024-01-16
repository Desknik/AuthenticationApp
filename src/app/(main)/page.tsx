import Table from '@/components/Table'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { redirect } from 'next/navigation'


export default function Home() {

  const userIsLogged = false

  if(!userIsLogged){
    redirect('/login')
  }

  return (
    <div className="w-full flex flex-col items-center gap-10 p-10 rounded-s-2xl">
      
      <div className="w-full rounded-lg p-5 bg-gradient-to-r from-emerald-300 via-blue-400 to-purple-300 dark:from-emerald-700 dark:from-10% dark:via-blue-900 dark:to-purple-800 shadow-lg">
        <div className="flex justify-between items-end">
          <div>
            <p className='font-semibold text-sm text-white'>Olá Desknik!</p>
            <p className='font-semibold text-sm text-white'>12, Saturday, 2024</p>
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
        <Table/>
      </div>
      
    </div>
  )
}
