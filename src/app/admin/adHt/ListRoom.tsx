import React from 'react'
import { useState ,useEffect} from 'react'
import { roomsDummyData } from '../../../../public/assets/assets'
import Title from '../../../components/Title'
import authApi from '../../../lib/auth-api'
const hotelId = 'e7a67236-faa1-49c2-9a3e-930793baa694';
const ListRoom = () => {
  const [rooms, setRooms] = useState([])
  const fetchRooms = async () => {
      try {
        const response = await authApi.getAllRooms(hotelId)
        if (response.data.success) {
        
          setRooms(response.data.rooms)
        } else {
          console.error('Failed to fetch rooms:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
  useEffect(() => {
    fetchRooms();
  }, [])
 
  return (
    <div>
      <Title align='left' font='Roboto' title='Danh sách các phòng' subTitle='Ai cho tôi lương thiện' />
      <p className='text-gray-500 mt-8'>Tất cả phòng</p>
      <div className='w-full  text-left border border-gray-300 rounded max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full '>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Tên </th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Tiện Nghi</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Diện tích</th>
              <th className='py-3 px-4 text-gray-800 font-medium '>Giá / đêm</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Ảnh</th>
              <th className='py-3 px-4 text-gray-800 font-medium
              text-center'>Trạng thái</th>
              
            </tr>
          </thead>
          <tbody className='text-sm'>
            {rooms.map((item:any, index:number) => { 
              console.log(item)
              return(
              <tr key={item.id||index+1}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  { item.name }
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>
                  {item.type_room}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.area}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {(item.price).toLocaleString('vi-VN')} VND
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 ">
                    <div className="flex gap-5 flex-wrap">
                      {item.image.map((img: string, imgIndex: number) => (
                        <img
                          key={imgIndex}
                          src={`http://localhost:8080${img}`}
                          className="w-16 h-16 object-cover rounded"
                          alt={`room-image-${imgIndex}`}
                        />
                      ))}
                    </div>
                  </td>
                <td className='py-3 px-4 text-red-500 text-sm border-t border-gray-300 text-center'>
                  <label htmlFor={`room-available-${index}`} className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input
                      type="checkbox"
                      id={`room-available-${index}`}
                      className='sr-only peer'
                      checked={item.status}
                      title="Trạng thái phòng"
                      aria-label="Trạng thái phòng"
                    />
                    <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-[var(--color-1)] transition-colors duration-200'></div>
                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                  </label>
                </td>

              </tr>
            )})}

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ListRoom
