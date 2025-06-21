import React from "react";
import StarRating from "./StarRating"; // giả sử bạn có component StarRating
import Image from "next/image"; // sử dụng Image từ Next.js

type Review = {
  id: number | string;
  name: string;
  createdAt: string;
  rating: number;
  comment: string;
  avatar: string; // thêm trường avatar nếu cần
};

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    
    <div
      key={review.id}
      className="relative w-[440px] h-[300px] select-none  snap-center shrink-0 transition-all duration-300 ease-in-out transform hover:-translate-y-[15px] rounded-[26px] hover:shadow-xl/30 overflow-hidden"
    >
      <div className="w-full h-[30px]"></div>
       <div className="absolute  top-[0px] left-8">
            <Image src={"/default-avatar-icon-of-social-media-user-vector.jpg"} alt="Avatar" width={70} height={70} className="rounded-full mb-2" />
            </div>
      <div className=" w-full h-[270px] bg-[#F5F6F7] p-5 rounded-lg shadow-sm flex flex-col  justify-between ">
       
        <p className="text-sm h-[410px] text-gray-700 mt-[50px]">{review.comment}</p>
       
         <StarRating rating={review.rating} readonly />
         <div className="flex items-center justify-between mb-1">
         
          <h1 className=" text-[24px]  ">{review.name}</h1>
          <span className="font-Playfair text-xs text-gray-400">{review.createdAt}</span>
        </div>
      </div>
     
    </div>
  );
}
