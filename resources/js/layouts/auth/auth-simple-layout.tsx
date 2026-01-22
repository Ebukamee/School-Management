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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
            
            {/* Main Card Container */}
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
                
                {/* Left Side: Branding & Context (Dark Blue Theme) */}
                <div className="lg:w-5/12 bg-[#37368b] p-10 lg:p-14 flex flex-col justify-between relative text-white">
                    {/* Subtle Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-400"></div>

                    {/* Logo Section */}
                    <div>
                        <Link href={home()} className="inline-flex items-center gap-3 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                                {/* Logo tinted Yellow for contrast against blue */}
                                <AppLogoIcon className="size-6 text-yellow-400 fill-current" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-wide">
                                    Goldfield
                                </h1>
                                <p className="text-xs text-yellow-400 font-medium uppercase tracking-wider">
                                    Junior School
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Middle Content Section */}
                    <div className="mt-12 lg:mt-0">
                        {title && (
                            <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Bottom Copyright / Footer info */}
                    <div className="mt-12 text-xs text-blue-200/60">
                        &copy; {new Date().getFullYear()} Goldfield Junior School. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Form Content (Clean White) */}
                <div className="lg:w-7/12 bg-white p-8 lg:p-16 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}