import { Head, Link, router } from '@inertiajs/react';
import { Edit, FileText, FilterX, Loader2 } from 'lucide-react';
import { useState } from 'react';
// import { SharedData } from '@/types'; // Uncomment if you have this type defined globally
import AppLayout from '@/layouts/app-layout'; // Or AuthenticatedLayout, depending on your setup

// Define types for better code safety
interface Result {
    id: number;
    reg_number: string;
    class: string;
    student?: {
        name: string;
    };
}

interface PageProps {
    results: Result[];
    filters: {
        session: string;
        term: string;
        class: string;
    };
}

export default function TeacherManage({ results, filters }: PageProps) {
    // Initialize state with the "sticky" filters coming from the backend
    const [values, setValues] = useState({
        session: filters.session || '',
        term: filters.term || '',
        class: filters.class || '',
    });

    const [isLoading, setIsLoading] = useState(false);

    // Trigger the Backend refresh immediately when any dropdown changes
    const handleFilterChange = (key: string, value: string) => {
        const newValues = { ...values, [key]: value };
        setValues(newValues);

        // This puts the filters in the URL: /results/manage?session=2024...
        // The Controller reads them directly.
        router.get('/results/manage', newValues, {
            preserveState: true,
            preserveScroll: true,
            replace: true, // This keeps browser history clean
        });
    };

    const clearFilters = () => {
        setValues({ session: '', term: '', class: '' });
        // Visiting the page with NO params tells Controller to "Show All"
        router.get('/results/manage');
    };

    return (
        <AppLayout>
            <Head title="Manage Results" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* --- HEADER --- */}
                    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-indigo-100 p-2 shadow-sm">
                                <FileText className="h-6 w-6 text-indigo-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Update Results
                                </h2>
                                <p className="text-sm text-gray-500">
                                    View and manage student records
                                </p>
                            </div>
                        </div>

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex animate-pulse items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Updating...
                            </div>
                        )}
                    </div>

                    {/* --- FILTERS --- */}
                    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Session Filter */}
                            <div>
                                <label className="mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase">
                                    Academic Session
                                </label>
                                <select
                                    value={values.session}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'session',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full cursor-pointer rounded-lg border-gray-200 bg-gray-50/50 shadow-sm transition-all focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Sessions</option>
                                    <option value="2023/2024">2023/2024</option>
                                    <option value="2024/2025">2024/2025</option>
                                </select>
                            </div>

                            {/* Term Filter */}
                            <div>
                                <label className="mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase">
                                    Term
                                </label>
                                <select
                                    value={values.term}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'term',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full cursor-pointer rounded-lg border-gray-200 bg-gray-50/50 shadow-sm transition-all focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Terms</option>
                                    <option value="First Term">
                                        First Term
                                    </option>
                                    <option value="Second">Second Term</option>
                                    <option value="Third Term">
                                        Third Term
                                    </option>
                                </select>
                            </div>

                            {/* Class Filter */}
                            <div>
                                <div className="flex justify-between">
                                    <label className="mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase">
                                        Filter Class
                                    </label>
                                    {(values.session ||
                                        values.term ||
                                        values.class) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs font-medium text-red-500 hover:underline"
                                        >
                                            Reset All
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={values.class}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'class',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full cursor-pointer rounded-lg border-gray-200 bg-gray-50/50 shadow-sm transition-all focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Classes</option>
                                    <option value="SS1">SS1</option>
                                    <option value="SS2">SS2</option>
                                    <option value="SS3">SS3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* --- TABLE CONTENT --- */}
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                        {/* STATE: No Results Found */}
                        {results.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                                    <FilterX className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    No results found
                                </h3>
                                <p className="mx-auto mt-1 max-w-sm text-gray-500">
                                    We couldn't find any results matching your
                                    current filters. Try changing or clearing
                                    the filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            /* STATE: Results Found (Default View) */
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-gray-100 bg-gray-50/80 font-semibold text-gray-600">
                                        <tr>
                                            <th className="px-6 py-4">
                                                Reg No
                                            </th>
                                            <th className="px-6 py-4">
                                                Student Name
                                            </th>
                                            <th className="px-6 py-4">Class</th>
                                            <th className="px-6 py-4 text-center">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-right">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {results.map((result) => (
                                            <tr
                                                key={result.id}
                                                className="group transition-colors hover:bg-indigo-50/30"
                                            >
                                                <td className="px-6 py-4 font-mono font-medium text-gray-500">
                                                    {result.reg_number}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {result.student?.name || (
                                                        <span className="text-red-400 italic">
                                                            Deleted User
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {result.class}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                        Uploaded
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/results/${result.id}/edit`}
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all group-hover:shadow-md hover:border-indigo-300 hover:bg-gray-50 hover:text-indigo-600"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Update
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
