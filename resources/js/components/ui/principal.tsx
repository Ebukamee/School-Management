const PrincipalMessage = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e40af] mb-4">
              Message from the Principal
            </h2>
            <div className="w-24 h-1 bg-[#dc2626] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Leading with Vision, Inspiring with Purpose
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Principal's Photo */}
            <div className="lg:w-2/5">
              <div className="relative">
                <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Dr. Sarah Johnson, Principal of Northwood High School"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#1e40af] rounded-2xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#dc2626] rounded-2xl -z-10"></div>
              </div>

              {/* Principal's Info */}
              <div className="text-center lg:text-left mt-8">
                <h3 className="text-2xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                <p className="text-lg text-[#1e40af] font-semibold mb-2">Principal</p>
                <p className="text-gray-600">Northwood High School</p>
                <p className="text-gray-500 text-sm">M.Ed. Educational Leadership, Stanford University</p>
              </div>
            </div>

            {/* Message Content */}
            <div className="lg:w-3/5">
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-[#1e40af] opacity-20">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                    Welcome to Northwood High School, where excellence in education meets character development. 
                    For over two decades, I've had the privilege of witnessing our students transform into 
                    remarkable young adults, ready to take on the world's challenges.
                  </p>

                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                    At Northwood, we believe that every student has unique talents and potential waiting to 
                    be unlocked. Our dedicated faculty works tirelessly to create an environment that 
                    nurtures academic achievement while fostering creativity, critical thinking, and 
                    compassion. We're not just preparing students for college; we're preparing them for life.
                  </p>

                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                    As you explore our website, I invite you to imagine your child thriving in our vibrant 
                    community. From our state-of-the-art facilities to our championship athletic programs 
                    and award-winning arts departments, Northwood offers unparalleled opportunities for 
                    growth and discovery.
                  </p>

                  {/* Signature */}
                  <div className="border-t border-gray-300 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-gray-900 font-semibold">Warm regards,</p>
                        <div className="mt-2">
                          <img 
                            src="/images/signature.png" 
                            alt="Dr. Sarah Johnson Signature"
                            className="h-12 w-48"
                            onError={(e) => {
                              // Fallback if signature image doesn't exist
                              e.currentTarget.style.display = 'none';
                            //   e.currentTarget.nextElementSibling!.style.display = 'block';
                            }}
                          />
                          <p className="text-[#1e40af] font-bold text-lg hidden">Dr. Sarah Johnson</p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex gap-6 text-center">
                        <div>
                          <div className="text-2xl font-bold text-[#dc2626]">25+</div>
                          <div className="text-sm text-gray-600">Years Experience</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-[#dc2626]">5,000+</div>
                          <div className="text-sm text-gray-600">Students Guided</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Meet Our Leadership Team
                </button>
                <button className="bg-transparent border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  Schedule Meeting with Principal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;