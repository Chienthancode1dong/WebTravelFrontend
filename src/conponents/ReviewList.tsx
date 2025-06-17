import React, { RefObject } from "react";
import { ReviewItem } from "./ReviewItem";

type Review = {
  id: number | string;
  name: string;
  avatar: string;
  createdAt: string;
  rating: number;
  comment: string;
};

type ReviewListProps = {
  reviews: Review[];
  scrollRef: RefObject<HTMLDivElement>;
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews, scrollRef }) => {
  return (
    <div 
  ref={scrollRef}
    className='col-span-3 BannerImg my-auto  w-full flex items-center h-[500px] overflow-x-auto scroll-smooth snap-x hide-scrollbar flex gap-4 2xl:px-[120px] px-[60px]'
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
    >
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
