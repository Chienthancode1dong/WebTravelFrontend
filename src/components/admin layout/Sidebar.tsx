import React from 'react'
import { assets } from '../../../public/assets_2/assets'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Add from '@/app/admin/adTv/add'
import List from '@/app/admin/adTv/list'
import Dashboard from '@/app/admin/adTv/dashboard'

const Sidebar = () => {
  const pathname = usePathname();
  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: assets.order_icon },
    { name: 'Add Travel', path: '/admin/add', icon: assets.add_icon },
    { name: 'List Travel', path: '/admin/list', icon: assets.list_icon },
  ];

  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-500 pt-4 flex flex-col trasition-all duration-300 bg-white font-[Rubik]'>
      {sidebarLinks.map((item, index) => (
        <div
         
          key={index}
          className={`flex items-center py-3 px-4 md:px-8 gap-3 transition-all duration-300 font-[Rubik] text-black hover:bg-[var(--color-four)] ${pathname === item.path ? 'font-bold underline' : ''}`}
        >
          <Image src={item.icon} alt={item.name} className='min-h-6 min-w-6' width={24} height={24} />
          <p className='md:block hidden text-center font-[Rubik]'>{item.name}</p>
        </div>
      ))}
      <div className='flex-1' />
      {/* Render component theo route hiện tại */}
      <div className='p-4'>
        {pathname === '/admin/dashboard' && <Dashboard />}
        {pathname === '/admin/add' && <Add />}
        {pathname === '/admin/list' && <List />}
      </div>
    </div>
  )
}

export default Sidebar
