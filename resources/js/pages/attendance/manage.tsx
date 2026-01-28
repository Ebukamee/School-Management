import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    ClipboardList, 
    Edit, 
    Calendar, 
    BookOpen, 
    User, 
    Plus,
    Search,
    Clock,
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

export default function Manage({ history }: any) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Attendance', href: '#' }, { title: 'Manage Logs', href: '#' }]}>
            <Head title="Attendance Logs" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                            <ClipboardList className="w-6 h-6 text-[#37368b]" />
                            Attendance Logs
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            View history or edit past class registers.
                        </p>
                    </div>
                    
                    <Link 
                        href="/attendance/edit" 
                        className="bg-[#37368b] hover:bg-[#2a2970] text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Mark New Register
                    </Link>
                </div>

                {/* --- TABLE CONTAINER --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Class Info</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Teacher</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {history.data.length > 0 ? (
                                    history.data.map((record: any, index: number) => (
                                        <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                                            
                                            {/* Date */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        {record.human_date}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {record.updated_at}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Class */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                    {record.form} • {record.class}
                                                </span>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 font-medium text-gray-700">
                                                    <BookOpen className="w-4 h-4 text-[#37368b]" />
                                                    {record.subject}
                                                </div>
                                            </td>

                                            {/* Teacher */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        {record.recorded_by.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-600">{record.recorded_by}</span>
                                                </div>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link
                                                    href={`/attendance/edit?form=${record.form}&class=${record.class}&date=${record.date}&subject=${record.subject}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#37368b] hover:text-[#2a2970] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <Search className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <p>No attendance records found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION --- */}
                    {history.links && history.data.length > 0 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Showing logs <span className="font-bold">{history.from}</span> to <span className="font-bold">{history.to}</span>
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {history.links.map((link: any, k: number) => {
                                            
                                            // --- FIX: Safely convert label to string ---
                                            let labelStr = String(link.label);
                                            let content: React.ReactNode = labelStr;

                                            // Replace text with icons for Next/Prev
                                            if (labelStr.includes('Previous') || labelStr.includes('&laquo;')) {
                                                content = <ArrowLeft className="w-4 h-4" />;
                                            }
                                            if (labelStr.includes('Next') || labelStr.includes('&raquo;')) {
                                                content = <ArrowRight className="w-4 h-4" />;
                                            }

                                            return link.url ? (
                                                <Link
                                                    key={k}
                                                    href={link.url}
                                                    className={`relative inline-flex items-center px-4 py-2 text-xs font-bold border transition-colors
                                                        ${link.active 
                                                            ? 'z-10 bg-[#37368b] border-[#37368b] text-white' 
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                                                        ${k === 0 ? 'rounded-l-md' : ''}
                                                        ${k === history.links.length - 1 ? 'rounded-r-md' : ''}
                                                    `}
                                                >
                                                    {/* Render icon directly OR render HTML string */}
                                                    {typeof content === 'string' ? (
                                                        <span dangerouslySetInnerHTML={{ __html: content }} />
                                                    ) : (
                                                        content
                                                    )}
                                                </Link>
                                            ) : (
                                                <span
                                                    key={k}
                                                    className={`relative inline-flex items-center px-4 py-2 text-xs font-bold border border-gray-300 bg-gray-50 text-gray-300 cursor-not-allowed
                                                        ${k === 0 ? 'rounded-l-md' : ''}
                                                        ${k === history.links.length - 1 ? 'rounded-r-md' : ''}
                                                    `}
                                                >
                                                    {typeof content === 'string' ? (
                                                        <span dangerouslySetInnerHTML={{ __html: content }} />
                                                    ) : (
                                                        content
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}