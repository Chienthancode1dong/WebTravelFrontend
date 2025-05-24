'use client'

import Header from "@/conponents/header";
import Hero from "@/app/sections/hero";
import Destinations from "@/app/sections/Destinations"; 
import TourAvail from "./sections/tourAvail";
export default function Home() {
  return (
     
    <main className="w-full min-h-screen z-0 ">
       <Header opacity="none"/>
      {/* Hero Section */}
      
      <Hero />

      {/* Nội dung bên dưới */}
      {/* <Destinations /> */}

      <TourAvail/>
    </main>
  );
}
