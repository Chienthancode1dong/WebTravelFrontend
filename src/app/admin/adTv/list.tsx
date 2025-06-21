'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Title from '../../../components/Title'
import { useTravel } from '../../../hook/TravelContext'
import authApi from '@/lib/auth-api'

interface ScheduleDetail {
  title: string;
  description: string;
}

interface ScheduleTour {
  id : string;
  startDate: string;
  endDate: string;
  price: number;
  limitQuantity: number;
}

interface Travel {
  id: number | string;
  city: string;
  destination: string;
  duration: number;
  description: string;
  image: string[];
  transportation: string;
  numberOfPeople: number;
  scheduleDetail?: ScheduleDetail[];
  scheduleTour?: ScheduleTour[] | string;
}

interface TravelContextType {
  travels: Travel[];
  deleteTravel: (id: number) => void;
}

const List = () => {
  const router = useRouter()
  const [idDelete, setIdDelete] = useState<string | null>(null)
  const { travels = [], deleteTravel = () => {} } = useTravel() as unknown as Partial<TravelContextType>
  const [tourTravel, setTourTrave] = useState<Travel[]>([])
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null)
  const [selectedTravel2, setSelectedTravel2] = useState<Travel | null>(null)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetail[] | null>(null)
  const [selectedScheduleTour, setSelectedScheduleTour] = useState<ScheduleTour[] | null>(null)
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false)
  const [newSchedule, setNewSchedule] = useState<ScheduleDetail>({ title: '', description: '' })
  const [showAddScheduleTourModal, setShowAddScheduleTourModal] = useState(false);
  const [newScheduleTour, setNewScheduleTour] = useState<ScheduleTour>({
    id:'',
    startDate: '',
    endDate: '',
    price: 0,
    limitQuantity: 0,
  });
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this travel package?')) {
      const res = await authApi.deleteTour(id.toString());
      console.log('Travel package deleted successfully:', res.data);
      alert('Travel package deleted successfully!');
      setTourTrave(prev => prev.filter(travel => travel.id !== id));
      deleteTravel(id)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/${id}/edit`)
  }

  // Hàm fetch lại schedule tour cho travel hiện tại, trả về dữ liệu mới
  const fetchScheduleTour = async (travelId: string | number) => {
    try {
      const res = await authApi.getAllTours();
      const found = res.data.postTours.find((t: Travel) => t.id === travelId);
      let tours: ScheduleTour[] = [];
      if (found) {
        if (typeof found.scheduleTour === 'string') {
          try {
            tours = JSON.parse(found.scheduleTour);
          } catch {
            tours = [];
          }
        } else if (Array.isArray(found.scheduleTour)) {
          tours = found.scheduleTour;
        }
      }
      setSelectedScheduleTour(tours);
      return tours;
    } catch (error) {
      setSelectedScheduleTour([]);
      return [];
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await authApi.getAllTours();
        setTourTrave(res.data.postTours);
        console.log('Fetched tours:', res.data.postTours);
      };
      fetchData();
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  }, []);

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
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">STT</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">City</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Destination</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Number of people</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Transportation</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Images</th>            
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Schedule Detail</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Schedule Tour</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tourTravel.map((travel, index) => (
                <tr key={travel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{travel.city}</td>
                  <td className="px-6 py-4">{travel.destination}</td>
                  <td className="px-6 py-4">{travel.duration}</td>
                  <td className="px-6 py-4">{travel.numberOfPeople}</td>
                  <td className="px-6 py-4">{travel.transportation}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setSelectedTravel(travel)}
                    >
                      See More
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setSelectedSchedule(travel.scheduleDetail || [])}
                    >
                      See More
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => {
                        let tours: ScheduleTour[] = [];
                        if (typeof travel.scheduleTour === 'string') {
                          try {
                            tours = JSON.parse(travel.scheduleTour);
                          } catch {
                            tours = [];
                          }
                        } else if (Array.isArray(travel.scheduleTour)) {
                          tours = travel.scheduleTour;
                        }
                        fetchScheduleTour(travel.id);
                        setSelectedTravel2(travel);
                      }}
                    >
                      See More
                    </button>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleDelete(travel.id as number)}
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

      {/* Modal xem ảnh */}
      {selectedTravel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelectedTravel(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedTravel(null)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Images</h2>
            {selectedTravel.image && selectedTravel.image.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-4">
                  {selectedTravel.image.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-1/3 max-w-[33%] cursor-pointer"
                      onClick={() => setEnlargedImage(img.startsWith('http') ? img : `http://localhost:8080${img}`)}
                    >
                      <Image
                        src={img.startsWith('http') ? img : `http://localhost:8080${img}`}
                        alt={`Travel image ${idx + 1}`}
                        width={120}
                        height={80}
                        className="rounded object-cover w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
                {enlargedImage && (
                  <div
                    className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={() => setEnlargedImage(null)}
                  >
                    <div
                      className="relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-2 right-2 text-white text-2xl"
                        onClick={() => setEnlargedImage(null)}
                      >
                        &times;
                      </button>
                      <Image
                        src={enlargedImage}
                        alt="Enlarged"
                        width={600}
                        height={400}
                        className="rounded object-contain max-w-[90vw] max-h-[80vh] bg-white"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal xem lịch trình (Schedule Detail) */}
      {selectedSchedule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelectedSchedule(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Schedule Details</h2>
            </div>
            {selectedSchedule.length > 0 ? (
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">#</th>
                      <th className="px-4 py-2 border-b text-left">Title</th>
                      <th className="px-4 py-2 border-b text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSchedule.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{idx + 1}</td>
                        <td className="px-4 py-2 border-b">{item.title}</td>
                        <td className="px-4 py-2 border-b">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No schedule details available.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal Add Schedule */}
      {showAddScheduleModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowAddScheduleModal(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-xl w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowAddScheduleModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6">Add Schedule</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (newSchedule.title && newSchedule.description) {
                  setSelectedSchedule(prev =>
                    prev ? [...prev, newSchedule] : [newSchedule]
                  );
                  // Cập nhật cả tourTravel để khi đóng/mở modal vẫn còn lịch mới
                  if (selectedTravel) {
                    setTourTrave(prev =>
                      prev.map(t =>
                        t.id === selectedTravel.id
                          ? {
                              ...t,
                              scheduleDetail: t.scheduleDetail
                                ? [...t.scheduleDetail, newSchedule]
                                : [newSchedule],
                            }
                          : t
                      )
                    );
                  }
                  setNewSchedule({ title: '', description: '' });
                  setShowAddScheduleModal(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newSchedule.title}
                  onChange={e =>
                    setNewSchedule({ ...newSchedule, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={newSchedule.description}
                  onChange={e =>
                    setNewSchedule({ ...newSchedule, description: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Schedule Tour */}
      {showAddScheduleTourModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowAddScheduleTourModal(false)}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowAddScheduleTourModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6">Add Schedule Tour</h2>
            <form
              onSubmit={async e => {
                e.preventDefault();
                if (
                  newScheduleTour.startDate &&
                  newScheduleTour.endDate &&
                  newScheduleTour.price > 0 &&
                  newScheduleTour.limitQuantity > 0 &&
                  selectedTravel2?.id
                ) {
                  try {
                    const payload = {
                      startDate: newScheduleTour.startDate,
                      endDate: newScheduleTour.endDate,
                      price: newScheduleTour.price,
                      limitQuantity: newScheduleTour.limitQuantity,
                    };
                    await authApi.createScheduleTour(String(selectedTravel2.id), payload);
                    // Fetch lại danh sách travel và schedule tour mới nhất
                    const res = await authApi.getAllTours();
                    setTourTrave(res.data.postTours);
                    const tours = await fetchScheduleTour(selectedTravel2.id);
                    setSelectedScheduleTour(tours);
                    setNewScheduleTour({
                      id: '',
                      startDate: '',
                      endDate: '',
                      price: 0,
                      limitQuantity: 0,
                    });
                    setShowAddScheduleTourModal(false);
                    alert('Thêm Schedule Tour thành công!');
                  } catch (error) {
                    alert('Có lỗi xảy ra khi thêm Schedule Tour!');
                  }
                }
              }}
            >
              <div className="mb-4">
                <label className="block mb-1 font-medium">Start Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={newScheduleTour.startDate}
                  onChange={e =>
                    setNewScheduleTour({ ...newScheduleTour, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">End Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={newScheduleTour.endDate}
                  onChange={e =>
                    setNewScheduleTour({ ...newScheduleTour, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={newScheduleTour.price}
                  onChange={e =>
                    setNewScheduleTour({ ...newScheduleTour, price: Number(e.target.value) })
                  }
                  min={0}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Limit Quantity</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={newScheduleTour.limitQuantity}
                  onChange={e =>
                    setNewScheduleTour({ ...newScheduleTour, limitQuantity: Number(e.target.value) })
                  }
                  min={1}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xem schedule tour */}
      {selectedScheduleTour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelectedScheduleTour(null)}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-3xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelectedScheduleTour(null)}
            >
              &times;
            </button>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold mb-4">Schedule Tour</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                onClick={() => setShowAddScheduleTourModal(true)}
              >
                Add Schedule
              </button>
            </div>
            {selectedScheduleTour.length > 0 ? (
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">#</th>
                      <th className="px-4 py-2 border-b text-left w-56">Start Date</th>
                      <th className="px-4 py-2 border-b text-left w-56">End Date</th>
                      <th className="px-4 py-2 border-b text-left">Price</th>
                      <th className="px-4 py-2 border-b text-left ">Quantity</th>
                      <th className="px-4 py-2 border-b text-left ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedScheduleTour.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{idx + 1}</td>
                        <td className="px-4 py-2 border-b w-56">{item.startDate}</td>
                        <td className="px-4 py-2 border-b w-56">{item.endDate}</td>
                        <td className="px-4 py-2 border-b">{item.price}</td>
                        <td className="px-4 py-2 border-b">{item.limitQuantity}</td>
                        <td className="px-4 py-2 border-b">
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => { setDeleteIdx(idx); setIdDelete(item.id); }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No schedule tour available.</p>
            )}
            {/* Modal xác nhận xóa Schedule Tour */}
            {deleteIdx !== null && (
              <div
                className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => setDeleteIdx(null)}
              >
                <div
                  className="bg-white rounded-lg p-8 max-w-sm w-full relative"
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
                  <p>Bạn có chắc muốn xóa lịch này?</p>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setDeleteIdx(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        console.log('Deleting schedule tour with ID:', selectedTravel);
                        if (
                          idDelete !== null &&
                          selectedScheduleTour 

                        ) {
                          try {
                            await authApi.deleteScheduleTourItem(String(idDelete));

                            alert('Xóa thành công!');
                                                        const res = await authApi.getAllTours();
                            setTourTrave(res.data.postTours);
                          } catch {
                            alert('Xóa thất bại!');
                          }
                          setDeleteIdx(null);
                        }
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default List

function setBanner(postTours: any) {
  throw new Error('Function not implemented.')
}