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

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            {/* Brand Accent: Amber Background */}
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <ClipboardList className="w-6 h-6" />
                            </span>
                            Attendance Logs
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            View history or edit past class registers.
                        </p>
                    </div>
                    
                    <Link 
                        href="/attendance/edit" 
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Mark New Register
                    </Link>
                </div>

                {/* --- TABLE CONTAINER --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Class Info</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Subject</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Teacher</th>
                                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {history.data.length > 0 ? (
                                    history.data.map((record: any, index: number) => (
                                        <tr key={index} className="group hover:bg-[#37368b]/5 transition-colors duration-200">
                                            
                                            {/* Date */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 flex items-center gap-2 group-hover:text-[#37368b] transition-colors">
                                                        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[#37368b]" />
                                                        {record.human_date}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-1 font-medium flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {record.updated_at}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Class */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-white group-hover:border-[#37368b]/20 transition-colors">
                                                    {record.form} • {record.class}
                                                </span>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 font-bold text-gray-700">
                                                    <div className="p-1.5 bg-blue-50 text-[#37368b] rounded-md">
                                                        <BookOpen className="w-3.5 h-3.5" />
                                                    </div>
                                                    {record.subject}
                                                </div>
                                            </td>

                                            {/* Teacher */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                                                        {record.recorded_by.charAt(0)}
                                                    </div>
                                                    <span className="text-gray-600 font-medium text-sm">{record.recorded_by}</span>
                                                </div>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link
                                                    href={`/attendance/edit?form=${record.form}&class=${record.class}&date=${record.date}&subject=${record.subject}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#37368b] bg-white border border-gray-200 hover:border-[#37368b] px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                    Edit Log
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                                            <div className="mx-auto w-16 h-16 bg-[#ffc53a]/10 rounded-full flex items-center justify-center mb-4 border border-[#ffc53a]/20">
                                                <Search className="w-8 h-8 text-[#d97706]" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">No Records Found</h3>
                                            <p className="text-sm mt-1">There are no attendance logs available yet.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION --- */}
                    {history.links && history.data.length > 0 && (
                        <div className="bg-gray-50/50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Showing <span className="font-bold text-gray-900">{history.from}</span> to <span className="font-bold text-gray-900">{history.to}</span> of <span className="font-bold text-gray-900">{history.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px" aria-label="Pagination">
                                        {history.links.map((link: any, k: number) => {
                                            
                                            // Safety check for label
                                            let labelStr = String(link.label);
                                            let content: React.ReactNode = labelStr;

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
                                                    className={`relative inline-flex items-center px-4 py-2 text-xs font-bold border transition-all duration-200
                                                        ${link.active 
                                                            ? 'z-10 bg-[#37368b] border-[#37368b] text-white shadow-md transform scale-105' 
                                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
                                                        ${k === 0 ? 'rounded-l-xl' : ''}
                                                        ${k === history.links.length - 1 ? 'rounded-r-xl' : ''}
                                                    `}
                                                >
                                                    {typeof content === 'string' ? (
                                                        <span dangerouslySetInnerHTML={{ __html: content }} />
                                                    ) : (
                                                        content
                                                    )}
                                                </Link>
                                            ) : (
                                                <span
                                                    key={k}
                                                    className={`relative inline-flex items-center px-4 py-2 text-xs font-bold border border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed
                                                        ${k === 0 ? 'rounded-l-xl' : ''}
                                                        ${k === history.links.length - 1 ? 'rounded-r-xl' : ''}
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