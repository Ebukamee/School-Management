import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Calendar, 
    CreditCard, 
    GraduationCap, 
    AlertCircle, 
    User, 
    MapPin,
    Clock
} from 'lucide-react';

// --- Interface for the data coming from DB ---
interface SchoolClass {
    id: number;
    subject: string;
    start_time: string;
    end_time: string;
    room: string | null;
}

// --- Extended Props to include todaysClasses ---
interface DashboardProps extends SharedData {
    todaysClasses: SchoolClass[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // 1. Get Props
    const { auth, todaysClasses } = usePage<DashboardProps>().props;
    const user = auth.user;

    const studentData = {
        name: user.name.toUpperCase(),
        mobile: user.phone || 'Not Set',
        email: user.email,
        address: user.address ? user.address.toUpperCase() : 'Not Set',
        RegNo: user.reg_number || 'PENDING',
        feePaid: '411,300 NGN', 
    };

    const importantInfo = [
        {
            title: 'IMPORTANT DISCLAIMER',
            date: 'Aug 6, 2025',
            type: 'urgent',
            content: 'All fees payments must be completed before the examination period. Late payments will attract penalties.'
        },
        {
            title: 'Examination Schedule',
            date: 'Aug 4, 2025',
            type: 'info',
            content: 'The examination timetable for the current semester has been published. Check your portal for details.'
        },
        {
            title: 'Course Registration',
            date: 'Aug 1, 2025',
            type: 'warning',
            content: 'Final year students should complete their project registration by the end of this week.'
        }
    ];

    const quickActions = [
        { title: 'Course Materials', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', href: '/classes' },
        { title: 'Check Results', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/results' },
        { title: 'Fee Payment', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50', href: '#' },
        { title: 'Update Profile', icon: User, color: 'text-purple-600', bg: 'bg-purple-50', href: '/settings/profile' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex flex-col gap-8 p-6 lg:p-8 bg-gray-50/50 min-h-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Welcome back, {studentData.name}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Content) */}
                    <div className="xl:col-span-2 space-y-8">
                        
                        {/* Personal Details Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#37368b]" />
                                    Student Profile
                                </h2>
                                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">Active</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Reg Number</label>
                                    <p className="mt-1 text-sm font-medium text-gray-900 font-mono">{studentData.RegNo}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{studentData.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mobile Phone</label>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{studentData.mobile}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Address</label>
                                    <p className="mt-1 text-sm font-medium text-gray-900 truncate" title={studentData.address}>{studentData.address}</p>
                                </div>
                            </div>
                        </div>

                         {/* Quick Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {quickActions.map((action, idx) => (
                                <Link 
                                    key={idx} 
                                    href={action.href}
                                    className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left flex flex-col gap-3"
                                >
                                    <div className={`w-10 h-10 ${action.bg} ${action.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{action.title}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#37368b]" />
                                    Notice Board
                                </h2>
                                <button className="text-xs font-medium text-[#37368b] hover:underline">View Archive</button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {importantInfo.map((info, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${info.type === 'urgent' ? 'bg-red-500' : 'bg-[#37368b]'}`}></span>
                                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#37368b] transition-colors">{info.title}</h3>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">{info.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100 ml-1">{info.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-8">
                        
                        {/* Financial Status Card */}
                        {/* <div className="relative overflow-hidden rounded-xl bg-[#37368b] text-white shadow-lg">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
                            
                            <div className="relative p-6">
                                <h3 className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Tuition Status</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-bold tracking-tight">{studentData.feePaid}</span>
                                </div>
                                
                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-blue-100">Tuition</span>
                                        <span className="font-medium">350,000 NGN</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-blue-100">Ancillary</span>
                                        <span className="font-medium">61,300 NGN</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="w-full bg-blue-900/50 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-yellow-400 h-full w-full rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-blue-200 mt-2 text-right">100% Paid</p>
                                </div>
                            </div>
                        </div> */}

                        {/* Timetable Widget - NOW DYNAMIC */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#37368b]" />
                                    Today's Classes
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {todaysClasses && todaysClasses.length > 0 ? (
                                    todaysClasses.map((item) => (
                                        <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col items-center min-w-[3rem]">
                                                <span className="text-xs font-bold text-gray-900">{item.start_time}</span>
                                                <div className="h-full w-px bg-gray-200 my-1 dashed"></div>
                                            </div>
                                            <div className="flex-1 pb-2">
                                                <h4 className="text-sm font-semibold text-[#37368b]">{item.subject}</h4>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {item.room || 'N/A'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        Instructor {/* Placeholder until DB has lecturer */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-400 text-sm">
                                        <p>No classes scheduled for today.</p>
                                    </div>
                                )}
                            </div>
                            <Link href="/classes" className="block w-full text-center py-3 text-xs font-medium text-gray-500 hover:text-[#37368b] hover:bg-gray-50 border-t border-gray-100 transition-colors">
                                View Complete Timetable
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}