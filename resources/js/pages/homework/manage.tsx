import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Edit, 
    Trash2, 
    Search, 
    Plus, 
    FileText, 
    Calendar,
    AlertTriangle,
    BookOpen,
    Users,
    Filter
} from 'lucide-react';

interface Homework {
    id: number;
    title: string;
    subject: string;
    form: string;
    class: string;
    due_date: string;
    created_at: string;
}

interface Props {
    homeworks: {
        data: Homework[];
        links: any[];
    };
}

export default function Manage({ homeworks }: Props) {
    const [search, setSearch] = useState('');
    const { delete: destroy } = useForm();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/homework/manage', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this assignment? This cannot be undone.')) {
            destroy(`/homework/${id}`);
        }
    };

    // --- STYLES ---
    const inputClass = "w-full border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white transition-all shadow-sm hover:border-gray-300 placeholder-gray-400 outline-none";

    return (
        <AppLayout breadcrumbs={[{ title: 'Homework', href: '/homework' }, { title: 'Manage', href: '#' }]}>
            <Head title="Manage Homework" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            {/* Brand Accent: Amber Background for Icon */}
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <BookOpen className="w-6 h-6" />
                            </span>
                            Manage Assignments
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Edit or delete assignments you have created.
                        </p>
                    </div>
                    <Link
                        href="/homework/create"
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        New Assignment
                    </Link>
                </div>

                {/* --- SEARCH & FILTER BAR --- */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#37368b] transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search assignments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={inputClass}
                        />
                    </form>
                    
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-[#37368b] hover:text-[#37368b] transition-all shadow-sm w-full md:w-auto">
                        <Filter className="w-4 h-4" />
                        Filter List
                    </button>
                </div>

                {/* --- DATA TABLE --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Title / Subject</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Target Class</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Due Date</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {homeworks.data.length > 0 ? (
                                    homeworks.data.map((hw) => (
                                        <tr key={hw.id} className="group hover:bg-[#37368b]/5 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 rounded-lg text-[#37368b] border border-blue-100 group-hover:bg-white group-hover:border-[#37368b]/20 transition-colors">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 group-hover:text-[#37368b] transition-colors">{hw.title}</div>
                                                        <div className="text-xs font-medium text-gray-500">{hw.subject}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                                                    <Users className="w-3.5 h-3.5 text-gray-400" />
                                                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">
                                                        {hw.form} - {hw.class}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600 font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {new Date(hw.due_date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/homework/${hw.id}/edit`}
                                                        className="p-2 text-gray-400 hover:text-[#37368b] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(hw.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="bg-[#ffc53a]/10 p-4 rounded-full mb-3">
                                                    <AlertTriangle className="w-8 h-8 text-[#d97706]" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">No assignments found</h3>
                                                <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                                                    Try adjusting your search terms or create a new assignment.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* --- PAGINATION --- */}
                    {homeworks.data.length > 0 && homeworks.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex gap-1 justify-center">
                                {homeworks.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`
                                            px-3 py-1.5 text-xs font-bold rounded-lg border transition-all
                                            ${link.active 
                                                ? 'bg-[#37368b] text-white border-[#37368b] shadow-md' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                                            ${!link.url && 'opacity-50 cursor-not-allowed'}
                                        `}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}