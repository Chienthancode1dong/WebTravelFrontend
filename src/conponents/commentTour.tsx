"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import StarRating from "@/conponents/StarRating";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/conponents/Button";

// Định nghĩa type cho review có thêm userName
interface Review {
  id: string;
  content: string;
  userName: string;
}

const CommentTour = () => {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<{ [reviewId: string]: string[] }>({}); // Thêm state lưu replies cho từng review
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && replyingId === null) {
      inputRef.current.focus();
    }
  }, [comment, replyingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsSubmitting(true);
    setReviews((prevReviews) => [
      ...prevReviews,
      { id: Date.now().toString(), content: comment, userName: 'User1' },
    ]);
    setTimeout(() => {
      setIsSubmitting(false);
      setComment("");
    }, 500);
  };

  // Hàm submit reply
  const handleReplySubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setReplies(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), replyContent],
    }));
    setReplyingId(null);
    setReplyContent("");
  };

  // Khi nhấn Reply, tự động điền sẵn tên người được reply vào input (và in đậm phần tên trong input)
  const handleReply = (id: string, userName: string) => {
    setReplyingId(id);
    setReplyContent(`${userName} `);
  };

  
  // InputComment nhận props để dùng cho cả comment chính và reply
  const InputComment = ({
    value,
    onChange,
    onSubmit,
    placeholder = "write your comment...",
    inputRef,
    disabled = false,
    autoFocus = false,
    className = "w-[500px] max-w-[700px] px-3 py-2 resize-y focus:outline-none focus:ring-0",
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
    autoFocus?: boolean;
    className?: string;
  }) => (
    <form className="flex items-center gap-2 mb-[10px]" onSubmit={onSubmit}>
      <Image
        src="/default-avatar-icon-of-social-media-user-vector.jpg"
        alt="commentTour"
        width={50}
        height={50}
        className="w-[40px] h-[40px] object-cover rounded-[50%]"
      />
      <div className="flex flex-col  gap-1 rounded-[20px] bg-[#f0eeee] px-4  ">
        <div className="flex items-center ">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
          />
        </div>
      </div>
      <Button
        type="submit"
        color="none"
        className="bg-[#ff7757] hover:bg-[#ffd2c7] text-white rounded-[24px] text-[16px] 2xl:text-[20px] py-1 px-2 cursor-pointer"
        disabled={disabled}
      >
        <SendHorizonal size={20} />
      </Button>
    </form>
  );

  const Reviews = ({ id, content, userName }: { id: string; content: string; userName: string }) => (
    <div className={`flex flex-col gap-1 relative `}>
      <div className={`flex  gap-1 relative ${replyingId === id ? "pb-15" : "pb-7"}`}>
        <Image
          src="/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="commentTour"
          width={50}
          height={50}
          className="w-[40px] h-[40px] object-cover rounded-[50%]"
        />
        <div className="flex flex-col max-w-[500px] gap-1 rounded-[20px] bg-[#f0eeee] px-4 py-2 ">
          <div className="flex items-center justify-between gap-1">
            <span className="w-30 font-bold">{userName}</span>
            <div className="flex  items-center gap-2">
              <StarRating star={5} readonly />
              <span className="text-sm  text-gray-500 break-words">5 </span>
            </div>
          </div>
          <p className="break-words whitespace-pre-line">{content}</p>
        </div>
        {replyingId === id ? (
          <div className="absolute left-[5%] bottom-[1px] ">
            <InputComment
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              onSubmit={e => handleReplySubmit(e, id)}
              placeholder={`Reply to ${userName}...`}
              autoFocus
              className="w-[440px] max-w-[500px] px-3 py-2 resize-y focus:outline-none focus:ring-0 font-bold selection:bg-blue-200"
            />
          </div>
        ) : (
          <div
            onClick={() => handleReply(id, userName)}
            className={`absolute left-[10%] bottom-[0] text-gray-500 cursor-pointer ${replyingId === id ? "font-bold underline" : ""}`}
          >
            Reply
          </div>
        )}
        {replyingId === id && (
          <div className="absolute w-[3%] h-[60px] border-b-2 border-l-2  rounded-bl-[20px] left-5 top-11 "></div>
        )}
      </div>
      {/* Hiển thị replies bên dưới review khi đã nhấn reply */}
      <ReviewReplies replies={replies[id]} parentId={id} userName={userName} />
    </div>
  );

  // Component hiển thị replies cho 1 review
  const ReviewReplies = ({ replies, parentId, userName }: { replies: string[]; parentId: string; userName: string }) => (
    replies && replies.length > 0 ? (
      <div className="ml-16 mt-2 flex flex-col gap-2 relative">
        <div className={`absolute w-[3%] h-[50%] border-b-2 border-l-2  rounded-bl-[20px] left-[-40px] top-7 `}></div>
        {replies.map((reply, idx) => (
          <Reviews
            key={idx}
            id={parentId + "-reply-" + idx}
            content={reply}
            userName={userName}
          />
        ))}
      </div>
    ) : null
  );
  
  return (
    <div className="w-full bg-red px-20">
      <InputComment
        value={comment}
        onChange={e => setComment(e.target.value)}
        onSubmit={handleSubmit}
        // Chỉ truyền inputRef cho input chính, không truyền cho reply
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        disabled={isSubmitting}
      />
      
      {isSubmitting && (
        <div className="text-sm text-gray-500 mt-1">Đang gửi bình luận...</div>
      )}
      <div className="mt-4  overflow-y-auto hide-scrollbar max-h-[800px]">
        {(showAllReviews ? reviews : reviews.slice(-6)).map((review, idx) => (
          <Reviews key={review.id} id={review.id} content={review.content} userName={review.userName} />
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