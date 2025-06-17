import React from 'react'
import Navbar from '../../../components/HotelAdmin/Navbar'
import Sidebar from '../../../components/HotelAdmin/Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex h-full'>
                <Sidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
