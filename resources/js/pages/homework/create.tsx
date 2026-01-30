import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    BookOpen, 
    Calendar, 
    Layers, 
    Save, 
    ArrowLeft,
    CheckCircle,
    Users,
    AlertCircle,
    FileText,
    CloudUpload
} from 'lucide-react';
import InputError from '@/components/input-error';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        title: '',
        form: '',
        class: '',
        description: '',
        due_date: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/homework', {
            forceFormData: true,
        });
    };

    // --- CADEMIC STYLES ---
    const inputWrapperClass = "space-y-1.5";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";
    // Fixed border colors: Gray default -> Blue focus. No black on hover.
    const inputClass = "w-full rounded-xl border-gray-200 px-4 py-3 text-sm font-bold text-gray-800 placeholder-gray-300 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all duration-200 outline-none shadow-sm hover:border-gray-300 bg-white";

    return (
        <AppLayout breadcrumbs={[{ title: 'Homework', href: '/homework' }, { title: 'Create', href: '#' }]}>
            <Head title="Create Homework" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            {/* Color Injection: Amber Background for Icon */}
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <BookOpen className="w-6 h-6" />
                            </span>
                            Create Assignment
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Fill in the details below to assign new homework.
                        </p>
                    </div>
                    <Link 
                        href="/homework" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#37368b]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </Link>
                </div>

                {/* --- GLOBAL ERROR ALERT --- */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-red-800">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside text-xs text-red-600 mt-1 font-medium">
                                {Object.values(errors).map((error: any, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* --- MAIN FORM CARD --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Subject */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Subject <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BookOpen className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className={`${inputClass} pl-10 ${errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="e.g. Mathematics"
                                        autoFocus
                                    />
                                </div>
                                <InputError message={errors.subject} className="mt-1" />
                            </div>

                            {/* Form & Class */}
                            <div className="grid grid-cols-2 gap-6 md:col-span-2">
                                {/* Form */}
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Form <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Layers className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <select
                                            value={data.form}
                                            onChange={e => setData('form', e.target.value)}
                                            className={`${inputClass} pl-10 appearance-none ${errors.form ? 'border-red-300' : ''}`}
                                        >
                                            <option value="">Select Form</option>
                                            <optgroup label="Junior Secondary">
                                                <option value="JSS1">JSS 1</option>
                                                <option value="JSS2">JSS 2</option>
                                                <option value="JSS3">JSS 3</option>
                                            </optgroup>
                                            <optgroup label="Senior Secondary">
                                                <option value="SSS1">SSS 1</option>
                                                <option value="SSS2">SSS 2</option>
                                                <option value="SSS3">SSS 3</option>
                                            </optgroup>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                        </div>
                                    </div>
                                    <InputError message={errors.form} className="mt-1" />
                                </div>

                                {/* Class */}
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Class Arm <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <select
                                            value={data.class}
                                            onChange={e => setData('class', e.target.value)}
                                            className={`${inputClass} pl-10 appearance-none ${errors.class ? 'border-red-300' : ''}`}
                                        >
                                            <option value="">Select Arm</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                        </div>
                                    </div>
                                    <InputError message={errors.class} className="mt-1" />
                                </div>
                            </div>

                            {/* Title */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Assignment Title <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FileText className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className={`${inputClass} pl-10 ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="e.g. Chapter 5: Linear Equations"
                                    />
                                </div>
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            {/* Description */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <div className="flex justify-between items-center mb-1.5 ml-1">
                                    <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest">Instructions <span className="text-red-500">*</span></label>
                                </div>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className={`${inputClass} min-h-[160px] resize-y ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="Describe the homework tasks, required reading, or specific questions..."
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            {/* Due Date */}
                            <div className={`md:col-span-1 ${inputWrapperClass}`}>
                                <label className={labelClass}>Due Date <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                    </div>
                                    <input
                                        type="date"
                                        value={data.due_date}
                                        onChange={e => setData('due_date', e.target.value)}
                                        className={`${inputClass} pl-10 ${errors.due_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                </div>
                                <InputError message={errors.due_date} className="mt-1" />
                            </div>

                        </div>

                        <div className="border-t border-gray-50 pt-2"></div>

                        {/* Attachments - Color Injection here */}
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Attachments</label>
                            
                            <div className="mt-2">
                                <label className={`
                                    relative flex flex-col items-center justify-center w-full h-40 
                                    border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
                                    ${errors.image 
                                        ? 'border-red-300 bg-red-50/50' 
                                        : data.image 
                                            ? 'border-[#ffc53a] bg-[#ffc53a]/5' // Active/Filled state is Amber
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-[#37368b]'}
                                `}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        {data.image ? (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-[#ffc53a] flex items-center justify-center mb-3 text-[#37368b] shadow-sm">
                                                    <CheckCircle className="w-6 h-6" />
                                                </div>
                                                <p className="text-sm text-gray-900 font-bold">{data.image.name}</p>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Click to replace file</p>
                                            </>
                                        ) : (
                                            <>
                                                {/* Amber Icon Background */}
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${errors.image ? 'bg-red-100' : 'bg-[#ffc53a]/20'}`}>
                                                    <CloudUpload className={`w-6 h-6 ${errors.image ? 'text-red-500' : 'text-[#d97706]'}`} />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-[#37368b] hover:underline">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">JPG, PNG, PDF (MAX. 2MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                        accept="image/*,application/pdf"
                                    />
                                </label>
                            </div>
                            <InputError message={errors.image} className="mt-1" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                                <Save className="w-4 h-4" />
                                Publish Homework
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}