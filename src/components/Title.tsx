import React from 'react'

interface TitleProps {
  title: string;
  subTitle?: string;
  align?: 'left' | 'center';
  font?: string;
}

const Title = ({ title, subTitle, align = "center", font = "font-playfair" }: TitleProps) => {
    return (
        <div className={`flex flex-col justify-center items-center text-center ${align === "left" ? "md:items-start md:text-left" : ""}`}>
            <h1 className={`text-4xl md:text-[40px] text-[var(--color-3)] ${font}`}>{title}</h1>
            <p className='text-sm md:text-base text-gray-500'>{subTitle}</p>
        </div>
    )
}

export default Title
