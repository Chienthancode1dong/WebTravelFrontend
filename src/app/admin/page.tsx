'use client'
import React, { useState } from 'react'
import { TravelProvider } from '../../hook/TravelContext'
import Navbar from '@/components/admin layout/Navbar'

import Dashboard from './adTv/dashboard'
import Add from './adTv/add'
import List from './adTv/list'
import Edit from './adTv/[id_travel]/edit/edit'
import AdminHotelDashboard from './adHt/Dashboard'
import AdminHotelList from './adHt/ListRoom'
import AdminHotelAdd from './adHt/AddRoom'
import AdminTravelDashboard from './adTv/dashboard'
import AdminTravelList from './adTv/list'
import AdminTravelAdd from './adTv/add'

const AdminPage = () => {
  const [tab, setTab] = useState<'dashboard' | 'add' | 'list' | 'edit' | 'adminhotel' | 'admintravel'>('dashboard');
  const [adminHotelTab, setAdminHotelTab] = useState<'dashboard' | 'add' | 'list'>('dashboard');
  const [adminTravelTab, setAdminTravelTab] = useState<'dashboard' | 'add' | 'list'>('dashboard');

  return (
    <TravelProvider>
      <div className='flex flex-col h-screen'>
        <Navbar/>
       
        <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
          <nav className='flex gap-4 mb-8'>
            {/* <div className="flex gap-4">
              <button onClick={() => setTab('dashboard')} className={tab === 'dashboard' ? 'font-bold underline' : ''}>Dashboard</button>
              <button onClick={() => setTab('add')} className={tab === 'add' ? 'font-bold underline' : ''}>Add</button>
              <button onClick={() => setTab('list')} className={tab === 'list' ? 'font-bold underline' : ''}>List</button>
              <button onClick={() => setTab('edit')} className={tab === 'edit' ? 'font-bold underline' : ''}>Edit</button>
            </div> */}
            <div className="flex gap-4 ml-auto">
              <button onClick={() => setTab('adminhotel')} className={tab === 'adminhotel' ? 'font-bold underline' : ''}>Admin Hotel</button>
              <button onClick={() => setTab('admintravel')} className={tab === 'admintravel' ? 'font-bold underline' : ''}>Admin Travel</button>
            </div>
          </nav>
          {tab === 'dashboard' && <Dashboard />}
          {tab === 'add' && <Add />}
          {tab === 'list' && <List />}
          {tab === 'edit' && <Edit />}
          {tab === 'adminhotel' && (
            <div>
              <nav className="flex gap-4 mb-6">
                <button onClick={() => setAdminHotelTab('dashboard')} className={adminHotelTab === 'dashboard' ? 'font-bold underline' : ''}>Hotel Dashboard</button>
                <button onClick={() => setAdminHotelTab('add')} className={adminHotelTab === 'add' ? 'font-bold underline' : ''}>Hotel Add</button>
                <button onClick={() => setAdminHotelTab('list')} className={adminHotelTab === 'list' ? 'font-bold underline' : ''}>Hotel List</button>
              </nav>
              {adminHotelTab === 'dashboard' && <AdminHotelDashboard />}
              {adminHotelTab === 'add' && <AdminHotelAdd onSuccess={() => setAdminHotelTab('list')} />}
              {adminHotelTab === 'list' && <AdminHotelList />}
            </div>
          )}
          {tab === 'admintravel' && (
            <div>
              <nav className="flex gap-4 mb-6">
                <button onClick={() => setAdminTravelTab('dashboard')} className={adminTravelTab === 'dashboard' ? 'font-bold underline' : ''}>Travel Dashboard</button>
                <button onClick={() => setAdminTravelTab('add')} className={adminTravelTab === 'add' ? 'font-bold underline' : ''}>Travel Add</button>
                <button onClick={() => setAdminTravelTab('list')} className={adminTravelTab === 'list' ? 'font-bold underline' : ''}>Travel List</button>
              </nav>
              {adminTravelTab === 'dashboard' && <AdminTravelDashboard />}
              {adminTravelTab === 'add' && <AdminTravelAdd />}
              {adminTravelTab === 'list' && <AdminTravelList />}
            </div>
          )}
        </div>
      </div>
    </TravelProvider>
  )
}

export default AdminPage
