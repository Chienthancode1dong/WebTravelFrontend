'use client'
import React, {  RefObject } from 'react'
import { ReviewItem } from "./ReviewItem";

type Review = {
  id: number | string;
  name: string;
  createdAt: string;
  rating: number;
  comment: string;
  avatar: string; // thêm trường avatar nếu cần
};

type ReviewListProps = {
  reviews: Review[];
    scrollRef: RefObject<HTMLDivElement | null>;
};

export function ReviewList({ reviews,scrollRef }: ReviewListProps) {
  return (
 
      
        <div
         ref={scrollRef}
         className="col-start-2  my-auto  w-full flex items-center h-[380px] overflow-x-auto scroll-smooth snap-x hide-scrollbar flex gap-4 ">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      
 
  );
}
