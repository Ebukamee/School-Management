import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Printer, X, BookOpen } from 'lucide-react';

// --- Types ---
interface DbSubject {
    id: number;
    subject_name: string;
    ca_score: number;
    exam_score: number;
    total: number;
    grade: string;
}

interface DbResult {
    id: number;
    class: string;
    session: string; 
    term: string;
    remark: string;
    subjects: DbSubject[];
    created_at: string;
}

interface Props {
    results: DbResult[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Results', href: '/results' }
];

export default function Results({ results = [] }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const [selectedTerm, setSelectedTerm] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- TRANSFORM DATA ---
    const groupedResults = useMemo(() => {
        const groups: Record<string, any> = {};
        results.forEach((result) => {
            const key = `${result.class}-${result.session}`;
            if (!groups[key]) {
                groups[key] = {
                    level: result.class,
                    year: result.session,
                    terms: []
                };
            }
            const totalScore = result.subjects.reduce((sum, sub) => sum + sub.total, 0);
            const avg = result.subjects.length > 0 
                ? (totalScore / result.subjects.length).toFixed(1) 
                : 0;

            groups[key].terms.push({
                ...result,
                average: avg,
            });
        });
        return Object.values(groups);
    }, [results]);

    const openTermModal = (level: string, termData: any) => {
        setSelectedTerm({ level, ...termData });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTerm(null);
    };

    // --- Visual Helpers (Web View Only) ---
    const getGradeColor = (grade: string): string => {
        const g = grade.toUpperCase();
        if (g === 'A') return 'text-green-700 bg-green-50 border-green-100 border';
        if (g === 'B') return 'text-blue-700 bg-blue-50 border-blue-100 border';
        if (g === 'C') return 'text-amber-700 bg-amber-50 border-amber-100 border';
        if (g === 'D') return 'text-orange-700 bg-orange-50 border-orange-100 border';
        if (g === 'E') return 'text-red-700 bg-red-50 border-red-100 border';
        return 'text-gray-700 bg-gray-50 border-gray-200 border';
    };

    const getScoreColor = (score: number): string => {
        if (score >= 70) return 'text-green-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 50) return 'text-amber-600';
        if (score >= 45) return 'text-orange-600';
        if (score >= 40) return 'text-red-600';
        return 'text-gray-600';
    };

    const getRemarkFromGrade = (grade: string) => {
        const g = grade.toUpperCase();
        if (g === 'A') return 'Excellent';
        if (g === 'B') return 'Very Good';
        if (g === 'C') return 'Credit';
        if (g === 'D') return 'Pass';
        if (g === 'E') return 'Weak Pass';
        return 'Fail';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Academic Results" />
            
            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                           
                            Academic Results
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">View your academic performance across different classes and terms.</p>
                    </div>
                </div>

                {/* Empty State */}
                {groupedResults.length === 0 && (
                    <div className="text-center p-12 bg-white rounded-xl border-2 border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto">
                        <p className="text-gray-500 font-medium">No results found yet.</p>
                    </div>
                )}

                {/* Results by Class Level */}
                <div className="space-y-8  mx-auto">
                    {groupedResults.map((levelData: any, index: number) => (
                        <div key={index} className="bg-pink  rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-[#37368b] px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">{levelData.level}</h2>
                                <span className="text-white/80 text-sm font-medium bg-white/10 px-3 py-1 rounded-full">{levelData.year}</span>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {levelData.terms.map((term: any, termIndex: number) => (
                                        <div
                                            key={termIndex}
                                            onClick={() => openTermModal(levelData.level, term)}
                                            className="border border-gray-200 rounded-xl p-5 hover:border-[#37368b] hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gray-50/30 hover:bg-white"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-gray-900 group-hover:text-[#37368b] capitalize text-lg">
                                                    {term.term} Term
                                                </h3>
                                                <div className="text-right">
                                                    <div className={`text-xl font-extrabold ${getScoreColor(term.average)}`}>
                                                        {term.average}%
                                                    </div>
                                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Average</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center text-sm font-medium text-gray-600 border-t border-gray-100 pt-3">
                                                <span>{term.subjects.length} Subjects</span>
                                                <span className="text-[#37368b] text-xs font-bold hover:underline flex items-center gap-1">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Statistics Summary */}
                {groupedResults.length > 0 && (
                    <div className="mt-12  mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest text-center mb-6">Academic Summary</h3>
                            <div className="grid grid-cols-3 gap-4 divide-x divide-gray-100">
                                <div className="text-center px-4">
                                    <div className="text-3xl font-extrabold text-[#37368b]">{groupedResults.length}</div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mt-1">Classes</div>
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-extrabold text-[#37368b]">{results.length}</div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mt-1">Total Terms</div>
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-extrabold text-[#37368b]">
                                        {(results.reduce((acc, curr) => acc + curr.subjects.length, 0))}
                                    </div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mt-1">Total Subjects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && selectedTerm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        
                        {/* 1. ID FOR PRINTING */}
                        <div id="printable-result">

                            {/* ==============================================
                                VIEW 1: WEB UI (Hidden when printing)
                                ============================================== */}
                            <div className="print:hidden">
                                {/* Modal Header */}
                                <div className="bg-[#37368b] px-8 py-5 sticky top-0 z-10">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-bold text-white capitalize tracking-tight">{selectedTerm.level} - {selectedTerm.term} Term</h3>
                                            <p className="text-white/70 text-sm font-medium">Academic Performance Details</p>
                                        </div>
                                        <button onClick={closeModal} className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all">
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Performance Summary */}
                                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <div className="text-3xl font-extrabold text-[#37368b]">{selectedTerm.average}%</div>
                                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Average Score</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <div className="text-3xl font-extrabold text-[#37368b]">{selectedTerm.subjects.length}</div>
                                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Subjects</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm col-span-2 md:col-span-1">
                                            <div className="text-lg font-bold text-[#37368b] capitalize">{selectedTerm.remark || "N/A"}</div>
                                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Remark</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subjects Table (Web Colorful Ver) */}
                                <div className="p-8">
                                    <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-6 border-l-4 border-[#37368b] pl-3">Subject Breakdown</h4>
                                    <div className="overflow-hidden rounded-xl border border-gray-200">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    <th className="px-6 py-4 text-left font-bold text-gray-600 uppercase text-xs tracking-wider">Subject</th>
                                                    <th className="px-4 py-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider">CA</th>
                                                    <th className="px-4 py-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider">Exam</th>
                                                    <th className="px-4 py-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider">Total</th>
                                                    <th className="px-4 py-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider">Grade</th>
                                                    <th className="px-6 py-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider">Remark</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                {selectedTerm.subjects.map((subject: DbSubject, index: number) => (
                                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-bold text-gray-800">{subject.subject_name}</td>
                                                        <td className="px-4 py-4 text-center font-medium text-gray-600">{subject.ca_score}</td>
                                                        <td className="px-4 py-4 text-center font-medium text-gray-600">{subject.exam_score}</td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className={`font-bold ${getScoreColor(subject.total)}`}>{subject.total}%</span>
                                                        </td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${getGradeColor(subject.grade)}`}>{subject.grade}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-xs font-medium text-gray-500">{getRemarkFromGrade(subject.grade)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* ==============================================
                                VIEW 2: PRINT UI (Only visible when printing)
                                - Reverted to ORIGINAL FORMAL LAYOUT
                                - Changed font to 'font-serif'
                                ============================================== */}
                            <div className="hidden print:block p-8 bg-white text-black font-serif">
                                {/* Formal Header */}
                                <div className="text-center border-b-2 border-black pb-4 mb-6">
                                    <div className="flex flex-col items-center justify-center mb-4">
                                     <div className="w-16 h-16 mb-2">
                                        <AppLogoIcon className="w-full h-full text-black" />
                                     </div>
                                     <h1 className="text-3xl font-bold uppercase tracking-wider">Golfield Junior School</h1>
                                     <p className="text-sm italic">123 Osolo Road, Ajao Estate</p>
                                    </div>
                                    <h2 className="text-xl font-bold mt-4 uppercase underline">Termly Report Sheet</h2>
                                </div>

                                {/* Student Details Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8 text-sm border border-black p-4">
                                    <div>
                                        <p><span className="font-bold">Name:</span> {user.name.toUpperCase()}</p>
                                        <p><span className="font-bold">Reg No:</span> {user.reg_number as string || 'N/A'}</p>
                                        <p><span className="font-bold">Total Subjects:</span> {selectedTerm.subjects.length}</p>
                                        <p><span className="font-bold">Total:</span> {Math.round(selectedTerm.subjects.length * selectedTerm.average)}</p>
                                        <p><span className="font-bold">Term Average:</span> {selectedTerm.average}</p>
                                    </div>
                                    <div className="text-right">
                                        <p><span className="font-bold">Class:</span> {selectedTerm.level}</p>
                                        <p><span className="font-bold">Session:</span> {selectedTerm.session}</p>
                                        <p><span className="font-bold">Term:</span> {selectedTerm.term}</p>
                                    </div>
                                </div>

                                {/* Formal Table (Black & White) */}
                                <table className="w-full border-collapse border border-black text-sm mb-8">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-black px-2 py-2 text-left">Subject</th>
                                            <th className="border border-black px-2 py-2 text-center">CA</th>
                                            <th className="border border-black px-2 py-2 text-center">Exam</th>
                                            <th className="border border-black px-2 py-2 text-center">Total</th>
                                            <th className="border border-black px-2 py-2 text-center">Grade</th>
                                            <th className="border border-black px-2 py-2 text-center">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTerm.subjects.map((subject: DbSubject, index: number) => (
                                            <tr key={index}>
                                                <td className="border border-black px-2 py-2">{subject.subject_name}</td>
                                                <td className="border border-black px-2 py-2 text-center">{subject.ca_score}</td>
                                                <td className="border border-black px-2 py-2 text-center">{subject.exam_score}</td>
                                                <td className="border border-black px-2 py-2 text-center font-bold">{subject.total}</td>
                                                <td className="border border-black px-2 py-2 text-center">{subject.grade}</td>
                                                <td className="border border-black px-2 py-2 text-center italic">{getRemarkFromGrade(subject.grade)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Summary & Signatures */}
                                <div className="border border-black p-2 text-center mb-16">
                                    <p className="text-xs font-bold uppercase">Remarks</p>
                                    <p className="text-md italic">{selectedTerm.remark || "Satisfactory"}</p>
                                </div>

                                <div className="flex justify-between px-4">
                                    <div className="text-center w-40">
                                        <div className="border-b border-black mb-2"></div>
                                        <p className="text-xs">Teacher's Signature</p>
                                    </div>
                                    <div className="text-center w-40">
                                        <div className="border-b border-black mb-2"></div>
                                        <p className="text-xs">Principal's Signature</p>
                                        <p className="text-[10px] text-gray-500">{new Date().toDateString()}</p>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        {/* END PRINTABLE AREA */}

                        {/* Modal Footer (Hidden on Print) */}
                        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl no-print sticky bottom-0">
                            <div className="flex justify-end gap-4">
                                <button 
                                    onClick={closeModal} 
                                    className="px-6 py-2.5 text-gray-600 hover:text-gray-900 font-bold text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    Close
                                </button>
                                <button 
                                    onClick={() => window.print()} 
                                    className="flex items-center gap-2 bg-[#ffc53a] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#f5b029] transition-all shadow-lg shadow-orange-900/10 hover:shadow-orange-900/20 hover:-translate-y-0.5"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print Result
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}