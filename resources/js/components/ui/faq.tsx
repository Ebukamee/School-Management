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
      question: 'What is the application process?',
      answer: 'Submit an online application, academic transcripts, teacher recommendations, and a student essay. Applications are accepted January through March. Selected candidates are invited for a campus interview and assessment.'
    },
    {
      category: 'admissions',
      question: 'What are the admission requirements?',
      answer: 'We consider strong academic records (minimum 3.0 GPA), character, and diverse interests. Standardized test scores, teacher recommendations, and extracurricular involvement are all part of our holistic review process.'
    },
    {
      category: 'academics',
      question: 'How many AP courses are available?',
      answer: 'Northwood offers 25+ Advanced Placement courses across all subjects. Our students consistently score above average on AP exams, with 85% earning college credit.'
    },
    {
      category: 'academics',
      question: 'What academic support is available?',
      answer: 'We provide after-school tutoring, peer mentoring, writing center assistance, and subject-specific help sessions. Our learning resource center supports students with learning differences, and all teachers have regular office hours.'
    },
    {
      category: 'student-life',
      question: 'What extracurricular activities are offered?',
      answer: 'Choose from 40+ clubs and organizations including robotics, debate, theater, and cultural clubs. We also offer 15 varsity sports, performing arts programs, and leadership opportunities through student government.'
    },
    {
      category: 'student-life',
      question: 'What is the daily schedule?',
      answer: 'School runs 8:00 AM to 3:00 PM, Monday through Friday with an 85-minute block schedule, 45-minute lunch, and built-in study halls. After-school activities run 3:15 PM to 5:00 PM.'
    },
    {
      category: 'facilities',
      question: 'What technology resources are available?',
      answer: 'All students receive school-issued laptops with digital learning platform access. Campus features include computer labs, 3D printers, robotics equipment, high-speed WiFi, and a media center with production equipment.'
    },
    {
      category: 'facilities',
      question: 'Is transportation provided?',
      answer: 'Yes, bus transportation is available within district boundaries. Shuttle services, private transportation, and carpool coordination are also available through our parent association.'
    },
    {
      category: 'college',
      question: 'What college counseling is provided?',
      answer: 'Our comprehensive program begins freshman year with career exploration and continues through senior year with application support, essay workshops, interview prep, and financial aid guidance.'
    },
    {
      category: 'college',
      question: 'What are college acceptance rates?',
      answer: '98% of graduates are accepted to four-year colleges, with 85% admitted to their first or second choice schools. Students regularly gain acceptance to top-tier institutions including Ivy League schools.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'academics', label: 'Academics' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'facilities', label: 'Campus' },
    { id: 'college', label: 'College Prep' }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#37368b] rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            FAQs About Northwood
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about attending Northwood High School
          </p>
        </div>

        {/* Category Filters - Modern Pill Design */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setActiveIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#37368b] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4 text-left">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-[#37368b] transition-transform duration-300 ${
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
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA - Modern Design */}
        <div className="mt-16">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Need More Information?
              </h3>
              <p className="text-gray-600 mb-6">
                Our admissions team is here to help with any questions about Northwood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-[#37368b] text-white font-medium rounded-lg hover:bg-[#2a2970] transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email Admissions</span>
                </button>
                <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call (555) 123-4567</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#37368b]/30 transition-colors">
            <div className="w-10 h-10 bg-[#37368b]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#37368b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
            <p className="text-gray-600">(555) 123-4567</p>
            <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8AM-5PM</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#37368b]/30 transition-colors">
            <div className="w-10 h-10 bg-[#37368b]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#37368b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
            <p className="text-gray-600">admissions@northwood.edu</p>
            <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#37368b]/30 transition-colors">
            <div className="w-10 h-10 bg-[#37368b]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#37368b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Visit Campus</h4>
            <p className="text-gray-600">Schedule a Tour</p>
            <p className="text-sm text-gray-500 mt-1">See our campus in person</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;