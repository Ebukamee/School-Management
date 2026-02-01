import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    Layers,
    MapPin,
    Megaphone,
    ShieldCheck,
    User,
} from 'lucide-react';

// --- INTERFACES ---

interface SchoolClass {
    id: number;
    subject: string;
    start_time: string;
    end_time: string;
    room: string | null;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
}

interface DashboardProps extends SharedData {
    todaysClasses: SchoolClass[];
    blogs: BlogPost[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    const { auth, todaysClasses, blogs } = usePage<DashboardProps>().props;
    const user = auth.user;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const quickActions = [
        {
            title: 'Weekly Classes',
            icon: BookOpen,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            href: '/classes',
        },
        {
            title: 'Check Results',
            icon: GraduationCap,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            href: '/results',
        },
        {
            title: 'Daily Schedule',
            icon: Calendar,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            href: '/schedule',
        },
        {
            title: 'Update Profile',
            icon: User,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            href: '/settings/profile',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto w-[90%] p-4 md:p-6 lg:p-8">
                {/* --- HEADER --- */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Welcome back,{' '}
                            <span className="text-[#37368b]">
                                {user.name.split(' ')[0]}!
                            </span>
                        </h1>
                        <p className="mt-2 font-medium text-gray-500">
                            Here's what's happening in your academic life today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-2.5 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-2 text-[#37368b]">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* === LEFT COLUMN (Main Content) === */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* 1. Quick Actions Grid */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {quickActions.map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.href}
                                    className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div
                                        className={`h-12 w-12 ${action.bg} ${action.color} mb-3 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110`}
                                    >
                                        <action.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-center text-sm font-bold text-gray-700">
                                        {action.title}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* 2. School News / Blog */}
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-50 px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-[#ffc53a]/20 p-2 text-[#d9a52e]">
                                        <Megaphone className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        School News & Updates
                                    </h2>
                                </div>
                                <Link
                                    href="/blog"
                                    className="text-xs font-bold text-[#37368b] hover:underline"
                                >
                                    View All
                                </Link>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {blogs && blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="group p-6 transition-colors hover:bg-gray-50/50"
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                <h3 className="line-clamp-1 pr-4 font-bold text-gray-800 transition-colors group-hover:text-[#37368b]">
                                                    {blog.title}
                                                </h3>
                                                <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                                                    {formatDate(
                                                        blog.created_at,
                                                    )}
                                                </span>
                                            </div>
                                            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
                                                {blog.excerpt}
                                            </p>
                                            <Link
                                                href={`/blog/${blog.slug}`}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-[#37368b] transition-all group-hover:gap-2"
                                            >
                                                Read full story{' '}
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <Bell className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                        <p className="text-sm text-gray-500">
                                            No new announcements today.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* === RIGHT COLUMN (Sidebar) === */}
                    <div className="space-y-8">
                        {/* 1. Student Profile Card (Redesigned Grid) */}
                        <div className="relative overflow-hidden rounded-xl bg-[#37368b] p-8 text-white shadow-xl shadow-indigo-900/20">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-[#ffc53a]/20 blur-2xl"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="mb-5 h-24 w-24 rounded-full border border-white/20 bg-white/20 p-1.5 backdrop-blur-sm">
                                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-black text-[#37368b]">
                                                {user.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h2 className="mb-1 text-xl font-bold tracking-tight">
                                    {user.name}
                                </h2>

                                {/* Role & Reg Number (Grouped) */}
                                <div className="mb-8 flex items-center gap-3 rounded-full border border-white/5 bg-[#2a2970]/50 px-4 py-1.5">
                                    <p className="font-mono text-xs tracking-widest text-indigo-200">
                                        {(user.reg_number as string) ||
                                            'PENDING'}
                                    </p>
                                    <div className="h-3 w-px bg-white/20"></div>
                                    <span className="text-[10px] font-extrabold tracking-wider text-[#ffc53a] uppercase">
                                        {(user.role as string) || 'STUDENT'}
                                    </span>
                                </div>

                                {/* New Sharper Info Grid */}
                                <div className="grid w-full grid-cols-2 gap-3">
                                    <div className="group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10">
                                        <div className="absolute top-0 right-0 p-2 opacity-50 transition-opacity group-hover:opacity-100">
                                            <ShieldCheck className="h-8 w-8 text-[#ffc53a]/10" />
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffc53a] text-[#37368b]">
                                            <ShieldCheck className="h-4 w-4" />
                                        </div>
                                        <div className="z-10 text-left">
                                            <p className="mb-0.5 text-[10px] font-bold tracking-wider text-indigo-200 uppercase">
                                                Status
                                            </p>
                                            <p className="text-sm font-bold text-white">
                                                Active
                                            </p>
                                        </div>
                                    </div>

                                            
                                    <div className="group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10">
                                        <div className="absolute top-0 right-0 p-2 opacity-50 transition-opacity group-hover:opacity-100">
                                            <Layers className="h-8 w-8 text-[#ffc53a]/10" />
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ffc53a]/30 bg-white/20 text-[#ffc53a]">
                                            <Layers className="h-4 w-4" />
                                        </div>
                                       
                                            <div className="z-10 text-left">
                                                <p className="mb-0.5 text-[10px] font-bold tracking-wider text-indigo-200 uppercase">
                                                    Class
                                                </p>
                                                <p className="text-sm font-bold text-white">
                                                    {user?.form as string || 'Not Applicable'}{user?.class as string || ''}
                                                </p>
                                            </div>
                                       
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* 2. Today's Classes (Timeline) */}
                        <div className="h-fit overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-50 px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-lg bg-indigo-50 p-1.5 text-[#37368b]">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Today's Schedule
                                    </h2>
                                </div>
                            </div>

                            <div className="p-4">
                                {todaysClasses && todaysClasses.length > 0 ? (
                                    <div className="relative space-y-6 pl-2">
                                        {/* Vertical Line */}
                                        <div className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-gray-100"></div>

                                        {todaysClasses.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className="relative flex gap-4"
                                            >
                                                {/* Timeline Dot */}
                                                <div className="z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#ffc53a] shadow-sm"></div>

                                                <div className="flex-1 rounded-2xl border border-transparent bg-gray-50 p-4 transition-colors hover:border-blue-100 hover:bg-blue-50/50">
                                                    <div className="mb-1 flex items-start justify-between">
                                                        <h4 className="text-sm font-bold text-gray-800">
                                                            {item.subject}
                                                        </h4>
                                                        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#37368b] shadow-sm">
                                                            {item.start_time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <MapPin className="h-3 w-3" />
                                                        {item.room ||
                                                            'Room TBA'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center text-gray-400">
                                        <p className="text-sm">
                                            No classes scheduled.
                                        </p>
                                        <p className="text-xs">
                                            Enjoy your free time!
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-50 bg-gray-50/30 px-6 py-4">
                                <Link
                                    href="/schedule"
                                    className="block w-full text-center text-xs font-bold text-[#37368b] hover:underline"
                                >
                                    View Full Timetable
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
