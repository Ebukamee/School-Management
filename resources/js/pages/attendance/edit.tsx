import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react'; 
import AppLayout from '@/layouts/app-layout';
import { 
    Users, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    HelpCircle, 
    Save, 
    CheckSquare,
    AlertCircle,
    ArrowLeft, 
    Calendar,
    BookOpen,
    Edit
} from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface Student {
    id: number;
    name: string;
    reg_number: string;
    image?: string;
    attendances?: { status: string }[]; 
}

interface Props {
    students: Student[];
    record_info: {
        date: string;
        subject: string;
        form: string;
        class: string;
    };
    errors: Record<string, string>;
}

export default function EditRegister({ students, record_info, errors }: Props) {
    
    // 1. STATE INITIALIZATION (Smart Load)
    const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>(() => {
        const initial: Record<number, string> = {};
        students.forEach(s => {
            if (s.attendances && s.attendances.length > 0) {
                initial[s.id] = s.attendances[0].status;
            } else {
                initial[s.id] = 'present';
            }
        });
        return initial;
    });

    const [submitting, setSubmitting] = useState(false);

    // 2. SUBMIT (Mass Update)
    const handleSubmit = () => {
        const payload = Object.keys(attendanceMap).map(studentId => ({
            student_id: parseInt(studentId),
            status: attendanceMap[parseInt(studentId)]
        }));

        router.post('/attendance', {
            date: record_info.date,
            subject: record_info.subject,
            form: record_info.form,
            class: record_info.class,
            attendance: payload,
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

    // Styles
    const labelClass = "block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";
    const infoBoxClass = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700 flex items-center gap-2 cursor-not-allowed opacity-90";

    return (
        <AppLayout breadcrumbs={[{ title: 'Attendance', href: '/attendance/manage' }, { title: 'Edit Register', href: '#' }]}>
            <Head title="Edit Attendance" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <Link 
                            href="/attendance/manage" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors mb-3"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Logs
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <Edit className="w-6 h-6" />
                            </span>
                            Edit Register
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">Modify attendance records for a previously taken class.</p>
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

                {/* LOCKED INFO BAR */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        
                        {/* Locked Form/Class */}
                        <div>
                            <label className={labelClass}>Class</label>
                            <div className={infoBoxClass}>
                                <Users className="w-4 h-4 text-gray-400" />
                                {record_info.form} {record_info.class}
                            </div>
                        </div>

                        {/* Locked Subject */}
                        <div>
                            <label className={labelClass}>Subject</label>
                            <div className={infoBoxClass}>
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                {record_info.subject}
                            </div>
                        </div>

                        {/* Locked Date */}
                        <div>
                            <label className={labelClass}>Date Recorded</label>
                            <div className={infoBoxClass}>
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {new Date(record_info.date).toLocaleDateString()}
                            </div>
                        </div>

                         {/* Status Badge */}
                         <div>
                            <label className={labelClass}>Status</label>
                            <div className="w-full rounded-xl border border-[#ffc53a]/30 bg-[#ffc53a]/10 px-4 py-2.5 text-sm font-bold text-[#d97706] flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Editing Mode
                            </div>
                        </div>

                    </div>
                </div>

                {/* STUDENT LIST */}
                {students.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        
                        <div className="flex items-center justify-between mb-4 px-1">
                            <span className="text-sm font-medium text-gray-500">
                                Editing <span className="font-bold text-gray-900">{students.length}</span> students
                            </span>
                            <button 
                                onClick={markAllPresent}
                                type="button"
                                className="text-xs font-bold text-[#37368b] hover:text-[#2a2970] hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-transparent hover:border-blue-100"
                            >
                                <CheckSquare className="w-4 h-4" />
                                Reset All to Present
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
                        <h3 className="text-base font-bold text-gray-900">No students found</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">This register seems to be empty.</p>
                    </div>
                )}
            </div>

            {/* STICKY FOOTER */}
            {students.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-500 font-medium">
                                Editing: <span className="font-bold text-gray-900">{record_info.subject}</span> for <span className="font-bold text-gray-900">{record_info.form} {record_info.class}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full sm:w-auto bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 hover:-translate-y-0.5 active:scale-95"
                        >
                            {submitting ? <Spinner className="text-white" /> : <Save className="w-5 h-5" />}
                            <span>Update Changes</span>
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