import { useEffect, useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
// REMOVED: import { login } from '@/routes'; 

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { Hash, Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface Props {
    nextAvailableReg?: string; // Passed from Laravel Controller
}

export default function Register({ nextAvailableReg }: Props) {
    // 1. Setup Form State
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'student', 
        reg_number: '',
        password: '',
        password_confirmation: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [securityCode, setSecurityCode] = useState('');
    const [codeError, setCodeError] = useState('');

    // 2. Auto-Fill Logic
    useEffect(() => {
        if (data.role === 'student' && nextAvailableReg) {
            setData('reg_number', nextAvailableReg);
        } else {
            setData('reg_number', '');
        }
    }, [data.role, nextAvailableReg]);

    // 3. Handle "Register" Click -> Open Modal
    const handleRegisterClick = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    // 4. Handle Modal Confirmation -> Submit to Server
    const confirmRegistration = () => {
        if (securityCode === '12345') { 
            // UPDATED: Using standard string '/register'
            post('/register', { 
                onFinish: () => reset('password', 'password_confirmation'),
            });
        } else {
            setCodeError('Invalid Security Code.');
        }
    };

    const funInputClass = "border-2 border-[#37368b] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 rounded-2xl px-4 py-3 text-lg transition-all duration-300 hover:shadow-lg w-full bg-white";

    return (
        <AuthLayout
            title="Register"
            description="Create your account and start your educational journey with us!"
        >
            <Head title="Register" />
            
            <form onSubmit={handleRegisterClick} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    
                    {/* Name Input */}
                    <div className="grid gap-3">
                        <Label htmlFor="name" className="text-[#37368b] font-bold text-lg">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                            placeholder="Enter your full name"
                            className={funInputClass}
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Email Input */}
                    <div className="grid gap-3">
                        <Label htmlFor="email" className="text-[#37368b] font-bold text-lg">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="email@example.com"
                            className={funInputClass}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Role Selection */}
                    <div className="grid gap-3">
                        <Label htmlFor="role" className="text-[#37368b] font-bold text-lg">I am a...</Label>
                        <select 
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className={funInputClass}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        {/* Ensure 'role' is in your validation rules if you want errors here */}
                        <InputError message={errors.role} /> 
                    </div>

                    {/* Auto-Generated Reg Number */}
                    {data.role === 'student' && (
                        <div className="grid gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                            <Label htmlFor="reg_number" className="text-[#37368b] font-bold text-lg flex items-center gap-2">
                                <Hash className="w-5 h-5 text-yellow-500" />
                                Assigned Reg Number
                            </Label>
                            <div className="relative">
                                <Input
                                    id="reg_number"
                                    value={data.reg_number}
                                    readOnly
                                    className={`${funInputClass} bg-gray-100 text-gray-500 cursor-not-allowed`}
                                />
                                {!nextAvailableReg && (
                                    <p className="text-red-500 text-sm mt-1 font-bold">
                                        No numbers available! Contact Admin.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="grid gap-3">
                        <Label htmlFor="password" className="text-[#37368b] font-bold text-lg">Create Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Choose a secure password"
                            className={funInputClass}
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-3">
                        <Label htmlFor="password_confirmation" className="text-[#37368b] font-bold text-lg">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Type your password again"
                            className={funInputClass}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {/* Register Button */}
                    <Button
                        type="submit"
                        disabled={processing || (data.role === 'student' && !nextAvailableReg)}
                        className="mt-2 w-full bg-[#37368b] hover:bg-[#2a2970] py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xl font-bold"
                    >
                        {processing ? <Spinner /> : "Create Account!"}
                    </Button>
                </div>

                {/* Login Link */}
                <div className="text-center text-sm p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300">
                    <span className="text-[#37368b] font-bold">Already registered? </span>
                    {/* UPDATED: Using standard string '/login' */}
                    <TextLink 
                        href="/login" 
                        className="font-bold text-[#37368b] hover:text-yellow-600 underline decoration-2 transition-colors duration-300"
                    >
                        Welcome back!
                    </TextLink>
                </div>
            </form>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 right-16 w-16 h-16 bg-[#37368b] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>

            {/* --- SECURITY CODE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#37368b]/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-yellow-400">
                        <div className="bg-[#37368b] p-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                <Lock className="w-5 h-5 text-yellow-400" />
                                Security Check
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-yellow-400 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-[#37368b] font-medium mb-4 text-center">
                                Please enter the school code to finalize your registration.
                            </p>

                            <div className="relative mb-4">
                                <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-[#37368b]" />
                                <input 
                                    type="password"
                                    autoFocus
                                    placeholder="Enter Code"
                                    value={securityCode}
                                    onChange={(e) => {
                                        setSecurityCode(e.target.value);
                                        setCodeError('');
                                    }}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-[#37368b] rounded-xl text-lg tracking-widest font-bold text-center focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none text-[#37368b]"
                                />
                            </div>

                            {codeError && (
                                <div className="flex items-center justify-center gap-2 text-red-600 text-sm font-bold bg-red-50 p-2 rounded-lg mb-4">
                                    <AlertCircle className="w-4 h-4" />
                                    {codeError}
                                </div>
                            )}

                            <Button 
                                onClick={confirmRegistration}
                                disabled={processing}
                                className="w-full bg-[#37368b] hover:bg-[#2a2970] text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                {processing ? <Spinner /> : 'Verify & Join!'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}