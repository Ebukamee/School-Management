import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    BookOpen, 
    Calendar, 
    Layers, 
    Save, 
    Upload, 
    ArrowLeft,
    CheckCircle,
    Users,
    AlertCircle 
} from 'lucide-react';
import InputError from '@/components/input-error';

export default function Create() {
    // Exact match to your DB columns
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        title: '',
        form: '',        // Matches DB column 'form'
        class: '',       // Matches DB column 'class'
        description: '',
        due_date: '',
        image: null as File | null, // Frontend file object (DB column is 'image_path')
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Submit data exactly as is. 
        // Inertia automatically maps data.form -> request->form, data.class -> request->class
        post('/homework', {
            forceFormData: true,
        });
    };

    // Styling constants
    const inputWrapperClass = "space-y-1.5";
    const labelClass = "block text-sm font-semibold text-gray-700";
    const inputClass = "w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all duration-200 placeholder:text-gray-400";

    return (
        <AppLayout breadcrumbs={[{ title: 'Homework', href: '/homework' }, { title: 'Create', href: '#' }]}>
            <Head title="Create Homework" />

            <div className="max-w-4xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Create Assignment
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the details below to assign new homework.
                        </p>
                    </div>
                    <Link 
                        href="/homework" 
                        className="text-sm font-medium text-gray-500 hover:text-[#37368b] flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </Link>
                </div>

                {/* Global Error Alert */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-red-800">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside text-sm text-red-600 mt-1">
                                {Object.values(errors).map((error: any, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Main Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Subject */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Subject <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BookOpen className="h-4 w-4 text-gray-400" />
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

                            {/* Form & Class (Separate Columns) */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                
                                {/* FORM Input (Matches DB 'form') */}
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Form <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Layers className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <select
                                            value={data.form}
                                            onChange={e => setData('form', e.target.value)}
                                            className={`${inputClass} pl-10 ${errors.form ? 'border-red-300' : ''}`}
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
                                    </div>
                                    <InputError message={errors.form} className="mt-1" />
                                </div>

                                {/* CLASS Input (Matches DB 'class') */}
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Class Arm <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <select
                                            value={data.class}
                                            onChange={e => setData('class', e.target.value)}
                                            className={`${inputClass} pl-10 ${errors.class ? 'border-red-300' : ''}`}
                                        >
                                            <option value="">Select Arm</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                        </select>
                                    </div>
                                    <InputError message={errors.class} className="mt-1" />
                                </div>
                            </div>

                            {/* Title */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Assignment Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`${inputClass} ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="e.g. Chapter 5: Linear Equations"
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            {/* Description */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <div className="flex justify-between">
                                    <label className={labelClass}>Instructions <span className="text-red-500">*</span></label>
                                    <span className="text-xs text-gray-400">Markdown supported</span>
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
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-4 w-4 text-gray-400" />
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

                        <div className="border-t border-gray-100"></div>

                        {/* Attachments */}
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Attachments</label>
                            
                            <div className="mt-2">
                                <label className={`
                                    relative flex flex-col items-center justify-center w-full h-32 
                                    border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${errors.image ? 'border-red-300 bg-red-50' : data.image ? 'border-[#37368b] bg-blue-50/30' : 'border-gray-300'}
                                `}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {data.image ? (
                                            <>
                                                <CheckCircle className="w-8 h-8 text-[#37368b] mb-2" />
                                                <p className="text-sm text-gray-700 font-medium">{data.image.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">Click to replace</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className={`w-8 h-8 mb-2 ${errors.image ? 'text-red-400' : 'text-gray-400'}`} />
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-semibold text-[#37368b]">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (MAX. 2MB)</p>
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
                            {/* Validation error for the 'image_path' column */}
                            <InputError message={errors.image} className="mt-1" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#37368b] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing && <span className="animate-spin mr-1">⚪</span>}
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