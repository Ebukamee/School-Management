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
    AlertCircle // Added for error display
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
    // Inertia automatically passes errors here
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
            // Errors are handled automatically by Inertia props
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
            : "border-gray-200 focus:border-[#37368b] focus:ring-[#37368b] bg-gray-50 text-gray-800";

    const inputClass = "w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 transition-all duration-200 focus:bg-white";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

    return (
        <AppLayout breadcrumbs={[{ title: 'Attendance', href: '#' }, { title: 'Mark', href: '#' }]}>
            <Head title="Mark Attendance" />

            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Class Register</h1>
                        <p className="text-sm text-gray-500 mt-1">Select class and subject details to mark attendance.</p>
                    </div>
                </div>

                {/* --- GLOBAL ERROR ALERT --- */}
                {/* Checks if there are any errors NOT related to the specific fields (e.g. general logic errors) */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 flex items-start gap-3 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-red-800">There were issues with your submission</h3>
                            <ul className="mt-1 list-disc list-inside text-sm text-red-700">
                                {Object.values(errors).map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* FILTER BAR */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
                    <form onSubmit={handleLoadStudents} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-start">
                        
                        {/* Form Select */}
                        <div>
                            <label className={labelClass}>Form</label>
                            <select 
                                value={selectedForm} 
                                onChange={e => setSelectedForm(e.target.value)} 
                                className={`${inputClass} ${getInputBorder('form')}`}
                            >
                                <option value="">Select Form</option>
                                {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                            {errors.form && <p className="mt-1 text-xs text-red-600 font-medium">{errors.form}</p>}
                        </div>

                        {/* Class Select */}
                        <div>
                            <label className={labelClass}>Class Arm</label>
                            <select 
                                value={selectedClass} 
                                onChange={e => setSelectedClass(e.target.value)} 
                                className={`${inputClass} ${getInputBorder('class')}`}
                            >
                                <option value="">Select Arm</option>
                                {ARMS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                            {errors.class && <p className="mt-1 text-xs text-red-600 font-medium">{errors.class}</p>}
                        </div>

                        {/* Subject Select */}
                        <div>
                            <label className={labelClass}>Subject</label>
                            <select 
                                value={selectedSubject} 
                                onChange={e => setSelectedSubject(e.target.value)} 
                                className={`${inputClass} ${getInputBorder('subject')}`}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.subject && <p className="mt-1 text-xs text-red-600 font-medium">{errors.subject}</p>}
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
                            {errors.date && <p className="mt-1 text-xs text-red-600 font-medium">{errors.date}</p>}
                        </div>

                        {/* Load Button */}
                        <div className="pt-[23px]"> 
                            <button 
                                type="submit"
                                disabled={!selectedForm || !selectedClass || !selectedSubject}
                                className="w-full bg-[#37368b] hover:bg-[#2a2970] text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[38px]"
                            >
                                <Search className="w-4 h-4" />
                                <span>Load</span>
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
                                <div key={student.id} className="group p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                                    
                                    {/* Student Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-400 overflow-hidden border border-gray-100 shrink-0">
                                            {student.image ? (
                                                <img src={'/storage/' + student.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                student.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">{student.name}</h3>
                                            <p className="text-xs font-medium text-gray-400 font-mono mt-0.5">{student.reg_number}</p>
                                        </div>
                                    </div>

                                    {/* Status Toggles */}
                                    <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
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
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">No students loaded</h3>
                        <p className="text-sm text-gray-500 mt-1">Select a Form, Class, and Subject above to start.</p>
                    </div>
                )}
            </div>

            {/* STICKY FOOTER */}
            {students.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-500">
                                Register for: <span className="font-bold text-gray-900">{selectedSubject}</span> on <span className="font-bold text-gray-900">{new Date(selectedDate).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full sm:w-auto bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {submitting ? <Spinner /> : <Save className="w-5 h-5" />}
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
        green: 'bg-white text-green-600 shadow-sm ring-1 ring-black/5',
        red: 'bg-white text-red-600 shadow-sm ring-1 ring-black/5',
        yellow: 'bg-white text-yellow-600 shadow-sm ring-1 ring-black/5',
        blue: 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5',
    };

    const baseClass = active 
        ? activeStyles[color] 
        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50';

    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-all duration-200
                ${baseClass}
            `}
            title={label}
        >
            <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-[10px] sm:text-xs font-bold ${active ? '' : 'hidden sm:inline'}`}>
                {label}
            </span>
        </button>
    );
};