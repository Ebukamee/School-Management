import { useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/ui/NavHome';
import Footer from '@/components/ui/footer';
import { 
    Clock, 
    Music, 
    Mic2, 
    Briefcase, 
    Heart, 
    Coffee, 
    BookOpen, 
    Sun, 
    Moon,
    Users,
    Trophy,
    Calendar
} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SchoolLife() {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- DATA ---
    const dailyRoutine = [
        { time: "07:30 AM", activity: "Morning Assembly", icon: Sun },
        { time: "08:00 AM", activity: "Classes Begin", icon: BookOpen },
        { time: "11:30 AM", activity: "Long Break", icon: Coffee },
        { time: "02:00 PM", activity: "Lunch / Siesta", icon: Briefcase },
        { time: "04:00 PM", activity: "Sports / Clubs", icon: Users },
        { time: "07:00 PM", activity: "Evening Prep", icon: Moon },
    ];

    const clubs = [
        { title: "JETS Club", desc: "Junior Engineers, Technicians and Scientists innovating for the future.", icon: Briefcase },
        { title: "Lit. & Debating", desc: "Building oratory skills and critical thinking through competitive debate.", icon: Mic2 },
        { title: "Press Club", desc: "Reporting school news and managing the weekly bulletin board.", icon: BookOpen },
        { title: "Red Cross", desc: "Learning first aid and community service.", icon: Heart },
        { title: "Cultural Troupe", desc: "Celebrating our diverse heritage through dance and drama.", icon: Music },
        { title: "Home Makers", desc: "Practical skills in cooking, sewing, and home management.", icon: Coffee },
    ];

    const houses = [
        { name: "Blue House", color: "bg-blue-600", motto: "Sky is the Limit" },
        { name: "Red House", color: "bg-red-600", motto: "Strength & Valour" },
        { name: "Green House", color: "bg-green-600", motto: "Growth & Harmony" },
        { name: "Yellow House", color: "bg-yellow-500", motto: "Light of the World" },
    ];

    // --- ANIMATIONS ---
    useGSAP(() => {
        // Hero
        gsap.from(".anim-hero-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Routine Timeline
        ScrollTrigger.batch(".anim-routine-item", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all"
                });
            },
            start: "top 85%",
            once: true
        });

        // Clubs Grid
        ScrollTrigger.batch(".anim-club-card", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    scale: 0.9,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    clearProps: "all"
                });
            },
            start: "top 85%",
            once: true
        });

        // Boarding Section
        gsap.from(".anim-boarding-img", {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: { trigger: ".anim-boarding-section", start: "top 80%" }
        });
        gsap.from(".anim-boarding-text", {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: { trigger: ".anim-boarding-section", start: "top 80%" }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-[#ffc53a] selection:text-[#37368b]">
            <Head title="School Life - Goldfield Junior School" />
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#37368b]">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 anim-hero-text">
                        <Users className="w-4 h-4 text-[#ffc53a]" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Beyond the Classroom</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight anim-hero-text">
                        A Vibrant <span className="text-[#ffc53a]">Community</span> <br />
                        Of Happy Learners
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed anim-hero-text">
                        At Goldfield, education goes beyond textbooks. We build character, foster friendships, and discover talents through sports, clubs, and community living.
                    </p>
                </div>
            </section>

            {/* ================= DAILY ROUTINE ================= */}
            <section className="py-20 lg:py-28 bg-[#f8f9fc]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-4">A Day at Goldfield</h2>
                        <p className="text-gray-500">Our structured schedule ensures a balance between academics, rest, and play.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {dailyRoutine.map((item, index) => (
                            <div key={index} className="anim-routine-item bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-[#ffc53a] transition-colors group">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#37368b] group-hover:bg-[#ffc53a] group-hover:text-[#37368b] transition-colors">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-extrabold text-[#37368b]">{item.time}</h4>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-1">{item.activity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CLUBS & SOCIETIES ================= */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h4 className="text-[#ffc53a] font-extrabold uppercase tracking-widest text-sm mb-2">Extracurriculars</h4>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-4">Clubs & Societies</h2>
                            <p className="text-gray-500 text-lg">
                                Every Friday afternoon is dedicated to club activities. Every student must belong to at least one academic club and one social club.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clubs.map((club, index) => (
                            <div key={index} className="anim-club-card group bg-gray-50 hover:bg-[#37368b] rounded-[2rem] p-8 transition-all duration-300 transform-gpu">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#ffc53a] transition-colors">
                                    <club.icon className="w-6 h-6 text-[#37368b]" />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-white mb-3 transition-colors">{club.title}</h3>
                                <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">
                                    {club.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
{/* ================= DAY SCHOOL ONLY ================= */}
<section className="py-20 bg-[#37368b] text-white anim-boarding-section">
    <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-10 md:p-16 border border-white/20 text-center shadow-2xl">
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc53a] rounded-full mb-6 text-[#37368b] shadow-lg">
                <Sun className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Day School System</h2>
            
            <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Goldfield Junior School operates strictly as a Day School. 
                <br className="hidden md:block" />
                We run an intensive academic schedule from <span className="text-[#ffc53a] font-bold">7:30 AM to 3:30 PM</span>, ensuring students receive quality education while returning home daily to their parents.
            </p>

        </div>
    </div>
</section>

            

            <Footer />
        </div>
    );
}