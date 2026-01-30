import { useState, useEffect } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const { url } = usePage(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Logic: 
  // 1. Is Home? (Strict check for '/')
  // 2. Background is White if: NOT Home OR (Is Home AND Scrolled)
  const isHome = url === '/';
  const showWhiteBg = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Academics', href: '#academics' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Student Life', href: '#student-life' },
    { label: 'School News', href: '/blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed mb- top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out h-20 ${
        showWhiteBg 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <nav className="h-full w-[90%] mb-[100px]  mx-auto px-4 md:px-8">
        <div className="h-full flex items-center justify-between">
          
          {/* 1. Left: Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer z-20 group">
            {/* Icon Background */}
            <div className={`flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm ${
                showWhiteBg 
                  ? 'bg-[#ffc53a] w-10 h-10' 
                  : 'bg-white/20 backdrop-blur-sm w-11 h-11 group-hover:bg-white/30'
              }`}>
              <AppLogoIcon className={`w-6 h-6 ${showWhiteBg ? 'text-[#37368b]' : 'text-white'}`} /> 
            </div>
            
            <div className="flex flex-col">
              <h1 className={`font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                showWhiteBg ? 'text-[#37368b] text-xl' : 'text-white text-2xl'
              }`}>
                Goldfield
              </h1>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  showWhiteBg ? 'text-[#ffc53a]' : 'text-blue-100'
              }`}>
                  Junior School
              </span>
            </div>
          </Link>

          {/* 2. Center: Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`text-sm font-bold transition-all duration-200 relative py-2 group ${
                      showWhiteBg 
                        ? 'text-gray-600 hover:text-[#37368b]' 
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-[3px] rounded-full transition-all duration-300 group-hover:w-full ${
                      showWhiteBg ? 'bg-[#37368b]' : 'bg-[#ffc53a]'
                    }`}></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Right: Portal & Apply Buttons */}
          <div className="hidden lg:flex flex-shrink-0 items-center gap-4 z-20">
            
            {/* PORTAL LINK */}
            <Link
              href="/dashboard" 
              className={`px-6 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  showWhiteBg 
                  ? 'border-[#37368b] text-[#37368b] hover:bg-[#37368b]/5' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              Portal
            </Link>

            {/* APPLY BUTTON */}
            <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#ffc53a] hover:bg-[#eeb025] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-900/20 active:scale-95">
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 z-20 ${
              showWhiteBg ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`lg:hidden fixed inset-x-0 top-[80px] bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl transition-all duration-300 ease-in-out transform origin-top ${
          isMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="p-6 space-y-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-3 px-4 rounded-xl text-base font-bold text-gray-600 hover:bg-[#37368b]/5 hover:text-[#37368b] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Mobile Buttons */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              <Link
                href="/dashboard"
                className="w-full border-2 border-[#37368b] text-[#37368b] py-3 rounded-xl font-bold text-sm text-center hover:bg-[#37368b]/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portal
              </Link>
              <button className="w-full bg-[#ffc53a] text-[#37368b] py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#eeb025] transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;