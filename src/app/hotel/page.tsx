'use client';
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedDestination from '@/components/FeaturedDestination';
import ExclusiveOffers from '@/components/ExclusiveOffers';
import Preview from '@/components/Preview';
import NewsLetter from '@/components/NewsLetter';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Preview />
      <NewsLetter />
      <Footer/>
    </div>
  );
};

export default Home;
