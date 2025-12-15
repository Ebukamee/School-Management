const PrincipalMessage = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Modern & Clean */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#37368b] rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome from Principal Johnson
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Building a community where every student discovers their potential
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Principal's Photo - Modern Card Style */}
            <div className="lg:w-2/5">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Dr. Sarah Johnson, Principal"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Modern Info Card */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-[#37368b] font-semibold mt-1">Principal</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Education:</span>
                      M.Ed. Stanford University
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                      <span className="font-medium">Years at Northwood:</span>
                      8
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content - Clean & Modern */}
            <div className="lg:w-3/5">
              <div className="relative">
                {/* Modern Quote Design */}
                <div className="absolute -top-4 -left-4 text-[#37368b] opacity-10">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                  </svg>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    At Northwood, we're building more than just a school—we're creating a community where students 
                    can explore their passions, challenge themselves academically, and develop the skills needed 
                    for success beyond graduation.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our approach blends academic rigor with real-world application. Whether through our advanced STEM 
                    programs, competitive athletics, or diverse arts offerings, we provide opportunities for every 
                    student to find their path and excel.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    I invite you to explore what makes Northwood unique. From our state-of-the-art facilities to our 
                    dedicated faculty, we're committed to helping each student reach their full potential in a 
                    supportive, inclusive environment.
                  </p>
                </div>

                {/* Modern Stats */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl font-bold text-[#37368b]">98%</div>
                    <div className="text-sm text-gray-600 mt-1">Graduation Rate</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl font-bold text-[#37368b]">25+</div>
                    <div className="text-sm text-gray-600 mt-1">AP Courses</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl font-bold text-[#37368b]">40+</div>
                    <div className="text-sm text-gray-600 mt-1">Clubs & Sports</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl font-bold text-[#37368b]">95%</div>
                    <div className="text-sm text-gray-600 mt-1">College Acceptance</div>
                  </div>
                </div>

                {/* Modern Signature */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">All the best,</p>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-48 relative">
                          {/* Decorative signature line */}
                          <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-[#37368b]"></div>
                          <div className="absolute bottom-0 left-10 h-2 w-32 bg-[#37368b]/20 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Dr. Sarah Johnson</p>
                          <p className="text-sm text-gray-600">Principal, Northwood High</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Call to Action */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <span>Meet Our Team</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-[#37368b] border-2 border-[#37368b] hover:border-[#2a2970] px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <span>Contact Principal</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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