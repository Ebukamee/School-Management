import { Head, Link, router } from '@inertiajs/react';
import { 
    Edit, 
    FileText, 
    FilterX, 
    Loader2, 
    ListFilter,
    School,
    Calendar,
    GraduationCap,
    XCircle
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

// --- TYPES ---
interface Result {
    id: number;
    reg_number: string;
    class: string;
    student?: {
        name: string;
    };
}

interface PageProps {
    results: Result[];
    filters: {
        session: string;
        term: string;
        class: string;
    };
}

export default function TeacherManage({ results, filters }: PageProps) {
    // --- STATE ---
    const [values, setValues] = useState({
        session: filters.session || '',
        term: filters.term || '',
        class: filters.class || '',
    });

    const [isLoading, setIsLoading] = useState(false);

    // --- ACTIONS ---
    const handleFilterChange = (key: string, value: string) => {
        const newValues = { ...values, [key]: value };
        setValues(newValues);
        setIsLoading(true);

        router.get('/results/manage', newValues, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const clearFilters = () => {
        setValues({ session: '', term: '', class: '' });
        setIsLoading(true);
        router.get('/results/manage', {}, {
            onFinish: () => setIsLoading(false)
        });
    };

    // --- STYLES ---
    const selectClass = "w-full border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white transition-all shadow-sm hover:border-gray-300 cursor-pointer appearance-none";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const iconWrapperClass = "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400";

    return (
        <AppLayout>
            <Head title="Manage Results" />

            {/* UPDATED: Applied max-w-7xl and lg:min-w-5xl as requested */}
            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <FileText className="w-6 h-6" />
                            </span>
                            Update Results
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Search, filter, and manage student academic records.
                        </p>
                    </div>

                    {isLoading && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#37368b] rounded-xl text-sm font-bold animate-pulse">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating list...
                        </div>
                    )}
                </div>

                {/* --- FILTERS CARD --- */}
                {/* UPDATED: Changed rounded-3xl to rounded-xl */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                    <div className="flex items-center gap-2 mb-6 text-[#37368b]">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <ListFilter className="w-5 h-5" />
                        </div>
                        <h2 className="font-bold text-lg text-gray-900">Filter Records</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Session */}
                        <div className="relative group">
                            <label className={labelClass}>Academic Session</label>
                            <div className="relative">
                                <select
                                    value={values.session}
                                    onChange={(e) => handleFilterChange('session', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">All Sessions</option>
                                    <option value="2023/2024">2023/2024</option>
                                    <option value="2024/2025">2024/2025</option>
                                </select>
                                <Calendar className={iconWrapperClass + " w-4 h-4"} />
                            </div>
                        </div>

                        {/* Term */}
                        <div className="relative group">
                            <label className={labelClass}>Term</label>
                            <div className="relative">
                                <select
                                    value={values.term}
                                    onChange={(e) => handleFilterChange('term', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">All Terms</option>
                                    <option value="First">First Term</option>
                                    <option value="Second">Second Term</option>
                                    <option value="Third">Third Term</option>
                                </select>
                                <School className={iconWrapperClass + " w-4 h-4"} />
                            </div>
                        </div>

                        {/* Class */}
                        <div className="relative group">
                            <div className="flex justify-between items-center mb-2">
                                <label className={labelClass + " mb-0"}>Class Level</label>
                                {(values.session || values.term || values.class) && (
                                    <button 
                                        onClick={clearFilters}
                                        className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-md"
                                    >
                                        <XCircle className="w-3 h-3" /> Clear Filters
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <select
                                    value={values.class}
                                    onChange={(e) => handleFilterChange('class', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">All Classes</option>
                                    <option value="SS1">SS1</option>
                                    <option value="SS2">SS2</option>
                                    <option value="SS3">SS3</option>
                                </select>
                                <GraduationCap className={iconWrapperClass + " w-4 h-4"} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RESULTS TABLE --- */}
                {/* UPDATED: Changed rounded-3xl to rounded-xl */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {results.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Reg Number</th>
                                        <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Student Name</th>
                                        <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Class</th>
                                        <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {results.map((result) => (
                                        <tr 
                                            key={result.id} 
                                            className="group hover:bg-[#37368b]/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 group-hover:border-[#37368b]/20 group-hover:text-[#37368b] transition-colors">
                                                    {result.reg_number}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#ffc53a] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                        {result.student?.name.charAt(0) || '?'}
                                                    </div>
                                                    <span className={`font-bold text-sm ${result.student ? 'text-gray-900' : 'text-red-400 italic'}`}>
                                                        {result.student?.name || 'Deleted User'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-sm text-gray-600">{result.class}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Uploaded
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/results/${result.id}/edit`}
                                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 shadow-sm transition-all hover:border-[#37368b] hover:text-[#37368b] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                    Update
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* --- EMPTY STATE --- */
                        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                <FilterX className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                                We couldn't find any records matching your current filters. Try selecting a different session or class.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-[#37368b] hover:text-[#37368b] transition-all shadow-sm hover:shadow-md"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}