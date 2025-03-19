/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import './style/index.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuHeight, setMobileMenuHeight] = useState<number>(0);
  const mobileMenuContentRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (mobileMenuContentRef.current) {
      setMobileMenuHeight(isMenuOpen ? mobileMenuContentRef.current.scrollHeight : 0);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        event.target &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { id: 1, name: 'TRANG CHỦ', path: '/' },
    { id: 2, name: 'THỂ LỆ', path: '/' },
    { id: 3, name: 'THÔNG BÁO', path: '/' },
    { id: 4, name: 'SỰ KIỆN', path: '/' },
  ];

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-md' : 'py-3'
          }`}
        style={{ backgroundColor: '#1c75bc' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center max-w-[80%] md:max-w-none">
              <img
                src="https://ntthnue.edu.vn/uploads/Images/2023/V3/Logo_Web_Bo%20tr%E1%BA%AFng.png"
                alt="Logo trường"
                className="h-12 md:h-14 w-auto mr-2 md:mr-3"
              />
              <div className="flex flex-col">
                <span className="text-[13px] md:text-sm leading-tight font-medium text-white">TRƯỜNG ĐẠI HỌC SƯ PHẠM HÀ NỘI</span>
                <h2 className="text-[16px] md:text-xl leading-tight md:leading-normal font-bold text-white">
                  TRƯỜNG THCS VÀ THPT NGUYỄN TẤT THÀNH
                </h2>
              </div>
            </div>

            <nav className="hidden md:flex items-center">
              {menuItems.map((item, index) => (
                <a
                  key={item.id}
                  href={item.path}
                  className={`relative py-2 px-3 text-sm font-medium text-white hover:text-yellow-200 transition-all duration-300 ${index < menuItems.length - 1 ? 'border-r  border-blue-300 mr-1' : ''
                    }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden p-2 text-white focus:outline-none transition-transform duration-300 ease-in-out"
              onClick={toggleMenu}
              aria-label="Menu chính"
              style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: `${mobileMenuHeight}px` }}
        >
          <div ref={mobileMenuContentRef} className="px-2 pt-2 pb-3 bg-[#1c75bc]">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="block px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 rounded-md transition-all duration-200 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="w-full bg-gray-100 py-2 border-y border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center">
          <Bell className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" />
          <div className="overflow-hidden w-full">
            <div className="marquee-container">
              <p className="marquee-text text-pink-500 text-[14px] md:text-base">
                Chào mừng bạn đã đến với trường THCS và THPT Nguyễn Tất Thành - Hà Nội
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
