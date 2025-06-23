
'use client';

import Header from "@/conponents/header";
import Hero from "@/app/sections/hero";
import Comment from "@/app/sections/comment";
import TourAvail from "./sections/tourAvail";

export default function Home() {
  return (
    <main className="w-full min-h-screen z-0 overflow-x-hidden ">
      <Header opacity="none" />
      {/* Hero Section */}

      <Hero />

      {/* Nội dung bên dưới */}
      {/* <Destinations /> */}

      <TourAvail />
      <Comment />
    </main>
  );
}
