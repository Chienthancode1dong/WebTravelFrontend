import React from "react";

type ButtonProps = {
  color: "orange" | "Brown";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
    disabled?: boolean;  
};

export function Button({
  color,
  onClick,
  children,
  className = "",
  disabled = false,
}: ButtonProps) {
  const colors = {
    orange: "bg-[#ff7757] text-white hover:bg-[#ffd2c7] cursor-pointer",
    Brown: "bg-[#331811] text-white hover:bg-[#61291C] cursor-pointer",
   
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colors[color]} rounded-[24px] text-[16px] 2xl:text-[20px] py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
}
