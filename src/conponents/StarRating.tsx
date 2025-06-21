'use client'
import React, {  useState } from 'react'
import { Star } from 'lucide-react'

type StarRatingProps = {
  star: number            // Giá trị hiển thị sao (có thể là giá trị trung bình)
  readonly?: boolean        // true = chỉ hiển thị, false = cho người dùng đánh giá
  maxStars?: number         // số sao tối đa
  onRate?: (rating: number) => void // callback khi người dùng chọn sao
}

const StarRating: React.FC<StarRatingProps> = ({
  star,
  readonly = false,
  maxStars = 5,
  onRate,
}) => {
  const [hovered, setHovered] = useState<number | null>(null)
const [selected, setSelected] = useState<number>(star || 0)


  const displayRating = hovered !== null ? hovered : selected

  const handleClick = (index: number) => {
    if (readonly) return
    setSelected(index)
    if (onRate) onRate(index)
  }

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const index = i + 1
        const isFilled = index <= displayRating

        return (
          <button
            key={index}
            disabled={readonly}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readonly && setHovered(index)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className="p-1 transition-all"
            title='cclick to rate'
          >
            <Star
              className={`w-5 h-5 ${
                isFilled
                  ? 'fill-yellow-400 stroke-yellow-500'
                  : 'stroke-gray-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
