import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Calendar, 
    CreditCard, 
    GraduationCap, 
    User, 
    Clock,
    MapPin,
    ArrowRight,
    Megaphone,
    Bell,
    ShieldCheck,
    Layers
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
            day: 'numeric'
        });
    };

    const quickActions = [
        { title: 'Weekly Classes', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', href: '/classes' },
        { title: 'Check Results', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/results' },
        { title: 'Daily Schedule', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', href: '/schedule' },
        { title: 'Update Profile', icon: User, color: 'text-purple-600', bg: 'bg-purple-50', href: '/settings/profile' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Welcome back, <span className="text-[#37368b]">{user.name.split(' ')[0]}!</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Here's what's happening in your academic life today.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-2 bg-blue-50 text-[#37368b] rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* === LEFT COLUMN (Main Content) === */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Quick Actions Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {quickActions.map((action, idx) => (
                                <Link 
                                    key={idx} 
                                    href={action.href}
                                    className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <div className={`w-12 h-12 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 text-center">{action.title}</span>
                                </Link>
                            ))}
                        </div>

                        {/* 2. School News / Blog */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#ffc53a]/20 text-[#d9a52e] rounded-xl">
                                        <Megaphone className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">School News & Updates</h2>
                                </div>
                                <Link href="/blog" className="text-xs font-bold text-[#37368b] hover:underline">View All</Link>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {blogs && blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                        <div key={blog.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-800 group-hover:text-[#37368b] transition-colors line-clamp-1 pr-4">
                                                    {blog.title}
                                                </h3>
                                                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                                                    {formatDate(blog.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
                                                {blog.excerpt}
                                            </p>
                                            <Link 
                                                href={`/blog/${blog.slug}`} 
                                                className="inline-flex items-center gap-1 text-xs font-bold text-[#37368b] group-hover:gap-2 transition-all"
                                            >
                                                Read full story <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500 text-sm">No new announcements today.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* === RIGHT COLUMN (Sidebar) === */}
                    <div className="space-y-8">
                        
                        {/* 1. Student Profile Card (Redesigned Grid) */}
                        <div className="bg-[#37368b] rounded-xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-[#ffc53a]/20 rounded-full blur-2xl"></div>
                            
                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="w-24 h-24 bg-white/20 p-1.5 rounded-full mb-5 backdrop-blur-sm border border-white/20">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        {user.avatar ? (
                                            <img src={user.avatar} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-black text-[#37368b]">{user.name.charAt(0)}</span>
                                        )}
                                    </div>
                                </div>
                                
                                <h2 className="text-xl font-bold tracking-tight mb-1">{user.name}</h2>
                                
                                {/* Role & Reg Number (Grouped) */}
                                <div className="flex items-center gap-3 mb-8 bg-[#2a2970]/50 py-1.5 px-4 rounded-full border border-white/5">
                                    <p className="text-indigo-200 text-xs font-mono tracking-widest">
                                        {user.reg_number as string || 'PENDING'}
                                    </p>
                                    <div className="w-px h-3 bg-white/20"></div>
                                    <span className="text-[#ffc53a] text-[10px] font-extrabold uppercase tracking-wider">
                                        {user.role as string|| 'STUDENT'}
                                    </span>
                                </div>
                                
                                {/* New Sharper Info Grid */}
                                <div className="w-full grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-start gap-2 hover:bg-white/10 transition-colors group relative overflow-hidden">
                                        <div className="absolute right-0 top-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <ShieldCheck className="w-8 h-8 text-[#ffc53a]/10" />
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-[#ffc53a] flex items-center justify-center text-[#37368b]">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div className="text-left z-10">
                                            <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-0.5">Status</p>
                                            <p className="font-bold text-white text-sm">Active</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-start gap-2 hover:bg-white/10 transition-colors group relative overflow-hidden">
                                        <div className="absolute right-0 top-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Layers className="w-8 h-8 text-[#ffc53a]/10" />
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-[#ffc53a] border border-[#ffc53a]/30">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <div className="text-left z-10">
                                            <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-0.5">Level</p>
                                            <p className="font-bold text-white text-sm">JSS 1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Today's Classes (Timeline) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
                            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-indigo-50 text-[#37368b] rounded-lg">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-bold text-gray-900">Today's Schedule</h2>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                {todaysClasses && todaysClasses.length > 0 ? (
                                    <div className="relative pl-2 space-y-6">
                                        {/* Vertical Line */}
                                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                        {todaysClasses.map((item, idx) => (
                                            <div key={item.id} className="relative flex gap-4">
                                                {/* Timeline Dot */}
                                                <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-[#ffc53a] shadow-sm z-10 shrink-0"></div>
                                                
                                                <div className="flex-1 bg-gray-50 rounded-2xl p-4 hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="font-bold text-gray-800 text-sm">{item.subject}</h4>
                                                        <span className="text-[10px] font-bold text-[#37368b] bg-white px-2 py-0.5 rounded-md shadow-sm">
                                                            {item.start_time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <MapPin className="w-3 h-3" />
                                                        {item.room || 'Room TBA'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <p className="text-sm">No classes scheduled.</p>
                                        <p className="text-xs">Enjoy your free time!</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                                <Link href="/schedule" className="block w-full text-center text-xs font-bold text-[#37368b] hover:underline">
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