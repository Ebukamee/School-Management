import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// --- Types matching your Database Structure ---
interface DbSubject {
    id: number;
    subject_name: string;
    ca_score: number;
    exam_score: number;
    total: number;
    grade: string; // This comes from your Laravel Backend
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
    {
        title: 'Results',
        href: '/results'
    }
];

export default function Results({ results = [] }: Props) {
    const [selectedTerm, setSelectedTerm] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- TRANSFORM DATA: Group flat DB results by Class & Session ---
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

            // We calculate the Term Average here just for display
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

    // --- Visual Helpers (Only for colors, not logic) ---
    const getGradeColor = (grade: string): string => {
        // Normalize grade to uppercase just in case
        const g = grade.toUpperCase();
        if (g === 'A') return 'text-green-600 bg-green-50';
        if (g === 'B') return 'text-blue-600 bg-blue-50';
        if (g === 'C') return 'text-yellow-600 bg-yellow-50';
        if (g === 'D') return 'text-orange-600 bg-orange-50';
        return 'text-red-600 bg-red-50';
    };

    const getScoreColor = (score: number): string => {
        if (score >= 70) return 'text-green-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    // --- Display Helper ---
    // This now translates the GRADE (A, B, C) to a remark
    // It does NOT calculate based on score anymore.
    const getRemarkFromGrade = (grade: string) => {
        const g = grade.toUpperCase();
        if (g === 'A') return 'Excellent';
        if (g === 'B') return 'Very Good';
        if (g === 'C') return 'Credit';
        if (g === 'D') return 'Pass';
        return 'Fail';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Academic Results" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#37368b] mb-2">Academic Results</h1>
                    <p className="text-gray-600">View your academic performance across different classes and terms</p>
                </div>

                {/* Empty State */}
                {groupedResults.length === 0 && (
                    <div className="text-center p-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No results found yet.</p>
                    </div>
                )}

                {/* Results by Class Level */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    {groupedResults.map((levelData: any, index: number) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                            {/* Class Level Header */}
                            <div className="bg-[#37368b] px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-white">{levelData.level}</h2>
                                    <span className="text-white/80 text-sm">{levelData.year}</span>
                                </div>
                            </div>

                            {/* Terms List */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {levelData.terms.map((term: any, termIndex: number) => (
                                        <div
                                            key={termIndex}
                                            onClick={() => openTermModal(levelData.level, term)}
                                            className="border-2 border-gray-200 rounded-xl p-4 hover:border-[#37368b] hover:shadow-md transition-all duration-200 cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-[#37368b] capitalize">
                                                    {term.term} Term
                                                </h3>
                                                <div className="text-right">
                                                    <div className={`text-lg font-bold ${getScoreColor(term.average)}`}>
                                                        {term.average}%
                                                    </div>
                                                    <div className="text-xs text-gray-500">Average</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center text-sm text-gray-600">
                                                <span>Subjects: {term.subjects.length}</span>
                                            </div>
                                            
                                            <div className="mt-3 flex justify-between items-center">
                                                <span className="text-xs text-gray-500 capitalize">
                                                    {term.remark || "No Remark"}
                                                </span>
                                                <button className="text-[#37368b] text-sm font-medium hover:text-[#2a2970]">
                                                    View Details →
                                                </button>
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
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Academic Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center p-3">
                                <div className="text-xl font-bold text-[#37368b]">{groupedResults.length}</div>
                                <div className="text-gray-600 text-sm">Classes</div>
                            </div>
                            <div className="text-center p-3">
                                <div className="text-xl font-bold text-[#37368b]">{results.length}</div>
                                <div className="text-gray-600 text-sm">Total Terms</div>
                            </div>
                            <div className="text-center p-3">
                                <div className="text-xl font-bold text-[#37368b]">
                                    {(results.reduce((acc, curr) => acc + curr.subjects.length, 0))}
                                </div>
                                <div className="text-gray-600 text-sm">Total Subjects</div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>

            {/* Formal Term Details Modal */}
            {isModalOpen && selectedTerm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-[#37368b] px-6 py-4 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white capitalize">{selectedTerm.level} - {selectedTerm.term} Term</h3>
                                    <p className="text-white/80 text-sm">Academic Performance Details</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Performance Summary */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.average}%</div>
                                    <div className="text-sm text-gray-600">Average Score</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.subjects.length}</div>
                                    <div className="text-sm text-gray-600">Subjects</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-[#37368b] capitalize">{selectedTerm.remark || "N/A"}</div>
                                    <div className="text-sm text-gray-600">Teacher's Remark</div>
                                </div>
                            </div>
                        </div>

                        {/* Subjects Table */}
                        <div className="p-6">
                            <h4 className="font-semibold text-[#37368b] mb-4">Subject Performance Breakdown</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-[#37368b]">Subject</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">CA</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Exam</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Total</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Grade</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedTerm.subjects.map((subject: DbSubject, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-medium text-gray-900">{subject.subject_name}</div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="font-medium text-gray-700">{subject.ca_score}</div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="font-medium text-gray-700">{subject.exam_score}</div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className={`font-semibold ${getScoreColor(subject.total)}`}>
                                                        {subject.total}%
                                                    </div>
                                                </td>
                                                {/* HERE: We strictly use the Grade from the Database */}
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                                                        {subject.grade}
                                                    </span>
                                                </td>
                                                {/* HERE: We map the Remark based on the Grade, not the score */}
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-sm text-gray-600">
                                                        {getRemarkFromGrade(subject.grade)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                >
                                    Close
                                </button>
                                <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
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