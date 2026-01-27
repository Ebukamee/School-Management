import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    BookOpen, 
    Calendar, 
    MoreVertical, 
    Plus, 
    Search, 
    Users, 
    FileImage,
    Filter,
    ChevronRight
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';

// Interface matching your DB structure + Laravel pagination
interface Homework {
    id: number;
    title: string;
    subject: string;
    target_class: string;
    description: string;
    due_date: string;
    image_path: string | null;
    created_at: string;
    created_by: {
        name: string;
    };
}

interface Props {
    homeworks?: { // Made optional to prevent crash
        data: Homework[];
        links: any[];
    };
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homeworks', href: '/homework' }
];

export default function HomeworkIndex({ homeworks }: Props) {
    const [search, setSearch] = useState('');

    // SAFELY ACCESS DATA: If homeworks is undefined, use empty array
    const homeworkList = homeworks?.data || [];
    const paginationLinks = homeworks?.links || [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/homework', { search }, { preserveState: true });
    };

    const getStatusColor = (dateString: string) => {
        const due = new Date(dateString);
        const now = new Date();
        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { bg: 'bg-red-50', text: 'text-red-700', label: 'Overdue' };
        if (diffDays <= 2) return { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Due Soon' };
        return { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' };
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Homework', href: '/homework' }]}>
            <Head title="Homework Board" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Homework Board</h1>
                        <p className="text-sm text-gray-500 mt-1">View your homeworks and assignment.</p>
                    </div>
                    
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#37368b] focus:border-[#37368b] sm:text-sm transition duration-150 ease-in-out"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors w-full md:w-auto">
                            <Filter className="w-4 h-4" />
                            Filter Class
                        </button>
                    </div>
                </div>

                {/* Content Grid - USING SAFE VARIABLE homeworkList */}
                {homeworkList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {homeworkList.map((hw) => {
                            const status = getStatusColor(hw.due_date);
                            
                            return (
                                <div key={hw.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#37368b]/30 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
                                    
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#37368b]"></div>

                                    <div className="p-5 flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex gap-2 items-center">
                                                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#37368b] text-xs font-bold uppercase tracking-wider">
                                                    {hw.subject}
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#37368b] transition-colors line-clamp-1">
                                            {hw.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {hw.target_class}
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Due: {new Date(hw.due_date).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                            {hw.description}
                                        </p>

                                        {hw.image_path && (
                                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 mb-2">
                                                <FileImage className="w-4 h-4 text-gray-500" />
                                                <span className="text-xs text-gray-600 font-medium">Image Attached</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                        <div className="text-xs text-gray-500">
                                            Posted by <span className="font-medium text-gray-700">{hw.created_by?.name || 'Teacher'}</span>
                                        </div>
                                        <Link 
                                            href={`/homework/${hw.id}`}
                                            className="text-xs font-bold text-[#37368b] hover:underline flex items-center gap-1"
                                        >
                                            View Details
                                            <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-[#37368b]" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Assignments Found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-1 mb-6">
                            There are no homework assignments created yet. Click the button below to assign one.
                        </p>
                        <Link
                            href="/homework/create"
                            className="inline-flex items-center gap-2 text-white bg-[#37368b] px-5 py-2.5 rounded-lg font-medium hover:bg-[#2a2970] transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Assignment
                        </Link>
                    </div>
                )}

                {/* Pagination (Using Safe Variable) */}
                {homeworkList.length > 0 && paginationLinks.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex gap-1">
                            {paginationLinks.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`
                                        px-4 py-2 text-sm rounded-lg border transition-colors
                                        ${link.active 
                                            ? 'bg-[#37368b] text-white border-[#37368b]' 
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
                                        ${!link.url && 'opacity-50 cursor-not-allowed'}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}