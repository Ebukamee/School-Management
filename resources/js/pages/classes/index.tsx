import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Calendar, 
    Clock, 
    User, 
    ChevronRight, 
    Plus,
    X,
    BookOpen
} from 'lucide-react';

// --- Interfaces matching Backend Data ---
interface DbClass {
    id: number;
    subject: string;
    grade_level: string;
    day: string;
    start_time: string;
    end_time: string;
}

// --- Props from Laravel ---
interface Props {
    timetable: Record<string, DbClass[]>;
}

// --- Interfaces for UI Logic ---
interface ClassTime {
    day: string;
    startTime: string;
    endTime: string;
}

interface Class {
    id: number;
    courseName: string;
    teacher: string;
    times: ClassTime[];
    color: string;
    description: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: '/classes'
    }
];

export default function Classes({ timetable = {} }: Props) {
    // 1. Get User Data correctly from Inertia
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    
    // 2. Guard Logic: Check if user is a student
    const isStudent = user.role === 'student';

    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // CONSTANTS FOR GRID
    const HOUR_HEIGHT = 100; 
    const PIXELS_PER_MINUTE = HOUR_HEIGHT / 60;
    const START_HOUR = 8; 

    // --- HELPER: Generate Color from Subject Name ---
    const getSubjectColor = (subject: string) => {
        const colors = [
            "bg-blue-50 border-blue-200 text-[#37368b]",
            "bg-emerald-50 border-emerald-200 text-emerald-700",
            "bg-amber-50 border-amber-200 text-amber-700",
            "bg-purple-50 border-purple-200 text-purple-700",
            "bg-rose-50 border-rose-200 text-rose-700",
            "bg-cyan-50 border-cyan-200 text-cyan-700",
        ];
        let hash = 0;
        for (let i = 0; i < subject.length; i++) {
            hash = subject.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // --- TRANSFORM & GROUP DATA ---
    const currentClasses: Class[] = useMemo(() => {
        const classMap = new Map<string, Class>();
        
        Object.values(timetable).forEach((dayClasses) => {
            dayClasses.forEach((dbClass) => {
                const key = dbClass.subject;

                if (!classMap.has(key)) {
                    classMap.set(key, {
                        id: dbClass.id,
                        courseName: dbClass.subject,
                        teacher: dbClass.grade_level, 
                        color: getSubjectColor(dbClass.subject),
                        description: `${dbClass.subject} class for ${dbClass.grade_level} students.`,
                        times: [] 
                    });
                }

                classMap.get(key)?.times.push({
                    day: dbClass.day,
                    startTime: dbClass.start_time,
                    endTime: dbClass.end_time,
                });
            });
        });

        return Array.from(classMap.values());
    }, [timetable]);

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    const weekDays = [
        { day: "Monday", fullDay: "Monday" },
        { day: "Tuesday", fullDay: "Tuesday" },
        { day: "Wednesday", fullDay: "Wednesday" },
        { day: "Thursday", fullDay: "Thursday" },
        { day: "Friday", fullDay: "Friday" }
    ];

    const openClassModal = (classItem: Class) => {
        setSelectedClass(classItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClass(null);
    };

    const parseTime = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    };

    const getDurationHeight = (startTime: string, endTime: string): number => {
        const startTotal = parseTime(startTime);
        const endTotal = parseTime(endTime);
        const durationMinutes = endTotal - startTotal;
        return durationMinutes * PIXELS_PER_MINUTE;
    };

    const getTimePosition = (startTime: string): number => {
        const startOfDayMinutes = START_HOUR * 60;
        const currentMinutes = parseTime(startTime);
        return (currentMinutes - startOfDayMinutes) * PIXELS_PER_MINUTE;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Weekly Class Timetable" />
            
            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Weekly <span className="text-[#37368b]">Class Timetable</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Manage and view your academic schedule for the current term.
                        </p>
                    </div>
                    
                    {/* GUARD: Only show button if NOT a student */}
                    {!isStudent && (
                        <div className="flex gap-3">
                            <Link href="/classes/create" className="bg-[#37368b] hover:bg-[#2a2970] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-0.5 active:scale-95">
                                <Plus className="w-5 h-5" />
                                <span>Build Schedule</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-extrabold text-[#37368b] mb-1">{currentClasses.length}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Subjects</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-extrabold text-[#ffc53a] mb-1">
                            {currentClasses.reduce((acc, curr) => acc + curr.times.length, 0)}
                        </div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weekly Sessions</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-extrabold text-gray-700 mb-1">5</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Days Active</div>
                    </div>
                </div>

                {/* --- TIMETABLE GRID --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-10 relative">
                    <div className="overflow-x-auto custom-scrollbar">
                        <div className="min-w-[1000px] flex">
                            
                            {/* Time Axis */}
                            <div className="w-20 flex-shrink-0 border-r border-gray-100 bg-gray-50/50">
                                <div className="h-14 border-b border-gray-100"></div>
                                {timeSlots.map((time, index) => (
                                    <div key={index} className="relative border-b border-gray-100" style={{ height: `${HOUR_HEIGHT}px` }}>
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1 text-xs font-bold text-gray-400">
                                            {time}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Days Columns */}
                            <div className="flex-1 grid grid-cols-5">
                                {weekDays.map((day, dayIndex) => (
                                    <div key={dayIndex} className="border-r border-gray-100 last:border-r-0">
                                        
                                        {/* Day Header */}
                                        <div className="h-14 flex items-center justify-center border-b border-gray-100 bg-gray-50/30">
                                            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">{day.day}</h3>
                                        </div>

                                        {/* Day Content */}
                                        <div className="relative" style={{ height: `${timeSlots.length * HOUR_HEIGHT}px` }}>
                                            
                                            {/* Background Lines */}
                                            {timeSlots.map((_, i) => (
                                                <div key={i} className="absolute w-full border-b border-gray-50" style={{ top: `${i * HOUR_HEIGHT}px` }}></div>
                                            ))}

                                            {/* Classes Rendering */}
                                            {currentClasses.map((classItem) => {
                                                return classItem.times
                                                    .filter(timeSlot => timeSlot.day === day.day)
                                                    .map((timeSlot, slotIndex) => {
                                                        const topPosition = getTimePosition(timeSlot.startTime);
                                                        const height = getDurationHeight(timeSlot.startTime, timeSlot.endTime);
                                                        
                                                        return (
                                                            <div
                                                                key={`${classItem.id}-${slotIndex}`}
                                                                onClick={() => openClassModal(classItem)}
                                                                className={`
                                                                    absolute left-1 right-1 rounded-xl border p-2 cursor-pointer 
                                                                    transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:z-20
                                                                    flex flex-col justify-center
                                                                    ${classItem.color}
                                                                `}
                                                                style={{
                                                                    top: `${topPosition}px`,
                                                                    height: `${height}px`,
                                                                    zIndex: 10
                                                                }}
                                                            >
                                                                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-current opacity-20"></div>
                                                                
                                                                <div className="pl-2">
                                                                    <div className="font-bold text-xs md:text-sm leading-tight mb-0.5 truncate">
                                                                        {classItem.courseName}
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-[10px] opacity-80 font-mono">
                                                                        <Clock className="w-3 h-3" />
                                                                        {timeSlot.startTime}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    });
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SUBJECT LIST (Summary) --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 text-[#37368b] rounded-xl">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        {/* Dynamic Name */}
                        <h2 className="text-xl font-bold text-gray-900">{`Subjects for ${user.form} ${user.class}`}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentClasses.map((classItem, idx) => (
                            <div 
                                key={`${classItem.id}-${idx}`}
                                onClick={() => openClassModal(classItem)}
                                className="group border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${classItem.color}`}>
                                            {classItem.courseName.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-[#37368b] transition-colors">
                                                {classItem.courseName}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-mono">{classItem.teacher}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#37368b] transition-colors" />
                                </div>
                                
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-50">
                                    {classItem.times.map((time, tIdx) => (
                                        <div key={tIdx} className="flex justify-between text-xs text-gray-500">
                                            <span className="font-bold text-gray-700">{time.day}</span>
                                            <span className="font-mono bg-gray-50 px-2 py-0.5 rounded">{time.startTime} - {time.endTime}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- DETAILS MODAL --- */}
            {isModalOpen && selectedClass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                    
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className={`px-8 py-6 ${selectedClass.color.split(' ')[0]} bg-opacity-30`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{selectedClass.courseName}</h3>
                                    <p className="text-sm font-medium opacity-70 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {selectedClass.teacher}
                                    </p>
                                </div>
                                <button onClick={closeModal} className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-gray-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-6">
                            {/* Schedule List */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Weekly Schedule</h4>
                                <div className="space-y-2">
                                    {selectedClass.times.map((slot, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <span className="font-bold text-gray-700 text-sm">{slot.day}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-gray-500">{slot.startTime} - {slot.endTime}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Details</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedClass.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}