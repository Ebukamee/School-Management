import React, { useState, useMemo, useEffect } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { 
    Calendar, 
    Save, 
    Plus, 
    Trash2, 
    Info, 
    Lock 
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Classes', href: '/classes' },
    { title: 'Builder', href: '/classes/create' }
];

// --- CONFIGURATION ---
const START_TIME = "08:00";
const END_TIME = "14:40"; 
const PERIOD_DURATION = 40; 
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// --- HELPERS ---
const addMinutes = (time: string, minutes: number) => {
    const [h, m] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toTimeString().slice(0, 5); 
};

const generateTimeSlots = () => {
    const slots = [];
    let current = START_TIME;
    while (current < END_TIME) {
        const next = addMinutes(current, PERIOD_DURATION);
        slots.push({ start: current, end: next });
        current = next;
    }
    return slots;
};

interface FormData {
    grade_level: string;
    classes: any[];
}

// 1. Define the props to accept existing data
interface PageProps extends SharedData {
    targetGrade: string;
    existingClasses: any[];
}

export default function CreateClass({ targetGrade, existingClasses }: PageProps) {
    const timeSlots = useMemo(() => generateTimeSlots(), []);
    const { auth } = usePage<SharedData>().props;
    
    // --- FORM STATE ---
    const { data, setData, post, processing, errors } = useForm<FormData>({
        // Use the prop from controller if available, otherwise fallback to auth user logic
        grade_level: targetGrade || (auth.user.form && auth.user.class 
            ? `${auth.user.form}${auth.user.class}` 
            : "N/A"),
        // Initialize with existing classes so the grid is pre-filled
        classes: existingClasses || [] 
    });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlot, setActiveSlot] = useState<{day: string, start: string, end: string} | null>(null);
    const [subjectInput, setSubjectInput] = useState('');

    // --- ACTIONS ---
    const handleSlotClick = (day: string, start: string, end: string) => {
        // Check both the form state AND the original existing classes
        const existing = data.classes.find(c => c.day === day && c.start_time.slice(0,5) === start.slice(0,5));
        
        if (existing) {
            // If clicked, we open the modal to EDIT instead of just confirming delete
            // This is better UX for "Upsert" logic
            setActiveSlot({ day, start, end });
            setSubjectInput(existing.subject); // Pre-fill subject
            setIsModalOpen(true);
        } else {
            setActiveSlot({ day, start, end });
            setSubjectInput('');
            setIsModalOpen(true);
        }
    };

    const saveSlot = () => {
        if (!activeSlot || !subjectInput) return;

        const newClass = {
            day: activeSlot.day,
            start_time: activeSlot.start,
            end_time: activeSlot.end,
            subject: subjectInput,
        };

        // Filter out any existing class in this slot first (Update logic)
        const updatedClasses = data.classes.filter(
            c => !(c.day === activeSlot.day && c.start_time.slice(0,5) === activeSlot.start.slice(0,5))
        );

        setData('classes', [...updatedClasses, newClass]);
        setIsModalOpen(false);
    };

    // Helper to remove a class completely (if input is cleared or specific delete action)
    const removeClass = () => {
        if (!activeSlot) return;
        const updatedClasses = data.classes.filter(
            c => !(c.day === activeSlot.day && c.start_time.slice(0,5) === activeSlot.start.slice(0,5))
        );
        setData('classes', updatedClasses);
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(data.classes.length === 0) {
            alert("Please add at least one subject to the timetable.");
            return;
        }
        post('/classes');
    };

    const getSlotData = (day: string, start: string) => {
        // Ensure strictly matching string format (HH:MM)
        return data.classes.find(c => c.day === day && c.start_time.slice(0,5) === start.slice(0,5));
    };

    // Common Input Class
    const inputClass = "w-full border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] transition-all outline-none shadow-sm hover:border-gray-300";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Timetable Builder" />
            
            <div className=" w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-blue-50 text-[#37368b] rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </span>
                            Timetable Builder
                        </h1>
                        <p className="text-gray-500 mt-2 ml-1">
                            Click on any slot to add or edit a class.
                        </p>
                    </div>

                    {/* Grade Level Input (LOCKED & PRE-FILLED) */}
                    <div className="bg-gray-50 p-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 pr-4 w-full md:w-auto opacity-90 cursor-not-allowed">
                        <div className="bg-white text-gray-400 font-bold px-3 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 border border-gray-100 shadow-sm">
                            <Lock className="w-3 h-3" /> Target Class
                        </div>
                        <input 
                            type="text" 
                            readOnly
                            disabled
                            value={data.grade_level}
                            className="border-none focus:ring-0 text-lg font-black text-gray-600 w-24 bg-transparent cursor-not-allowed text-center"
                        />
                    </div>
                </div>

                {/* --- ERROR ALERT --- */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                        <Info className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-red-800 text-sm">Submission Failed</h3>
                            <ul className="list-disc list-inside text-xs text-red-600 mt-1">
                                {Object.values(errors).map((err: any, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* --- MAIN GRID CONTAINER --- */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                    <div className="overflow-x-auto custom-scrollbar pb-2">
                        <div className="min-w-[1000px]">
                            
                            {/* Grid Header */}
                            <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                                <div className="p-4 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-center border-r border-gray-200">
                                    Period
                                </div>
                                {DAYS.map(day => (
                                    <div key={day} className="p-4 py-4 text-sm font-bold text-gray-700 text-center border-r border-gray-200 last:border-r-0">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Grid Body */}
                            <div className="divide-y divide-gray-200">
                                {timeSlots.map((slot, index) => (
                                    <div key={index} className="grid grid-cols-6 group hover:bg-gray-50/30 transition-colors">
                                        
                                        {/* Time Column */}
                                        <div className="p-4 border-r border-gray-200 flex flex-col items-center justify-center bg-gray-50/50">
                                            <span className="text-sm font-bold text-gray-900">{slot.start}</span>
                                            <div className="h-3 w-px bg-gray-300 my-1"></div>
                                            <span className="text-xs font-medium text-gray-400">{slot.end}</span>
                                        </div>

                                        {/* Day Columns */}
                                        {DAYS.map(day => {
                                            const filled = getSlotData(day, slot.start);
                                            return (
                                                <div 
                                                    key={`${day}-${slot.start}`}
                                                    onClick={() => handleSlotClick(day, slot.start, slot.end)}
                                                    className={`
                                                        relative p-1 border-r border-gray-200 last:border-r-0 cursor-pointer transition-all duration-200
                                                        ${filled ? 'bg-white' : 'hover:bg-blue-50/30'}
                                                    `}
                                                >
                                                    {filled ? (
                                                        <div className="h-full w-full bg-blue-50/50 border border-blue-100 rounded-md p-2 flex flex-col justify-center items-center text-center group/card hover:bg-blue-50 transition-colors relative overflow-hidden min-h-[60px]">
                                                            {/* Accent Line */}
                                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#37368b]"></div>
                                                            
                                                            <span className="font-bold text-[#37368b] text-sm leading-tight px-1">
                                                                {filled.subject}
                                                            </span>

                                                            {/* Visual Indicator for filled slot */}
                                                            <div className="absolute right-1 top-1 w-1.5 h-1.5 bg-[#37368b] rounded-full opacity-20"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center min-h-[60px]">
                                                            <Plus className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className="fixed bottom-6 right-6 z-40">
                    <button 
                        onClick={handleSubmit}
                        disabled={processing || data.classes.length === 0}
                        className="bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/20 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                    >
                        {processing ? (
                            <span className="animate-pulse">Saving...</span>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Save Timetable</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-mono ml-1">
                                    {data.classes.length}
                                </span>
                            </>
                        )}
                    </button>
                </div>

            </div>

            {/* --- MODAL --- */}
            {isModalOpen && activeSlot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {subjectInput ? 'Edit Class' : 'Add New Class'}
                            </h3>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mt-1">
                                {activeSlot.day} • {activeSlot.start} - {activeSlot.end}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Subject Name</label>
                                <input 
                                    autoFocus
                                    type="text" 
                                    className={inputClass}
                                    placeholder="e.g. Mathematics"
                                    value={subjectInput}
                                    onChange={e => setSubjectInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && saveSlot()}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            {/* If editing, show Delete button, otherwise Cancel */}
                            {getSlotData(activeSlot.day, activeSlot.start) ? (
                                <button 
                                    onClick={removeClass} 
                                    className="py-3 rounded-lg font-bold text-red-500 hover:bg-red-50 transition-colors border border-red-100 flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" /> Remove
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-50 transition-colors border border-gray-200"
                                >
                                    Cancel
                                </button>
                            )}
                            
                            <button 
                                onClick={saveSlot} 
                                className="py-3 bg-[#37368b] hover:bg-[#2a2970] text-white rounded-lg font-bold shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                {subjectInput ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}