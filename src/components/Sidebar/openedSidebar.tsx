import React from 'react'
import Image from 'next/image'

import SignOutButton from './SignOutButton';
import SidebarLinkButtons from './SidebarLinkButtons';

import { Avatar, Divider } from "@nextui-org/react";
import { GoHome, GoTools } from 'react-icons/go';
import { useSession } from 'next-auth/react';

export default function OpenedSidebar() {

  const {data: session, status } = useSession()

  const user = {
    image: session?.user?.image || "",
    name: session?.user?.name || "",
    email: session?.user?.email,
  }
    return (
    <>
        <div>
          <div className="flex gap-2 items-end">
            <Image src='/assets/logo_2.png' alt='Logo' width={50} height={50}/>
            <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-violet-400 to-sky-300 text-xl font-bold'>Ponnye</h2>
          </div>

          <Divider className='my-5'></Divider>

          <div className="flex flex-col gap-3">
            <SidebarLinkButtons name='Dashboard' path='/' icon={<GoHome/>}/>
            <SidebarLinkButtons name='Settings' path='/config' icon={<GoTools/>}/>

          </div>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <Avatar color='primary' name={user.name} src={user.image}
            classNames={{
              base: "bg-gradient-to-br from-pink-400 to-violet-400",
              icon: "text-white",}}
          />

          <div>
            <span className='block text-gray-500 dark:text-white text-md font-bold'>{user.name}</span>
            <span className='block text-gray-400  text-tiny font-medium'>{user.email}</span>
          </div>

          <SignOutButton/>
        </div>
    </>
  )
}
