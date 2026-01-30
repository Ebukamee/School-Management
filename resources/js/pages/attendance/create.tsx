import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react'; 
import AppLayout from '@/layouts/app-layout';
import { 
    Users, 
    Calendar, 
    Search, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    HelpCircle, 
    Save, 
    CheckSquare,
    BookOpen,
    AlertCircle
} from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const FORMS = ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'];
const ARMS = ['A', 'B', 'C', 'D', 'E'];

const DEFAULT_SUBJECTS = [
    'Mathematics', 'English Language', 'Basic Science', 
    'Civic Education', 'Physics', 'Chemistry', 'Biology', 
    'Economics', 'Government', 'Literature'
];

interface Student {
    id: number;
    name: string;
    reg_number: string;
    image?: string;
}

interface Props {
    students: Student[];
    subjects?: string[]; 
    filters: {
        form?: string;
        class?: string;
        subject?: string;
        date?: string;
    };
    errors: Record<string, string>;
}

export default function Create({ students, subjects = DEFAULT_SUBJECTS, filters, errors }: Props) {
    
    // 1. STATE
    const [selectedForm, setSelectedForm] = useState(filters.form || '');
    const [selectedClass, setSelectedClass] = useState(filters.class || '');
    const [selectedSubject, setSelectedSubject] = useState(filters.subject || '');
    const [selectedDate, setSelectedDate] = useState(filters.date || new Date().toISOString().split('T')[0]);
    
    const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (students.length > 0) {
            const initialMap: Record<number, string> = {};
            students.forEach(s => {
                initialMap[s.id] = 'present'; 
            });
            setAttendanceMap(initialMap);
        }
    }, [students]);

    // 2. LOAD STUDENTS
    const handleLoadStudents = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedForm || !selectedClass || !selectedSubject) return;

        router.get('/attendance/create', { 
            form: selectedForm, 
            class: selectedClass,
            subject: selectedSubject,
            date: selectedDate 
        }, { preserveState: true });
    };

    // 3. SUBMIT
    const handleSubmit = () => {
        const payload = Object.keys(attendanceMap).map(studentId => ({
            student_id: parseInt(studentId),
            status: attendanceMap[parseInt(studentId)]
        }));

        router.post('/attendance', {
            date: selectedDate,
            attendance: payload,
            form: selectedForm,
            class: selectedClass,
            subject: selectedSubject
        }, {
            onStart: () => setSubmitting(true),
            onFinish: () => setSubmitting(false),
        });
    };

    const setStatus = (id: number, status: string) => {
        setAttendanceMap(prev => ({ ...prev, [id]: status }));
    };

    const markAllPresent = () => {
        if (!confirm('Mark all displayed students as Present?')) return;
        const newMap = { ...attendanceMap };
        students.forEach(s => newMap[s.id] = 'present');
        setAttendanceMap(newMap);
    };

    // CSS Helpers
    const getInputBorder = (fieldName: string) => 
        errors[fieldName] 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900" 
            : "border-gray-200 focus:border-[#37368b] focus:ring-[#37368b] bg-white text-gray-800";

    const inputClass = "w-full rounded-xl border px-4 py-2.5 text-sm font-bold focus:ring-1 transition-all duration-200 shadow-sm outline-none";
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";

    return (
        <AppLayout breadcrumbs={[{ title: 'Attendance', href: '#' }, { title: 'Mark', href: '#' }]}>
            <Head title="Mark Attendance" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <CheckCircle2 className="w-6 h-6" />
                            </span>
                            Class Register
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Select class and subject details to mark attendance.
                        </p>
                    </div>
                </div>

                {/* --- GLOBAL ERROR ALERT --- */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 flex items-start gap-3 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-red-800">There were issues with your submission</h3>
                            <ul className="mt-1 list-disc list-inside text-xs font-bold text-red-700">
                                {Object.values(errors).map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* FILTER BAR */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <form onSubmit={handleLoadStudents} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
                        
                        {/* Form Select */}
                        <div>
                            <label className={labelClass}>Form</label>
                            <div className="relative group">
                                <select 
                                    value={selectedForm} 
                                    onChange={e => setSelectedForm(e.target.value)} 
                                    className={`${inputClass} ${getInputBorder('form')} appearance-none`}
                                >
                                    <option value="">Select Form</option>
                                    {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                            {errors.form && <p className="mt-1 text-xs text-red-600 font-bold">{errors.form}</p>}
                        </div>

                        {/* Class Select */}
                        <div>
                            <label className={labelClass}>Class Arm</label>
                            <div className="relative group">
                                <select 
                                    value={selectedClass} 
                                    onChange={e => setSelectedClass(e.target.value)} 
                                    className={`${inputClass} ${getInputBorder('class')} appearance-none`}
                                >
                                    <option value="">Select Arm</option>
                                    {ARMS.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                            {errors.class && <p className="mt-1 text-xs text-red-600 font-bold">{errors.class}</p>}
                        </div>

                        {/* Subject Select */}
                        <div>
                            <label className={labelClass}>Subject</label>
                            <div className="relative group">
                                  <input 
                                type="text" 
                                value={selectedSubject} 
                                placeholder='E.g Chemistry'
                                onChange={e => setSelectedSubject(e.target.value)} 
                                className={`${inputClass} ${getInputBorder('subject')}`}
                            />
                               
                            </div>
                            {errors.subject && <p className="mt-1 text-xs text-red-600 font-bold">{errors.subject}</p>}
                        </div>

                        {/* Date Picker */}
                        <div>
                            <label className={labelClass}>Date</label>
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={e => setSelectedDate(e.target.value)} 
                                className={`${inputClass} ${getInputBorder('date')}`}
                            />
                            {errors.date && <p className="mt-1 text-xs text-red-600 font-bold">{errors.date}</p>}
                        </div>

                        {/* Load Button */}
                        <div className="pt-[26px]"> 
                            <button 
                                type="submit"
                                disabled={!selectedForm || !selectedClass || !selectedSubject}
                                className="w-full bg-[#37368b] hover:bg-[#2a2970] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <Search className="w-4 h-4" />
                                <span>Load Class</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* STUDENT LIST */}
                {students.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        
                        <div className="flex items-center justify-between mb-4 px-1">
                            <span className="text-sm font-medium text-gray-500">
                                Showing <span className="font-bold text-gray-900">{students.length}</span> students for <span className="font-bold text-[#37368b]">{selectedSubject}</span>
                            </span>
                            <button 
                                onClick={markAllPresent}
                                type="button"
                                className="text-xs font-bold text-[#37368b] hover:text-[#2a2970] hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-transparent hover:border-blue-100"
                            >
                                <CheckSquare className="w-4 h-4" />
                                Mark All Present
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                            {students.map((student) => (
                                <div key={student.id} className="group p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                    
                                    {/* Student Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-400 overflow-hidden border border-gray-200 shrink-0">
                                            {student.image ? (
                                                <img src={'/storage/' + student.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                student.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#37368b] transition-colors">{student.name}</h3>
                                            <p className="text-xs font-bold text-gray-400 font-mono mt-0.5">{student.reg_number}</p>
                                        </div>
                                    </div>

                                    {/* Status Toggles */}
                                    <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto border border-gray-200">
                                        <StatusToggle 
                                            active={attendanceMap[student.id] === 'present'} 
                                            onClick={() => setStatus(student.id, 'present')}
                                            icon={CheckCircle2}
                                            label="Present"
                                            color="green"
                                        />
                                        <StatusToggle 
                                            active={attendanceMap[student.id] === 'absent'} 
                                            onClick={() => setStatus(student.id, 'absent')}
                                            icon={XCircle}
                                            label="Absent"
                                            color="red"
                                        />
                                        <StatusToggle 
                                            active={attendanceMap[student.id] === 'late'} 
                                            onClick={() => setStatus(student.id, 'late')}
                                            icon={Clock}
                                            label="Late"
                                            color="yellow"
                                        />
                                        <StatusToggle 
                                            active={attendanceMap[student.id] === 'excused'} 
                                            onClick={() => setStatus(student.id, 'excused')}
                                            icon={HelpCircle}
                                            label="Excused"
                                            color="blue"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <Users className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">No students loaded</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Select a Form, Class, and Subject above to start.</p>
                    </div>
                )}
            </div>

            {/* STICKY FOOTER */}
            {students.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-500 font-medium">
                                Register for: <span className="font-bold text-gray-900">{selectedSubject}</span> on <span className="font-bold text-[#37368b]">{new Date(selectedDate).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full sm:w-auto bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 hover:-translate-y-0.5 active:scale-95"
                        >
                            {submitting ? <Spinner className="text-white" /> : <Save className="w-5 h-5" />}
                            <span>Save Register</span>
                        </button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

// TOGGLE BUTTON COMPONENT
const StatusToggle = ({ active, onClick, icon: Icon, label, color }: any) => {
    const activeStyles: any = {
        green: 'bg-white text-green-700 shadow-sm ring-1 ring-black/5 font-bold',
        red: 'bg-white text-red-700 shadow-sm ring-1 ring-black/5 font-bold',
        yellow: 'bg-white text-amber-700 shadow-sm ring-1 ring-black/5 font-bold',
        blue: 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5 font-bold',
    };

    const baseClass = active 
        ? activeStyles[color] 
        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 font-medium';

    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all duration-200 text-xs sm:text-sm
                ${baseClass}
            `}
            title={label}
        >
            <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`${active ? '' : 'hidden sm:inline'}`}>
                {label}
            </span>
        </button>
    );
};