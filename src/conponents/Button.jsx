import React from "react";

export function Button({ color, children, className = "" }) {
  const colors = {
    orange: "bg-[#ff7757] text-white hover:bg-[#ffd2c7] cursor-pointer ",
    blue: "bg-blue-500 text-white",
    white: "bg-white text-black",
  };
  return (
    <button className={`${colors[color]} rounded-[24px] text-[16px] 2xl:text-[20px] py-1 px-2 ${className}`}>
      {children}
    </button>
  );
}