import { Instagram, Twitter, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Academics', href: '#academics' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Student Life', href: '#student-life' },
    { name: 'Athletics', href: '#' },
    { name: 'News', href: '#news' },
    { name: 'Calendar', href: '#' },
  ];

  const programs = [
    { name: 'STEM Program', href: '#' },
    { name: 'Arts & Culture', href: '#' },
    { name: 'JSS Curriculum', href: '#' },
    { name: 'Sports Academy', href: '#' },
    { name: 'Clubs', href: '#' },
  ];

  const contactInfo = [
    { icon: MapPin, text: '123 School Road, Ikeja, Lagos' },
    { icon: Phone, text: '(+234) 801-234-5678' },
    { icon: Mail, text: 'info@goldfield.edu.ng' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-[#1a1a40] text-white pt-20 pb-8 border-t-4 border-[#ffc53a]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">Goldfield</h3>
              <p className="text-[#ffc53a] text-xs font-bold uppercase tracking-[0.2em]">Junior School</p>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed font-medium">
              Nurturing future leaders through academic excellence and character development since 2010.
            </p>
            
            {/* Newsletter */}
            <div className="pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Stay Updated</h4>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-2.5 rounded-l-lg bg-white/10 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-1 focus:ring-[#ffc53a] focus:border-[#ffc53a]"
                    />
                    <button className="bg-[#ffc53a] hover:bg-[#eeb025] text-[#37368b] px-4 py-2.5 rounded-r-lg font-bold transition-colors duration-200 text-sm">
                        Go
                    </button>
                </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                Explore
                <span className="w-2 h-2 rounded-full bg-[#ffc53a]"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-blue-200 hover:text-[#ffc53a] transition-colors duration-200 text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:bg-[#ffc53a] transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                Programs
                <span className="w-2 h-2 rounded-full bg-[#ffc53a]"></span>
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a href={program.href} className="text-blue-200 hover:text-[#ffc53a] transition-colors duration-200 text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:bg-[#ffc53a] transition-colors"></span>
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                Contact Us
                <span className="w-2 h-2 rounded-full bg-[#ffc53a]"></span>
            </h4>
            <ul className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-blue-200 font-medium">
                  <item.icon className="w-5 h-5 text-[#ffc53a] mt-0.5 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-[#ffc53a] hover:text-[#37368b] rounded-xl flex items-center justify-center transition-all duration-300 text-white"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-blue-300">
            <div>
              © {currentYear} Goldfield Junior School. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;