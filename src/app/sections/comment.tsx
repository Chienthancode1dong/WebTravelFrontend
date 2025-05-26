'use client'
import React, { useState,useRef } from 'react'
import StarRating from './../../conponents/StarRating'
import Title from "@/conponents/Title";
import NextPrevButton from "@/conponents/NextPrevButton";
import { useInView } from '@/hook/useInView';
import { Button } from '@/conponents/Button';
import { ReviewList } from "@/conponents/ReviewList";
interface Review {
  id: number | string;
  name: string;
  avatar: string; // có thể thêm trường avatar nếu cần
  createdAt: string;
  rating: number;
  comment: string;
}
const reviewsData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
     avatar: '',
    createdAt: "2024-05-24",
    rating: 4,
    comment: "Sản phẩm rất tốt!",
  },
  {
    id: 2,
    name: "Trần Thị B",
     avatar: '',
    createdAt: "2024-05-23",
    rating: 5,
    comment: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth, the master- builder of human happiness.",
  },
  // ... thêm các đánh giá khác
];


const Commment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [averageRating, setAverageRating] = useState(4.3)
  const [totalReviews, setTotalReviews] = useState(123)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const scrollRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { ref, isIntersecting } = useInView<HTMLHeadingElement>();

  const itemWidth = 450 + 16 // width của mỗi ảnh + khoảng cách (nếu có gap-4)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      })
    }
  }

  const scrollNext = () => {
    const nextIndex = (currentIndex + 1) % reviews.length
    setCurrentIndex(nextIndex)
    scrollToIndex(nextIndex)
  }

  const scrollPrev = () => {
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length
    setCurrentIndex(prevIndex)
    scrollToIndex(prevIndex)
  }


  const handleSubmit = () => {
    const newReview: Review = {
    id: Date.now(),
    name: 'Bạn mới', // có thể cho nhập tên nếu muốn
    avatar: '', // có thể thêm trường avatar nếu cần
    rating: userRating,
    comment: userComment,
    createdAt: new Date().toISOString().split('T')[0],
  }
    // Fake: cập nhật số sao trung bình (thực tế là sẽ gọi API)
    setReviews((prev) => [...prev, newReview])
    setAverageRating((prev) => (prev * totalReviews + userRating) / (totalReviews + 1))
    setTotalReviews((prev) => prev + 1)
    setIsModalOpen(false)
    setUserRating(0)
    setUserComment('')
  }


  return (
    <div className="w-full h-[806px] bg-white text-black p-4">
     
         <div ref={ref} className="mt-[70px] w-full h-[165px] grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
          <div  className={`relative w-full max-h-[165px] select-none col-start-2 transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
            <Title
              title="REVIEWS ABOUT US"
              descript="Most popular destinations around the world, from historical places to natural wonders."
              position="left"
            />
          <NextPrevButton position='' onNext={scrollNext} onPrev={scrollPrev} />
          </div>
           <div ref={ref} className={`absolute right-70  2xl:right-78 flex items-center space-x-2 mt-1 transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
            <StarRating rating={averageRating} readonly />
            <span className="text-sm text-gray-500">{averageRating.toFixed(1)} ({totalReviews} đánh giá)</span>
          </div>
            <Button
          color={'orange'}  
          className={`absolute  2xl:right-38 right-24 text-white px-4 py-2 rounded transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
          onClick={() => setIsModalOpen(true)}
        >
          review
        </Button>
        
        </div>
      
      
      
    {/* review */}
        <div ref={ref}  className={`mt-[50px] w-full h-[380px]   grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px] transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}>
            <ReviewList scrollRef={scrollRef} reviews={reviews} />
          </div>
       
    
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-[24px] font-semibold mb-3">Write your review</h3>
            <div className="mb-3">
              <StarRating rating={userRating} onRate={(r) => setUserRating(r)} />
            </div>
            <textarea
              rows={4}
              placeholder="your comment here..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full p-2 border rounded resize-none"
            ></textarea>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                color='orange'
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Hủy
              </Button>
              <Button
                color='Brown'
                onClick={handleSubmit}
                className="px-4 py-2  text-white rounded "
                disabled={userRating === 0|| userComment.trim() === ''}
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Commment
