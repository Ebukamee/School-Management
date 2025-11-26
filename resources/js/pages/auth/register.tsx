import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Join Our Learning Adventure! 🎉"
            description="Create your account and start your educational journey with us!"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Name Input with Fun Styling */}
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-[#37368b] font-bold text-lg">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email Input with Fun Styling */}
                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-[#37368b] font-bold text-lg">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                />
                                <InputError message={errors.email} />
                            </div>
                           <div className="grid gap-3">
                                <Label htmlFor="email" className="text-[#37368b] font-bold text-lg">
                                    Registration Number
                                </Label>
                                <Input
                                    id="reg-number"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    name="reg-number"
                                    placeholder="Input the Student's Registration Number"
                                    className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                />
                                <InputError message={errors.email} />
                            </div>
                            {/* Password Input with Fun Styling */}
                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-[#37368b] font-bold text-lg">
                                    Create Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Choose a secure password"
                                    className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password Input with Fun Styling */}
                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation" className="text-[#37368b] font-bold text-lg">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Type your password again"
                                    className="border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            {/* Register Button with Fun Styling */}
                            <Button
                                type="submit"
                                className="mt-2 w-full bg-[#37368b] hover:bg-[#2a2970]  py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 "
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        Create My Account!
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Login Link with Fun Styling */}
                        <div className="text-center text-sm p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300">
                            <span className="text-[#37368b] font-bold">
                                Already part of our learning family?{' '}
                            </span>
                            <TextLink 
                                href={login()} 
                                tabIndex={6}
                                className="font-bold text-[#37368b] hover:text-yellow-600 underline decoration-2 transition-colors duration-300"
                            >
                                Welcome back!
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 right-16 w-16 h-16 bg-[#37368b] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
        </AuthLayout>
    );
}