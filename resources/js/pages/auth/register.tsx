import { useEffect, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { 
    Hash, 
    Lock, 
    KeyRound, 
    X, 
    AlertCircle, 
    User, 
    Mail, 
    Briefcase,
    ShieldCheck
} from 'lucide-react';

interface Props {
    nextAvailableReg?: string;
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
    const [isVerifying, setIsVerifying] = useState(false);

    // 2. Auto-Fill Logic
    useEffect(() => {
        if (data.role === 'student' && nextAvailableReg) {
            setData('reg_number', String(nextAvailableReg));
        } else {
            setData('reg_number', '');
        }
    }, [data.role, nextAvailableReg]);

    // 3. Handlers
    const handleRegisterClick = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const confirmRegistration = () => {
        setIsVerifying(true);
        setCodeError('');

        if (securityCode === import.meta.env.VITE_ADMIN_SECURITY_CODE) { 
            // Student Flow: Mark Number as Used -> Then Register
            if (data.role === 'student' && data.reg_number) {
                router.put(`/allowed-numbers/${data.reg_number}`, { is_used: true }, {
                    preserveScroll: true,
                    onSuccess: () => submitRegistration(),
                    onError: () => {
                        setIsVerifying(false);
                        setCodeError('Failed to verify registration number.');
                    }
                });
            } 
            // Teacher/Admin Flow: Skip Verification -> Register
            else {
                submitRegistration();
            }
        } else {
            setIsVerifying(false);
            setCodeError('Invalid Security Code.');
        }
    };

    const submitRegistration = () => {
        post('/register', { 
            onFinish: () => {
                setIsVerifying(false);
                reset('password', 'password_confirmation');
            },
            onError: () => {
                setIsVerifying(false);
                setIsModalOpen(false); 
            }
        });
    };

    // --- CADEMIC STYLES (Matching Login Page) ---
    const inputClass = "w-full border-2 border-gray-100 rounded-xl px-4 py-3.5 pl-12 text-base font-bold text-gray-800 focus:border-[#37368b] focus:ring-4 focus:ring-[#37368b]/10 bg-white transition-all duration-300 placeholder-gray-300 outline-none shadow-sm hover:border-gray-200";
    const labelClass = "text-[#37368b] font-extrabold text-xs uppercase tracking-widest ml-1 mb-2 block";

    return (
        <AuthLayout
            title="Create Account"
            description="Start your educational journey with us!"
        >
            <Head title="Register" />
            
            <div className="w-full max-w-md mx-auto relative z-10">
                <form onSubmit={handleRegisterClick} className="flex flex-col gap-6">
                    <div className="grid gap-5">
                        
                        {/* Name Input */}
                        <div>
                            <Label htmlFor="name" className={labelClass}>Full Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                />
                            </div>
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Email Input */}
                        <div>
                            <Label htmlFor="email" className={labelClass}>Email Address</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    placeholder="email@example.com"
                                    className={inputClass}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <Label htmlFor="role" className={labelClass}>Account Type</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <select 
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="admin">School Admin</option>
                                </select>
                            </div>
                            <InputError message={errors.role} className="mt-1" />
                        </div>

                        {/* Auto-Generated Reg Number */}
                        {data.role === 'student' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="reg_number" className={labelClass}>Assigned Reg Number</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Hash className="h-5 w-5 text-[#ffc53a]" />
                                    </div>
                                    <Input
                                        id="reg_number"
                                        value={data.reg_number}
                                        readOnly
                                        className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                                    />
                                    {!nextAvailableReg && (
                                        <div className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-red-500">
                                            Unavailable
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.reg_number} className="mt-1" />
                            </div>
                        )}

                        {/* Password Input */}
                        <div>
                            <Label htmlFor="password" className={labelClass}>Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Label htmlFor="password_confirmation" className={labelClass}>Confirm Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            disabled={processing || (data.role === 'student' && !nextAvailableReg)}
                            className="mt-2 w-full bg-[#37368b] hover:bg-[#2a2970] text-white py-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg font-bold"
                        >
                            {processing ? <Spinner className="text-white" /> : "Proceed to Verification"}
                        </Button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center text-sm p-4 bg-[#ffc53a]/10 border-2 border-[#ffc53a] rounded-2xl">
                        <span className="text-[#37368b] font-bold">Already have an account? </span>
                        <TextLink 
                            href="/login" 
                            className="font-bold text-[#37368b] hover:text-[#d97706] underline decoration-2 transition-colors duration-300"
                        >
                            Log in here
                        </TextLink>
                    </div>
                </form>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-[#ffc53a] rounded-full opacity-10 animate-bounce blur-xl"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-[#37368b] rounded-full opacity-10 animate-pulse blur-2xl"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#ffc53a] rounded-full opacity-20 animate-ping"></div>

            {/* --- SECURITY CODE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#37368b]/80 backdrop-blur-md" onClick={() => !isVerifying && setIsModalOpen(false)}></div>
                    
                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-[#ffc53a] relative z-10">
                        {/* Modal Header */}
                        <div className="bg-[#37368b] p-6 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#ffc53a]/20 rounded-full blur-xl"></div>
                            <h3 className="text-white font-extrabold text-xl flex items-center gap-3 tracking-wide relative z-10">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ShieldCheck className="w-5 h-5 text-[#ffc53a]" />
                                </div>
                                Security Check
                            </h3>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                disabled={isVerifying}
                                className="text-white/70 hover:text-[#ffc53a] transition-colors disabled:opacity-50 relative z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-8 bg-gray-50">
                            <p className="text-[#37368b] font-bold text-center mb-6 text-base leading-relaxed">
                                Please enter the <span className="text-[#d97706] underline decoration-wavy">School Code</span> to finalize your registration.
                            </p>

                            <div className="relative mb-6 group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <KeyRound className="w-6 h-6 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                </div>
                                <input 
                                    type="password"
                                    autoFocus
                                    placeholder="Enter Code"
                                    value={securityCode}
                                    disabled={isVerifying}
                                    onChange={(e) => {
                                        setSecurityCode(e.target.value);
                                        setCodeError('');
                                    }}
                                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-2xl tracking-[0.5em] font-extrabold text-center focus:border-[#37368b] focus:ring-4 focus:ring-[#37368b]/10 outline-none text-[#37368b] placeholder:text-gray-300 placeholder:tracking-normal placeholder:font-medium transition-all bg-white shadow-sm"
                                />
                            </div>

                            {codeError && (
                                <div className="flex items-center justify-center gap-2 text-red-600 text-sm font-extrabold bg-red-50 p-3 rounded-xl mb-6 border border-red-100 animate-in shake">
                                    <AlertCircle className="w-5 h-5" />
                                    {codeError}
                                </div>
                            )}

                            <Button 
                                onClick={confirmRegistration}
                                disabled={isVerifying || !securityCode}
                                className="w-full bg-[#37368b] hover:bg-[#2a2970] text-white py-6 rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:transform-none"
                            >
                                {isVerifying ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="text-white w-5 h-5" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : 'Verify & Join!'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}