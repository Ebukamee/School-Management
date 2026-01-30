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
    AlertCircle,
    FileImage,
    FileText,
    CloudUpload
} from 'lucide-react';
import InputError from '@/components/input-error';

// Helper types
interface Homework {
    id: number;
    subject: string;
    title: string;
    form: string;
    class: string;
    description: string;
    due_date: string;
    image_path: string | null;
}

interface Props {
    homework: Homework;
}

export default function Edit({ homework }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        subject: homework.subject,
        title: homework.title,
        form: homework.form,
        class: homework.class,
        description: homework.description,
        due_date: homework.due_date ? homework.due_date.split('T')[0] : '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/homework/${homework.id}`, {
            forceFormData: true,
        });
    };

    // --- CADEMIC STYLES ---
    const inputWrapperClass = "space-y-1.5";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";
    const inputClass = "w-full rounded-xl border-gray-200 px-4 py-3 text-sm font-bold text-gray-800 placeholder-gray-300 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all duration-200 outline-none shadow-sm hover:border-gray-300";

    return (
        <AppLayout breadcrumbs={[{ title: 'Manage', href: '/homework/manage' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit Homework" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/10">
                                <FileText className="w-6 h-6" />
                            </span>
                            Edit Assignment
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Update the details for "{homework.title}".
                        </p>
                    </div>
                    <Link 
                        href="/homework/manage" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#37368b]"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel
                    </Link>
                </div>

                {/* --- MAIN FORM CARD --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Decorative Top Bar */}
                    
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
                                        className={`${inputClass} pl-10`}
                                        placeholder="e.g. Mathematics"
                                    />
                                </div>
                                <InputError message={errors.subject} className="mt-1" />
                            </div>

                            {/* Form & Class */}
                            <div className="grid grid-cols-2 gap-6 md:col-span-2">
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Form <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Layers className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <select
                                            value={data.form}
                                            onChange={e => setData('form', e.target.value)}
                                            className={`${inputClass} pl-10 appearance-none bg-white`}
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

                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Class Arm <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                        </div>
                                        <select
                                            value={data.class}
                                            onChange={e => setData('class', e.target.value)}
                                            className={`${inputClass} pl-10 appearance-none bg-white`}
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
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FileText className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className={`${inputClass} pl-10`}
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
                                    className={`${inputClass} min-h-[160px] resize-y`}
                                    placeholder="Describe the homework tasks..."
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
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                                <InputError message={errors.due_date} className="mt-1" />
                            </div>

                        </div>

                        <div className="border-t border-gray-50 pt-2"></div>

                        {/* Attachments */}
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Update Attachment</label>
                            
                            {/* Current File Indicator */}
                            {homework.image_path && !data.image && (
                                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-3">
                                    <FileImage className="w-5 h-5 text-[#37368b]" />
                                    <span className="text-sm font-bold text-gray-700">Current file attached. Uploading new file will replace it.</span>
                                </div>
                            )}

                            <div className="mt-2">
                                <label className={`
                                    relative flex flex-col items-center justify-center w-full h-40 
                                    border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
                                    ${errors.image 
                                        ? 'border-red-300 bg-red-50/50' 
                                        : data.image 
                                            ? 'border-[#ffc53a] bg-[#ffc53a]/5' 
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-[#37368b]'}
                                `}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        {data.image ? (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-[#ffc53a] flex items-center justify-center mb-3 text-[#37368b]">
                                                    <CheckCircle className="w-6 h-6" />
                                                </div>
                                                <p className="text-sm text-gray-900 font-bold">{data.image.name}</p>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Click to replace file</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${errors.image ? 'bg-red-100' : 'bg-[#ffc53a]/10'}`}>
                                                    <CloudUpload className={`w-6 h-6 ${errors.image ? 'text-red-500' : 'text-[#ffc53a]'}`} />
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
                                className="inline-flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}