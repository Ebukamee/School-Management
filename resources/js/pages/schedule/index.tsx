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
    User,
    MoreHorizontal
} from 'lucide-react';

// Interfaces
interface ClassSession {
    id: number;
    subject: string;
    start_time: string;
    end_time: string;
    venue: string;
    teacher: string;
    type?: 'Lecture' | 'Lab' | 'Tutorial';
}

interface HomeworkTask {
    id: number;
    title: string;
    subject: string;
    description: string;
}

interface Props {
    classes: ClassSession[];
    homework: HomeworkTask[];
}

export default function Schedule({ classes, homework }: Props) {
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
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Today's Overview</h1>
                        <div className="mt-1 flex items-center gap-2 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">{today}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    
                    {/* LEFT COLUMN: Sleek Class Timeline */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                    <Clock className="h-4 w-4 text-[#37368b]" />
                                    Class Timeline
                                </h2>
                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                                    {classes.length} Sessions
                                </span>
                            </div>

                            <div className="p-6">
                                {classes.length > 0 ? (
                                    <div className="relative space-y-0">
                                        {/* Continuous Vertical Line */}
                                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100" />

                                        {classes.map((session) => (
                                            <div key={session.id} className="relative pb-6 last:pb-0">
                                                <div className="flex items-start gap-4">
                                                    
                                                    {/* Timeline Dot */}
                                                    <div className="relative z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full border-2 border-white bg-[#37368b] shadow-sm ring-1 ring-gray-100" />

                                                    {/* Sleek Card */}
                                                    <div className="group flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-3 hover:border-[#37368b]/30 hover:shadow-sm transition-all">
                                                        
                                                        <div className="flex flex-col gap-1">
                                                            {/* Time & Subject Row */}
                                                            <div className="flex items-center gap-3">
                                                                <span className="rounded bg-gray-50 px-1.5 py-0.5 font-mono text-xs font-medium text-gray-500">
                                                                    {session.start_time}
                                                                </span>
                                                                <h3 className="text-sm font-bold text-gray-900">
                                                                    {session.subject}
                                                                </h3>
                                                            </div>

                                                            {/* Metadata Row */}
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                <div className="flex items-center gap-1">
                                                                    <User className="h-3 w-3 text-gray-400" />
                                                                    <span>{session.teacher}</span>
                                                                </div>
                                                                <span className="text-gray-300">•</span>
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="h-3 w-3 text-gray-400" />
                                                                    <span>{session.venue}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right Side Tag */}
                                                        <div className="flex items-center gap-3 sm:border-l sm:border-gray-100 sm:pl-3">
                                                            <span className="hidden sm:block text-xs text-gray-400 font-mono">
                                                                {session.end_time}
                                                            </span>
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                                session.type === 'Lab' ? 'bg-purple-50 text-purple-700' :
                                                                session.type === 'Tutorial' ? 'bg-orange-50 text-orange-700' :
                                                                'bg-blue-50 text-[#37368b]'
                                                            }`}>
                                                                {session.type || 'Lecture'}
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                            <Coffee className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">No classes today</p>
                                        <p className="text-xs text-gray-500">Enjoy your free time!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Homework (Unchanged logic, slightly cleaner look) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    Due Today
                                </h2>
                                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700">
                                    {homework.length}
                                </span>
                            </div>

                            <div className="p-4 space-y-3">
                                {homework.length > 0 ? (
                                    homework.map((task) => (
                                        <div key={task.id} className="group rounded-lg border border-red-100 bg-red-50/20 p-3 transition-all hover:bg-white hover:shadow-sm">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#37368b]">
                                                    {task.subject}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{task.title}</h4>
                                            <p className="mt-1 text-xs text-gray-500 line-clamp-1">{task.description}</p>
                                            
                                            <div className="mt-2 flex justify-end">
                                                <Link href={`/homework/${task.id}`} className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-[#37368b]">
                                                    View <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg border-2 border-dashed border-gray-100 py-8 text-center">
                                        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-400" />
                                        <p className="text-xs text-gray-500">No assignments due.</p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 p-4">
                                <Link
                                    href="/homework"
                                    className="block w-full rounded-lg bg-[#37368b] py-2.5 text-center text-xs font-bold text-white shadow-sm transition-all hover:bg-[#2a2970] hover:shadow"
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