import React from 'react'
import { useState ,useEffect} from 'react'
import { roomsDummyData } from '../../../../public/assets/assets'
import Title from '../../../components/Title'
import authApi from '../../../lib/auth-api'
const hotelId = 'e7a67236-faa1-49c2-9a3e-930793baa694';
interface Room {
  id: string;
  name: string;
  status: boolean;
  area: string;
  price: number;
  image: string[];
  type_room: string;
}
const ListRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  // Hàm cập nhật trạng thái phòng
  // Hàm này sẽ được gọi khi người dùng thay đổi trạng thái phòng (có thể là khi nhấn vào checkbox)
  // Nó sẽ gọi API để cập nhật trạng thái phòng trên server và sau đó cập nhật trạng thái phòng trong state của component
  const updateRoomStatus = async(roomId: string) => {
      console.log('Update Status', roomId)
      try {
        // Call the API to update the room status
         const response =await authApi.UpdateStatusHotel(roomId)
          if (response.data.success) {
            console.log('Cập nhật thành công:', response.data.message);
            // Cập nhật lại danh sách phòng sau khi cập nhật trạng thái
            setRooms(prev =>
              prev.map(room =>
                room.id === roomId
                  ? { ...room, status: !room.status } 
                  : room
              )
      );
          } else {
            console.error('Cập nhật thất bại:', response.data.message);
          }
      } catch (error) {
        console.error('Error updating room status:', error)
      }
     
  }

  // Hàm để lấy danh sách phòng từ API
  // Nó sẽ gọi API để lấy danh sách phòng và cập nhật state của component
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
  const handleDeleteRoom = async (roomId: string) => {
    try {
      const response = await authApi.deleteRoom(hotelId,roomId )
      if (response.data.success) {
        console.log('Xóa phòng thành công:', response.data.message)
        // Cập nhật lại danh sách phòng sau khi xóa
        setRooms(prev => prev.filter(room => room.id !== roomId))
      } else {
        console.error('Xóa phòng thất bại:', response.data.message)
      }
    } catch (error) {
      console.error('Error deleting room:', error)
    }}
// useEffect để gọi hàm fetchRooms khi component được mount
// Điều này sẽ giúp lấy danh sách phòng khi component được hiển thị lần đầu tiên
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
               max-sm:hidden text-center'>Trạng thái</th>
              <th className='py-3 px-4 text-gray-800 font-medium  max-sm:hidden text-center'>Hành động</th>
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
                      onChange={(e) => {updateRoomStatus(item.id);e.preventDefault()}}
                      title="Trạng thái phòng"
                      aria-label="Trạng thái phòng"
                    />
                    <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-[var(--color-1)] transition-colors duration-200'></div>
                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                  </label>
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                   <button
                      className="text-red-500 hover:underline cursor-pointer"
                      onClick={() => setRoomToDelete(item)}
                    >
                      Xóa
                    </button>
      
                </td>
              </tr>
            )})}

          </tbody>

        </table>
      </div>
      {roomToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-md w-[320px]">
          <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
          <p className="text-sm mb-4">
            Bạn có chắc muốn xóa phòng <strong>{roomToDelete.name}</strong> không?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setRoomToDelete(null)}
            >
              Hủy
            </button>
            <button
              className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                handleDeleteRoom(roomToDelete.id);
                setRoomToDelete(null);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
    
  )
  
}

export default ListRoom
