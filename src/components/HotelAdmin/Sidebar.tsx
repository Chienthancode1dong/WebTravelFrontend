import React from 'react'
import { assets } from '../../../public/assets/assets'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Sidebar = () => {
    const pathname = usePathname();
    const sibarLinks = [
        { name: 'Dashboard', icon: assets.dashboardIcon, path: '/owner' },
        { name: 'Thêm Phòng', icon: assets.addIcon, path: '/owner/add-room' },
        { name: 'Danh Sách Phòng', icon: assets.listIcon, path: '/owner/list-room' },
    ]
    return (
        <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transiion-all duration-300'>
            {sibarLinks.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                    <Link href={item.path} key={index} className={`flex items-center py-3 px-4 md:px-8 gap-3 transition-all duration-300 ${isActive
                        ? " bg-[var(--color-1)]/60  text-white"
                        : " text-[var(--color-3)] hover:bg-[var(--color-2)]/60"}`}>
                        <Image src={item.icon} alt={item.name} className='min-h-6 min-w-6 invert' width={24} height={24} />
                        <p className='md:block hidden text-center'>{item.name}</p>
                    </Link>
                );
            })}
        </div>
    )
}

export default Sidebar
