import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Save, 
    ArrowLeft, 
    Shield, 
    Hash
} from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        reg_number: '',
    });

    const breadcrumbs = [
        { title: 'Allowed Numbers', href: '/allowed-numbers' },
        { title: 'Create', href: '#' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        post('/allowed-numbers');
    };

    // --- CADEMIC STYLES ---
    // Standardized input: Gray border, Blue focus ring, No black hover
    const inputClass = "w-full border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 placeholder-gray-300 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all duration-200 outline-none shadow-sm hover:border-gray-300 bg-white";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Allowed Number" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            {/* Brand Accent: Amber Background */}
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <Shield className="w-6 h-6" />
                            </span>
                            Add New Number
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Pre-approve a Registration Number for student signup.
                        </p>
                    </div>
                    
                    <Link 
                        href="/allowed-numbers" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#37368b]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Form Body */}
                        <div className="p-8 space-y-6">
                            <div>
                                <label className={labelClass}>
                                    Registration Number <span className="text-red-500">*</span>
                                </label>
                                
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Hash className="w-4 h-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={data.reg_number}
                                        onChange={e => setData('reg_number', e.target.value)}
                                        className={`${inputClass} pl-10 font-mono text-lg tracking-wide`}
                                        placeholder="e.g. 2024/001"
                                        autoFocus
                                    />
                                </div>

                                <p className="text-xs text-gray-400 mt-2 font-medium ml-1">
                                    This number must be unique. Once created, a student can use it to register.
                                </p>

                                {errors.reg_number && (
                                    <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                        {errors.reg_number}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="animate-spin mr-1">⚪</span>
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {processing ? 'Saving...' : 'Save Number'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}