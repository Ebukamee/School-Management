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
    FileImage
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
        _method: 'PUT', // Important for file uploads in Laravel Edit forms
        subject: homework.subject,
        title: homework.title,
        form: homework.form,
        class: homework.class,
        description: homework.description,
        // Format date for input type="date" (YYYY-MM-DD)
        due_date: homework.due_date ? homework.due_date.split('T')[0] : '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // We use POST with _method: PUT because Inertia/Laravel handles file uploads better this way
        post(`/homework/${homework.id}`, {
            forceFormData: true,
        });
    };

    const inputWrapperClass = "space-y-1.5";
    const labelClass = "block text-sm font-semibold text-gray-700";
    const inputClass = "w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:bg-white focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all duration-200 placeholder:text-gray-400";

    return (
        <AppLayout breadcrumbs={[{ title: 'Manage', href: '/homework/manage' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit Homework" />

            <div className="max-w-6xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Assignment</h1>
                        <p className="text-sm text-gray-500 mt-1">Update the details for "{homework.title}".</p>
                    </div>
                    <Link 
                        href="/homework/manage" 
                        className="text-sm font-medium text-gray-500 hover:text-[#37368b] flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Subject */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Subject <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                       
                                    </div>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Mathematics"
                                    />
                                </div>
                                <InputError message={errors.subject} className="mt-1" />
                            </div>

                            {/* Form & Class */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Form <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            
                                        </div>
                                        <select
                                            value={data.form}
                                            onChange={e => setData('form', e.target.value)}
                                            className={inputClass}
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
                                    <div className="relative">
                                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                            
                                        </div>
                                        <select
                                            value={data.class}
                                            onChange={e => setData('class', e.target.value)}
                                            className={inputClass}
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
                                    className={inputClass}
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            {/* Description */}
                            <div className={`md:col-span-2 ${inputWrapperClass}`}>
                                <label className={labelClass}>Instructions <span className="text-red-500">*</span></label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className={`${inputClass} min-h-[160px] resize-y`}
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
                                        className={inputClass}
                                    />
                                </div>
                                <InputError message={errors.due_date} className="mt-1" />
                            </div>
                        </div>

                        <div className="border-t border-gray-100"></div>

                        {/* Attachments */}
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Update Attachment</label>
                            
                            {/* Current Image Indicator */}
                            {homework.image_path && !data.image && (
                                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg mb-3">
                                    <FileImage className="w-5 h-5 text-[#37368b]" />
                                    <span className="text-sm text-gray-700">Current file exists. Uploading new file will replace it.</span>
                                </div>
                            )}

                            <div className="mt-2">
                                <label className={`
                                    relative flex flex-col items-center justify-center w-full h-32 
                                    border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${data.image ? 'border-[#37368b] bg-blue-50/30' : 'border-gray-300'}
                                `}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {data.image ? (
                                            <>
                                                <CheckCircle className="w-8 h-8 text-[#37368b] mb-2" />
                                                <p className="text-sm text-gray-700 font-medium">{data.image.name}</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-semibold text-[#37368b]">Click to replace</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">Leave empty to keep current file</p>
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
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#37368b] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing && <span className="animate-spin mr-1">⚪</span>}
                                <Save className="w-4 h-4" />
                                Update Homework
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}