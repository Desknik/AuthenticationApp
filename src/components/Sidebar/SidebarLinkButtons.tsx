import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button, Tooltip } from '@nextui-org/react'

interface SidebarPaginationProps{
    name: string,
    path: string,
    icon: React.ReactNode,
    isClosed?: boolean,
}

export default function SidebarLinkButtons({ name, path, isClosed, icon }: SidebarPaginationProps){
    const pathname = usePathname()

    if(isClosed){
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

    return(
        <Link href={path}>
            <Button variant='light' className={`w-full font-medium text-gray-700 text-lg rounded-md ${pathname === path && 'bg-gradient-to-r from-violet-400 to-sky-300  !text-white'}`}>
                {icon}
                <span>{name}</span>
            </Button>
        </Link>
    )
    
    
}

