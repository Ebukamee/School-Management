import { Link, Head } from '@inertiajs/react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from 'react';
import { AlertTriangle, Home, Search, ShieldAlert, WifiOff } from 'lucide-react';

export default function Error({ status }: { status: number }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic Content Configuration
    const errorConfig: Record<number, { title: string; desc: string; icon: any }> = {
        503: {
            title: 'Service Unavailable',
            desc: 'We are currently performing scheduled maintenance. Please check back in a few minutes.',
            icon: WifiOff
        },
        // 500: {
        //     title: 'Server Error',
        //     desc: 'Whoops, something went wrong on our end. Our technical team has been notified.',
        //     icon: AlertTriangle
        // },
        404: {
            title: 'Page Not Found',
            desc: 'Sorry, the page you are looking for does not exist or has been moved.',
            icon: Search
        },
        403: {
            title: 'Access Forbidden',
            desc: 'Sorry, you do not have permission to access this page.',
            icon: ShieldAlert
        },
    };

    const { title, desc, icon: Icon } = errorConfig[status] || {
        title: 'Unknown Error',
        desc: 'An unexpected error occurred.',
        icon: AlertTriangle
    };

    // --- ANIMATIONS ---
    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Giant Number Background
        tl.from(".anim-bg-text", {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // 2. Icon Pop
        tl.from(".anim-icon", {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.8");

        // 3. Text Content
        tl.from(".anim-content", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.4");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f8f9fc] flex items-center justify-center relative overflow-hidden selection:bg-[#ffc53a] selection:text-[#37368b]">
            <Head title={`${status}: ${title}`} />

            {/* Decorative Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#37368b] rounded-full mix-blend-multiply filter blur-3xl opacity-5 -ml-20 -mt-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffc53a] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-20 -mb-20 animate-pulse"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                
                {/* Giant Status Code Background */}
                <h1 className="anim-bg-text text-[10rem] md:text-[15rem] font-black text-[#37368b]/5 leading-none select-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                    {status}
                </h1>

                {/* Icon Wrapper */}
                <div className="anim-icon inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-indigo-900/10 mb-8 border border-gray-100">
                    <Icon className="w-10 h-10 text-[#ffc53a]" />
                </div>

                {/* Text Content */}
                <div className="anim-content max-w-lg mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#37368b] mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-lg font-medium mb-10 leading-relaxed">
                        {desc}
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#37368b] hover:bg-[#2a2970] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-900/20 hover:-translate-y-1 active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}