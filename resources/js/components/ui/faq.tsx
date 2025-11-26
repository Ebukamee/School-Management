import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      category: 'admissions',
      question: 'What is the application process for Northwood High School?',
      answer: 'Our application process includes submitting an online application, academic transcripts, teacher recommendations, and a student essay. Applications are accepted from January through March for the following academic year. After initial review, selected candidates are invited for a campus interview and placement assessment.'
    },
    {
      category: 'admissions',
      question: 'What are the admission requirements?',
      answer: 'We look for students with strong academic records, demonstrated character, and diverse interests. Specific requirements include a minimum 3.0 GPA, satisfactory standardized test scores, positive teacher recommendations, and evidence of extracurricular involvement. Each application is reviewed holistically.'
    },
    {
      category: 'academics',
      question: 'How many AP courses does Northwood offer?',
      answer: 'Northwood High School offers 25+ Advanced Placement courses across all subject areas, including AP Calculus, AP Sciences, AP Humanities, and AP Arts. Our students consistently achieve above-average AP exam scores, with 85% earning college credit.'
    },
    {
      category: 'academics',
      question: 'What support is available for students who need academic help?',
      answer: 'We provide comprehensive academic support including after-school tutoring, peer mentoring, writing center assistance, and subject-specific help sessions. Our learning resource center offers specialized support for students with learning differences, and all teachers maintain regular office hours for individual help.'
    },
    {
      category: 'student-life',
      question: 'What extracurricular activities are available?',
      answer: 'Students can choose from over 40 clubs and organizations including robotics, debate, theater, community service, and cultural clubs. We also offer 15 varsity sports, performing arts programs, and leadership opportunities through student government and various campus initiatives.'
    },
    {
      category: 'student-life',
      question: 'What are the school hours and daily schedule?',
      answer: 'School runs from 8:00 AM to 3:00 PM, Monday through Friday. Our block schedule features 85-minute classes with a 45-minute lunch period and built-in study halls. After-school activities typically run from 3:15 PM to 5:00 PM.'
    },
    {
      category: 'facilities',
      question: 'What technology resources are available to students?',
      answer: 'All students receive school-issued laptops with access to our digital learning platform. Our campus features state-of-the-art computer labs, 3D printers, robotics equipment, and high-speed WiFi throughout. The library media center offers additional computers, scanners, and multimedia production equipment.'
    },
    {
      category: 'facilities',
      question: 'Is transportation provided?',
      answer: 'Yes, Northwood provides bus transportation for students living within our district boundaries. We also offer shuttle services from designated pickup points. Private transportation options and carpool coordination are available through our parent association.'
    },
    {
      category: 'financial',
      question: 'What is the tuition and are scholarships available?',
      answer: 'Tuition for the 2024 academic year is $25,000. We offer need-based financial aid to approximately 30% of our student body, with awards ranging from partial to full tuition. Merit scholarships are also available for exceptional students in academics, arts, and athletics.'
    },
    {
      category: 'financial',
      question: 'What additional costs should we expect beyond tuition?',
      answer: 'Additional costs include textbooks ($400-600 annually), uniforms ($300-500), technology fees ($200), and optional expenses for field trips, AP exams, and extracurricular activities. Financial aid can be applied to many of these additional costs.'
    },
    {
      category: 'college',
      question: 'What college counseling services are provided?',
      answer: 'Our comprehensive college counseling program begins in freshman year with career exploration and progresses through senior year with application support. Students receive individual counseling, essay workshops, interview preparation, and guidance on financial aid and scholarship applications.'
    },
    {
      category: 'college',
      question: 'What are the college acceptance rates for Northwood graduates?',
      answer: '98% of our graduates are accepted to four-year colleges and universities, with 85% gaining admission to their first or second choice schools. Our students regularly gain acceptance to top-tier institutions including Ivy League schools, state universities, and specialized colleges.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'academics', label: 'Academics' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'financial', label: 'Financial' },
    { id: 'college', label: 'College Prep' }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e40af] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#dc2626] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Northwood High School. Can't find what you're looking for? 
            Contact our admissions team for personalized assistance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#1e40af] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-[#1e40af] transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Our admissions team is here to help. Contact us for personalized answers 
              and to learn more about how Northwood can be the right fit for your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1e40af] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Admissions
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e40af] px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
            <p className="text-gray-600">(555) 123-4567</p>
            <p className="text-sm text-gray-500">Mon-Fri, 8AM-5PM</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
            <p className="text-gray-600">admissions@northwood.edu</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Visit Campus</h4>
            <p className="text-gray-600">Schedule a Tour</p>
            <p className="text-sm text-gray-500">See Northwood in person</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;