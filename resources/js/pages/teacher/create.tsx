import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { 
    Save, 
    Plus, 
    Trash2, 
    User, 
    BookOpen, 
    FileText,
    AlertCircle,
    Calendar,
    Hash,
    Layers,
    Clock
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Results', href: '/results' },
    { title: 'Upload', href: '/results/create' }
];

// --- HELPERS ---
const getSessionOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let i = -5; i <= 2; i++) {
        const startYear = currentYear + i;
        options.push(`${startYear}/${startYear + 1}`);
    }
    return options.reverse();
};

const getCurrentSession = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startYear = month < 8 ? year - 1 : year; 
    return `${startYear}/${startYear + 1}`;
};

const getCurrentTerm = () => {
    const month = new Date().getMonth();
    if (month >= 8 && month <= 11) return 'First'; 
    if (month >= 0 && month <= 3) return 'Second'; 
    return 'Third'; 
};

// --- TYPES ---
type Subject = {
    name: string;
    ca_score: number;
    exam_score: number;
};

type FormData = {
    reg_number: string;
    class: string;
    term: string;
    remark: string;
    sess: string;
    subjects: Subject[];
};

const CreateResult: React.FC = () => {
    
    // Initial Form State (Class is now open for edit)
    const { data, setData, post, processing, errors, clearErrors } = useForm<FormData>({
        reg_number: '',
        class: '', 
        term: getCurrentTerm(),
        remark: '',
        sess: getCurrentSession(),
        subjects: [{ name: '', ca_score: 0, exam_score: 0 }],
    });

    const sessionOptions = getSessionOptions();

    const addSubject = () => {
        const lastSubject = data.subjects[data.subjects.length - 1];
        if (lastSubject && lastSubject.name.trim() === '') return; 

        setData('subjects', [
            ...data.subjects,
            { name: '', ca_score: 0, exam_score: 0 },
        ]);
    };

    const removeSubject = (index: number) => {
        const updatedSubjects = data.subjects.filter((_, i) => i !== index);
        setData('subjects', updatedSubjects);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        if (data.subjects.length === 0) {
            alert("Please add at least one subject before saving.");
            return;
        }

        const hasEmptySubject = data.subjects.some(s => !s.name.trim());
        if (hasEmptySubject) {
             alert("All subjects must have a name.");
             return;
        }

        post('/results');
    };

    // --- STYLES ---
    const inputClass = "w-full border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white transition-all shadow-sm hover:border-gray-300 placeholder-gray-300 outline-none";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1";
    const iconContainerClass = "p-2 bg-blue-50 text-[#37368b] rounded-lg";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Result" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-[#37368b] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <FileText className="w-6 h-6" />
                            </span>
                            Upload Result
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Enter student academic records for the current term.
                        </p>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 flex items-center gap-3 text-amber-700 text-sm font-bold">
                        <AlertCircle className="w-4 h-4" />
                        <span>Session & Term Auto-detected</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION 1: STUDENT INFORMATION */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                            <div className={iconContainerClass}>
                                <User className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Student Details</h2>
                        </div>
                        
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Reg Number */}
                            <div>
                                <label className={labelClass}><Hash className="w-3 h-3 inline mr-1" /> Reg Number <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={data.reg_number}
                                    onChange={e => setData('reg_number', e.target.value)}
                                    className={`${inputClass} font-mono`}
                                    placeholder="e.g. 17920"
                                />
                                {errors.reg_number && <p className="text-red-500 text-xs mt-1 font-bold">{errors.reg_number}</p>}
                            </div>

                            {/* Class (Editable) */}
                            <div>
                                <label className={labelClass}><Layers className="w-3 h-3 inline mr-1" /> Class <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={data.class}
                                    onChange={e => setData('class', e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. SS1A"
                                />
                                {errors.class && <p className="text-red-500 text-xs mt-1 font-bold">{errors.class}</p>}
                            </div>

                            {/* Term */}
                            <div>
                                <label className={labelClass}><Clock className="w-3 h-3 inline mr-1" /> Term <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        value={data.term}
                                        required
                                        onChange={e => setData('term', e.target.value)}
                                        className={`${inputClass} appearance-none bg-white`}
                                    >
                                        <option value="">Select Term</option>
                                        <option value="First">First Term</option>
                                        <option value="Second">Second Term</option>
                                        <option value="Third">Third Term</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                    </div>
                                </div>
                                {errors.term && <p className="text-red-500 text-xs mt-1 font-bold">{errors.term}</p>}
                            </div>

                            {/* Session */}
                            <div>
                                <label className={labelClass}><Calendar className="w-3 h-3 inline mr-1" /> Session <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        value={data.sess}
                                        required
                                        onChange={e => setData('sess', e.target.value)}
                                        className={`${inputClass} appearance-none bg-white`}
                                    >
                                        <option value="">Select Session</option>
                                        {sessionOptions.map((session) => (
                                            <option key={session} value={session}>{session}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                    </div>
                                </div>
                                {errors.sess && <p className="text-red-500 text-xs mt-1 font-bold">{errors.sess}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: ACADEMIC RECORD */}
                    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${data.subjects.length === 0 ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'}`}>
                        <div className="px-6 py-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className={iconContainerClass}>
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Academic Record</h2>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Enter scores below</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={addSubject}
                                className="flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4" />
                                Add Subject
                            </button>
                        </div>

                        <div className="p-6 bg-gray-50/30">
                            {data.subjects.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Table Headers */}
                                    <div className="grid grid-cols-12 gap-4 px-4 mb-2">
                                        <div className="col-span-6 md:col-span-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Subject Name</div>
                                        <div className="col-span-2 md:col-span-3 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-center">CA (40)</div>
                                        <div className="col-span-2 md:col-span-3 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-center">Exam (60)</div>
                                        <div className="col-span-2 md:col-span-1"></div>
                                    </div>

                                    {data.subjects.map((subject, index) => (
                                        <div key={index} className="group grid grid-cols-12 gap-4 items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-[#37368b]/30 hover:shadow-md transition-all duration-200">
                                            
                                            {/* Subject Name Input */}
                                            <div className="col-span-6 md:col-span-5">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Enter subject name..."
                                                    value={subject.name}
                                                    onChange={e => {
                                                        const subjects = [...data.subjects];
                                                        subjects[index].name = e.target.value;
                                                        setData('subjects', subjects);
                                                    }}
                                                    className="w-full border-none bg-transparent p-0 text-sm font-bold text-gray-900 placeholder-gray-400 focus:ring-0"
                                                />
                                            </div>

                                            {/* CA Score */}
                                            <div className="col-span-2 md:col-span-3 flex justify-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="40"
                                                    value={subject.ca_score}
                                                    onChange={e => {
                                                        const subjects = [...data.subjects];
                                                        subjects[index].ca_score = Number(e.target.value);
                                                        setData('subjects', subjects);
                                                    }}
                                                    className="w-20 text-center bg-gray-50 border border-gray-200 rounded-lg py-2 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b] focus:bg-white transition-all"
                                                />
                                            </div>

                                            {/* Exam Score */}
                                            <div className="col-span-2 md:col-span-3 flex justify-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="60"
                                                    value={subject.exam_score}
                                                    onChange={e => {
                                                        const subjects = [...data.subjects];
                                                        subjects[index].exam_score = Number(e.target.value);
                                                        setData('subjects', subjects);
                                                    }}
                                                    className="w-20 text-center bg-gray-50 border border-gray-200 rounded-lg py-2 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b] focus:bg-white transition-all"
                                                />
                                            </div>

                                            {/* Delete Button */}
                                            <div className="col-span-2 md:col-span-1 text-right pr-2">
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(index)}
                                                    className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                    title="Remove Subject"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No Subjects Added</h3>
                                    <p className="text-gray-500 text-sm mt-1 mb-6 max-w-sm mx-auto">
                                        Start adding subjects to create the result sheet for this student.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={addSubject}
                                        className="text-[#37368b] font-bold text-sm hover:underline hover:text-[#2a2970]"
                                    >
                                        + Add First Subject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECTION 3: FOOTER & REMARKS */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                            <div>
                                <label className={labelClass}>
                                    <FileText className="w-3 h-3 inline mr-1" />
                                    Teacher's Remark
                                </label>
                                <input
                                    type="text"
                                    value={data.remark}
                                    onChange={e => setData('remark', e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. An excellent performance, keep it up!"
                                />
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full md:w-auto bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3.5 rounded-xl font-bold shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <span className="animate-pulse">Saving Result...</span>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            <span>Save Result Sheet</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
};

export default CreateResult;