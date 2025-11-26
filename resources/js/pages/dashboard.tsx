import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    // Student data from the screenshot
    const studentData = {
        name: 'ELUWA MICHAEL KELECHUKWU',
        mobile: '07058586902',
        email: 'fittekingsluwa@gmail.com',
        address: 'OKPUALA-UMUEKWULE, AFUGIRI, UMUAHIA.',
        RegNo: '2010202003',
        feePaid: '411,300 NGN',
    }

    // Mock timetable data
    const dailyTimetable = [
        { time: '8:00 - 9:00 AM', subject: 'Mathematics', venue: 'LT 201', lecturer: 'Dr. Johnson' },
        { time: '9:00 - 10:00 AM', subject: 'Physics', venue: 'Science Block', lecturer: 'Prof. Adams' },
        { time: '10:30 - 11:30 AM', subject: 'Computer Science', venue: 'Lab 3', lecturer: 'Dr. Smith' },
        { time: '11:30 - 12:30 PM', subject: 'Engineering', venue: 'LT 105', lecturer: 'Prof. Williams' },
        { time: '1:30 - 2:30 PM', subject: 'Calculus', venue: 'LT 301', lecturer: 'Dr. Brown' },
    ];

    const importantInfo = [
        {
            title: 'IMPORTANT DISCLAIMER !!!',
            date: 'Wed, 6th Aug 2025',
            content: 'Dear All, Please note that all fees payments must be completed before the examination period. Late payments will attract penalties.'
        },
        {
            title: 'Examination Schedule',
            date: 'Mon, 4th Aug 2025', 
            content: 'The examination timetable for the current semester has been published. Check your portal for details.'
        },
        {
            title: 'Course Registration',
            date: 'Fri, 1st Aug 2025',
            content: 'Final year students should complete their project registration by the end of this week.'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header Section */}
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-[#37368b]">Student Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back, {studentData.name}</p>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Personal Details & Important Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Details Card */}
                        <div className="bg-white rounded-2xl border-2 border-[#37368b]/20 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#37368b]">Personal Details</h2>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700">MATRIC NUMBER</label>
                                        <p className="text-lg font-semibold text-gray-900">{studentData.RegNo}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700">EMAIL ADDRESS</label>
                                        <p className="text-lg text-gray-900">{studentData.email}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700">MOBILE PHONE</label>
                                        <p className="text-lg text-gray-900">{studentData.mobile}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700">PERMANENT ADDRESS</label>
                                        <p className="text-lg text-gray-900">{studentData.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Information Card */}
                        <div className="bg-white rounded-2xl border-2 border-[#37368b]/20 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[#37368b]">Important Information</h2>
                                <button className="text-sm text-[#37368b] hover:text-yellow-600 font-medium transition-colors">
                                    View All
                                </button>
                            </div>
                            <div className="space-y-4">
                                {importantInfo.map((info, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-[#37368b]/30 transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-bold text-[#37368b] text-lg">{info.title}</h3>
                                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                                {info.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{info.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Fee Paid & Timetable */}
                    <div className="space-y-6">
                        {/* Total Fee Paid Card */}
                        <div className="bg-gradient-to-br from-[#37368b] to-[#2a2970] rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-4">Total Fee Paid</h3>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">
                                    {studentData.feePaid}
                                </div>
                                <p className="text-sm text-blue-200">All fees cleared for current semester</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-blue-300/30">
                                <div className="flex justify-between items-center text-sm">
                                    <span>Tuition Fee</span>
                                    <span className="font-semibold">350,000 NGN</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-2">
                                    <span>Other Charges</span>
                                    <span className="font-semibold">61,300 NGN</span>
                                </div>
                            </div>
                        </div>

                        {/* Daily Timetable Card */}
                        <div className="bg-white rounded-2xl border-2 border-[#37368b]/20 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[#37368b]">Today's Timetable</h2>
                                <span className="text-sm text-gray-600 bg-yellow-100 px-3 py-1 rounded-full font-medium">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {dailyTimetable.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors border border-gray-100">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-14 bg-[#37368b] text-white rounded-lg flex items-center justify-center font-semibold text-xs p-2 text-center">
                                                {item.time}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.subject}</p>
                                                <p className="text-sm text-gray-600">{item.venue}</p>
                                                <p className="text-xs text-gray-500">{item.lecturer}</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-center text-sm text-[#37368b] hover:text-yellow-600 font-medium transition-colors py-2">
                                View Full Timetable →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="bg-white rounded-2xl border-2 border-[#37368b]/20 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#37368b] mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-[#37368b]/30 transition-colors text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <span className="text-[#37368b] font-bold">📚</span>
                            </div>
                            <p className="font-semibold text-gray-800">Course Materials</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-[#37368b]/30 transition-colors text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <span className="text-[#37368b] font-bold">📊</span>
                            </div>
                            <p className="font-semibold text-gray-800">Check Results</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-[#37368b]/30 transition-colors text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <span className="text-[#37368b] font-bold">💰</span>
                            </div>
                            <p className="font-semibold text-gray-800">Fee Payment</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-[#37368b]/30 transition-colors text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <span className="text-[#37368b] font-bold">👤</span>
                            </div>
                            <p className="font-semibold text-gray-800">Update Profile</p>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}