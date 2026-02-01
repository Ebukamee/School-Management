import { useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/ui/NavHome';
import Footer from '@/components/ui/footer';
import { 
    BookOpen, 
    Microscope, 
    Calculator, 
    Languages, 
    Palette, 
    Cpu, 
    Award,
    Hammer
} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Academics() {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- DATA ---
    const curriculumAreas = [
        {
            title: "Science & Mathematics",
            description: "Developing critical thinking through Basic Science, Basic Technology, Mathematics, and Computer Studies.",
            subjects: ["Mathematics", "Basic Science", "Basic Technology", "ICT"],
            icon: Microscope,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Pre-Vocational Studies",
            description: "Practical skills for self-reliance and entrepreneurship awareness.",
            subjects: ["Agricultural Science", "Home Economics", "Entrepreneurship"],
            icon: Hammer,
            color: "bg-amber-100 text-amber-600"
        },
        {
            title: "Languages & Literacy",
            description: "Fostering global communication and cultural heritage.",
            subjects: ["English Language", "Literature", "French", "Hausa/Igbo/Yoruba"],
            icon: Languages,
            color: "bg-purple-100 text-purple-600"
        },
        {
            title: "Religion & National Values",
            description: "Building character, civic responsibility, and moral soundness.",
            subjects: ["Civic Education", "Social Studies", "Security Edu.", "CRS / IRS"],
            icon: BookOpen,
            color: "bg-green-100 text-green-600"
        },
        {
            title: "Cultural & Creative Arts",
            description: "Expressing creativity through visual arts, music, and drama.",
            subjects: ["Fine Art", "Music", "Drama & Performing Arts"],
            icon: Palette,
            color: "bg-pink-100 text-pink-600"
        },
        {
            title: "Business Studies",
            description: "Introduction to commerce, bookkeeping, and office practice.",
            subjects: ["Business Studies", "Office Practice", "Keyboarding"],
            icon: Calculator,
            color: "bg-indigo-100 text-indigo-600"
        }
    ];

    // --- ANIMATIONS ---
    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Hero Text (Simple Entrance)
        tl.from(".anim-hero-text", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        // 2. Overview Section (Scroll Triggered)
        gsap.from(".anim-overview-card", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-overview-section",
                start: "top 80%",
            }
        });

        // 3. FIXED: Curriculum Grid using Batch
        // This fixes the "breaking gap" issue by animating items only when they are visible
        ScrollTrigger.batch(".anim-subject-card", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 60,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all" // CRITICAL: Removes transform after animation to fix layout/hover glitches
                });
            },
            start: "top 90%",
            once: true // Only animate once
        });

        // 4. Exam Section
        gsap.from(".anim-exam-box", {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-exam-section",
                start: "top 80%",
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-[#ffc53a] selection:text-[#37368b]">
            <Head title="Academics - Goldfield Junior School" />
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#37368b]">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 anim-hero-text">
                        <BookOpen className="w-4 h-4 text-[#ffc53a]" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Junior Secondary (JSS 1-3)</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight anim-hero-text">
                        The Foundation of <br />
                        <span className="text-[#ffc53a]">Future Excellence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed anim-hero-text">
                        Our Junior School curriculum is designed to bridge the gap between primary education and senior specialization, offering a broad-based education.
                    </p>
                </div>
            </section>

            {/* ================= OVERVIEW ================= */}
            <section className="py-20 lg:py-28 bg-[#f8f9fc] anim-overview-section">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        
                        {/* Image Side */}
                        <div className="lg:w-1/2 w-full anim-overview-card">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border-8 border-white group">
                                <img 
                                    src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Junior Students in Basic Tech Lab" 
                                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#37368b]/80 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-[#ffc53a] p-2 rounded-lg text-[#37368b]">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold">Holistic Development</h3>
                                    </div>
                                    <p className="text-sm text-blue-100 font-medium">Head, Heart, and Hands approach to learning.</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-1/2 w-full">
                            <h4 className="text-[#ffc53a] font-extrabold uppercase tracking-widest text-sm mb-2">Academic Approach</h4>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-6">The 9-Year Basic Education Curriculum</h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                At Goldfield Junior School, we strictly adhere to the Nigerian Basic Education curriculum while integrating global best practices. Our goal in JSS 1-3 is to expose students to a wide variety of subjects.
                            </p>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                This broad exposure ensures that by the end of JSS 3, students can make informed decisions about their career paths (Science, Arts, or Commercial) based on their strengths in the BECE exams.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#37368b] flex-shrink-0 mt-1">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Emphasis on Basic Technology</h4>
                                        <p className="text-sm text-gray-500">Practical exposure to technical drawing, woodwork, and basic electronics.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#37368b] flex-shrink-0 mt-1">
                                        <Languages className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Language Proficiency</h4>
                                        <p className="text-sm text-gray-500">Mandatory French and Nigerian languages to foster communication skills.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY LEARNING AREAS ================= */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h4 className="text-[#ffc53a] font-extrabold uppercase tracking-widest text-sm mb-2">Our Subjects</h4>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-4">Core Curriculum Areas</h2>
                        <p className="text-gray-500 text-lg">
                            We cover all mandatory subject areas required for the Basic Education Certificate Examination (BECE).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {curriculumAreas.map((area, index) => (
                            <div key={index} className="anim-subject-card group bg-gray-50 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/10 border border-gray-100 transition-all duration-300 transform-gpu">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${area.color} group-hover:scale-110 transition-transform`}>
                                    <area.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{area.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    {area.description}
                                </p>
                                <div className="space-y-2 border-t border-gray-100 pt-4">
                                    {area.subjects.map((sub, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ffc53a]"></div>
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= EXAMINATIONS (BECE) ================= */}
            <section className="py-20 bg-[#37368b] text-white overflow-hidden relative anim-exam-section">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffc53a] rounded-full blur-3xl opacity-10 -mr-20 -mt-20"></div>
                
                <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                    <div className="anim-exam-box bg-white/10 backdrop-blur-md rounded-[3rem] p-10 md:p-16 border border-white/20 shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                            The Milestone: <span className="text-[#ffc53a]">BECE (Junior WAEC)</span>
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-3xl mx-auto">
                            The Basic Education Certificate Examination (BECE) marks the end of Junior Secondary School. At Goldfield, we prepare our JSS 3 students through intensive revision camps and mock exams to ensure 100% success.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-[#37368b] p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl font-extrabold text-[#ffc53a] mb-1">100%</div>
                                <div className="text-xs font-bold text-white uppercase tracking-widest">Pass Rate</div>
                            </div>
                            <div className="bg-[#37368b] p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl font-extrabold text-[#ffc53a] mb-1">9 Distinctions</div>
                                <div className="text-xs font-bold text-white uppercase tracking-widest">Average per Student</div>
                            </div>
                            <div className="bg-[#37368b] p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl font-extrabold text-[#ffc53a] mb-1">Top 5%</div>
                                <div className="text-xs font-bold text-white uppercase tracking-widest">State Ranking</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}