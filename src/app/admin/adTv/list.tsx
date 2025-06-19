'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Title from '../../../components/Title'
import { useTravel } from '../../../hook/TravelContext'

interface Travel {
  id: number;
  name: string;
  destination: string;
  price: number;
  duration: number;
  description: string;
  images: string[];
}

interface TravelContextType {
  travels: Travel[];
  deleteTravel: (id: number) => void;
}

const List = () => {
  const router = useRouter()
  const { travels = [], deleteTravel = () => {} } = useTravel() as Partial<TravelContextType>

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this travel package?')) {
      deleteTravel(id)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/${id}/edit`)
  }

  return (
    <div className="p-6">
      <Title 
        title="Travel Packages" 
        subTitle="Manage your travel packages"
        align="left"
      />

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[var(--color-heavy)]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Destination</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Price ($)</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {travels.map((travel) => (
                <tr key={travel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{travel.name}</td>
                  <td className="px-6 py-4">{travel.destination}</td>
                  <td className="px-6 py-4">${travel.price}</td>
                  <td className="px-6 py-4">{travel.duration} days</td>
                  <td className="px-6 py-4 space-x-2">
                    <button 
                      onClick={() => handleEdit(travel.id)}
                      className="px-3 py-1 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-four)] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(travel.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default List
