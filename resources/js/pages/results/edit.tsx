import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; 
import { 
    Save, 
    User, 
    BookOpen, 
    FileText,
    AlertCircle,
    ArrowLeft,
    Plus,       // Added
    Trash2      // Added
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
    id?: number; // <--- CHANGED: id is optional now (undefined for new rows)
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

    // --- NEW FUNCTIONS ---
    const addSubject = () => {
        setData('subjects', [
            ...data.subjects,
            { name: '', ca_score: 0, exam_score: 0 } // No ID passed here
        ]);
    };

    const removeSubject = (index: number) => {
        // Optional: You might want to prevent deleting existing DB subjects here, 
        // or handle deletions in the backend. For now, we allow UI removal.
        const updatedSubjects = data.subjects.filter((_, i) => i !== index);
        setData('subjects', updatedSubjects);
    };
    // ---------------------

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

    const inputClass = "w-full border-gray-200 bg-gray-50/50 rounded-lg focus:border-[#37368b] focus:ring-[#37368b] focus:bg-white transition-all duration-200 text-sm py-2.5 font-medium text-gray-700";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5";
    const readOnlyInputClass = "w-full border-gray-200 bg-gray-100/80 text-gray-500 rounded-lg text-sm py-2.5 px-3 font-mono cursor-not-allowed border";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Result" />

            <div className="max-w-5xl w-full mx-auto py-8 px-4 sm:px-6">
                
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Edit Result
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Update scores, edit remarks, or add new subjects.
                        </p>
                    </div>
                    <a 
                        href="/results/manage"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#37368b] transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Manage
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        
                        {/* Section 1: Student Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
                                <User className="w-4 h-4 text-[#37368b]" />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                                    Student Information 
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        Read Only
                                    </span>
                                </h2>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                    <label className={labelClass}>Reg Number</label>
                                    <div className={readOnlyInputClass}>{data.reg_number}</div>
                                </div>
                                <div>
                                    <label className={labelClass}>Class</label>
                                    <div className={readOnlyInputClass}>{data.class}</div>
                                </div>
                                <div>
                                    <label className={labelClass}>Term</label>
                                    <div className={readOnlyInputClass}>{data.term}</div>
                                </div>
                                <div>
                                    <label className={labelClass}>Session</label>
                                    <div className={readOnlyInputClass}>{data.sess}</div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Academic Record */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-[#37368b]" />
                                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Academic Record</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={addSubject}
                                    className="inline-flex items-center gap-1.5 bg-[#37368b]/10 hover:bg-[#37368b]/20 text-[#37368b] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Subject
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="space-y-3">
                                    {data.subjects.length > 0 ? (
                                        <div className="grid grid-cols-12 gap-4 px-2 mb-2">
                                            <div className="col-span-5 text-xs font-bold text-gray-400 uppercase">Subject Name</div>
                                            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase text-center">CA (40)</div>
                                            <div className="col-span-3 text-xs font-bold text-gray-400 uppercase text-center">Exam (60)</div>
                                            <div className="col-span-1"></div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300"/>
                                            No subjects found. Add one above.
                                        </div>
                                    )}

                                    {data.subjects.map((subject, index) => {
                                        // Helper to check if this is an existing DB subject
                                        const isExisting = !!subject.id;

                                        return (
                                            <div key={index} className="group grid grid-cols-12 gap-4 items-center bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl p-2 transition-all duration-200">
                                                
                                                {/* Subject Name */}
                                                <div className="col-span-5">
                                                    {isExisting ? (
                                                        // READ ONLY LOOK for Existing
                                                        <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-bold text-gray-500 shadow-sm cursor-not-allowed">
                                                            {subject.name}
                                                        </div>
                                                    ) : (
                                                        // EDITABLE INPUT for New
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Subject Name"
                                                            value={subject.name}
                                                            onChange={(e) => {
                                                                const newSubjects = [...data.subjects];
                                                                newSubjects[index].name = e.target.value;
                                                                setData('subjects', newSubjects);
                                                            }}
                                                            className="w-full border-gray-200 bg-white rounded-lg focus:border-[#37368b] focus:ring-[#37368b] text-sm py-2.5 font-bold text-gray-700 shadow-sm"
                                                        />
                                                    )}
                                                </div>

                                                {/* CA Score */}
                                                <div className="col-span-3">
                                                    <div className="relative mx-auto max-w-[5rem]">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="40"
                                                            value={subject.ca_score}
                                                            onChange={(e) => {
                                                                const newSubjects = [...data.subjects];
                                                                newSubjects[index].ca_score = Number(e.target.value);
                                                                setData('subjects', newSubjects);
                                                            }}
                                                            className="w-full text-center bg-white border border-gray-200 rounded-lg py-2.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b] shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Exam Score */}
                                                <div className="col-span-3">
                                                    <div className="relative mx-auto max-w-[5rem]">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="60"
                                                            value={subject.exam_score}
                                                            onChange={(e) => {
                                                                const newSubjects = [...data.subjects];
                                                                newSubjects[index].exam_score = Number(e.target.value);
                                                                setData('subjects', newSubjects);
                                                            }}
                                                            className="w-full text-center bg-white border border-gray-200 rounded-lg py-2.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b] shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <div className="col-span-1 text-center">
                                                    {/* We only allow deleting NEW subjects to prevent accidental DB deletions, 
                                                        OR you can allow both if you handle backend deletion. 
                                                        Here I allow deleting NEW ones only for safety. */}
                                                    {!isExisting && (
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeSubject(index)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="bg-gray-50 p-6 border-t border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
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
                                        {errors.remark && <p className="text-red-500 text-xs mt-1">{errors.remark}</p>}
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <Save className="w-4 h-4" />
                                            {processing ? 'Updating...' : 'Update Result Sheet'}
                                        </button>
                                    </div>
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