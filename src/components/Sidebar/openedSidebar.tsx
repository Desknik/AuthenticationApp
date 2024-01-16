import React from 'react'

import {Avatar, Button, Divider} from "@nextui-org/react";

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import { IoExitOutline} from "react-icons/io5";
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
                <Button variant='light' className={`w-full font-medium text-gray-700 text-lg rounded-md ${pathname === path && 'bg-gradient-to-r from-violet-400 to-sky-300  !text-white'}`}>
                    {icon}
                    <span>{name}</span>
                </Button>
            </Link>
        )
    }

    return (
    <>
        <div className="">
          <div className="flex gap-2 items-end">
            <Image
              src='/assets/logo_2.png'
              alt='Logo'
              width={50}
              height={50}
            ></Image>

            <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-violet-400 to-sky-300 text-xl font-bold'>Ponnye</h2>

          </div>

          <Divider className='my-5'></Divider>

          <div className="flex flex-col gap-3">
            <SidebarPagination name='Dashboard' path='/' icon={<GoHome/>}/>
            <SidebarPagination name='Settings' path='/config' icon={<GoTools/>}/>

          </div>

        </div>

        <div className="flex items-center gap-3 mb-2">
          <Avatar color='primary' name='Junior'
            classNames={{
              base: "bg-gradient-to-br from-pink-400 to-violet-400",
              icon: "text-white",
            }}/>

            <div className="">
              <span className='block text-gray-500 dark:text-white text-md font-bold'>Meu nome</span>
              <span className='block text-gray-400  text-tiny font-medium'>email@example.com</span>
            </div>

            <button className='text-xl transition-all hover:scale-105 hover:translate-x-1'>
              <IoExitOutline />
            </button>
        </div>
    </>
  )
}
