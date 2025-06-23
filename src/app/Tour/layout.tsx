"use client";
import Header from '@/conponents/header';
import Footer from '@/components/Footer';

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header opacity='' />
      {children}
      <Footer />
    </>
  );
}
