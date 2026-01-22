import { useState, useEffect } from 'react';
import AppLogoIcon from '../app-logo-icon';
import { Link } from '@inertiajs/react';

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Academics', href: '#academics' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Student Life', href: '#student-life' },
    { label: 'News', href: '#news' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Navigation Spacer */}
      <div className="h-20"></div>
      
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm top-0 py-2 border-gray-100' 
          : 'bg-transparent top-0 py-4'
      }`}>
        
        <nav className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            
            {/* 1. Left: Tiny Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-20">
              <div className={`transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}`}>
                <AppLogoIcon className="w-full h-full" /> 
              </div>
              <h1 className={`font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-[#1e40af] text-lg' : 'text-white text-xl'
              }`}>
                Goldfield<span className="font-light opacity-80">Jr.</span>
              </h1>
            </div>

            {/* 2. Center: Navigation Links */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`text-sm font-medium transition-all duration-200 relative py-1 hover:opacity-100 ${
                        isScrolled 
                          ? 'text-gray-600 hover:text-[#1e40af]' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? 'bg-[#1e40af]' : 'bg-[#ffc53a]'
                      }`}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Right: Portal & Apply Buttons */}
            <div className="hidden lg:flex flex-shrink-0 items-center gap-3 z-20">
              
              {/* PORTAL LINK (Sleek Outline Design) */}
              <Link
                href="/dashboard" 
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 transform hover:scale-105 ${
                    isScrolled 
                    ? 'border-[#1e40af] text-[#1e40af] hover:bg-blue-50' 
                    : 'border-white text-white hover:bg-white/10'
                }`}
              >
                Portal
              </Link>

              {/* APPLY BUTTON (Solid Yellow) */}
              <button className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#ffc53a] hover:bg-[#C29000] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors duration-200 z-20 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className={`lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out transform origin-top ${
            isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}>
            <div className="p-4 space-y-4">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block py-3 px-4 rounded-lg text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#1e40af]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Buttons */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard"
                  className="w-full border-2 border-[#1e40af] text-[#1e40af] py-2.5 rounded-xl font-bold text-sm text-center hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portal
                </Link>
                <button className="w-full bg-[#ffc53a] hover:bg-[#C29000] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;