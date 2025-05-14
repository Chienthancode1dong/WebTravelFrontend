'use client'

import SoftForm from "./softForm";
import DatePickerComponent from "./CustomDateInput";
import React from "react";
import { ArrowRight } from "lucide-react";
export default function BookingBar() {


  return (
    <div className="booking relative inset-0  h-[208px] w-full flex  bg-[#fff] z-6 bottom-100 rounded-r-[20px]">
      <div className=" w-full  text-[#000] grid 2xl:grid-cols-[180px_repeat(4,270px)] xl:grid-cols-[60px_repeat(4,240px)] align-center items-center  ">
          <div className="col-start-2 ">
              <SoftForm
                    label="DESTINATION"
                    title="Destination"
                    subcript="Choose a city"
                    types="text"
                    value=""
                    showDropdown={true}
                    dropdownOptions={['Hanoi', 'Ho Chi Minh City', 'Da Nang']}
                    />
          </div>
          <div>
               <SoftForm
            label="PERSON"
            title="PERSON"
            subcript="1"
            value="optional"
            types="number"
            showDropdown={true}
            dropdownOptions={['1', '2', '3']}
            />   
              </div>
            <div className="select-none">
          
              <DatePickerComponent 
             label="CHECK IN"
             />
              </div>
            <div className="select-none">
                
                  <DatePickerComponent 
                  label="CHECK OUT"
                  />
            </div>
      </div>
      <div className="absolute cursor-pointer  inset-y-0 right-0 bg-[#FF7757] hover:bg-[#ffd2c7] text-[#fff] text-[36px] w-[170px] h-full rounded-r-[20px]  px-[20px] py-[60px] flex items-center justify-center">
        <div className=" ">
          Book Now
        </div>
         <ArrowRight size={40} strokeWidth={1} />  
      </div>
    </div>
  );
}
