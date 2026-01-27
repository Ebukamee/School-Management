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
    CheckCircle
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

            <div className="max-w-6xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        href="/homework" 
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#37368b] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Homework Board
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#37368b]"></div>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-[#37368b] text-xs font-bold uppercase tracking-wider rounded-md">
                                    {homework.subject}
                                </span>
                                {isOverdue && (
                                    <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md">
                                        Overdue
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{homework.title}</h1>
                            
                            <div className="flex items-center text-sm text-gray-500 gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <UserCircle className="w-4 h-4 text-gray-400" />
                                    <span>Posted by <span className="font-semibold text-gray-700">{homework.created_by.name}</span></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>Posted on {new Date(homework.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#37368b]" />
                                Instructions
                            </h3>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {homework.description}
                            </div>
                        </div>

                        {/* Attachment Preview (If exists) */}
                        {homework.image_path && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Download className="w-5 h-5 text-[#37368b]" />
                                    Attachment
                                </h3>
                                <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    <img 
                                        src={`/storage/${homework.image_path}`} 
                                        alt="Homework Attachment" 
                                        className="w-full h-auto object-contain max-h-[500px]"
                                    />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <a 
                                        href={`/storage/${homework.image_path}`} 
                                        download 
                                        className="inline-flex items-center gap-2 text-sm font-bold text-[#37368b] hover:underline"
                                    >
                                        Download Original
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar Metadata */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Assignment Details</h3>
                            
                            <div className="space-y-4">
                                {/* Due Date */}
                                <div className={`flex items-start gap-3 p-3 rounded-lg border ${isOverdue ? 'bg-red-50 border-red-100' : isDueSoon ? 'bg-yellow-50 border-yellow-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <Calendar className={`w-5 h-5 mt-0.5 ${isOverdue ? 'text-red-500' : isDueSoon ? 'text-yellow-600' : 'text-gray-500'}`} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Due Date</p>
                                        <p className={`font-semibold ${isOverdue ? 'text-red-700' : 'text-gray-800'}`}>
                                            {new Date(homework.due_date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs mt-1 font-medium opacity-80">
                                            {isOverdue ? `${Math.abs(diffDays)} days overdue` : `${diffDays} days remaining`}
                                        </p>
                                    </div>
                                </div>

                                {/* Target Class */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                    <Users className="w-5 h-5 text-[#37368b]" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase">Assigned To</p>
                                        <p className="font-semibold text-gray-800 text-lg">
                                            {homework.form} - {homework.class}
                                        </p>
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