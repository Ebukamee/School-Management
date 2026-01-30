import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4 md:p-6 lg:p-8 font-sans">
            
            {/* Main Card Container */}
            <div className="w-full max-w-[1000px] bg-white rounded-xl shadow-2xl shadow-indigo-900/10 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
                
                {/* --- LEFT SIDE: Brand & Context (Cademic Blue) --- */}
                <div className="hidden lg:flex lg:w-5/12 bg-[#37368b] p-12 flex-col justify-between relative text-white overflow-hidden">
                    
                    {/* Decorative Background Elements (Subtle Blobs, No Stripes) */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc53a] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-16 -mt-16 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-16 -mb-16 animate-blob animation-delay-2000"></div>

                    {/* Logo Section */}
                    <div className="relative z-10">
                        <Link href={home()} className="inline-flex items-center gap-3 group">
                            {/* Icon with Amber Background */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc53a] shadow-lg shadow-orange-900/20 group-hover:scale-105 transition-transform duration-300">
                                <AppLogoIcon className="w-6 h-6 text-[#37368b] fill-current" />
                            </div>
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight">
                                    Goldfield
                                </h1>
                                <p className="text-[10px] text-[#ffc53a] font-bold uppercase tracking-[0.2em]">
                                    Junior School
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Middle Content Section */}
                    <div className="relative z-10 mt-12 lg:mt-0">
                        {title && (
                            <h2 className="text-3xl font-extrabold leading-tight mb-4 tracking-tight">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-blue-100 text-lg leading-relaxed font-medium opacity-90">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Bottom Copyright */}
                    <div className="relative z-10 mt-12 text-xs font-bold text-blue-200/60 uppercase tracking-wider">
                        &copy; {new Date().getFullYear()} Goldfield Junior School.
                    </div>
                </div>

                {/* --- RIGHT SIDE: Form Content (Clean White) --- */}
                <div className="w-full lg:w-7/12 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    
                    {/* Mobile Logo (Visible only on small screens) */}
                    <div className="lg:hidden mb-8 flex justify-center">
                        <Link href={home()} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffc53a] shadow-md">
                            <AppLogoIcon className="w-8 h-8 text-[#37368b] fill-current" />
                        </Link>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}