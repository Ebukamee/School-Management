import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Calendar,
    CheckCircle,
    Clock,
    Coffee,
    MapPin,
} from 'lucide-react';

// Interfaces for the data passed from your Backend
interface ClassSession {
    id: number;
    subject: string;
    start_time: string; // Format: "08:00"
    end_time: string; // Format: "09:30"
    venue: string; // e.g. "Room 302" or "Lab A"
    teacher: string;
    type?: 'Lecture' | 'Lab' | 'Tutorial'; // Optional type for styling
}

interface HomeworkTask {
    id: number;
    title: string;
    subject: string;
    description: string;
    is_completed?: boolean; // Optional if you track completion
}

interface Props {
    classes: ClassSession[];
    homework: HomeworkTask[];
}

export default function Schedule({ classes, homework }: Props) {
    // Get today's date for the header
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Schedule', href: '/schedule' }]}>
            <Head title="Today's Schedule" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Today's Overview
                    </h1>
                    <div className="mt-1 flex items-center gap-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{today}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* LEFT COLUMN: Class Timeline (Takes up 2 cols) */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <Clock className="h-5 w-5 text-[#37368b]" />
                                Class Timeline
                            </h2>

                            {classes.length > 0 ? (
                                <div className="relative ml-3 space-y-8 border-l-2 border-gray-100">
                                    {classes.map((session, index) => (
                                        <div
                                            key={session.id}
                                            className="relative pl-8"
                                        >
                                            {/* Timeline Dot */}
                                            <div className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-[#37368b] shadow-sm"></div>

                                            {/* Time Label */}
                                            <span className="mb-1 block font-mono text-xs font-bold text-gray-400">
                                                {session.start_time} -{' '}
                                                {session.end_time}
                                            </span>

                                            {/* Class Card */}
                                            <div className="group relative rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-[#37368b]/30 hover:bg-white hover:shadow-md">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {session.subject}
                                                        </h3>
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            {session.teacher}
                                                        </p>

                                                        <div className="flex w-fit items-center gap-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-500">
                                                            <MapPin className="h-3 w-3" />
                                                            {session.venue}
                                                        </div>
                                                    </div>

                                                    {/* Optional Tag based on logic you might add later */}
                                                    <span className="rounded bg-[#37368b]/10 px-2 py-1 text-xs font-bold text-[#37368b]">
                                                        {session.type ||
                                                            'Class'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                                        <Coffee className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-medium text-gray-900">
                                        No classes today
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Enjoy your free time!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Homework Due Today (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    Due Today
                                </h2>
                                <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-700">
                                    {homework.length}
                                </span>
                            </div>

                            {homework.length > 0 ? (
                                <div className="space-y-4">
                                    {homework.map((task) => (
                                        <div
                                            key={task.id}
                                            className="group rounded-lg border border-red-100 bg-red-50/30 p-4 transition-all duration-200 hover:bg-white hover:shadow-md"
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                <span className="rounded border border-gray-100 bg-white px-2 py-0.5 text-xs font-bold tracking-wider text-[#37368b] uppercase">
                                                    {task.subject}
                                                </span>
                                            </div>

                                            <h4 className="mb-1 font-bold text-gray-900">
                                                {task.title}
                                            </h4>
                                            <p className="mb-3 line-clamp-2 text-xs text-gray-500">
                                                {task.description}
                                            </p>

                                            <div className="flex justify-end">
                                                <Link
                                                    href={`/homework/${task.id}`}
                                                    className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#37368b]"
                                                >
                                                    View Details{' '}
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border-2 border-dashed border-gray-100 py-8 text-center">
                                    <CheckCircle className="mx-auto mb-2 h-10 w-10 text-green-400" />
                                    <p className="text-sm font-medium text-gray-900">
                                        All caught up!
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        No assignments due today.
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 border-t p-10 border-gray-100 pt-6">
                                <Link
                                    href="/homework"
                                    className="block w-full rounded-md p-5 bg-[#37368b] py-3 text-center text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#2a2970] hover:shadow-md"
                                >
                                    View All Assignments
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
