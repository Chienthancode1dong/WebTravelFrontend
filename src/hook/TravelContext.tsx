'use client'
import React, { createContext, useState, useContext } from 'react'

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
  addTravel: (travel: Travel) => void;
  deleteTravel: (id: number) => void;
  updateTravel: (id: number, updatedTravel: Travel) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined)

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [travels, setTravels] = useState<Travel[]>([
    {
      id: 1,
      name: 'Paris Adventure',
      destination: 'Paris, France',
      price: 1200,
      duration: 7,
      description: 'Explore the city of love',
      images: ['image1.jpg']
    },
    {
      id: 2,
      name: 'Tokyo Explorer',
      destination: 'Tokyo, Japan',
      price: 1800,
      duration: 10,
      description: 'Experience Japanese culture',
      images: ['image2.jpg']
    }
  ])

  const addTravel = (newTravel: Travel) => {
    setTravels((prev: Travel[]) => [...prev, { ...newTravel, id: prev.length + 1 }])
  }

  const deleteTravel = (id: number) => {
    setTravels((prev: Travel[]) => prev.filter((travel: Travel) => travel.id !== id))
  }

  const updateTravel = (id: number, updatedTravel: Travel) => {
    setTravels((prev: Travel[]) => prev.map((travel: Travel) => 
      travel.id === id ? { ...travel, ...updatedTravel } : travel
    ))
  }

  return (
    <TravelContext.Provider value={{ travels, addTravel, deleteTravel, updateTravel }}>
      {children}
    </TravelContext.Provider>
  )
}

export const useTravel = () => {
  const context = useContext(TravelContext)
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider')
  }
  return context
}