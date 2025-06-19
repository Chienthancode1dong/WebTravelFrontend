'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Title from '../../../../../components/Title'
import { assets } from '../../../../../../public/assets_2/assets'
import { useTravel } from '../../../../../hook/TravelContext'
import Image from 'next/image'

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
  updateTravel: (id: number, updatedTravel: Travel) => void;
}

const Edit = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { travels = [], updateTravel = () => {} } = useTravel() as Partial<TravelContextType>
  const [formData, setFormData] = useState<{
    name: string;
    destination: string;
    price: string;
    duration: string;
    description: string;
    images: (string | File)[];
  }>({
    name: '',
    destination: '',
    price: '',
    duration: '',
    description: '',
    images: []
  })
  
  const [previewImages, setPreviewImages] = useState<string[]>([])

  useEffect(() => {
    if (!id) return;
    const travel = travels.find(t => String(t.id) === String(id));
    if (travel) {
      setFormData({
        name: travel.name,
        destination: travel.destination,
        price: String(travel.price),
        duration: String(travel.duration),
        description: travel.description,
        images: travel.images || []
      });
      if (travel.images && travel.images.length > 0) {
        setPreviewImages(travel.images as string[]);
      }
    }
  }, [id, travels]);
  console.log('formdata',formData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    const files = Array.from((e.target.files || []) as File[]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    updateTravel(Number(id), {
      id: Number(id),
      name: formData.name,
      destination: formData.destination,
      price: Number(formData.price),
      duration: Number(formData.duration),
      description: formData.description,
      images: formData.images.map(img => typeof img === 'string' ? img : '')
    });
    router.push('/admin/list');
  }

  return (
    <div className="p-6">
      <Title 
        title="Edit Travel Package" 
        subTitle="Modify travel package details"
        align="left"
      />

      <form onSubmit={handleSubmit} className="mt-8 max-w-4xl">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-secondary)]">Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                  placeholder="Enter package name"
                  title="Package Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-secondary)]">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                  placeholder="Enter destination"
                  title="Destination"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-secondary)]">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                  min="0"
                  placeholder="Enter price"
                  title="Price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-secondary)]">Duration (Days)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]"
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
            <h3 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">Images</h3>
            <div 
              className="border-2 border-dashed border-[var(--color-secondary)] rounded-lg p-6 text-center"
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
                <p className="text-sm text-[var(--color-secondary)]">Click to upload or drag images here</p>
                <p className="text-xs text-[var(--color-secondary)] mt-1">PNG, JPG up to 10MB each</p>
              </label>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <Image 
                      src={typeof preview === 'string' ? preview : ''} 
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
            <h3 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)]"
              required
              placeholder="Enter description"
              title="Description"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-6 py-2 rounded-md text-[var(--color-secondary)] bg-[var(--color-heavy)] hover:bg-opacity-80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-four)] transition-colors"
            >
              Update Package
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Edit