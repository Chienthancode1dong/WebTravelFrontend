import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { assets } from '../../public/assets/assets.js'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khách sạn', path: '/hotel' },
    { name: 'Blog', path: '/' },
    { name: 'Liên hệ', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <nav className={`fixed  top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${pathname === '/hotel' && !isScrolled ? 'bg-none ' : 'bg-[var(--color-2)] shadow-md  backdrop-blur-lg'} ${isScrolled ? 'py-3 md:py-4' : 'py-4 md:py-6'}`}>
      {/* Logo */}
      <Link href='/'>
        <Image src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} width={36} height={36} />
      </Link>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${pathname === '/hotel' && !isScrolled ? 'text-[#fff]' : 'text-[#000]'} `}
          >
            {link.name}
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${pathname === '/hotel' && !isScrolled ? 'bg-white' : 'bg-black'}`} />
          </Link>
        ))}
        <Link href={'/admin'} className="flex items-center">
              <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${pathname === '/hotel' && !isScrolled ? 'text-white border-white' : 'text-black border-black'} transition-all`}>
                Dashboard
              </button>
        </Link>
        
      </div>
      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Image src={assets.searchIcon} alt="search" className={`${pathname === '/hotel' && !isScrolled ? 'invert' : ''} h-7 transition-all duration-500`} width={28} height={28} />
      </div>
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <Image onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu" className={`${pathname === '/hotel' && !isScrolled ? 'invert' : ''} h-4`} width={16} height={16} />
      </div>
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)} title="Đóng menu">
          <Image src={assets.closeIcon} alt="close-menu" className='h-6.5' width={26} height={26} />
        </button>
        {navLinks.map((link, i) => (
          <Link key={i} href={link.path} onClick={() => setIsMenuOpen(false)} className={`${pathname === '/hotel' && !isScrolled ? 'text-[#fff]' : 'text-[#000]'}`}> 
            {link.name}
          </Link>
        ))}
        <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${pathname === '/hotel' && !isScrolled ? 'text-white border-white' : 'text-black border-black'}`}>
          Dashboard
        </button>
      </div>
    </nav>
  );
}

export default Navbar
