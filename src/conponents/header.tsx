'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import images from '@/../public/image';
import { Button } from './Button';
import Link from 'next/link';

interface Header{
  opacity:string;
}
const Header = (props : Header) => {
  const [activeTab, setActiveTab] = useState('Home');
  const navItems = ['Home','Hotel', 'Explore', 'Blog', 'Contact'];
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY >= headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight]);


  const renderHeaderContent = () => (
    <div className="w-full max-w-screen-3xl grid 2xl:grid-cols-[120px_1fr_120px] xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px] h-[70px] text-white z-10">
      <div className='col-start-2 col-end-2  h-full flex items-center justify-between'>
      {/* Logo */}
      <div className="max-w-[160px] h-[50px]">
        <Image src={images.logo} alt="logo" className="w-full h-full object-contain" />
      </div>

      {/* Nav */}
      <nav className="hidden md:flex gap-8 text-[16px] 2xl:text-[18px]">
      {navItems.map((item) => {
      const isActive = activeTab === item;
      const link = `${item.toLowerCase()}` === 'home' ? '/' :`/${item.toLowerCase()}`;

  return (
    <Link
      key={item}
      href={link}
      onClick={() => setActiveTab(item)}
      className="w-[90px] flex flex-col items-center select-none"
    >
      <span className={`text-[16px] 2xl:text-[18px] ${isActive ? 'font-bold' : ''}`}>
        {item}
      </span>
      {isActive && <div className="h-[3px] w-[70%] bg-[#ff7757] mt-1 transition-all" />}
    </Link>
  );
})}

      </nav>

      {/* Auth */}
      <div className="hidden sm:flex gap-6 items-center text-[18px] ">
        <span className="cursor-pointer select-none">Login</span>
        <Button  color="orange" className='px-3 py-2'>Sign up</Button>
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden text-xl cursor-pointer select-none">☰</div>
    </div>
    </div>
  );

  return (
    <>
      {/* Header mặc định */}
      <div ref={headerRef} className={`absolute top-0 left-0 w-full z-10 ${props.opacity === 'none' ? 'bg-transparent': 'bg-[#0A0808cc]'}`}>
        {renderHeaderContent()}
      </div>

      {/* Sticky Header */}
      <div className={`fixed h-[70px] top-0 left-0 w-full z-50 bg-[#0A0808cc] backdrop-blur-md transition-transform duration-300 ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        {renderHeaderContent()}
      </div>
    </>
  );
};

export default Header;
