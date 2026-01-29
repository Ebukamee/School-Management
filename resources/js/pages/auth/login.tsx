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
    return (
        <AuthLayout
            title="Welcome to Portal!"
            description="Enter your email and password"
        >
            <Head title="Log in" />

            <div className="w-full max-w-md mx-auto">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                {/* Email Input with Fun Styling */}
                                <div className="grid gap-3">
                                    <Label htmlFor="email" className="text-[#37368b] font-bold text-lg">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password Input with Fun Styling */}
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-[#37368b] font-bold text-lg">
                                             Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm font-bold text-[#37368b] hover:text-yellow-600 transition-colors duration-300"
                                                tabIndex={5}
                                            >
                                                Forgot password? 
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember Me Checkbox with Fun Styling */}
                                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="text-[#37368b] border-2 border-[#37368b] data-[state=checked]:bg-[#37368b] data-[state=checked]:text-yellow-400"
                                    />
                                    <Label htmlFor="remember" className="text-[#37368b] font-bold cursor-pointer">
                                        Remember me 
                                    </Label>
                                </div>

                                {/* Login Button with Fun Styling */}
                                <Button
                                    type="submit"
                                    className="mt-2 w-full bg-[#37368b] hover:bg-[#2a2970]  py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 "
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing ? (
                                        <Spinner className="" />
                                    ) : (
                                        <>
                                             Login 
                                        </>
                                    )}
                                </Button>
                            </div>

                            
                        </>
                    )}
                </Form>

                {/* Status Message with Fun Styling */}
                {status && (
                    <div className="mt-6 p-4 bg-green-100 border-2 border-green-400 rounded-2xl text-center text-sm font-bold text-green-700">
                        {status} 
                    </div>
                )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 right-16 w-16 h-16 bg-[#37368b] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
        </AuthLayout>
    );
}