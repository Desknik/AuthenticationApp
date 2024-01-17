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
        <div className="">
            <Image
              src='/assets/logo_2.png'
              alt='Logo'
              width={50}
              height={50}
            ></Image>

          <Divider className='my-5'></Divider>

          <div className="flex flex-col gap-3">
            <SidebarLinkButtons isClosed name='Dashboard' path='/' icon={<GoHome/>}/>
            <SidebarLinkButtons isClosed name='Settings' path='/config' icon={<GoTools/>}/>
          </div>

        </div>

        <div className="flex flex-col items-center gap-4 mb-2">
          <Avatar color='primary' name={user.name} src={user.image}
            classNames={{
              base: "bg-gradient-to-br from-pink-400 to-violet-400",
              icon: "text-white",
            }}/>

          <SignOutButton/>
        </div>
    </>
  )
}
