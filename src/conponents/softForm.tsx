'use client'

import React, { useState, useRef, useEffect } from 'react';

interface SoftFormProps {
  label: string;
  value: string; // optional
  title: string;
  subcript: string;
  types: string;
  showDropdown?: boolean;
  dropdownOptions?: string[]; // optional
}

const SoftForm = (props: SoftFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-2 relative w-fit">
      <div className="text-[16px]">{props.label}</div>

      <form action="/search">
        <input
          title={props.title}
          placeholder={props.subcript}
          className=" 2xl:w-[225px] xl:w-[195px] lg:w-[155px] font-playfair 2xl:text-[20px] lg:text-[18px] border-b-[1px] pb-[10px]"
          type={props.types}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => props.showDropdown && setIsOpen(true)}
        />
      </form>

      {/* Kiểm tra trước khi hiển thị dropdown */}
      {props.showDropdown && isOpen && Array.isArray(props.dropdownOptions) && props.dropdownOptions.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow z-10 max-h-60 overflow-y-auto">
          {props.dropdownOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SoftForm;
