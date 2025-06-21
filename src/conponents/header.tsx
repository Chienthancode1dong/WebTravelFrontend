'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import images from '@/../public/image';
import { Button } from './Button';
import Link from 'next/link';
import { assets } from '@/../public/assets/assets';
import { hr } from 'date-fns/locale';
import { usePathname } from 'next/navigation';
interface Header{
  opacity:string;
}
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Hotel', path: '/hotel/AllRoom' },
  { label: 'Tour', path: '/Tour/AllTour' },
  { label: 'Blog', path: '/blog' },
  { label: 'Liên hệ', path: '/contact-us' }, // ví dụ custom path
  { label: 'Ưu đãi', path: '/special-offers' }, // ví dụ custom path
];
const Header = (props : Header) => {
  const pathname = usePathname();
  const getActiveTab = () => {
    const found = navLinks.find(link => link.path === pathname);
    return found ? found.label : navLinks[0].label;
  };
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  // Giả lập trạng thái đăng nhập (có thể thay bằng context hoặc lấy từ localStorage/token thực tế)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    setActiveTab(getActiveTab());
    // eslint-disable-next-line
  }, [pathname]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Xoá token, clear localStorage, ... nếu cần
  };

  const renderHeaderContent = () => (
    <div className="w-full max-w-screen-3xl grid 2xl:grid-cols-[120px_1fr_120px] xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px] h-[70px] text-white z-10">
      <div className='col-start-2 col-end-2  h-full flex items-center justify-between'>
      {/* Logo */}
      <div className="max-w-[160px] h-[50px]">
          <Link href='/'>
        <Image src={assets.logo} alt="logo" className={`h-9 `} width={160} height={50} />
      </Link>  
      </div>

      {/* Nav */}
      <nav className="hidden md:flex gap-8 text-[16px] 2xl:text-[18px]">
        {navLinks.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={() => setActiveTab(item.label)}
              className="w-[90px] group flex flex-col items-center select-none"
            >
              <span className={`text-[16px] group 2xl:text-[18px] ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive ? (
                <div className="h-[3px] w-[70%] bg-[#ff7757]  transition-all" />
              ) : (
                <div className='h-[3px] w-0 group-hover:w-[70%] transition-all duration-300 bg-white' />
              )}
            </Link>
          );
        })}
      </nav>
      {/* Auth */}
      <div className="hidden sm:flex gap-6 items-center text-[18px] ">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
          >
            Đăng xuất
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Đăng nhập
          </Link>
        )}
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
