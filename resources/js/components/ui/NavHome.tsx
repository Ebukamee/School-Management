import { useState, useEffect } from 'react';

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
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Academics', href: '#academics' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Student Life', href: '#student-life' },
    { label: 'News & Events', href: '#news' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: '📞', text: '(555) 123-4567' },
    { icon: '✉️', text: 'info@northwoodhigh.edu' },
  ];

  const socialLinks = [
    { icon: '📘', href: '#' },
    { icon: '🐦', href: '#' },
    { icon: '📷', href: '#' },
    { icon: '💼', href: '#' },
  ];

  return (
    <>
      {/* Navigation Spacer - Prevents content from being hidden behind fixed nav */}
      <div className="h-32 lg:h-28"></div>
      
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-sm top-0' 
          : 'bg-transparent top-10'
      }`}>
        

        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#1e40af]' : 'text-white'
                }`}>
                  Northwood High School
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`font-medium transition-colors duration-200 relative py-2 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-[#1e40af]' 
                          : 'text-white hover:text-blue-200'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 hover:w-full ${
                        isScrolled ? 'bg-[#1e40af]' : 'bg-white'
                      }`}></span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Apply Button */}
              <button className="bg-[#ffc53a] hover:bg-[#C29000] text-white px-6 py-2 rounded-4xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block py-3 px-4 rounded-lg transition-colors duration-200 font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1e40af]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Apply Button */}
              <div className="mt-4 px-4">
                <button className="w-full bg-[#ffc53a] hover:bg-[#C29000] text-white py-3 rounded-4xl font-semibold transition-colors duration-200 shadow-md">
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;