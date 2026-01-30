import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import {
    Activity,
    Calendar,
    CalendarDays,
    CheckCircle2,
    Clock,
    Filter,
    HelpCircle,
    PieChart,
    XCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

// Brand Colors
const COLORS = {
    present: '#22c55e', // Green
    absent: '#ef4444', // Red
    late: '#eab308', // Yellow
    excused: '#3b82f6', // Blue
    brand: '#37368b', // Brand
};

// Default subjects fallback
const DEFAULT_SUBJECTS = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Civic Education',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Government',
    'Literature',
];

interface Props {
    summary: any;
    dailyTrends: any[];
    subjects?: string[];
    filters?: {
        subject?: string;
        start_date?: string;
        end_date?: string;
    };
}

export default function Stats({
    summary,
    dailyTrends,
    subjects = DEFAULT_SUBJECTS,
    filters = {},
}: Props) {
    // --- 1. STATE & FILTER LOGIC ---
    const [selectedSubject, setSelectedSubject] = useState(
        filters.subject || '',
    );
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    // Unified Filter Function
    const applyFilters = (
        newSubject: string,
        newStart: string,
        newEnd: string,
    ) => {
        router.get(
            window.location.pathname,
            {
                subject: newSubject,
                start_date: newStart,
                end_date: newEnd,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedSubject(val);
        applyFilters(val, startDate, endDate);
    };

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        if (type === 'start') setStartDate(value);
        else setEndDate(value);

        const s = type === 'start' ? value : startDate;
        const e = type === 'end' ? value : endDate;
        applyFilters(selectedSubject, s, e);
    };

    // Quick Action Helpers
    const setQuickFilter = (days: number) => {
        const end = new Date().toISOString().split('T')[0];
        const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];

        setStartDate(start);
        setEndDate(end);
        applyFilters(selectedSubject, start, end);
    };

    // --- 2. DATA PROCESSING ---

    // KPI Total
    const totalStudents =
        (summary.present || 0) +
        (summary.absent || 0) +
        (summary.late || 0) +
        (summary.excused || 0);

    // Doughnut Data (Summary)
    const doughnutData = {
        labels: ['Present', 'Absent', 'Late', 'Excused'],
        datasets: [
            {
                data: [
                    summary.present || 0,
                    summary.absent || 0,
                    summary.late || 0,
                    summary.excused || 0,
                ],
                backgroundColor: [
                    COLORS.present,
                    COLORS.absent,
                    COLORS.late,
                    COLORS.excused,
                ],
                borderColor: '#ffffff',
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: 'ui-sans-serif, system-ui', size: 12 },
                },
            },
        },
    };

    // Bar Data (Trends)
    // 1. Update unique dates to look for 'date_only'
    const uniqueDates = [...new Set(dailyTrends.map((item: any) => item.date_only))].sort();

    const getCount = (date: any, status: string) => {
        const found = dailyTrends.find((d: any) => d.date_only === date && d.status === status);
        return found ? found.total : 0;
    };

    const barData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Present',
                data: uniqueDates.map((d) => getCount(d, 'present')),
                backgroundColor: COLORS.present,
                borderRadius: 4,
            },
            {
                label: 'Absent',
                data: uniqueDates.map((d) => getCount(d, 'absent')),
                backgroundColor: COLORS.absent,
                borderRadius: 4,
            },
            {
                label: 'Late',
                data: uniqueDates.map((d) => getCount(d, 'late')),
                backgroundColor: COLORS.late,
                borderRadius: 4,
            },
        ],
    };

    const barOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { font: { size: 10 } },
            },
            y: {
                stacked: true,
                grid: { color: '#f3f4f6' },
                border: { display: false },
            },
        },
    };

    // Styles
    const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-sm transition-all focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] outline-none hover:border-gray-300";
    const labelClass = "mb-1.5 block flex items-center gap-1 text-xs font-extrabold tracking-widest text-gray-400 uppercase";

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Attendance', href: '#' },
                { title: 'Statistics', href: '#' },
            ]}
        >
            <Head title="Attendance Stats" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
                           
                            Attendance Insights
                        </h1>

                        <p className="mt-2 ml-1 text-sm font-medium text-gray-500">
                            {selectedSubject
                                ? `Showing data for ${selectedSubject}`
                                : 'Overview of all subjects'}
                        </p>
                    </div>

                    {/* Quick Subject Filter (Visible in Header) */}
                    <div className="w-full md:w-72">
                        <label className={labelClass}>
                            <Filter className="h-3 w-3" /> Filter by Subject
                        </label>
                        <div className="relative group">
                            <select
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="">Overview (All Subjects)</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ADVANCED FILTER BAR --- */}
                <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-end gap-6">
                        {/* Start Date */}
                        <div className="min-w-[150px] flex-1">
                            <label className={labelClass}>
                                <Calendar className="h-3 w-3" /> From
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    handleDateChange('start', e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        {/* End Date */}
                        <div className="min-w-[150px] flex-1">
                            <label className={labelClass}>
                                <Calendar className="h-3 w-3" /> To
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    handleDateChange('end', e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-3 pb-0.5">
                            <button
                                onClick={() => setQuickFilter(7)}
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-4 py-2.5 text-xs font-bold text-[#37368b] transition-all hover:bg-[#37368b] hover:text-white shadow-sm hover:shadow-md"
                            >
                                <CalendarDays className="h-3.5 w-3.5" /> 7 Days
                            </button>
                            <button
                                onClick={() => setQuickFilter(30)}
                                className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-4 py-2.5 text-xs font-bold text-amber-700 transition-all hover:bg-[#ffc53a] hover:text-[#37368b] shadow-sm hover:shadow-md"
                            >
                                <CalendarDays className="h-3.5 w-3.5" /> 30 Days
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- KPI CARDS ROW --- */}
                <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                    <StatCard
                        label="Present"
                        value={summary.present || 0}
                        total={totalStudents}
                        icon={CheckCircle2}
                        color="text-green-600"
                        bg="bg-green-50"
                        border="border-green-100"
                    />
                    <StatCard
                        label="Absent"
                        value={summary.absent || 0}
                        total={totalStudents}
                        icon={XCircle}
                        color="text-red-600"
                        bg="bg-red-50"
                        border="border-red-100"
                    />
                    <StatCard
                        label="Late"
                        value={summary.late || 0}
                        total={totalStudents}
                        icon={Clock}
                        color="text-yellow-600"
                        bg="bg-yellow-50"
                        border="border-yellow-100"
                    />
                    <StatCard
                        label="Excused"
                        value={summary.excused || 0}
                        total={totalStudents}
                        icon={HelpCircle}
                        color="text-blue-600"
                        bg="bg-blue-50"
                        border="border-blue-100"
                    />
                </div>

                {/* --- CHARTS GRID --- */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* LEFT: Monthly Summary (Doughnut) */}
                    <div className="flex h-[420px] flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 font-bold text-gray-800 text-sm uppercase tracking-wider">
                                <PieChart className="h-4 w-4 text-[#37368b]" />
                                Summary Distribution
                            </h2>
                        </div>

                        <div className="relative flex flex-1 items-center justify-center">
                            <Doughnut
                                data={doughnutData}
                                options={doughnutOptions}
                            />
                            {/* Center Text Overlay */}
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-extrabold text-[#37368b]">
                                    {totalStudents}
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
                                    Total Records
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Weekly Trends (Bar) */}
                    <div className="flex h-[420px] flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 font-bold text-gray-800 text-sm uppercase tracking-wider">
                                <Activity className="h-4 w-4 text-[#37368b]" />
                                Daily Activity Trends
                            </h2>
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    Present
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    Absent
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                    Late
                                </span>
                            </div>
                        </div>

                        <div className="w-full flex-1">
                            <Bar options={barOptions} data={barData} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// --- SUB-COMPONENT: KPI STAT CARD ---
const StatCard = ({ label, value, total, icon: Icon, color, bg, border }: any) => {
    // Calculate percentage
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-200 group">
            <div className="mb-3 flex items-start justify-between">
                <div className={`rounded-xl p-2.5 ${bg} ${border} border transition-transform group-hover:scale-110`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <span
                    className={`text-[10px] font-extrabold ${color} rounded-lg border border-gray-100 bg-gray-50/50 px-2.5 py-1`}
                >
                    {percentage}%
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
                    {label}
                </p>
            </div>
        </div>
    );
};