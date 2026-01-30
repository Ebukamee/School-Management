import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Calendar, 
    Clock, 
    ArrowLeft, 
    Edit, 
    Trash2, 
    FileText, 
    Download, 
    Users,
    UserCircle,
    CheckCircle,
    BookOpen,
    AlertTriangle,
    FileImage
} from 'lucide-react';

// Define the interface based on your DB schema
interface Homework {
    id: number;
    title: string;
    subject: string;
    form: string;
    class: string;
    description: string;
    due_date: string;
    image_path: string | null;
    created_at: string;
    created_by: {
        id: number;
        name: string;
    };
}

interface Props {
    homework: Homework;
}

export default function Show({ homework }: Props) {
    // Form helper for handling the delete action
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            destroy(`/homework/${homework.id}`);
        }
    };

    // Calculate days remaining
    const due = new Date(homework.due_date);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const isOverdue = diffDays < 0;
    const isDueSoon = diffDays >= 0 && diffDays <= 2;

    return (
        <AppLayout 
            breadcrumbs={[
                { title: 'Homework', href: '/homework' }, 
                { title: homework.title, href: '#' }
            ]}
        >
            <Head title={homework.title} />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <Link 
                            href="/homework" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Board
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/10">
                                <BookOpen className="w-6 h-6" />
                            </span>
                            Assignment Details
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href={`/homework/${homework.id}/edit`}
                            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:border-[#37368b] hover:text-[#37368b] transition-all shadow-sm"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        <button 
                            onClick={handleDelete}
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition-all shadow-sm disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Title Card */}
                        <div className=" group bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
                            {/* Accent Bar */}
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#37368b] group-hover:bg-[#ffc53a] transition-colors"></div>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-[#37368b] text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-blue-100">
                                    {homework.subject}
                                </span>
                                {isOverdue && (
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-red-100 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" /> Overdue
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{homework.title}</h2>
                            
                            <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 mt-3 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <UserCircle className="w-3.5 h-3.5 text-gray-400" />
                                    <span>By <span className="font-bold text-gray-700">{homework.created_by.name}</span></span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Posted {new Date(homework.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#37368b]" />
                                Instructions
                            </h3>
                            <div className="prose prose-blue prose-sm max-w-none text-gray-600 leading-relaxed">
                                <p className="whitespace-pre-wrap">{homework.description}</p>
                            </div>
                        </div>

                        {/* Attachment Preview */}
                        {homework.image_path && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FileImage className="w-4 h-4 text-[#37368b]" />
                                    Attachment
                                </h3>
                                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-2">
                                    <img 
                                        src={`/storage/${homework.image_path}`} 
                                        alt="Homework Attachment" 
                                        className="w-full h-auto object-contain max-h-[400px] rounded-lg"
                                    />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <a 
                                        href={`/storage/${homework.image_path}`} 
                                        download 
                                        className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#37368b] hover:bg-[#2a2970] px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Original
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar Metadata */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-1.5 bg-[#ffc53a]/20 text-[#d97706] rounded-md">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">Assignment Info</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Due Date */}
                                <div className={`flex items-start gap-3 p-4 rounded-xl border ${isOverdue ? 'bg-red-50 border-red-100' : isDueSoon ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className={`mt-0.5 ${isOverdue ? 'text-red-500' : isDueSoon ? 'text-amber-600' : 'text-gray-400'}`}>
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Due Date</p>
                                        <p className={`font-bold text-sm ${isOverdue ? 'text-red-700' : 'text-gray-900'}`}>
                                            {new Date(homework.due_date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs mt-1 font-medium opacity-80">
                                            {isOverdue ? `${Math.abs(diffDays)} days overdue` : `${diffDays} days remaining`}
                                        </p>
                                    </div>
                                </div>

                                {/* Target Class */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-[#37368b]">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Assigned To</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-bold text-gray-900 text-lg">{homework.form}</span>
                                            <span className="text-sm font-medium text-gray-500">- {homework.class}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}