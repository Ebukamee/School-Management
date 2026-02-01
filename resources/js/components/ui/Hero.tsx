import { useRef } from "react";
import Navbar from "./NavHome"; // Assuming this is your transparent navbar
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, GraduationCap, Users, BookOpen } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate Text Elements Staggered
    tl.from(".anim-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.5 // Wait for page load/nav
    });

    // Animate Stats Row
    tl.from(".anim-stats", {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image with optimized overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: 'url("hero.png")', // Ensure this path is correct
        }}
      >
        {/* Gradient Overlay: Royal Blue tint to darken image for text readability */}
        <div className="absolute inset-0 bg-[#37368b]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar Positioned Absolute Top */}
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20" ref={textRef}>
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="anim-text inline-flex items-center gap-2 bg-[#ffc53a]/20 border border-[#ffc53a]/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#ffc53a] rounded-full animate-pulse"></span>
            <span className="text-xs font-extrabold text-[#ffc53a] uppercase tracking-widest">Admissions Open 2026/2027</span>
          </div>

          {/* Headline */}
          <h1 className="anim-text text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Fostering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc53a] to-amber-200">Leaders</span> <br />
            of Tomorrow
          </h1>

          {/* Subheadline */}
          <p className="anim-text text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Welcome to Goldfield Junior School. We provide a world-class education that empowers students to excel academically and grow personally.
          </p>

          {/* Buttons */}
          <div className="anim-text flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group bg-[#ffc53a] hover:bg-[#eeb025] text-white px-8 py-4 rounded-xl font-extrabold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-amber-900/20 active:scale-95 flex items-center justify-center gap-2">
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/10 hover:bg-white text-white hover:text-[#37368b] border border-white/30 hover:border-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
              Explore Programs
            </button>
          </div>

          {/* Floating Stats Card */}
          <div className="anim-stats grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            
            {/* Stat 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4 text-left hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#ffc53a] flex items-center justify-center text-[#37368b] shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">98%</div>
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider">Pass Rate</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4 text-left hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#37368b] shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">1,200+</div>
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider">Students</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4 text-left hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#37368b] border border-white/20 flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">25+</div>
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider">Subjects</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#ffc53a] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;