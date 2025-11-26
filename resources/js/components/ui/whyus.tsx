import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const WhyOurSchool = () => {
  const reasons = [
    {
      title: "Academic Excellence",
      description: "Our rigorous curriculum and dedicated faculty ensure students receive a world-class education. With over 25 Advanced Placement courses and specialized programs in STEM and humanities, we prepare students for top universities and future careers.",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: ["25+ AP Courses", "98% Graduation Rate", "Top 5% Nationally"]
    },
    {
      title: "Championship Athletics",
      description: "Northwood Hawks excel both on and off the field. Our state-of-the-art facilities and expert coaching staff help student-athletes develop skills, teamwork, and sportsmanship while competing at the highest levels.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: ["15 Varsity Sports", "State Championships", "College Scholarships"]
    },
    {
      title: "Vibrant Extra-Curriculars",
      description: "From robotics to theater, debate to community service, our 40+ clubs and organizations provide opportunities for every student to explore passions, develop leadership skills, and build lifelong friendships.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stats: ["40+ Clubs", "Arts Programs", "Leadership Opportunities"]
    },
  ];
  const boxref = useRef()
  useGSAP(() => {
    gsap.from(boxref.current, {
 opacity: 0,      
  duration: 20, 
  ease: "power2.out"
});;
  });
  return (
    <section className="py-16 lg:p-30 bg-gray-50" ref={boxref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e40af] mb-4">
            Why Choose Northwood High?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes Northwood High School the premier choice for students seeking excellence in education, athletics, and personal development.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="space-y-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-12`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1e40af] mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {reason.description}
                  </p>
                  
                  {/* Stats/Features */}
                  <div className="space-y-3">
                    {reason.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#ffc53a]  rounded-full"></div>
                        <span className="text-gray-700 font-medium">{stat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className="mt-8 bg-[#37368B] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-4xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-bold text-[#37368B] mb-4">
            Ready to Join the Northwood Family?
          </h3>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Schedule a campus tour or speak with our admissions team to learn more about how Northwood High School can help your student thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#ffc53a] hover:bg-[#C29000] text-white px-8 py-3 rounded-4xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Schedule a Tour
            </button>
            <button className="bg-transparent border-2 border-[#37368B] text-[#37368B] hover:bg-[#1e40af] hover:text-white px-8 py-3 rounded-4xl font-semibold transition-all duration-300">
              Contact Admissions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOurSchool;