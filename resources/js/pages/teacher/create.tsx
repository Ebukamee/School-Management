import React from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { 
    Save, 
    Plus, 
    Trash2, 
    User, 
    BookOpen, 
    GraduationCap, 
    FileText,
    AlertCircle 
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Results', href: '/results' },
    { title: 'Create', href: '/results/create' }
];


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
  // const {auth} = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm<FormData>({
        reg_number: '',
        class:'',
        term: getCurrentTerm(),
        remark: '',
        sess: getCurrentSession(),
        subjects: [{ name: '', ca_score: 0, exam_score: 0 }],
    });

    const sessionOptions = getSessionOptions();

    const addSubject = () => {
        // Optional: Prevent adding a new row if the previous one is empty
        const lastSubject = data.subjects[data.subjects.length - 1];
        if (lastSubject && lastSubject.name.trim() === '') {
             // You could focus the empty input here, but for now we just return
             return; 
        }

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

        // 1. Custom Validation: Ensure at least one subject exists
        if (data.subjects.length === 0) {
            // We use Inertia's setError to display a general error message manually
            // Note: You need to make sure your Layout or this page renders 'errors.subjects' if you map it there,
            // or simply use a browser alert for simplicity if you don't have a global error toast.
            alert("Please add at least one subject before saving.");
            return;
        }

        // 2. Custom Validation: Ensure Subject Names are not empty (Redundancy check)
        const hasEmptySubject = data.subjects.some(s => !s.name.trim());
        if (hasEmptySubject) {
             alert("All subjects must have a name.");
             return;
        }

        // If checks pass, submit
        post('/results');
    };

    const inputClass = "w-full border-gray-200 bg-gray-50/50 rounded-lg focus:border-[#37368b] focus:ring-[#37368b] focus:bg-white transition-all duration-200 text-sm py-2.5";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Result" />

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Upload Result
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Session and Term have been auto-detected based on today's date.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        
                        {/* Section 1: Student Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
                                <User className="w-4 h-4 text-[#37368b]" />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Student Information</h2>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Reg Number */}
                                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                    <label className={labelClass}>Reg Number <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required // <--- HTML5 VALIDATION
                                            value={data.reg_number}
                                            onChange={e => setData('reg_number', e.target.value)}
                                            className={`${inputClass} font-mono`}
                                            placeholder="e.g. 17920"
                                        />
                                    </div>
                                    {errors.reg_number && <p className="text-red-500 text-xs mt-1">{errors.reg_number}</p>}
                                </div>

                                {/* Class */}
                                <div>
                                    <label className={labelClass}>Class <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required // <--- HTML5 VALIDATION
                                        value={data.class}
                                        onChange={e => setData('class', e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. SS1"
                                    />
                                    {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
                                </div>

                                {/* Term */}
                                <div>
                                    <label className={labelClass}>Term <span className="text-red-500">*</span></label>
                                    <select
                                        value={data.term}
                                        required // <--- HTML5 VALIDATION
                                        onChange={e => setData('term', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Term</option>
                                        <option value="First">First Term</option>
                                        <option value="Second">Second Term</option>
                                        <option value="Third">Third Term</option>
                                    </select>
                                    {errors.term && <p className="text-red-500 text-xs mt-1">{errors.term}</p>}
                                </div>

                                {/* Session */}
                                <div>
                                    <label className={labelClass}>Session <span className="text-red-500">*</span></label>
                                    <select
                                        value={data.sess}
                                        required // <--- HTML5 VALIDATION
                                        onChange={e => setData('sess', e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Session</option>
                                        {sessionOptions.map((session) => (
                                            <option key={session} value={session}>
                                                {session}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.sess && <p className="text-red-500 text-xs mt-1">{errors.sess}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Academic Record */}
                        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${data.subjects.length === 0 && 'border-red-300 ring-2 ring-red-50'} border-gray-100`}>
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
                                    {/* Table Header */}
                                    {data.subjects.length > 0 && (
                                        <div className="grid grid-cols-12 gap-4 px-2 mb-2">
                                            <div className="col-span-6 sm:col-span-5 text-xs font-bold text-gray-400 uppercase">Subject Name <span className="text-red-500">*</span></div>
                                            <div className="col-span-2 sm:col-span-3 text-xs font-bold text-gray-400 uppercase text-center">CA</div>
                                            <div className="col-span-2 sm:col-span-3 text-xs font-bold text-gray-400 uppercase text-center">Exam</div>
                                            <div className="col-span-2 sm:col-span-1"></div>
                                        </div>
                                    )}

                                    {data.subjects.map((subject, index) => (
                                        <div key={index} className="group grid grid-cols-12 gap-4 items-center bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl p-2 transition-all duration-200">
                                            
                                            {/* Subject Name */}
                                            <div className="col-span-6 sm:col-span-5">
                                                <input
                                                    type="text"
                                                    required // <--- HTML5 VALIDATION
                                                    placeholder="Enter subject name..."
                                                    value={subject.name}
                                                    onChange={e => {
                                                        const subjects = [...data.subjects];
                                                        subjects[index].name = e.target.value;
                                                        setData('subjects', subjects);
                                                    }}
                                                    className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-[#37368b] focus:ring-0 p-0 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-colors"
                                                />
                                            </div>

                                            {/* CA Score */}
                                            <div className="col-span-2 sm:col-span-3">
                                                <div className="relative mx-auto max-w-[4rem]">
                                                    <input
                                                        type="number"
                                                        min="0" // <--- Validations
                                                        max="40"
                                                        value={subject.ca_score}
                                                        onChange={e => {
                                                            const subjects = [...data.subjects];
                                                            subjects[index].ca_score = Number(e.target.value);
                                                            setData('subjects', subjects);
                                                        }}
                                                        className="w-full text-center bg-white border border-gray-200 rounded-lg py-1.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Exam Score */}
                                            <div className="col-span-2 sm:col-span-3">
                                                <div className="relative mx-auto max-w-[4rem]">
                                                    <input
                                                        type="number"
                                                        min="0" // <--- Validations
                                                        max="60"
                                                        value={subject.exam_score}
                                                        onChange={e => {
                                                            const subjects = [...data.subjects];
                                                            subjects[index].exam_score = Number(e.target.value);
                                                            setData('subjects', subjects);
                                                        }}
                                                        className="w-full text-center bg-white border border-gray-200 rounded-lg py-1.5 text-sm font-bold text-gray-700 focus:border-[#37368b] focus:ring-[#37368b]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Delete Action */}
                                            <div className="col-span-2 sm:col-span-1 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(index)}
                                                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                    title="Remove"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {data.subjects.length === 0 && (
                                        <div className="border-2 border-dashed border-red-100 rounded-xl p-8 text-center bg-red-50/30">
                                            <AlertCircle className="w-10 h-10 text-red-300 mx-auto mb-3" />
                                            <h3 className="text-sm font-medium text-red-900">Missing Academic Data</h3>
                                            <p className="text-xs text-red-500 mt-1 mb-4">You must add at least one subject to save this result.</p>
                                            <button
                                                type="button"
                                                onClick={addSubject}
                                                className="text-red-700 text-sm font-bold hover:underline"
                                            >
                                                Add First Subject
                                            </button>
                                        </div>
                                    )}
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
                                            // Optional field, no 'required' attribute here
                                            value={data.remark}
                                            onChange={e => setData('remark', e.target.value)}
                                            className={inputClass}
                                            placeholder="Overall performance comment..."
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <Save className="w-4 h-4" />
                                            {processing ? 'Saving...' : 'Save Result Sheet'}
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

export default CreateResult;