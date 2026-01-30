import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login/index';
import { request } from '@/routes/password/index';
import { Form, Head } from '@inertiajs/react';
import { LogIn, Mail, Lock } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {

    // --- CADEMIC STYLES ---
    const inputClass = "w-full border-2 border-gray-100 rounded-xl px-4 py-3.5 pl-12 text-base font-bold text-gray-800 focus:border-[#37368b] focus:ring-4 focus:ring-[#37368b]/10 bg-white transition-all duration-300 placeholder-gray-300 outline-none shadow-sm hover:border-gray-200";
    const labelClass = "text-[#37368b] font-extrabold text-xs uppercase tracking-widest ml-1 mb-2 block";

    return (
        <AuthLayout
            title="Welcome to Portal!"
            description="Enter your email and password to continue."
        >
            <Head title="Log in" />

            <div className="w-full max-w-md mx-auto relative z-10">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                
                                {/* Email Input */}
                                <div>
                                    <Label htmlFor="email" className={labelClass}>
                                        Email Address
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className={inputClass}
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className={labelClass}>
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs font-bold text-gray-400 hover:text-[#ffc53a] transition-colors duration-300 mb-2"
                                                tabIndex={5}
                                            >
                                                Forgot password? 
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className={inputClass}
                                        />
                                    </div>
                                    <InputError message={errors.password} className="mt-1" />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#37368b]/20 transition-colors">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="text-[#37368b] border-gray-300 data-[state=checked]:bg-[#37368b] data-[state=checked]:border-[#37368b] rounded-md h-5 w-5"
                                    />
                                    <Label htmlFor="remember" className="text-gray-600 font-bold text-sm cursor-pointer select-none">
                                        Remember me 
                                    </Label>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#37368b] hover:bg-[#2a2970] text-white py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg font-bold"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing ? (
                                        <Spinner className="text-white" />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <LogIn className="w-5 h-5" />
                                            <span>Log In</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                {/* Status Message */}
                {status && (
                    <div className="mt-6 p-4 bg-[#ffc53a]/10 border-2 border-[#ffc53a] rounded-2xl text-center text-sm font-bold text-[#37368b]">
                        {status} 
                    </div>
                )}
            </div>

            {/* Decorative Elements (Cademic Brand Colors) */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-[#ffc53a] rounded-full opacity-10 animate-bounce blur-xl"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-[#37368b] rounded-full opacity-10 animate-pulse blur-2xl"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#ffc53a] rounded-full opacity-20 animate-ping"></div>
        </AuthLayout>
    );
}