import React from "react";

type ButtonProps = {
  color: "orange" | "Brown" | "none";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function Button({
  color,
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const colors = {
    orange: "bg-[#ff7757] text-white hover:bg-[#ffd2c7] cursor-pointer",
    Brown: "bg-[#331811] text-white hover:bg-[#61291C] cursor-pointer",
    none: "  ",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${colors[color]} rounded-[24px] text-[16px] 2xl:text-[20px] py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
}
