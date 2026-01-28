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
    const uniqueDates = [
        ...new Set(dailyTrends.map((item: any) => item.date)),
    ].sort();

    const getCount = (date: any, status: string) => {
        const found = dailyTrends.find(
            (d: any) => d.date === date && d.status === status,
        );
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

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Attendance', href: '#' },
                { title: 'Statistics', href: '#' },
            ]}
        >
            <Head title="Attendance Stats" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* --- HEADER --- */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Attendance Insights
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {selectedSubject
                                ? `Showing data for ${selectedSubject}`
                                : 'Overview of all subjects'}
                        </p>
                    </div>

                    {/* Quick Subject Filter (Visible in Header) */}
                    <div className="w-full md:w-64">
                        <label className="mb-1.5 block flex items-center gap-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                            <Filter className="h-3 w-3" /> Filter by Subject
                        </label>
                        <select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            className="w-full rounded-lg border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm transition-all focus:border-[#37368b] focus:ring-[#37368b]"
                        >
                            <option value="">Overview (All Subjects)</option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- ADVANCED FILTER BAR (Functionality Preserved, Style Matched) --- */}
                <div className="mb-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Start Date */}
                        <div className="min-w-[150px] flex-1">
                            <label className="mb-1.5 block flex items-center gap-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                <Calendar className="h-3 w-3" /> From
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    handleDateChange('start', e.target.value)
                                }
                                className="w-full rounded-lg border-gray-200 bg-gray-50 px-2 py-2 text-sm focus:border-[#37368b] focus:ring-[#37368b]"
                            />
                        </div>

                        {/* End Date */}
                        <div className="min-w-[150px] flex-1">
                            <label className="mb-1.5 block flex items-center gap-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                <Calendar className="h-3 w-3" /> To
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    handleDateChange('end', e.target.value)
                                }
                                className="w-full rounded-lg border-gray-200 bg-gray-50 px-2 py-2 text-sm focus:border-[#37368b] focus:ring-[#37368b]"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setQuickFilter(7)}
                                className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100"
                            >
                                <CalendarDays className="h-3 w-3" /> 7 Days
                            </button>
                            <button
                                onClick={() => setQuickFilter(30)}
                                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition-colors hover:bg-indigo-100"
                            >
                                <CalendarDays className="h-3 w-3" /> 30 Days
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- KPI CARDS ROW --- */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                        label="Present"
                        value={summary.present || 0}
                        total={totalStudents}
                        icon={CheckCircle2}
                        color="text-green-600"
                        bg="bg-green-50"
                    />
                    <StatCard
                        label="Absent"
                        value={summary.absent || 0}
                        total={totalStudents}
                        icon={XCircle}
                        color="text-red-600"
                        bg="bg-red-50"
                    />
                    <StatCard
                        label="Late"
                        value={summary.late || 0}
                        total={totalStudents}
                        icon={Clock}
                        color="text-yellow-600"
                        bg="bg-yellow-50"
                    />
                    <StatCard
                        label="Excused"
                        value={summary.excused || 0}
                        total={totalStudents}
                        icon={HelpCircle}
                        color="text-blue-600"
                        bg="bg-blue-50"
                    />
                </div>

                {/* --- CHARTS GRID --- */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* LEFT: Monthly Summary (Doughnut) */}
                    <div className="flex h-[400px] flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 font-bold text-gray-800">
                                <PieChart className="h-5 w-5 text-[#37368b]" />
                                Summary
                            </h2>
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-400">
                                Selected Range
                            </span>
                        </div>

                        <div className="relative flex flex-1 items-center justify-center">
                            <Doughnut
                                data={doughnutData}
                                options={doughnutOptions}
                            />
                            {/* Center Text Overlay */}
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">
                                    {totalStudents}
                                </span>
                                <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                    Total
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Weekly Trends (Bar) */}
                    <div className="flex h-[400px] flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 font-bold text-gray-800">
                                <Activity className="h-5 w-5 text-[#37368b]" />
                                Daily Trends
                            </h2>
                            <div className="flex gap-2 text-xs">
                                <span className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    Present
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    Absent
                                </span>
                                <span className="flex items-center gap-1">
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
const StatCard = ({ label, value, total, icon: Icon, color, bg }: any) => {
    // Calculate percentage
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex items-start justify-between">
                <div className={`rounded-lg p-2 ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <span
                    className={`text-xs font-bold ${color} rounded-full border border-gray-100 bg-white px-2 py-0.5`}
                >
                    {percentage}%
                </span>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    {label}
                </p>
            </div>
        </div>
    );
};
