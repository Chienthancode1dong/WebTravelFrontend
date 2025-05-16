'use client'

import Header from "@/conponents/header";
import Hero from "@/app/sections/hero";
import Destinations from "@/app/sections/Destinations";
export default function Home() {
  return (
     
    <main className="w-full min-h-screen z-0 relative">
       <Header/>
      {/* Hero Section */}
      
      <Hero />

      {/* Nội dung bên dưới */}
      <Destinations />
    </main>
  );
}
