import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Quote, Mail, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PrincipalMessage = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate the main card scaling up
    gsap.from(".anim-card", {
      y: 100,
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Starts when top of section hits 85% viewport
      }
    });

    // Stagger animate the content inside
    gsap.from(".anim-content > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2, // Wait slightly for card to appear
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

  }, { scope: containerRef });

  return (
    <section className="py-20 lg:py-28 bg-[#f8f9fc]" ref={containerRef}>
      <div className="container mx-auto px-4">
        
        {/* Main Card */}
        <div className="anim-card max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl shadow-indigo-900/5 overflow-hidden border border-white transform-gpu">
          
          {/* Decorative Top Bar */}
          <div className="h-3 w-full bg-gradient-to-r from-[#37368b] via-[#37368b] to-[#ffc53a]"></div>

          <div className="p-8 md:p-16 anim-content">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#ffc53a] rounded-full animate-pulse"></span>
                <span className="text-xs font-extrabold text-[#37368b] uppercase tracking-widest">Principal's Desk</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#37368b] tracking-tight mb-6">
                Welcome to Goldfield
              </h2>
              <div className="w-24 h-1.5 bg-[#ffc53a] rounded-full mx-auto"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-4 md:-left-8 text-[#ffc53a]/20">
                <Quote className="w-20 h-20 fill-current transform -scale-x-100" />
              </div>

              <div className="relative z-10 space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  At Goldfield Junior School, we're building more than just a school—we're creating a community where students 
                  can explore their passions, challenge themselves academically, and develop the skills needed 
                  for success beyond graduation.
                </p>

                <p>
                  Our approach blends academic rigor with real-world application. Whether through our advanced STEM 
                  programs, competitive athletics, or diverse arts offerings, we provide opportunities for every 
                  student to find their path and excel.
                </p>

                <p>
                  I invite you to explore what makes us unique. From our state-of-the-art facilities to our 
                  dedicated faculty, we're committed to helping each student reach their full potential in a 
                  supportive, inclusive environment.
                </p>
              </div>
            </div>

    

           

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                <span>Meet Our Team</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-[#37368b] border-2 border-[#37368b] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold transition-all">
                <Mail className="w-4 h-4" />
                <span>Contact Principal</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;