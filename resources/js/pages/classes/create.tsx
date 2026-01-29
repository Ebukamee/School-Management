import React, { useState, useMemo } from 'react';
import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';

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
    return date.toTimeString().slice(0, 5); // Returns "08:40"
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
    classes: any[]; // It is safer to define this here than casting inline
}

export default function CreateClass() {
    const timeSlots = useMemo(() => generateTimeSlots(), []);
    const { auth } = usePage<SharedData>().props
    // --- FORM STATE ---
    const { data, setData, post, processing, errors } = useForm<FormData>({
        grade_level: `${auth.user.form}${auth.user.class}`|| "",
        classes: [] as any[] 
    });
    

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlot, setActiveSlot] = useState<{day: string, start: string, end: string} | null>(null);
    const [subjectInput, setSubjectInput] = useState('');
    const [roomInput, setRoomInput] = useState('');

    // --- ACTIONS ---

    const handleSlotClick = (day: string, start: string, end: string) => {
        const existing = data.classes.find(c => c.day === day && c.start_time === start);
        
        if (existing) {
            if(confirm(`Remove ${existing.subject} from ${day} ${start}?`)) {
                setData('classes', data.classes.filter(c => c !== existing));
            }
        } else {
            setActiveSlot({ day, start, end });
            setSubjectInput('');
            setRoomInput('');
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
            room: roomInput || null // Send null if empty string
        };

        setData('classes', [...data.classes, newClass]);
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Basic Checks
        if(!data.grade_level) {
            alert("Please enter a Class / Grade Level.");
            return;
        }
        if(data.classes.length === 0) {
            alert("Please add at least one subject to the timetable.");
            return;
        }

        // 2. DEBUG: Log data to console so you can check it
        console.log("Submitting Data:", data);

        // 3. Send to Backend
        post('/classes', {
            onError: (err) => {
                console.error("Validation Errors:", err);
                // The Error Alert Box below will show these automatically
            }
        });
    };

    const getSlotData = (day: string, start: string) => {
        return data.classes.find(c => c.day === day && c.start_time === start);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Timetable Builder" />
            
            <div className="container mx-auto px-4 py-6">
                
                {/* --- ERROR ALERT BOX --- */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                        <h3 className="font-bold mb-2">Please fix the following errors:</h3>
                        <ul className="list-disc list-inside text-sm">
                            {Object.entries(errors).map(([key, value]) => (
                                <li key={key}>
                                    {/* Clean up error messages like "classes.0.subject" */}
                                    {value.includes('classes.') 
                                        ? `Error in one of the subjects: ${value}` 
                                        : value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Header & Grade Input */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#37368b]">Timetable Builder</h1>
                        <p className="text-gray-500 text-sm">Click grid cells to assign 40-minute periods.</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Target Class / Grade <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            disabled
                            value={data.grade_level}
                            onChange={e => setData('grade_level', e.target.value)}
                            className={`w-full border-gray-300 rounded-lg focus:border-[#37368b] focus:ring-[#37368b] ${errors.grade_level ? 'border-red-500' : ''}`}
                        />
                    </div>
                </div>

                {/* THE GRID */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50">
                            <div className="p-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Time</div>
                            {DAYS.map(day => (
                                <div key={day} className="p-4 font-bold text-[#37368b] text-center">{day}</div>
                            ))}
                        </div>

                        <div className="divide-y divide-gray-100">
                            {timeSlots.map((slot, index) => (
                                <div key={index} className="grid grid-cols-6 group hover:bg-gray-50/50 transition-colors">
                                    <div className="p-3 border-r border-gray-100 flex flex-col items-center justify-center text-xs text-gray-500 font-mono bg-gray-50/30">
                                        <span>{slot.start}</span>
                                        <span className="h-4 w-px bg-gray-300 my-1"></span>
                                        <span>{slot.end}</span>
                                    </div>

                                    {DAYS.map(day => {
                                        const filled = getSlotData(day, slot.start);
                                        return (
                                            <div 
                                                key={`${day}-${slot.start}`}
                                                onClick={() => handleSlotClick(day, slot.start, slot.end)}
                                                className={`
                                                    p-2 border-r border-gray-100 last:border-r-0 cursor-pointer transition-all relative
                                                    ${filled ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-100'}
                                                `}
                                            >
                                                {filled ? (
                                                    <div className="h-full flex flex-col justify-center items-center text-center animate-in zoom-in duration-200">
                                                        <span className="font-bold text-[#37368b] text-sm">{filled.subject}</span>
                                                        {filled.room && <span className="text-[10px] text-gray-500">{filled.room}</span>}
                                                        <button className="hidden group-hover:block absolute top-1 right-1 text-red-400 hover:text-red-600">×</button>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <span className="text-gray-300 text-xl font-light">+</span>
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

                {/* Footer Actions */}
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleSubmit}
                        disabled={processing}
                        className="bg-[#37368b] hover:bg-[#2a2970] text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Saving Timetable...' : `Save ${data.classes.length} Classes`}
                    </button>
                </div>
            </div>

            {/* ADD SUBJECT MODAL */}
            {isModalOpen && activeSlot && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Add Class</h3>
                        <p className="text-sm text-gray-500 mb-4">{activeSlot.day} • {activeSlot.start} - {activeSlot.end}</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Subject</label>
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]"
                                    placeholder="e.g. Mathematics"
                                    value={subjectInput}
                                    onChange={e => setSubjectInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && saveSlot()}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Room (Optional)</label>
                                <input 
                                    type="text" 
                                    className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]"
                                    placeholder="e.g. Lab 1"
                                    value={roomInput}
                                    onChange={e => setRoomInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && saveSlot()}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
                            <button onClick={saveSlot} className="flex-1 py-2 bg-[#37368b] rounded-lg text-white font-semibold hover:bg-[#2a2970]">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}