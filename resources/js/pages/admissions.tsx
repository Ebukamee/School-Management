import Navbar from '@/components/ui/NavHome';
import Footer from '@/components/ui/footer';
import { useGSAP } from '@gsap/react';
import { Head } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, CheckCircle2, FileText, School, Users } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Admissions() {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- DATA ---
    const applicationSteps = [
        {
            title: 'Purchase Form',
            desc: 'Obtain the application form online or visit the school admin office. The form costs ₦10,000.',
            icon: FileText,
        },
        {
            title: 'Entrance Exam',
            desc: 'Sit for the Common Entrance Examination in Mathematics, English, and General Paper.',
            icon: School,
        },
        {
            title: 'Interview',
            desc: 'Successful candidates and their parents are invited for an oral interview with the Principal.',
            icon: Users,
        },
        {
            title: 'Admission Offer',
            desc: 'Qualified students receive a provisional letter of admission. Acceptance fees secure the slot.',
            icon: CheckCircle2,
        },
    ];

    const requirements = [
        'Must be at least 10 years old by September of entry year',
        'Two (2) recent passport photographs',
        'Photocopy of Birth Certificate',
        "Last term's academic result from previous school",
        'Medical Report / Immunization Record',
        'Letter of Recommendation (Transfer students only)',
    ];

    // --- ANIMATIONS ---
    useGSAP(
        () => {
            // Hero
            gsap.from('.anim-hero-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            });

            // Steps Grid (Batched)
            ScrollTrigger.batch('.anim-step-card', {
                onEnter: (batch) => {
                    gsap.from(batch, {
                        y: 50,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'power3.out',
                        clearProps: 'all',
                    });
                },
                start: 'top 85%',
                once: true,
            });

            // Requirements Section
            gsap.from('.anim-req-content', {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.anim-req-section',
                    start: 'top 80%',
                },
            });

            gsap.from('.anim-req-image', {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.anim-req-section',
                    start: 'top 80%',
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-white font-sans selection:bg-[#ffc53a] selection:text-[#37368b]"
        >
            <Head title="Admissions - Goldfield Junior School" />
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden bg-[#37368b] pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                ></div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="anim-hero-text mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                        <Users className="h-4 w-4 text-[#ffc53a]" />
                        <span className="text-xs font-bold tracking-widest text-white uppercase">
                            Join Our Family
                        </span>
                    </div>
                    <h1 className="anim-hero-text mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                        Begin Your Journey <br />
                        <span className="text-[#ffc53a]">To Greatness</span>
                    </h1>
                    <p className="anim-hero-text mx-auto max-w-2xl text-lg leading-relaxed font-medium text-blue-100 md:text-xl">
                        Admission into JSS1 for the 2026/2027 Academic Session
                        is now open. We are looking for bright, curious minds
                        ready to explore the world.
                    </p>
                </div>
            </section>

            {/* ================= PROCESS STEPS ================= */}
            <section className="bg-[#f8f9fc] py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h4 className="mb-2 text-sm font-extrabold tracking-widest text-[#ffc53a] uppercase">
                            How to Apply
                        </h4>
                        <h2 className="mb-4 text-3xl font-extrabold text-[#37368b] md:text-4xl">
                            The Admission Process
                        </h2>
                        <p className="text-lg text-gray-500">
                            We have streamlined our application process to be
                            simple and transparent. Follow these four steps to
                            secure your child's future.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="absolute top-12 left-0 -z-10 hidden h-0.5 w-full bg-gray-200 lg:block"></div>

                        {applicationSteps.map((step, index) => (
                            <div
                                key={index}
                                className="anim-step-card relative rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#f8f9fc] shadow-sm">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#37368b] text-white">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <div className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#ffc53a] text-sm font-bold text-[#37368b]">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="mb-3 text-xl font-extrabold text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed font-medium text-gray-500">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= REQUIREMENTS ================= */}
            <section className="anim-req-section bg-white py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center gap-16 lg:flex-row">
                        {/* Checklist Side */}
                        <div className="anim-req-content w-full lg:w-1/2">
                            <h4 className="mb-2 text-sm font-extrabold tracking-widest text-[#ffc53a] uppercase">
                                Checklist
                            </h4>
                            <h2 className="mb-6 text-3xl font-extrabold text-[#37368b] md:text-4xl">
                                Admission Requirements
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">
                                To ensure a smooth registration process, please
                                ensure you have the following documents ready
                                before the entrance examination date.
                            </p>

                            <div className="space-y-4">
                                {requirements.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-[#ffc53a]/50"
                                    >
                                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#37368b] text-white">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">
                                            {req}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image/Exam Info Side */}
                        <div className="anim-req-image w-full lg:w-1/2">
                            <div className="relative overflow-hidden rounded-[3rem] bg-[#37368b] p-10 text-white shadow-2xl md:p-14">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-[#ffc53a] opacity-20 blur-3xl"></div>

                                <div className="relative z-10">
                                    <div className="mb-6 flex items-center gap-3">
                                        <Calendar className="h-8 w-8 text-[#ffc53a]" />
                                        <h3 className="text-2xl font-bold">
                                            Upcoming Exams
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                                            <div className="absolute top-0 right-0 rounded-bl-xl bg-[#ffc53a] px-3 py-1 text-[10px] font-bold text-[#37368b]">
                                                TENTATIVE
                                            </div>
                                            <p className="mb-1 text-xs font-bold tracking-widest text-[#ffc53a] uppercase">
                                                Batch A
                                            </p>
                                            <h4 className="text-2xl font-extrabold">
                                                Expected: March 2026
                                            </h4>
                                            <p className="mt-2 text-sm font-medium text-blue-200">
                                                Exact date to be communicated
                                                via email/SMS.
                                            </p>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                                            <div className="absolute top-0 right-0 rounded-bl-xl bg-[#ffc53a] px-3 py-1 text-[10px] font-bold text-[#37368b]">
                                                TENTATIVE
                                            </div>
                                            <p className="mb-1 text-xs font-bold tracking-widest text-[#ffc53a] uppercase">
                                                Batch B
                                            </p>
                                            <h4 className="text-2xl font-extrabold">
                                                Expected: May 2026
                                            </h4>
                                            <p className="mt-2 text-sm font-medium text-blue-200">
                                                Exact date to be communicated
                                                via email/SMS.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 border-t border-white/20 pt-8">
                                        <p className="text-sm leading-relaxed font-medium text-blue-100">
                                            <span className="font-bold text-[#ffc53a]">
                                                Note:
                                            </span>{' '}
                                            Dates are subject to change based on
                                            the Ministry of Education calendar.
                                            Registered parents will be notified
                                            2 weeks in advance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= DOWNLOAD & CTA ================= */}
            {/* <section className="py-20 bg-[#f8f9fc]">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-indigo-900/5 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        
                        <div className="md:w-3/5">
                            <h2 className="text-3xl font-extrabold text-[#37368b] mb-4">Start Application</h2>
                            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                                You can purchase the form at the school premises or download the PDF, fill it out, and submit it via email to <strong>admissions@goldfield.edu.ng</strong>.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button className="inline-flex items-center justify-center gap-2 bg-[#ffc53a] hover:bg-[#eeb025] text-[#37368b] px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                                    <Download className="w-5 h-5" />
                                    Download Form (PDF)
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 bg-blue-50 text-[#37368b] hover:bg-blue-100 px-8 py-4 rounded-xl font-bold transition-all">
                                    <CreditCard className="w-5 h-5" />
                                    Pay Online
                                </button>
                            </div>
                        </div>

                        <div className="md:w-2/5 flex justify-center">
                            <div className="w-48 h-56 bg-gray-100 rounded-2xl border-4 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                                <FileText className="w-12 h-12 mb-2" />
                                <span className="text-xs font-bold uppercase">Form Preview</span>
                            </div>
                        </div>

                    </div> */}
            {/* </div>
            </section> */}

            <Footer />
        </div>
    );
}
