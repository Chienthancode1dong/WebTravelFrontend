import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface DatePickerComponentProps {
  label: string;
}

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsOpen(false); // Đóng DatePicker khi chọn ngày
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return format(date, "eee, d'th' MMM, yyyy");
  };

  const handleDivClick = () => {
    setIsOpen(!isOpen); // Mở hoặc đóng DatePicker khi nhấn vào div
  };

  return (
    <div className=" 2xl:w-[225px] xl:w-[195px] lg:w-[155px] text-[20px] border-b-[1px] pb-[10px]">
      <div className="text-[16px] font-Playfair">{props.label}</div>
      <div
        className="flex cursor-pointer justify-between items-center"
        onClick={handleDivClick} // Nhấn vào div để mở DatePicker
      >
        <div>{selectedDate && <div className="2xl:text-[20px] lg:text-[18px]">{formatDate(selectedDate)}</div>}</div>
        <FontAwesomeIcon icon={faAngleDown} className="ml-2 w-4 h-4 self-center" />
      </div>

      {/* Hiển thị DatePicker khi isOpen là true */}
      {isOpen && (
        <div className="absolute mt-2  ">
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            onClickOutside={() => setIsOpen(false)} // Đóng DatePicker khi click bên ngoài
            inline
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
