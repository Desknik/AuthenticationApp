import React from 'react'

import {Avatar, AvatarGroup, AvatarIcon, Button, Divider, Tooltip} from "@nextui-org/react";

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import { IoExitOutline } from "react-icons/io5";
import { GoHome, GoTools } from 'react-icons/go';



export default function OpenedSidebar() {

    interface SidebarPaginationProps{
        name: string,
        path: string,
        icon: React.ReactNode
    }

    function SidebarPagination({ name, path, icon }: SidebarPaginationProps){
        const pathname = usePathname()
        
        return(
            <Link href={path}>
                <Tooltip placement='right' color='secondary' radius='md' className="rounded-md" content={name} delay={500}>
                    <Button isIconOnly variant='light' className={`w-full font-medium text-gray-700 text-2xl rounded-md ${pathname === path && 'bg-gradient-to-r from-violet-400 to-sky-300  !text-white'}`}>
                        {icon}
                    </Button>
                </Tooltip>
            </Link>
        )
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
            <SidebarPagination name='Dashboard' path='/' icon={<GoHome/>}/>
            <SidebarPagination name='Settings' path='/config' icon={<GoTools/>}/>

          </div>

        </div>

        <div className="flex flex-col items-center gap-4 mb-2">
          <Avatar color='primary' name='Junior'
            classNames={{
              base: "bg-gradient-to-br from-pink-400 to-violet-400",
              icon: "text-white",
            }}/>


            <button className='text-xl transition-all hover:scale-105 hover:translate-x-1'>
              <IoExitOutline />
            </button>
        </div>
    </>
  )
}
