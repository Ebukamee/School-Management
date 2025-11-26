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
        <div className="min-h-svh bg-gradient-to-br from-yellow-100 via-white to-[#37368b]/10 p-6 md:p-10 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 right-16 w-24 h-24 bg-[#37368b] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-[#37368b] rounded-full opacity-15 animate-bounce delay-1000"></div>
            
            {/* Floating Shapes */}
            <div className="absolute top-20 right-1/4 w-12 h-12 bg-yellow-400 rounded-lg rotate-45 opacity-40 animate-float"></div>
            <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-[#37368b] rounded-lg opacity-30 animate-float delay-500"></div>

            <div className="flex min-h-svh items-center justify-center relative z-10">
                <div className="w-full max-w-4xl">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-yellow-400">
                        {/* Left Side - Branding & Welcome */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="flex flex-col items-center lg:items-start gap-6">
                                <Link
                                    href={home()}
                                    className="flex flex-col items-center lg:items-start gap-4 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#37368b] border-4 border-yellow-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <AppLogoIcon className="size-8 fill-current text-yellow-400" />
                                        </div>
                                        <div className="text-left">
                                            <h1 className="text-2xl font-bold text-[#37368b] leading-tight">
                                                Northwood<br />Elementary
                                            </h1>
                                            <p className="text-sm text-[#37368b]/70 mt-1">Learning Fun! 🎉</p>
                                        </div>
                                    </div>
                                </Link>

                                <div className="space-y-4">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-[#37368b] leading-tight">
                                        {title}
                                    </h1>
                                    <p className="text-lg text-[#37368b]/80 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                {/* Fun Decorative Elements */}
                                <div className="flex gap-3 mt-4">
                                    <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                                    <div className="w-6 h-6 bg-[#37368b] rounded-full animate-bounce delay-150"></div>
                                    <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                                    <div className="w-6 h-6 bg-[#37368b] rounded-full animate-bounce delay-450"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form Content */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-[#37368b]/20 shadow-lg">
                                {children}
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-[#37368b]/60 font-medium">
                            Where Learning is an Adventure! 🚀
                        </p>
                    </div>
                </div>
            </div>

            {/* Add custom animation for floating */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}