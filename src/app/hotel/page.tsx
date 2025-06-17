'use client';
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedDestination from '@/components/FeaturedDestination';
import ExclusiveOffers from '@/components/ExclusiveOffers';
import Preview from '@/components/Preview';
import NewsLetter from '@/components/NewsLetter';

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
     
    </div>
  );
};

export default Home;
