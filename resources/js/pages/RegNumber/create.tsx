import React from 'react';
import { useForm, Head } from '@inertiajs/react';
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

    // UPDATED: Standard path
    const breadcrumbs = [
        { title: 'Allowed Numbers', href: '/allowed-numbers' },
        { title: 'Create', href: '#' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        // UPDATED: Standard path
        post('/allowed-numbers');
    };

    const inputClass = "w-full border-gray-200 bg-gray-50/50 rounded-lg focus:border-[#37368b] focus:ring-[#37368b] focus:bg-white transition-all duration-200 text-sm py-2.5";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Allowed Number" />

            <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
                
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Add New Number
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Pre-approve a Registration Number for student signup.
                        </p>
                    </div>
                    {/* UPDATED: Standard path */}
                    <a 
                        href="/allowed-numbers" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#37368b] transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to List
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        
                        {/* Form Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#37368b]" />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                                    Number Details
                                </h2>
                            </div>
                            
                            <div className="p-8">
                                <div className="max-w-md">
                                    <label className={labelClass}>
                                        <Hash className="w-3 h-3" />
                                        Registration Number <span className="text-red-500">*</span>
                                    </label>
                                    
                                    <div className="relative mt-2">
                                        <input
                                            type="text"
                                            required
                                            value={data.reg_number}
                                            onChange={e => setData('reg_number', e.target.value)}
                                            className={`${inputClass} font-mono text-lg tracking-wide`}
                                            placeholder="e.g. 2024/001"
                                            autoFocus
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        This number must be unique. Once created, a student can use it to register.
                                    </p>

                                    {errors.reg_number && (
                                        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                            <span>{errors.reg_number}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save Number'}
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}