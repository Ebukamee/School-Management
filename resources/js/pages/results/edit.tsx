import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; 
import { 
    Save, 
    User, 
    BookOpen, 
    FileText,
    ArrowLeft,
    Plus,
    Trash2,
    Hash,
    Layers,
    Clock,
    Calendar,
    AlertCircle
} from 'lucide-react';

// --- Types ---

interface DbSubject {
    id: number;
    subject_name: string;
    ca_score: number;
    exam_score: number;
    total: number;
    grade: string;
}

interface ResultProp {
    id: number;
    reg_number: string;
    class: string;
    term: string;
    session: string;
    remark: string | null;
    student?: {
        reg_number: string;
    };
    subjects: DbSubject[];
}

interface FormSubject {
    id?: number; 
    name: string;
    ca_score: number;
    exam_score: number;
}

interface FormData {
    reg_number: string;
    class: string;
    term: string;
    sess: string;
    remark: string;
    subjects: FormSubject[];
}

interface Props {
    result: ResultProp;
}

const EditResult: React.FC<Props> = ({ result }) => {
    
    // 1. Initialize Form
    const { data, setData, put, processing, errors, clearErrors } = useForm<FormData>({
        reg_number: result.reg_number || result.student?.reg_number || '',
        class: result.class,
        term: result.term,
        sess: result.session,
        remark: result.remark || '',
        subjects: result.subjects.map((sub) => ({
            id: sub.id, 
            name: sub.subject_name,
            ca_score: sub.ca_score,
            exam_score: sub.exam_score
        })),
    });

    const addSubject = () => {
        setData('subjects', [
            ...data.subjects,
            { name: '', ca_score: 0, exam_score: 0 } 
        ]);
    };

    const removeSubject = (index: number) => {
        const updatedSubjects = data.subjects.filter((_, i) => i !== index);
        setData('subjects', updatedSubjects);
    };

    const breadcrumbs = [
        { title: 'Results', href: '/results/manage' },
        { title: 'Edit', href: '#' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        const hasInvalidScores = data.subjects.some(s => s.ca_score > 40 || s.exam_score > 60);
        if (hasInvalidScores) {
             alert("Please check scores. CA max is 40, Exam max is 60.");
             return;
        }

        const hasEmptyNames = data.subjects.some(s => !s.name.trim());
        if (hasEmptyNames) {
            alert("Please ensure all new subjects have a name.");
            return;
        }

        put(`/results/${result.id}`);
    };

    // --- STYLES ---
    const inputClass = "w-full border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white transition-all shadow-sm hover:border-gray-300 placeholder-gray-300 outline-none";
    const readOnlyInputClass = "w-full border-gray-200 bg-gray-50 text-gray-500 rounded-xl text-sm py-2.5 px-4 font-mono font-medium cursor-not-allowed border shadow-sm";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5";
    const iconContainerClass = "p-2 bg-blue-50 text-[#37368b] rounded-lg";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Result" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <FileText className="w-6 h-6" />
                            </span>
                            Edit Result
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Update scores, edit remarks, or add new subjects.
                        </p>
                    </div>
                    <a 
                        href="/results/manage"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#37368b]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Manage
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                        
                        {/* Section 1: Student Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                <div className={iconContainerClass}>
                                    <User className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                    Student Information 
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-500 border border-gray-200">
                                        Read Only
                                    </span>
                                </h2>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                    <label className={labelClass}><Hash className="w-3 h-3" /> Reg Number</label>
                                    <div className={readOnlyInputClass}>{data.reg_number}</div>
                                </div>
                                <div>
                                    <label className={labelClass}><Layers className="w-3 h-3" /> Class</label>
                                    <div className={readOnlyInputClass}>{data.class}</div>
                                </div>
                                <div>
                                    <label className={labelClass}><Clock className="w-3 h-3" /> Term</label>
                                    <div className={readOnlyInputClass}>{data.term}</div>
                                </div>
                                <div>
                                    <label className={labelClass}><Calendar className="w-3 h-3" /> Session</label>
                                    <div className={readOnlyInputClass}>{data.sess}</div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Academic Record */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={iconContainerClass}>
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Academic Record</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={addSubject}
                                    className="inline-flex items-center gap-1.5 bg-[#37368b]/10 hover:bg-[#37368b]/20 text-[#37368b] px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Subject
                                </button>
                            </div>

                            <div className="p-6 bg-gray-50/30">
                                <div className="space-y-4">
                                    {/* Table Header */}
                                    {data.subjects.length > 0 && (
                                        <div className="grid grid-cols-12 gap-4 px-4 mb-2">
                                            <div className="col-span-6 md:col-span-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Subject Name</div>
                                            <div className="col-span-2 md:col-span-3 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-center">CA (40)</div>
                                            <div className="col-span-2 md:col-span-3 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-center">Exam (60)</div>
                                            <div className="col-span-2 md:col-span-1"></div>
                                        </div>
                                    )}

                                    {data.subjects.map((subject, index) => {
                                        // Helper to check if this is an existing DB subject
                                        const isExisting = !!subject.id;

                                        return (
                                            <div key={index} className="group grid grid-cols-12 gap-4 items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-[#37368b]/30 hover:shadow-md transition-all duration-200">
                                                
                                                {/* Subject Name */}
                                                <div className="col-span-6 md:col-span-5">
                                                 
                            
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Subject Name"
                                                            value={subject.name}
                                                            onChange={(e) => {
                                                                const newSubjects = [...data.subjects];
                                                                newSubjects[index].name = e.target.value;
                                                                setData('subjects', newSubjects);
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

                                                {/* Delete Action */}
                                                <div className="col-span-2 md:col-span-1 text-right pr-2">
                                                    {!isExisting && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSubject(index)}
                                                            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                            title="Remove"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {data.subjects.length === 0 && (
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-white">
                                            <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                            <h3 className="text-sm font-bold text-gray-900">Missing Academic Data</h3>
                                            <p className="text-xs text-gray-500 mt-1 mb-4">You must add at least one subject to save this result.</p>
                                            <button
                                                type="button"
                                                onClick={addSubject}
                                                className="text-[#37368b] text-sm font-bold hover:underline"
                                            >
                                                Add First Subject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                <div className="w-full">
                                    <label className={labelClass}>
                                        <FileText className="w-3 h-3" />
                                        Teacher's Remark
                                    </label>
                                    <input
                                        type="text"
                                        value={data.remark}
                                        onChange={e => setData('remark', e.target.value)}
                                        className={inputClass}
                                        placeholder="Overall performance comment..."
                                    />
                                    {errors.remark && <p className="text-red-500 text-xs mt-1 font-medium">{errors.remark}</p>}
                                </div>
                                
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3.5 rounded-xl font-bold shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <span className="animate-pulse">Saving...</span>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                <span>Update Result Sheet</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditResult;