'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Title from '../../../components/Title'
import Image from 'next/image'
import { assets } from '../../../../public/assets_2/assets'
import authApi from '@/lib/auth-api'
import { toast } from 'react-toastify'

interface Travel {
  id?: number;
  city: string;
  destination: string;
  duration: number;
  description: string;
  numberOfPeople: number;
  transportation: string;
}

interface ScheduleDetail {
  title: string;
  description: string;
}

const Add = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<Travel>({
    city: '',
    destination: '',
    duration: 1,
    description: '',
    numberOfPeople: 1,
    transportation: '',
  })

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail[]>([
    { title: '', description: '' }
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'numberOfPeople' ? Number(value) : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  }

  const handleScheduleChange = (index: number, field: keyof ScheduleDetail, value: string) => {
    setScheduleDetail(prev => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const addScheduleDay = () => {
    setScheduleDetail(prev => [...prev, { title: '', description: '' }])
  }

  const removeScheduleDay = (index: number) => {
    setScheduleDetail(prev => prev.filter((_, i) => i !== index))
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData();
    form.append('city', formData.city);
    form.append('destination', formData.destination);
    form.append('duration', formData.duration.toString());
    form.append('description', formData.description);
    form.append('numberOfPeople', formData.numberOfPeople.toString());
    form.append('transportation', formData.transportation);
    images.forEach(file => form.append('image', file));
    form.append('scheduleDetail', JSON.stringify(scheduleDetail));

    try {
      const res = await authApi.createTour(form);
      console.log('Response:', res)
     if (res.success) {
             toast.success('Added new tour successfully');
           } else {
             toast.error(res.data.message || 'Failed to create tour');
           }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Tạo tour thất bại!');
    }
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
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter city"
                  title="City"
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
              <div>
                <label className="block text-sm font-medium mb-1">Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                  placeholder="Enter number of people"
                  title="Number of People"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Transportation</label>
                <input
                  type="text"
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter transportation"
                  title="Transportation"
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
                setImages(prev => [...prev, ...files]);
                const newPreviews = files.map(file => URL.createObjectURL(file));
                setPreviewImages(prev => [...prev, ...newPreviews]);
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

          {/* Schedule Detail */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Schedule Detail</h3>
            {scheduleDetail.map((item, idx) => (
              <div key={idx} className="mb-4 flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={e => handleScheduleChange(idx, 'title', e.target.value)}
                  className="p-2 border rounded-md flex-1"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={e => handleScheduleChange(idx, 'description', e.target.value)}
                  className="p-2 border rounded-md flex-1"
                  required
                />
                {scheduleDetail.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeScheduleDay(idx)}
                    className="text-red-500 font-bold"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addScheduleDay}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md mt-2"
            >
              + Thêm ngày
            </button>
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