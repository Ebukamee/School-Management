import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CheckCircle2, Trophy, Star, Lightbulb, ArrowRight } from 'lucide-react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const WhyOurSchool = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const reasons = [
    {
      title: "Academic Excellence",
      description: "We blend the Nigerian Basic Education Curriculum with global best practices. Our focus on STEM and critical thinking ensures 100% distinction rates in the Basic Education Certificate Examination (BECE).",
      stats: ["100% BECE Pass Rate", "CBT Training Center", "French & Local Languages"],
      icon: Star
    },
    {
      title: "Sports & Development",
      description: "A healthy body fuels a sharp mind. From our fiercely competitive Annual Inter-house Sports to state-level football and athletics meets, we groom champions who value discipline and teamwork.",
      stats: ["Annual Inter-house Sports", "Football Academy", "Table Tennis & Athletics"],
      icon: Trophy
    },
    {
      title: "Moral & Cultural Values",
      description: "We are big on discipline and culture. Through the JETS Club, Literary & Debating Society, and Cultural Troupe, we raise students who are not just brilliant, but also respectful and culturally grounded.",
      stats: ["JETS Club & Red Cross", "Lit. & Debating Society", "Moral Instruction"],
      icon: Lightbulb
    },
  ];

  useGSAP(() => {
    // Animate Header
    gsap.from(".anim-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Animate Grid Cards (Batched)
    ScrollTrigger.batch(".anim-card", {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all"
        });
      },
      start: "top 85%",
      once: true
    });

  }, { scope: containerRef });

  return (
    <section className="py-20 bg-[#f8f9fc] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 anim-header">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#37368b] text-xs font-extrabold uppercase tracking-widest mb-6">
            <Star className="w-4 h-4 text-[#ffc53a]" />
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#37368b] mb-6 tracking-tight">
            The Goldfield Standard
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Discover what makes Goldfield Junior School the premier choice for parents seeking a solid foundation in education and character.
          </p>
        </div>

        {/* Reasons Grid (No Images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="anim-card group bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 border border-gray-100 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-[#37368b] rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="w-8 h-8 text-[#ffc53a]" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-extrabold text-[#37368b] mb-4 group-hover:text-[#ffc53a] transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8">
                {reason.description}
              </p>

              {/* Stats List */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                {reason.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ffc53a] flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-700">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#37368b] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/30 anim-header">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc53a] rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -ml-16 -mb-16"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Join the <span className="text-[#ffc53a]">Goldfield Family?</span>
            </h3>
            <p className="text-blue-100 text-lg mb-10 font-medium">
              Schedule a campus tour or speak with our admissions team to learn more about how we can help your child thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#ffc53a] hover:bg-[#eeb025] text-[#37368b] px-8 py-4 rounded-xl font-extrabold transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95">
                Schedule a Tour
              </button>
              <button className="bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-extrabold transition-all duration-300 hover:bg-white/10">
                Contact Admissions
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyOurSchool;