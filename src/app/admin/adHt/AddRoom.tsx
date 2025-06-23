import React from 'react'
import { useState } from 'react'
import Title from '../../../components/Title'
import { assets } from '../../../../public/assets/assets'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import authApi from '@/lib/auth-api'
import { Hotel } from 'lucide-react'

const hotelId = 'e7a67236-faa1-49c2-9a3e-930793baa694';
const AddRoom = ({ onSuccess }: { onSuccess: () => void }) => {
  const router = useRouter();
  const [images, setImages] = useState<{ [key: number]: File | null }>({
      1: null,
      2: null,
      3: null,
      4: null,
    });
  const [inputs, setInputs] = useState({
    type_room: '',
    price: '',
    description: '',
    area: '',
    name: '',
    hotelId: hotelId
  })
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault(); 
    // Xử lý logic thêm phòng ở đây
    console.log('Thêm phòng với dữ liệu:', inputs, images);
    if (!inputs.name || !inputs.area || !inputs.type_room || !inputs.price) {
      toast.error('Vui lòng điền đầy đủ thông tin phòng');
      return;
    }
    if (Object.values(images).every(file => !file)) {
      toast.error('Vui lòng chọn ít nhất một ảnh cho phòng');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', inputs.name);
      formData.append('area', inputs.area);
      formData.append('type_room', inputs.type_room);
      formData.append('price', inputs.price);
      formData.append('description', inputs.description);
      formData.append('hotelId', inputs.hotelId);

          // Append images to FormData

      Object.entries(images).forEach(([key, file]) => {
            if (file) {
              formData.append('image', file); 
            }
          });

      const response = await authApi.createRoom(formData,hotelId);
      console.log('Response:', response);
      if (response.data.success) {
        toast.success('Thêm phòng thành công');
        onSuccess()
      } else {
        toast.error(response.data.message || 'Thêm phòng thất bại');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      toast.error('Đã xảy ra lỗi khi thêm phòng');
    }
    
  }

  return (
    <form>
      <Title title='Thêm phòng' align='left' font='Roboto' subTitle='thêm các phòng giúp .....' />
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div className='flex-1 '>
          <p className='text-gray-800 mt-4'>Tên Phòng</p>
          <input type="text" placeholder='Nhập tên phòng' className='border border-gray-300 mt-1 rounded p-2 w-full ' value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
        </div>
        <div className='flex-1 '>
          <p className='text-gray-800 mt-4'>diện tích (m2)</p>
          <input type="text" placeholder='Nhập diện tích phòng' className='border border-gray-300 mt-1 rounded p-2 w-full ' value={inputs.area} onChange={e => setInputs({ ...inputs, area: e.target.value })} />
        </div>
      </div>
      {/*thêm ảnh */}
      <p className='text-gray-800 mt-10'>Ảnh</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((keyStr) => {
          const key = Number(keyStr);
          const file = images[key];
          return (
            <label htmlFor={`roomImage${key}`} key={key}>
              {file ? (
                <Image
                  className={`max-h-13 cursor-pointer opacity-80`}
                  src={URL.createObjectURL(file)}
                  alt=""
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Image
                  className={`max-h-13 cursor-pointer opacity-80 invert`}
                  src={assets.uploadArea}
                  alt=""
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
              )}
              <input type="file" accept="image/*" id={`roomImage${key}`} hidden onChange={e => {
                const file = e.target.files && e.target.files[0];
                setImages({ ...images, [key]: file });
              }} />
            </label>
          );
        })}
      </div>


      <div className='flex w-full max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Kiểu Phòng</p>
          <select title="Chọn kiểu phòng" value={inputs.type_room} onChange={e => setInputs({ ...inputs, type_room: e.target.value })} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full '>
            <option value="">Chọn kiểu phòng</option>
            <option value="Phòng đơn">Phòng đơn</option>
            <option value="Phòng đôi">Phòng đôi</option>
            <option value="Phòng gia đình">Phòng gia đình</option>
            <option value="Phòng Vip">Phòng Vip</option>
          </select>
        </div>
        <div>
          <p className='text-gray-800 mt-4'>
            Giá <span className='text-xs'>/đêm</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' value={inputs.price} onChange={e => setInputs({...inputs,price:e.target.value})}/>
        </div>
      </div>

      <p className='text-gray-800 mt-4'>Mô Tả</p>
      <textarea placeholder='Mô tả ngắn về phòng' className='border border-gray-300 mt-1 rounded p-2 w-full h-24' value={inputs.description} onChange={e => setInputs({...inputs,description:e.target.value})}></textarea>
      
      <button className='bg-[var(--color-1)] text-white rounded px-8 py-2 mt-8 hover:bg-[var(--color-1)]/50 transition-all cursor-pointer hover:text-black' type='submit' onClick={handleSubmit}>
        Thêm Phòng
      </button>
    </form>
  )
}

export default AddRoom
