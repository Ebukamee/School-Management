import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Subject {
    name: string;
    grade: string;
    score: number;
    caScore: number;
    examScore: number;
    remark: string;
}

interface Term {
    term: string;
    average: number;
    position: string;
    totalStudents: number;
    subjects: Subject[];
}

interface LevelData {
    level: string;
    year: string;
    terms: Term[];
}

interface SelectedTerm extends Term {
    level: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Results',
        href: '/results'
    }
];

export default function Results() {
    const [selectedTerm, setSelectedTerm] = useState<SelectedTerm | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data structure with CA and Exam scores
    const academicResults: LevelData[] = [
        {
            level: "SS3",
            year: "2023/2024",
            terms: [
                {
                    term: "First Term",
                    average: 78.5,
                    position: "15th",
                    totalStudents: 45,
                    subjects: [
                        { name: "Mathematics", grade: "A", score: 85, caScore: 38, examScore: 47, remark: "Excellent" },
                        { name: "English Language", grade: "B", score: 72, caScore: 32, examScore: 40, remark: "Good" },
                        { name: "Physics", grade: "A", score: 88, caScore: 40, examScore: 48, remark: "Excellent" },
                        { name: "Chemistry", grade: "B+", score: 79, caScore: 35, examScore: 44, remark: "Very Good" },
                        { name: "Biology", grade: "B", score: 75, caScore: 33, examScore: 42, remark: "Good" },
                        { name: "Further Mathematics", grade: "A-", score: 82, caScore: 37, examScore: 45, remark: "Very Good" }
                    ]
                },
                {
                    term: "Second Term",
                    average: 81.2,
                    position: "12th",
                    totalStudents: 45,
                    subjects: [
                        { name: "Mathematics", grade: "A", score: 87, caScore: 39, examScore: 48, remark: "Excellent" },
                        { name: "English Language", grade: "B+", score: 76, caScore: 34, examScore: 42, remark: "Very Good" },
                        { name: "Physics", grade: "A", score: 90, caScore: 42, examScore: 48, remark: "Outstanding" },
                        { name: "Chemistry", grade: "A-", score: 83, caScore: 37, examScore: 46, remark: "Excellent" },
                        { name: "Biology", grade: "B+", score: 78, caScore: 35, examScore: 43, remark: "Very Good" },
                        { name: "Further Mathematics", grade: "A", score: 85, caScore: 38, examScore: 47, remark: "Excellent" }
                    ]
                }
            ]
        },
        {
            level: "SS2",
            year: "2022/2023",
            terms: [
                {
                    term: "First Term",
                    average: 75.8,
                    position: "18th",
                    totalStudents: 48,
                    subjects: [
                        { name: "Mathematics", grade: "B+", score: 78, caScore: 35, examScore: 43, remark: "Very Good" },
                        { name: "English Language", grade: "B", score: 70, caScore: 30, examScore: 40, remark: "Good" },
                        { name: "Physics", grade: "B+", score: 77, caScore: 34, examScore: 43, remark: "Very Good" },
                        { name: "Chemistry", grade: "B", score: 73, caScore: 32, examScore: 41, remark: "Good" },
                        { name: "Biology", grade: "B", score: 72, caScore: 31, examScore: 41, remark: "Good" },
                        { name: "Agricultural Science", grade: "A-", score: 81, caScore: 36, examScore: 45, remark: "Excellent" }
                    ]
                },
                {
                    term: "Second Term",
                    average: 77.3,
                    position: "16th",
                    totalStudents: 48,
                    subjects: [
                        { name: "Mathematics", grade: "A-", score: 82, caScore: 37, examScore: 45, remark: "Excellent" },
                        { name: "English Language", grade: "B", score: 74, caScore: 32, examScore: 42, remark: "Good" },
                        { name: "Physics", grade: "A-", score: 80, caScore: 36, examScore: 44, remark: "Excellent" },
                        { name: "Chemistry", grade: "B+", score: 76, caScore: 34, examScore: 42, remark: "Very Good" },
                        { name: "Biology", grade: "B+", score: 77, caScore: 34, examScore: 43, remark: "Very Good" },
                        { name: "Agricultural Science", grade: "A", score: 85, caScore: 38, examScore: 47, remark: "Excellent" }
                    ]
                },
                {
                    term: "Third Term",
                    average: 79.1,
                    position: "14th",
                    totalStudents: 48,
                    subjects: [
                        { name: "Mathematics", grade: "A", score: 84, caScore: 37, examScore: 47, remark: "Excellent" },
                        { name: "English Language", grade: "B+", score: 77, caScore: 34, examScore: 43, remark: "Very Good" },
                        { name: "Physics", grade: "A", score: 86, caScore: 38, examScore: 48, remark: "Excellent" },
                        { name: "Chemistry", grade: "A-", score: 81, caScore: 36, examScore: 45, remark: "Excellent" },
                        { name: "Biology", grade: "B+", score: 79, caScore: 35, examScore: 44, remark: "Very Good" },
                        { name: "Agricultural Science", grade: "A", score: 87, caScore: 39, examScore: 48, remark: "Outstanding" }
                    ]
                }
            ]
        },
        {
            level: "SS1",
            year: "2021/2022",
            terms: [
                {
                    term: "First Term",
                    average: 72.4,
                    position: "22nd",
                    totalStudents: 50,
                    subjects: [
                        { name: "Mathematics", grade: "B", score: 75, caScore: 33, examScore: 42, remark: "Good" },
                        { name: "English Language", grade: "C+", score: 68, caScore: 28, examScore: 40, remark: "Credit" },
                        { name: "Basic Science", grade: "B", score: 74, caScore: 32, examScore: 42, remark: "Good" },
                        { name: "Basic Technology", grade: "B-", score: 70, caScore: 30, examScore: 40, remark: "Good" },
                        { name: "Social Studies", grade: "B+", score: 78, caScore: 35, examScore: 43, remark: "Very Good" },
                        { name: "Agricultural Science", grade: "A-", score: 80, caScore: 36, examScore: 44, remark: "Excellent" }
                    ]
                },
                {
                    term: "Second Term",
                    average: 74.6,
                    position: "20th",
                    totalStudents: 50,
                    subjects: [
                        { name: "Mathematics", grade: "B+", score: 76, caScore: 34, examScore: 42, remark: "Very Good" },
                        { name: "English Language", grade: "B", score: 72, caScore: 31, examScore: 41, remark: "Good" },
                        { name: "Basic Science", grade: "B+", score: 77, caScore: 34, examScore: 43, remark: "Very Good" },
                        { name: "Basic Technology", grade: "B", score: 73, caScore: 32, examScore: 41, remark: "Good" },
                        { name: "Social Studies", grade: "A-", score: 81, caScore: 36, examScore: 45, remark: "Excellent" },
                        { name: "Agricultural Science", grade: "A", score: 83, caScore: 37, examScore: 46, remark: "Excellent" }
                    ]
                },
                {
                    term: "Third Term",
                    average: 76.2,
                    position: "17th",
                    totalStudents: 50,
                    subjects: [
                        { name: "Mathematics", grade: "A-", score: 80, caScore: 36, examScore: 44, remark: "Excellent" },
                        { name: "English Language", grade: "B", score: 74, caScore: 32, examScore: 42, remark: "Good" },
                        { name: "Basic Science", grade: "A-", score: 82, caScore: 36, examScore: 46, remark: "Excellent" },
                        { name: "Basic Technology", grade: "B+", score: 76, caScore: 34, examScore: 42, remark: "Very Good" },
                        { name: "Social Studies", grade: "A", score: 85, caScore: 38, examScore: 47, remark: "Excellent" },
                        { name: "Agricultural Science", grade: "A", score: 86, caScore: 38, examScore: 48, remark: "Outstanding" }
                    ]
                }
            ]
        }
    ];

    const openTermModal = (level: string, termData: Term) => {
        setSelectedTerm({ level, ...termData });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTerm(null);
    };

    const getGradeColor = (grade: string): string => {
        switch (grade) {
            case 'A': return 'text-green-600 bg-green-50';
            case 'A-': return 'text-green-600 bg-green-50';
            case 'B+': return 'text-blue-600 bg-blue-50';
            case 'B': return 'text-blue-600 bg-blue-50';
            case 'B-': return 'text-yellow-600 bg-yellow-50';
            case 'C+': return 'text-yellow-600 bg-yellow-50';
            case 'C': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-red-600 bg-red-50';
        }
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-green-600';
        if (score >= 70) return 'text-blue-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
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

                {/* Results by Class Level */}
                <div className="space-y-6 max-w-4xl mx-auto">
                    {academicResults.map((levelData, index) => (
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
                                    {levelData.terms.map((term, termIndex) => (
                                        <div
                                            key={termIndex}
                                            onClick={() => openTermModal(levelData.level, term)}
                                            className="border-2 border-gray-200 rounded-xl p-4 hover:border-[#37368b] hover:shadow-md transition-all duration-200 cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-[#37368b]">
                                                    {term.term}
                                                </h3>
                                                <div className="text-right">
                                                    <div className={`text-lg font-bold ${getScoreColor(term.average)}`}>
                                                        {term.average}%
                                                    </div>
                                                    <div className="text-xs text-gray-500">Average</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center text-sm text-gray-600">
                                                <span>Position: {term.position}</span>
                                                <span>Class: {term.totalStudents}</span>
                                            </div>
                                            
                                            <div className="mt-3 flex justify-between items-center">
                                                <span className="text-xs text-gray-500">
                                                    {term.subjects.length} subjects
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
                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Academic Summary</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3">
                                    <div className="text-xl font-bold text-[#37368b]">3</div>
                                    <div className="text-gray-600 text-sm">Classes</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-xl font-bold text-[#37368b]">9</div>
                                    <div className="text-gray-600 text-sm">Terms</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-xl font-bold text-[#37368b]">77.3%</div>
                                    <div className="text-gray-600 text-sm">Overall Average</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-xl font-bold text-[#37368b]">16th</div>
                                    <div className="text-gray-600 text-sm">Avg Position</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Formal Term Details Modal */}
            {isModalOpen && selectedTerm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-[#37368b] px-6 py-4 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedTerm.level} - {selectedTerm.term}</h3>
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.average}%</div>
                                    <div className="text-sm text-gray-600">Average Score</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.position}</div>
                                    <div className="text-sm text-gray-600">Class Position</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.totalStudents}</div>
                                    <div className="text-sm text-gray-600">Total Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#37368b]">{selectedTerm.subjects.length}</div>
                                    <div className="text-sm text-gray-600">Subjects</div>
                                </div>
                            </div>
                        </div>

                        {/* Subjects Table with CA and Exam */}
                        <div className="p-6">
                            <h4 className="font-semibold text-[#37368b] mb-4">Subject Performance Breakdown</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-[#37368b]">Subject</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">CA Score</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Exam Score</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Total Score</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Grade</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-[#37368b]">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedTerm.subjects.map((subject, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-medium text-gray-900">{subject.name}</div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="font-medium text-gray-700">
                                                        {subject.caScore}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="font-medium text-gray-700">
                                                        {subject.examScore}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className={`font-semibold ${getScoreColor(subject.score)}`}>
                                                        {subject.score}%
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                                                        {subject.grade}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-sm text-gray-600">{subject.remark}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Performance Summary */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                                <h4 className="font-semibold text-[#37368b] mb-2">Assessment Summary</h4>
                                <p className="text-gray-700 text-sm">
                                    Continuous Assessment (CA) contributes 40% and Examination contributes 60% to the final grade. 
                                    {selectedTerm.average >= 80 
                                        ? " Your overall performance is excellent, demonstrating strong understanding across all subjects."
                                        : selectedTerm.average >= 70
                                        ? " Your performance is very good, showing consistent effort and understanding of course material."
                                        : " Continue to focus on improving in areas where scores are lower to enhance overall performance."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <div className="flex justify-between items-center">
                                <button className="text-gray-600 hover:text-gray-800 text-sm">
                                    Need assistance with your results?
                                </button>
                                <div className="flex space-x-3">
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
                </div>
            )}
        </AppLayout>
    );
}