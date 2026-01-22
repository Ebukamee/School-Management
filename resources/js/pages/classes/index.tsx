import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

interface DaySchedule {
    day: string;
    fullDay: string;
    classes: { class: Class; timeSlot: ClassTime }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: '/classes'
    }
];

export default function Classes() {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for current term classes with weekly schedule
    const currentClasses: Class[] = [
        {
            id: 1,
            courseName: "Mathematics",
            teacher: "Mr. Johnson",
            color: "bg-blue-100 border-blue-300 text-blue-800",
            description: "Advanced calculus, algebra, and mathematical analysis",
            times: [
                { day: "Monday", startTime: "09:00", endTime: "10:30", room: "LT-201" },
                { day: "Wednesday", startTime: "09:00", endTime: "10:30", room: "LT-201" },
                { day: "Friday", startTime: "09:00", endTime: "10:30", room: "LT-201" }
            ]
        },
        {
            id: 2,
            courseName: "English Language",
            teacher: "Mrs. Adams",
            color: "bg-green-100 border-green-300 text-green-800",
            description: "Literature analysis and communication skills",
            times: [
                { day: "Tuesday", startTime: "11:00", endTime: "12:30", room: "Room-105" },
                { day: "Thursday", startTime: "11:00", endTime: "12:30", room: "Room-105" }
            ]
        },
        {
            id: 3,
            courseName: "Physics",
            teacher: "Dr. Smith",
            color: "bg-purple-100 border-purple-300 text-purple-800",
            description: "Classical mechanics and thermodynamics",
            times: [
                { day: "Monday", startTime: "13:00", endTime: "14:30", room: "Lab-B" },
                { day: "Wednesday", startTime: "13:00", endTime: "14:30", room: "Lab-B" }
            ]
        },
        {
            id: 4,
            courseName: "Chemistry",
            teacher: "Prof. Williams",
            color: "bg-yellow-100 border-yellow-300 text-yellow-800",
            description: "Chemical principles and reactions",
            times: [
                { day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "Lab-C" },
                { day: "Thursday", startTime: "14:00", endTime: "15:30", room: "Lab-C" }
            ]
        },
        {
            id: 5,
            courseName: "Biology",
            teacher: "Dr. Brown",
            color: "bg-red-100 border-red-300 text-red-800",
            description: "Cellular biology and genetics",
            times: [
                { day: "Monday", startTime: "10:30", endTime: "12:00", room: "Lab-A" },
                { day: "Friday", startTime: "10:30", endTime: "12:00", room: "Lab-A" }
            ]
        },
        {
            id: 6,
            courseName: "Computer Science",
            teacher: "Mr. Davis",
            color: "bg-indigo-100 border-indigo-300 text-indigo-800",
            description: "Programming and algorithms",
            times: [
                { day: "Thursday", startTime: "09:00", endTime: "12:00", room: "Comp-Lab" }
            ]
        },
        {
            id: 7,
            courseName: "Geography",
            teacher: "Mrs. Green",
            color: "bg-teal-100 border-teal-300 text-teal-800",
            description: "Physical and human geography",
            times: [
                { day: "Tuesday", startTime: "09:00", endTime: "10:30", room: "Room-203" }
            ]
        }
    ];

    // Define all time slots for the week
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", 
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Define week days
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

    // Function to check if a class occurs at a specific day and time
    const getClassAtTime = (day: string, time: string): { class: Class; timeSlot: ClassTime } | null => {
        for (const classItem of currentClasses) {
            for (const timeSlot of classItem.times) {
                if (timeSlot.day === day && timeSlot.startTime === time) {
                    return { class: classItem, timeSlot };
                }
            }
        }
        return null;
    };

    // Calculate duration in hours for styling
    const getDurationHeight = (startTime: string, endTime: string): number => {
        const start = parseInt(startTime.split(':')[0]);
        const end = parseInt(endTime.split(':')[0]);
        const duration = end - start;
        // Each hour = 80px height
        return duration * 80;
    };

    // Calculate time position for styling
    const getTimePosition = (startTime: string): number => {
        const hour = parseInt(startTime.split(':')[0]);
        // 8:00 = 0px, 9:00 = 80px, etc.
        return (hour - 8) * 80;
    };

    // Calculate total weekly hours
    const totalWeeklyHours = currentClasses.reduce((total, classItem) => {
        return total + classItem.times.reduce((classTotal, timeSlot) => {
            const start = parseInt(timeSlot.startTime.split(':')[0]);
            const end = parseInt(timeSlot.endTime.split(':')[0]);
            return classTotal + (end - start);
        }, 0);
    }, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Class Timetable" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#37368b] mb-2">Class Timetable</h1>
                    <p className="text-gray-600">Your weekly schedule for SS3 First Term 2023/2024</p>
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
                        <div className="text-2xl font-bold text-[#37368b]">5</div>
                        <div className="text-sm text-gray-600">Days per Week</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-gray-200">
                        <div className="text-2xl font-bold text-[#37368b]">21</div>
                        <div className="text-sm text-gray-600">Total Credits</div>
                    </div>
                </div>

                {/* Timetable Grid */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-[#37368b] px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Weekly Class Schedule</h2>
                    </div>

                    {/* Timetable */}
                    <div className="p-4">
                        <div className="flex">
                            {/* Time Column */}
                            <div className="w-20 flex-shrink-0">
                                <div className="h-12"></div> {/* Header spacer */}
                                {timeSlots.map((time, index) => (
                                    <div key={index} className="h-20 border-b border-gray-200 flex items-center justify-center">
                                        <span className="text-sm text-gray-600 font-medium">{time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="flex-1 grid grid-cols-5">
                                {/* Day Headers */}
                                {weekDays.map((day, index) => (
                                    <div key={index} className="border-b border-gray-200">
                                        <div className="h-12 flex items-center justify-center bg-gray-50">
                                            <h3 className="font-bold text-[#37368b]">{day.day}</h3>
                                        </div>
                                        {/* Time slots for each day */}
                                        <div className="relative" style={{ height: `${timeSlots.length * 80}px` }}>
                                            {/* Time slot backgrounds */}
                                            {timeSlots.map((time, timeIndex) => (
                                                <div 
                                                    key={timeIndex} 
                                                    className={`absolute w-full h-20 border-b border-gray-100 ${
                                                        timeIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                    }`}
                                                    style={{ top: `${timeIndex * 80}px` }}
                                                ></div>
                                            ))}
                                            
                                            {/* Classes */}
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
                                                                className={`absolute left-1 right-1 rounded-lg border p-2 cursor-pointer transition-all hover:shadow-md ${classItem.color}`}
                                                                style={{
                                                                    top: `${topPosition}px`,
                                                                    height: `${height}px`,
                                                                    zIndex: 10
                                                                }}
                                                            >
                                                                <div className="font-semibold text-sm truncate">{classItem.courseName}</div>
                                                                <div className="text-xs text-gray-600">
                                                                    {timeSlot.startTime} - {timeSlot.endTime}
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
                                        <h5 className="text-gray-700 font-medium">{classItem.courseName}</h5>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{classItem.teacher}</p>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 rounded-t-2xl ${selectedClass.color.replace('bg-', 'bg-').replace('border-', 'border-')}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedClass.courseCode}</h3>
                                    <p className="text-sm opacity-90">{selectedClass.courseName}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Class Info */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-[#37368b] mb-3">Class Information</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Teacher:</span>
                                        <span className="font-medium">{selectedClass.teacher}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Credits:</span>
                                        <span className="font-medium">{selectedClass.credits}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Weekly Hours:</span>
                                        <span className="font-medium">
                                            {selectedClass.times.reduce((total, timeSlot) => {
                                                const start = parseInt(timeSlot.startTime.split(':')[0]);
                                                const end = parseInt(timeSlot.endTime.split(':')[0]);
                                                return total + (end - start);
                                            }, 0)} hours
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-[#37368b] mb-3">Weekly Schedule</h4>
                                <div className="space-y-2">
                                    {selectedClass.times.map((timeSlot, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                            <div>
                                                <span className="font-medium">{timeSlot.day}</span>
                                                <div className="text-sm text-gray-600">{timeSlot.room}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{timeSlot.startTime} - {timeSlot.endTime}</div>
                                                <div className="text-sm text-gray-600">
                                                    {parseInt(timeSlot.endTime.split(':')[0]) - parseInt(timeSlot.startTime.split(':')[0])} hours
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-[#37368b] mb-2">Course Description</h4>
                                <p className="text-gray-700">{selectedClass.description}</p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    {selectedClass.times.length} sessions per week
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                                        View Materials
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