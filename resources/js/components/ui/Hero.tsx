import { useRef } from "react";
import Navbar from "./NavHome";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const boxRef = useRef();

  useGSAP(() => {
    gsap.from(boxRef.current, {
  y: 1000,
  duration: 3, 
  ease: "power2.out" 
});;
  });
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("hero.png")'
      }}
    >
      <Navbar />
      <div className=" container mx-auto px-4" ref={boxRef} >
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Welcome Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Welcome to Northwood High School
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Fostering a community of learners and leaders, prepared for the challenges of tomorrow.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#ffc53a] hover:bg-[#C29000] text-white px-8 py-4 rounded-4xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Apply Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1e40af] text-white px-8 py-4 rounded-4xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Explore Programs
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100 text-lg">Graduation Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,200</div>
              <div className="text-blue-100 text-lg">Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;