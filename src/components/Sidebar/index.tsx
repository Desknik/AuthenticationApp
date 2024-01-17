"use client"
import React, { useState } from 'react'

import { Button} from '@nextui-org/react'
import { FiChevronsRight } from "react-icons/fi";
import { FiChevronsLeft } from "react-icons/fi";
import OpenedSidebar from './openedSidebar';
import ClosedSideBar from './closedSidebar';

export default function Sidebar() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)


  return (
    <aside className={`transition all ${sidebarIsOpen? 'min-w-60' : 'min-w-16'}`}>
        <div className={`fixed top-0 left-0 h-screen flex flex-col justify-between p-3 bg-gradient-to-t to-gray-100 to-80%  via-white via-10%  from-sky-100 dark:to-zinc-900 dark:via-zinc-900 dark:from-black rounded-e-xl transition-all ${sidebarIsOpen? 'min-w-60' : 'min-w-16'}`}>

          <Button isIconOnly size='sm' variant='ghost' className='absolute h-6 -right-5 top-14 shadow-lg rounded-full text-md'
            onClick={()=>{setSidebarIsOpen(!sidebarIsOpen)}}
            >
            {sidebarIsOpen? <FiChevronsLeft/> : <FiChevronsRight/>}  
          </Button>

          {sidebarIsOpen? <OpenedSidebar/> : <ClosedSideBar/>}
        </div>

    </aside>
  )
}
