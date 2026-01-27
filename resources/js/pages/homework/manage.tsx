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
    AlertTriangle
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

    return (
        <AppLayout breadcrumbs={[{ title: 'Homework', href: '/homework' }, { title: 'Manage', href: '#' }]}>
            <Head title="Manage Homework" />

            <div className="max-w-5xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Assignments</h1>
                        <p className="text-sm text-gray-500 mt-1">Edit or delete assignments you have created.</p>
                    </div>
                    <Link
                        href="/homework/create"
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Assignment
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <form onSubmit={handleSearch} className="relative max-w-md">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search assignments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37368b] focus:border-transparent outline-none transition-all"
                        />
                    </form>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs font-bold text-gray-500 tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Title / Subject</th>
                                    <th className="px-6 py-4">Target Class</th>
                                    <th className="px-6 py-4">Due Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {homeworks.data.length > 0 ? (
                                    homeworks.data.map((hw) => (
                                        <tr key={hw.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 rounded-lg text-[#37368b]">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{hw.title}</div>
                                                        <div className="text-xs text-gray-500">{hw.subject}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">
                                                    {hw.form} - {hw.class}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {new Date(hw.due_date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/homework/${hw.id}/edit`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(hw.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                                                <p>No assignments found matching your search.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {homeworks.data.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex gap-1 justify-center">
                                {homeworks.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 text-xs rounded border ${
                                            link.active 
                                            ? 'bg-[#37368b] text-white border-[#37368b]' 
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
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