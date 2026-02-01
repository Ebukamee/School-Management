import { useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/ui/NavHome';
import Footer from '@/components/ui/footer';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Send, 
    MessageSquare,
    Facebook,
    Twitter,
    Instagram
} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- ANIMATIONS ---
    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Hero Text
        tl.from(".anim-hero-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // 2. Contact Info Card (Left)
        gsap.from(".anim-info-card", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-contact-section",
                start: "top 80%",
            }
        });

        // 3. Form Card (Right)
        gsap.from(".anim-form-card", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-contact-section",
                start: "top 80%",
            }
        });

        // 4. Map Section
        gsap.from(".anim-map", {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".anim-map-section",
                start: "top 85%",
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-[#ffc53a] selection:text-[#37368b]">
            <Head title="Contact Us - Goldfield Junior School" />
            <Navbar />

            {/* ================= HERO SECTION ================= */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#37368b]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                {/* Decor */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#ffc53a] rounded-full blur-3xl opacity-10 -ml-20 -mt-20"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 anim-hero-text">
                        <MessageSquare className="w-4 h-4 text-[#ffc53a]" />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight anim-hero-text">
                        We'd Love to <br />
                        <span className="text-[#ffc53a]">Hear From You</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed anim-hero-text">
                        Whether you have questions about admissions, academics, or just want to say hello, our team is ready to assist you.
                    </p>
                </div>
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section className="py-20 lg:py-28 bg-[#f8f9fc] anim-contact-section">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                        
                        {/* LEFT: Contact Info Card */}
                        <div className="anim-info-card bg-[#37368b] text-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                            {/* Decor */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffc53a] rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mb-16"></div>

                            <h3 className="text-3xl font-extrabold mb-8 relative z-10">Contact Information</h3>
                            <p className="text-blue-100 mb-12 font-medium relative z-10">
                                Fill out the form or reach out to us directly via the channels below.
                            </p>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <MapPin className="w-6 h-6 text-[#ffc53a]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">Our Location</h4>
                                        <p className="text-blue-200 text-sm leading-relaxed">
                                            123 School Road, Off Allen Avenue,<br />
                                            Ikeja, Lagos State, Nigeria.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <Phone className="w-6 h-6 text-[#ffc53a]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">Phone Numbers</h4>
                                        <p className="text-blue-200 text-sm font-medium">
                                            (+234) 801 234 5678 <br />
                                            (+234) 809 876 5432
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <Mail className="w-6 h-6 text-[#ffc53a]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">Email Address</h4>
                                        <p className="text-blue-200 text-sm font-medium">
                                            admissions@goldfield.edu.ng <br />
                                            info@goldfield.edu.ng
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <Clock className="w-6 h-6 text-[#ffc53a]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">Office Hours</h4>
                                        <p className="text-blue-200 text-sm font-medium">
                                            Mon - Fri: 7:30 AM - 4:00 PM <br />
                                            Weekends: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="mt-12 pt-8 border-t border-white/10 relative z-10 flex gap-4">
                                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#ffc53a] hover:text-[#37368b] transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <div className="anim-form-card bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl shadow-indigo-900/5">
                            <h3 className="text-2xl font-extrabold text-[#37368b] mb-2">Send a Message</h3>
                            <p className="text-gray-500 mb-8 font-medium">We typically reply within 24 hours.</p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">First Name</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#37368b] focus:ring-0 transition-all font-medium text-gray-900" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Last Name</label>
                                        <input type="text" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#37368b] focus:ring-0 transition-all font-medium text-gray-900" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Email Address</label>
                                    <input type="email" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#37368b] focus:ring-0 transition-all font-medium text-gray-900" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Subject</label>
                                    <select className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#37368b] focus:ring-0 transition-all font-medium text-gray-900">
                                        <option>Admission Enquiry</option>
                                        <option>Fee Enquiry</option>
                                        <option>General Support</option>
                                        <option>Schedule a Tour</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Message</label>
                                    <textarea rows={4} className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#37368b] focus:ring-0 transition-all font-medium text-gray-900" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-[#ffc53a] hover:bg-[#eeb025] text-[#37368b] font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= MAP SECTION ================= */}
            <section className="py-20 bg-white anim-map-section">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="anim-map relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white">
                        {/* Placeholder for Map - In production, replace with Google Maps Embed Iframe */}
                        <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center">
                            <MapPin className="w-16 h-16 text-[#37368b] mb-4 animate-bounce" />
                            <p className="text-gray-500 font-bold text-lg">Google Map Integration</p>
                            <p className="text-gray-400 text-sm">123 School Road, Ikeja, Lagos</p>
                        </div>
                        
                        {/* Overlay Card */}
                        <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-lg hidden md:block">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Get Directions</p>
                            <h4 className="text-lg font-bold text-[#37368b] mb-2">Visit our Campus</h4>
                            <button className="text-sm font-bold text-[#ffc53a] hover:underline flex items-center gap-1">
                                Open in Google Maps <Send className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}