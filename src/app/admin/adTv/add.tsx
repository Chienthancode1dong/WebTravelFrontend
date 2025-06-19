'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Title from '../../../components/Title'
import Image from 'next/image'
import { assets } from '../../../../public/assets_2/assets'
import { useTravel } from '../../../hook/TravelContext'

interface Travel {
  id?: number;
  name: string;
  destination: string;
  price: number;
  duration: number;
  description: string;
  images: string[];
}

interface TravelContextType {
  addTravel: (travel: Travel) => void;
}

const Add = () => {
  const router = useRouter()
  const { addTravel = () => {} } = useTravel() as Partial<TravelContextType>
  const [formData, setFormData] = useState<Travel>({
    name: '',
    destination: '',
    price: 0,
    duration: 0,
    description: '',
    images: []
  })
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration' ? Number(value) : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    const files = Array.from(e.target.files as File[])
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(f => f.name)]
    }))
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTravel(formData)
    router.push('/admin/list')
  }

  return (
    <div className="p-6">
      <Title 
        title="Add New Travel Package" 
        subTitle="Create a new travel destination package"
        align="left"
      />

      <form onSubmit={handleSubmit} className="mt-8 max-w-4xl">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter package name"
                  title="Package Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter destination"
                  title="Destination"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                  placeholder="Enter price"
                  title="Price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                  placeholder="Enter duration"
                  title="Duration"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Images</h3>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const files = Array.from(e.dataTransfer.files)
                if (files.some(file => !file.type.startsWith('image/'))) {
                  alert('Please upload only image files')
                  return
                }
                handleImageUpload({ target: { files } })
              }}
            >
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Image src={assets.upload_area} alt="Upload" className="mx-auto h-12 mb-4" width={48} height={48} />
                <p className="text-sm text-gray-600">Click to upload or drag images here</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
              </label>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <Image 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                      width={200}
                      height={96}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter description"
              title="Description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Create Package
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Add
