"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import StarRating from "@/conponents/StarRating";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/conponents/Button";

const CommentTour = () => {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [comment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsSubmitting(true);
    setReviews((prevReviews) => [...prevReviews, comment]);
    setTimeout(() => {
      setIsSubmitting(false);
      setComment("");
    }, 500);
  };

  const InputComment = () => (
    <form className="flex items-center gap-2 mb-[10px]" onSubmit={handleSubmit}>
      <Image
        src="/default-avatar-icon-of-social-media-user-vector.jpg"
        alt="commentTour"
        width={50}
        height={50}
        className="w-[50px] h-[50px] object-cover rounded-[50%]"
      />
      <div className="flex flex-col w-[500px] max-w-[700px] gap-1 rounded-[20px] bg-[#f0eeee] px-4 py-2 ">
        <div className="flex items-center ">
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full   px-3 py-2 resize-y focus:outline-none focus:ring-0"
            placeholder="write your comment..."
          />
        </div>
      
      </div>
      <Button
        type="submit"
        color="none"
        className="bg-[#ff7757] hover:bg-[#ffd2c7] text-white rounded-[24px] text-[16px] 2xl:text-[20px] py-1 px-2 cursor-pointer"
        disabled={isSubmitting}
      >
        <SendHorizonal size={20} />
      </Button>
    </form>
  );

  const Reviews = ({ content }: { content: string }) => (
    <div className="flex items-start gap-2 mb-2">
      <Image
        src="/default-avatar-icon-of-social-media-user-vector.jpg"
        alt="commentTour"
        width={50}
        height={50}
        className="w-[50px] h-[50px] object-cover rounded-[50%]"
      />
      <div className="flex flex-col max-w-[500px] gap-1 rounded-[20px] bg-[#f0eeee] px-4 py-2 ">
        <div className="flex items-center justify-between gap-1">
          <span className="w-30">lap</span>
          <div className="flex  items-center gap-2">
            <StarRating rating={5} readonly />
            <span className="text-sm max-w-[500px] text-gray-500 ">5 </span>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-red px-20">
      <InputComment />
      
      {isSubmitting && (
        <div className="text-sm text-gray-500 mt-1">Đang gửi bình luận...</div>
      )}
      <div className="mt-4 max-w-[600px] overflow-y-auto hide-scrollbar max-h-[800px]">
        {(showAllReviews ? reviews : reviews.slice(-6)).map((review, idx) => (
          <Reviews key={idx + (showAllReviews ? 0 : reviews.length - 6)} content={review} />
        ))}
        {/* nút ẩn hiện bình luận */}
      </div>
        {reviews.length > 6 && (
        <Button
          type="button"
          color="none"
          className="mb-2 bg-gray-200 text-black border border-gray-300 hover:bg-gray-300"
          onClick={() => setShowAllReviews((prev) => !prev)}
        >
          {showAllReviews ? "Ẩn bớt bình luận" : `Hiện tất cả bình luận (${reviews.length})`}
        </Button>
      )}
    </div>
  );
};

export default CommentTour;