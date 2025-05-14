// components/Button.tsx
import React from "react";

export function Button({ color, children }) {
  const colors = {
    orange: "bg-[#ff7757] text-white hover:bg-[#ffd2c7] cursor-pointer ",
    blue: "bg-blue-500 text-white",
    white: "bg-white text-black",
  };
  return (
    <button className={`${colors[color]} rounded-[12px] px-[32px] py-[20px] text-[20px]`}>
      {children}
    </button>
  );
}