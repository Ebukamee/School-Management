import { useState, useRef } from 'react';
import { 
    ChevronDown, 
    HelpCircle, 
    Mail, 
    Phone, 
    MapPin, 
    ArrowRight 
} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // CONTEXT: Updated for Nigerian Secondary School System
    const faqData: FAQItem[] = [
        {
            category: 'admissions',
            question: 'When is the entrance examination for JSS1?',
            answer: 'Our Common Entrance Examination usually takes place in March and May. Application forms can be purchased from the school admin office or downloaded from our website. We also accept transfer students into JSS2 and SS1 based on availability.'
        },
        {
            category: 'admissions',
            question: 'What is the minimum age for admission?',
            answer: 'Prospective students for JSS1 must be at least 10 years old by September of the admission year. They are required to bring their last term result and birth certificate for verification.'
        },
        {
            category: 'academics',
            question: 'Do you write international exams alongside WAEC?',
            answer: 'Yes, Goldfield Junior School runs a blended curriculum. While we prepare students primarily for WAEC, NECO, and JAMB, we also offer preparation for IGCSE and SATs for students planning to study abroad.'
        },
        {
            category: 'academics',
            question: 'Do you offer science and arts subjects?',
            answer: 'Absolutely. From JSS1-3, students take all core subjects. In SS1, they are guided by our counselors to choose a department (Science, Arts, or Commercial) based on their strength in the BECE (Junior Waec) results.'
        },
        {
            category: 'boarding',
            question: 'Is the school strictly boarding?',
            answer: 'We operate a hybrid system. Parents can choose between Day and Boarding options. Our hostels are separate for boys and girls, supervised by experienced House Parents, with a guaranteed 24/7 power and water supply.'
        },
        {
            category: 'boarding',
            question: 'What are the visiting days?',
            answer: 'Visiting Day is the first Sunday of every month, from 12:00 PM to 5:00 PM. Parents are strictly not allowed to bring cooked food, but provisions are allowed as per the school handbook.'
        },
        {
            category: 'student-life',
            question: 'What extracurricular activities do you have?',
            answer: 'We believe in holistic education. Fridays are for clubs like JET Club, Press Club, Red Cross, and Literary & Debating Society. We also host annual Inter-house Sports competitions and Cultural Days.'
        },
        {
            category: 'fees',
            question: 'Can school fees be paid in installments?',
            answer: 'Yes, while we encourage full payment before resumption, we allow a 60% payment at the start of the term, with the balance to be paid before the midterm break.'
        },
        {
            category: 'fees',
            question: 'Does the school fee cover books and uniforms?',
            answer: 'For new intakes, there is a one-time "Development & Setup" fee that covers two sets of uniforms, a house wear, a cardigan, and the complete set of textbooks for the session.'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Questions' },
        { id: 'admissions', label: 'Admissions' },
        { id: 'academics', label: 'Academics' },
        { id: 'boarding', label: 'Boarding' },
        { id: 'student-life', label: 'Student Life' },
        { id: 'fees', label: 'School Fees' }
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filteredFAQs = activeCategory === 'all' 
        ? faqData 
        : faqData.filter(faq => faq.category === activeCategory);

    // --- ANIMATIONS ---
    useGSAP(() => {
        // 1. Animate Header
        gsap.from(".anim-faq-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        // 2. Animate FAQ List Items (Batched)
        // This ensures the list cascades smoothly even if it's very long
        ScrollTrigger.batch(".anim-faq-item", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out",
                    clearProps: "all"
                });
            },
            start: "top 90%",
            once: true
        });

        // 3. Animate Contact Card
        gsap.from(".anim-contact-card", {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-contact-trigger",
                start: "top 85%",
            }
        });

        // 4. Animate Quick Info Cards (Batched Grid)
        // Fixed the grid animation issue here
        ScrollTrigger.batch(".anim-info-card", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all"
                });
            },
            start: "top 90%",
            once: true
        });

    }, { scope: containerRef });

    return (
        <section className="py-20 lg:py-28 bg-white" id="faq" ref={containerRef}>
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Section Header */}
                <div className="text-center mb-16 anim-faq-header">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 bg-[#ffc53a] rounded-full animate-pulse"></span>
                        <span className="text-xs font-extrabold text-[#37368b] uppercase tracking-widest">Common Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#37368b] mb-6 tracking-tight">
                        FAQs About Goldfield
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Everything you need to know about admission into JSS1, transfer procedures, and life at Goldfield.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 anim-faq-header">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setActiveCategory(category.id);
                                setActiveIndex(null);
                            }}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                                activeCategory === category.id
                                    ? 'bg-[#37368b] text-white shadow-lg shadow-indigo-900/20'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#37368b]'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* FAQ Grid */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {filteredFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 anim-faq-item ${
                                activeIndex === index 
                                    ? 'border-[#37368b] bg-blue-50/30 shadow-md' 
                                    : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className={`text-base md:text-lg font-bold pr-8 transition-colors ${
                                    activeIndex === index ? 'text-[#37368b]' : 'text-gray-800'
                                }`}>
                                    {faq.question}
                                </h3>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    activeIndex === index ? 'bg-[#37368b] text-white rotate-180' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>
                            
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                    activeIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="text-gray-600 leading-relaxed font-medium pt-2 border-t border-[#37368b]/10">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 anim-contact-trigger">
                    <div className="anim-contact-card bg-[#37368b] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden text-center shadow-2xl shadow-indigo-900/20 transform-gpu">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc53a] rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -ml-16 -mb-16"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                                <HelpCircle className="w-8 h-8 text-[#ffc53a]" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
                                Still have questions?
                            </h3>
                            <p className="text-blue-100 mb-10 text-lg font-medium">
                                Can't find what you are looking for? Our Admin office is open Mon-Fri (8am - 4pm).
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="inline-flex items-center justify-center gap-2 bg-[#ffc53a] hover:bg-[#eeb025] text-[#37368b] px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg active:scale-95">
                                    <Mail className="w-5 h-5" />
                                    <span>Email Admin</span>
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-white/10">
                                    <Phone className="w-5 h-5" />
                                    <span>080 1234 5678</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
                    <div className="anim-info-card group bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#37368b]/20 hover:shadow-xl hover:shadow-indigo-900/5 transition-all text-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#37368b] transition-colors duration-300">
                            <Phone className="w-6 h-6 text-[#37368b] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Phone Support</h4>
                        <p className="text-gray-500 font-medium text-sm">080 1234 5678</p>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Mon-Fri, 8AM-4PM</p>
                    </div>

                    <div className="anim-info-card group bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#37368b]/20 hover:shadow-xl hover:shadow-indigo-900/5 transition-all text-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#37368b] transition-colors duration-300">
                            <Mail className="w-6 h-6 text-[#37368b] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                        <p className="text-gray-500 font-medium text-sm">admin@goldfield.edu.ng</p>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Admissions Desk</p>
                    </div>

                    <div className="anim-info-card group bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#37368b]/20 hover:shadow-xl hover:shadow-indigo-900/5 transition-all text-center">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#37368b] transition-colors duration-300">
                            <MapPin className="w-6 h-6 text-[#37368b] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Visit Campus</h4>
                        <p className="text-gray-500 font-medium text-sm">123 School Road, Ikeja</p>
                        <button className="text-xs text-[#37368b] font-bold mt-2 hover:underline uppercase tracking-wide inline-flex items-center gap-1">
                            View on Map <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ;