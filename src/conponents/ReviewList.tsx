import React, { RefObject } from "react";
import { ReviewItem } from "./ReviewItem";

type Review = {
  id?: string | number;
  comment?: string;
  star?: number;
  created_at?: string;
  user?: {
    name?: string;
    image?: string;
  };
};

type ReviewListProps = {
  reviews: Review[] | null;
  scrollRef: RefObject<HTMLDivElement>;
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews = [], scrollRef }) => {
  console.log(reviews,"lllll")
  return (
    <div
      ref={scrollRef}
      className="col-span-3 BannerImg my-auto w-full flex items-center h-[500px] overflow-x-auto scroll-smooth snap-x hide-scrollbar gap-4 2xl:px-[120px] px-[60px]"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
    >
      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
