import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// --- Interfaces matching Backend Data ---
interface DbClass {
    id: number;
    subject: string;
    grade_level: string;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
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
    room: string;
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
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // CONSTANTS FOR GRID
    const HOUR_HEIGHT = 120; // 120px per hour = 2px per minute
    const PIXELS_PER_MINUTE = 2;
    const START_HOUR = 8; // Schedule starts at 8:00

    // --- HELPER: Generate Color from Subject Name ---
    const getSubjectColor = (subject: string) => {
        const colors = [
            "bg-blue-100 border-blue-300 text-blue-800",
            "bg-green-100 border-green-300 text-green-800",
            "bg-purple-100 border-purple-300 text-purple-800",
            "bg-yellow-100 border-yellow-300 text-yellow-800",
            "bg-red-100 border-red-300 text-red-800",
            "bg-indigo-100 border-indigo-300 text-indigo-800",
            "bg-teal-100 border-teal-300 text-teal-800",
            "bg-orange-100 border-orange-300 text-orange-800",
        ];
        let hash = 0;
        for (let i = 0; i < subject.length; i++) {
            hash = subject.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // --- TRANSFORM BACKEND DATA TO UI FORMAT ---
    const currentClasses: Class[] = useMemo(() => {
        const transformed: Class[] = [];
        
        // Loop through the grouped timetable from backend
        Object.values(timetable).forEach((dayClasses) => {
            dayClasses.forEach((dbClass) => {
                transformed.push({
                    id: dbClass.id,
                    courseName: dbClass.subject,
                    // We use grade_level as teacher label since DB lacks teacher column currently
                    teacher: dbClass.grade_level, 
                    color: getSubjectColor(dbClass.subject),
                    description: `${dbClass.subject} class for ${dbClass.grade_level} students.`,
                    times: [
                        {
                            day: dbClass.day,
                            startTime: dbClass.start_time,
                            endTime: dbClass.end_time,
                            room: dbClass.room || 'N/A'
                        }
                    ]
                });
            });
        });

        return transformed;
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

    // Helper: Convert "HH:MM" string to total minutes
    const parseTime = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    };

    // Calculate height based on minute duration
    const getDurationHeight = (startTime: string, endTime: string): number => {
        const startTotal = parseTime(startTime);
        const endTotal = parseTime(endTime);
        const durationMinutes = endTotal - startTotal;
        return durationMinutes * PIXELS_PER_MINUTE;
    };

    // Calculate top position based on minutes from start of day (8:00)
    const getTimePosition = (startTime: string): number => {
        const startOfDayMinutes = START_HOUR * 60;
        const currentMinutes = parseTime(startTime);
        return (currentMinutes - startOfDayMinutes) * PIXELS_PER_MINUTE;
    };

    // Calculate total weekly hours for stats
    const totalWeeklyHours = currentClasses.reduce((total, classItem) => {
        return total + classItem.times.reduce((classTotal, timeSlot) => {
            const startTotal = parseTime(timeSlot.startTime);
            const endTotal = parseTime(timeSlot.endTime);
            return classTotal + ((endTotal - startTotal) / 60);
        }, 0);
    }, 0).toFixed(1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Class Timetable" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#37368b] mb-2">Class Timetable</h1>
                    <p className="text-gray-600">Your weekly schedule for the current session</p>
                </div>

                {/* Statistics */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
                        <div className="text-2xl font-bold text-[#37368b]">{currentClasses.length}</div>
                        <div className="text-sm text-gray-600">Total Classes</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
                        <div className="text-2xl font-bold text-[#37368b]">{totalWeeklyHours}</div>
                        <div className="text-sm text-gray-600">Weekly Hours</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
                        <div className="text-2xl font-bold text-[#37368b]">{Object.keys(timetable).length}</div>
                        <div className="text-sm text-gray-600">Active Days</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
                        <div className="text-2xl font-bold text-[#37368b]">N/A</div>
                        <div className="text-sm text-gray-600">Total Credits</div>
                    </div>
                </div>

                {/* Timetable Grid */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-[#37368b] px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Weekly Class Schedule</h2>
                    </div>

                    {/* Timetable Scroll Container */}
                    <div className="p-4 overflow-x-auto">
                        <div className="flex min-w-[800px]">
                            {/* Time Column */}
                            <div className="w-20 flex-shrink-0 pt-12">
                                {timeSlots.map((time, index) => (
                                    <div key={index} className="relative flex items-start justify-center border-r border-gray-200" style={{ height: `${HOUR_HEIGHT}px` }}>
                                        <span className="text-sm text-gray-600 font-bold -mt-3 bg-white px-1 z-10">{time}</span>
                                        {/* Optional: Add small tick marks for 10 min intervals on the axis if needed */}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="flex-1 grid grid-cols-5">
                                {/* Day Headers */}
                                {weekDays.map((day, index) => (
                                    <div key={index} className="border-r border-gray-200 last:border-r-0">
                                        <div className="h-12 flex items-center justify-center bg-gray-50 border-b border-gray-200">
                                            <h3 className="font-bold text-[#37368b]">{day.day}</h3>
                                        </div>
                                        
                                        {/* Time slots container */}
                                        <div className="relative" style={{ height: `${timeSlots.length * HOUR_HEIGHT}px` }}>
                                            
                                            {/* BACKGROUND GRID: 1 Hour Blocks with 6 invisible 10-min demarcations */}
                                            {timeSlots.map((time, timeIndex) => (
                                                <div 
                                                    key={timeIndex} 
                                                    className="absolute w-full border-b border-gray-200 box-border"
                                                    style={{ 
                                                        top: `${timeIndex * HOUR_HEIGHT}px`,
                                                        height: `${HOUR_HEIGHT}px`
                                                    }}
                                                >
                                                    {/* The 6 invisible demarcations (10 mins each) */}
                                                    <div className="h-full w-full flex flex-col">
                                                        {[...Array(6)].map((_, i) => (
                                                            <div 
                                                                key={i} 
                                                                className="flex-1 border-b border-gray-50 last:border-b-0" 
                                                                // Use border-gray-50 for "invisible" but structurally present lines
                                                                // Change to border-dashed border-gray-200 for visible dotted lines
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
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
                                                                className={`absolute left-1 right-1 rounded-md border p-2 cursor-pointer transition-all hover:shadow-lg hover:z-20 ${classItem.color}`}
                                                                style={{
                                                                    top: `${topPosition}px`,
                                                                    height: `${height}px`,
                                                                    zIndex: 10
                                                                }}
                                                            >
                                                                <div className="font-bold text-xs md:text-sm truncate leading-tight">{classItem.courseName}</div>
                                                                <div className="text-[10px] md:text-xs opacity-80 mt-1">
                                                                    {timeSlot.startTime} - {timeSlot.endTime}
                                                                </div>
                                                                <div className="text-[10px] md:text-xs font-mono mt-1 opacity-75">
                                                                    {timeSlot.room}
                                                                </div>
                                                            </div>
                                                        );
                                                    });
                                            })}

                                            {/* Current Time Indicator (Optional Visual) */}
                                            {/* You could calculate current time position here */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class List Summary */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-[#37368b] mb-4">Current Term Classes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentClasses.map((classItem) => (
                            <div 
                                key={classItem.id}
                                onClick={() => openClassModal(classItem)}
                                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${classItem.color} hover:opacity-90`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h5 className="font-bold">{classItem.courseName}</h5>
                                    </div>
                                </div>
                                <p className="text-sm opacity-80 mb-3">{classItem.teacher}</p>
                                <div className="space-y-1">
                                    {classItem.times.map((timeSlot, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>{timeSlot.day}:</span>
                                            <span className="font-medium">{timeSlot.startTime} - {timeSlot.endTime}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Class Details Modal */}
            {isModalOpen && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 rounded-t-2xl ${selectedClass.color}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedClass.courseName}</h3>
                                    <p className="text-sm opacity-90">{selectedClass.teacher}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1 hover:bg-black/10 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            
                            {/* Schedule */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Weekly Schedule</h4>
                                <div className="space-y-2">
                                    {selectedClass.times.map((timeSlot, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-[#37368b] w-24">{timeSlot.day}</span>
                                                <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">{timeSlot.room}</span>
                                            </div>
                                            <div className="font-mono text-sm font-medium">
                                                {timeSlot.startTime} - {timeSlot.endTime}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    {selectedClass.description}
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex gap-3 pt-2">
                                <button className="flex-1 bg-[#37368b] text-white py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    View Materials
                                </button>
                                <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}