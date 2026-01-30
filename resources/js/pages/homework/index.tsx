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
    ChevronRight,
    ListFilter
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
    homeworks?: { 
        data: Homework[];
        links: any[];
    };
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homeworks', href: '/homework' }
];

export default function HomeworkIndex({ homeworks }: Props) {
    const [search, setSearch] = useState('');

    // SAFELY ACCESS DATA
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

        if (diffDays < 0) return { bg: 'bg-red-50', text: 'text-red-700', label: 'Overdue', border: 'border-red-100' };
        if (diffDays <= 2) return { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Due Soon', border: 'border-amber-100' };
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Active', border: 'border-emerald-100' };
    };

    // --- STYLES ---
    const inputClass = "w-full border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white transition-all shadow-sm hover:border-gray-300 placeholder-gray-400 outline-none";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homework Board" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <BookOpen className="w-6 h-6" />
                            </span>
                            Homework Board
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">View and manage student assignments.</p>
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
                            className={inputClass}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
                        />
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-[#37368b] hover:text-[#37368b] transition-all shadow-sm w-full md:w-auto">
                            <Filter className="w-4 h-4" />
                            Filter Class
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                {homeworkList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {homeworkList.map((hw) => {
                            const status = getStatusColor(hw.due_date);
                            
                            return (
                                <div key={hw.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#37368b]/30 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
                                    
                                    {/* Left Accent Bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#37368b] group-hover:bg-[#ffc53a] transition-colors"></div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex gap-2 items-center flex-wrap">
                                                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#37368b] text-[10px] font-extrabold uppercase tracking-widest border border-blue-100">
                                                    {hw.subject}
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border ${status.bg} ${status.text} ${status.border}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                            <button className="text-gray-300 hover:text-[#37368b] transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#37368b] transition-colors line-clamp-1">
                                            {hw.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-4">
                                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                                {hw.target_class}
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {new Date(hw.due_date).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                                            {hw.description}
                                        </p>

                                        {hw.image_path && (
                                            <div className="flex items-center gap-2 bg-[#ffc53a]/10 p-2 rounded-lg border border-[#ffc53a]/20 mb-1">
                                                <FileImage className="w-4 h-4 text-[#d97706]" />
                                                <span className="text-xs text-[#d97706] font-bold">Attachment Included</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <div className="text-xs font-medium text-gray-500">
                                            By <span className="text-gray-900 font-bold">{hw.created_by?.name || 'Teacher'}</span>
                                        </div>
                                        <Link 
                                            href={`/homework/${hw.id}`}
                                            className="text-xs font-bold text-[#37368b] hover:text-[#2a2970] flex items-center gap-1 group/link"
                                        >
                                            View Details
                                            <ChevronRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <div className="bg-[#ffc53a]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ffc53a]/20">
                            <ListFilter className="w-10 h-10 text-[#d97706]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Assignments Found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2 mb-8 font-medium">
                            There are no homework assignments matching your criteria.
                        </p>
                        <Link
                            href="/homework/create"
                            className="inline-flex items-center gap-2 text-white bg-[#37368b] px-6 py-3 rounded-xl font-bold hover:bg-[#2a2970] transition-all shadow-lg shadow-indigo-900/20 hover:scale-105 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Create First Assignment
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {homeworkList.length > 0 && paginationLinks.length > 3 && (
                    <div className="mt-10 flex justify-center">
                        <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                            {paginationLinks.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`
                                        px-4 py-2 text-sm font-bold rounded-lg transition-all
                                        ${link.active 
                                            ? 'bg-[#37368b] text-white shadow-md' 
                                            : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
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