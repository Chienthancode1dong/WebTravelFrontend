"use client";
import Footer from '@/components/Footer';
import Header from '@/conponents/header';

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header opacity=''/>
      {children}
      <Footer />
    </>
  );
}
