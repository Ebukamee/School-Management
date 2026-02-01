import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CheckCircle2, Trophy, Users, Star, ArrowRight } from 'lucide-react';

// Register ScrollTrigger to animate on scroll
gsap.registerPlugin(ScrollTrigger);

const WhyOurSchool = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const reasons = [
    {
      title: "Academic Excellence",
      description: "Our rigorous curriculum and dedicated faculty ensure students receive a world-class education. With specialized programs in STEM and humanities, we prepare students for top universities.",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["25+ Special Courses", "98% Pass Rate", "Top 5% Nationally"],
      icon: Star
    },
    {
      title: "Championship Athletics",
      description: "Goldfield students excel both on and off the field. Our state-of-the-art facilities and expert coaching staff help student-athletes develop skills, teamwork, and sportsmanship.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["15 Varsity Sports", "State Championships", "Scholarship Pathways"],
      icon: Trophy
    },
    {
      title: "Vibrant Community",
      description: "From robotics to theater, debate to community service, our 40+ clubs provide opportunities for every student to explore passions and build lifelong friendships.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["40+ Clubs", "Arts Programs", "Leadership Roles"],
      icon: Users
    },
  ];

  useGSAP(() => {
    // Animate the Section Title
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

    // Animate each Reason Row
    const rows = gsap.utils.toArray<HTMLElement>(".anim-row");
    rows.forEach((row) => {
      gsap.from(row, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%", // Animation starts when top of row hits 85% of viewport height
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section className="py-20 bg-[#f8f9fc] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-20 anim-header">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#37368b] text-xs font-extrabold uppercase tracking-widest mb-6">
            <Star className="w-4 h-4 text-[#ffc53a]" />
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#37368b] mb-6 tracking-tight">
            The Goldfield Difference
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Discover what makes Goldfield Junior School the premier choice for students seeking excellence in education and personal development.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="space-y-24">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`anim-row flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border-8 border-white transform transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-72 lg:h-[500px] object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#37368b]/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Floating Icon Badge */}
                  <div className={`absolute bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} bg-white p-4 rounded-2xl shadow-lg`}>
                    <reason.icon className="w-8 h-8 text-[#ffc53a]" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-6 flex items-center gap-3">
                    <span className="text-[#ffc53a]">0{index + 1}.</span> {reason.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
                    {reason.description}
                  </p>
                  
                  {/* Stats/Features */}
                  <div className="space-y-4 mb-10">
                    {reason.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center space-x-3 group/stat">
                        <CheckCircle2 className="w-5 h-5 text-[#ffc53a] group-hover/stat:text-[#37368b] transition-colors" />
                        <span className="text-gray-700 font-bold text-base">{stat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className="inline-flex items-center gap-2 bg-white border-2 border-[#37368b] text-[#37368b] hover:bg-[#37368b] hover:text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 group">
                    Learn More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 bg-[#37368b] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/30 anim-row">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc53a] rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -ml-16 -mb-16"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Join the <span className="text-[#ffc53a]">Goldfield Family?</span>
            </h3>
            <p className="text-blue-100 text-lg mb-10 font-medium">
              Schedule a campus tour or speak with our admissions team to learn more about how we can help your student thrive.
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