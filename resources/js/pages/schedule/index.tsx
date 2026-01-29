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
    BookOpen,
    ListTodo
} from 'lucide-react';

// --- Interfaces ---
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

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#37368b] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <Calendar className="w-6 h-6" />
                            </span>
                            Today's <span className="text-[#37368b]">Overview</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            {today}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-blue-50 text-[#37368b] px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
                        <Clock className="w-4 h-4" />
                        <span>{classes.length} Classes Today</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    
                    {/* --- LEFT COLUMN: Class Timeline --- */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-50 px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 text-[#37368b] rounded-lg">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Class Timeline</h2>
                                </div>
                            </div>

                            <div className="p-6">
                                {classes.length > 0 ? (
                                    <div className="relative pl-4 space-y-8">
                                        {/* Continuous Vertical Line */}
                                        <div className="absolute left-[23px] top-2 bottom-4 w-0.5 bg-gray-100" />

                                        {classes.map((session, index) => (
                                            <div key={session.id} className="relative flex gap-6 group">
                                                {/* Timeline Dot */}
                                                <div className="mt-1.5 relative z-10 h-5 w-5 shrink-0 rounded-full border-4 border-white bg-[#37368b] shadow-sm ring-1 ring-gray-100" />

                                                {/* Card Content */}
                                                <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#37368b] hover:shadow-md group-hover:-translate-y-0.5">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                                    session.type === 'Lab' ? 'bg-purple-50 text-purple-700' :
                                                                    session.type === 'Tutorial' ? 'bg-orange-50 text-orange-700' :
                                                                    'bg-blue-50 text-[#37368b]'
                                                                }`}>
                                                                    {session.type || 'Lecture'}
                                                                </span>
                                                                <span className="text-xs font-mono font-bold text-gray-400">
                                                                    {session.start_time} - {session.end_time}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#37368b] transition-colors">
                                                                {session.subject}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-3 border-t border-gray-50">
                                                        <div className="flex items-center gap-1.5">
                                                            <User className="h-3.5 w-3.5 text-gray-400" />
                                                            {session.teacher}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                                            {session.venue}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Empty State */
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                                            <Coffee className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">No classes today</h3>
                                        <p className="text-sm text-gray-500 max-w-xs mt-1">
                                            You have a free day! Use this time to catch up on assignments or relax.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Homework --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between border-b border-gray-50 px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-50 text-[#d97706] rounded-lg">
                                        <ListTodo className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Due Today</h2>
                                </div>
                                {homework.length > 0 && (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                                        {homework.length}
                                    </span>
                                )}
                            </div>

                            <div className="p-6 space-y-4">
                                {homework.length > 0 ? (
                                    homework.map((task) => (
                                        <div key={task.id} className="group relative rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:bg-white hover:border-[#ffc53a] hover:shadow-md">
                                            <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#ffc53a] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            
                                            <div className="mb-2 flex justify-between items-start">
                                                <span className="inline-block rounded-md bg-white border border-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 shadow-sm">
                                                    {task.subject}
                                                </span>
                                            </div>
                                            
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#d97706] transition-colors">
                                                {task.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                                                {task.description}
                                            </p>
                                            
                                            <Link 
                                                href={`/homework/${task.id}`} 
                                                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#37368b] hover:underline"
                                            >
                                                View Assignment <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border-2 border-dashed border-gray-100 py-10 text-center bg-gray-50/30">
                                        <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-300" />
                                        <p className="text-sm font-bold text-gray-900">All caught up!</p>
                                        <p className="text-xs text-gray-500 mt-1">No assignments due today.</p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-50 p-4 bg-gray-50/30">
                                <Link
                                    href="/homework"
                                    className="flex w-full items-center justify-center rounded-xl bg-white border border-gray-200 py-3 text-xs font-bold text-gray-600 shadow-sm transition-all hover:border-[#37368b] hover:text-[#37368b] hover:shadow-md"
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