import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Plus, 
    Trash2, 
    ShieldCheck, 
    CheckCircle, 
    XCircle,
    Search
} from 'lucide-react';

interface AllowedNumber {
    id: number;
    reg_number: string;
    is_used: boolean;
    created_at: string;
}

interface Props {
    numbers: {
        data: AllowedNumber[];
        links: any[];
    };
}

export default function Index({ numbers }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this number?')) {
            // UPDATED: Using standard URL string
            destroy(`/allowed-numbers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Allowed Numbers', href: '#' }]}>
            <Head title="Allowed Registration Numbers" />

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
                
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-[#37368b]" />
                            Registration Whitelist
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Manage the pool of valid registration numbers students can claim.
                        </p>
                    </div>
                    
                    {/* UPDATED: Using standard URL string */}
                    <Link
                        href="/allowed-numbers/create"
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Number
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Reg Number</div>
                        <div className="col-span-4">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* Data Rows */}
                    <div className="divide-y divide-gray-100">
                        {numbers.data.length > 0 ? (
                            numbers.data.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                                    
                                    <div className="col-span-1 text-gray-400 font-mono text-xs">
                                        {index + 1}
                                    </div>
                                    
                                    <div className="col-span-5 font-bold text-gray-800 font-mono">
                                        {item.reg_number}
                                    </div>
                                    
                                    <div className="col-span-4">
                                        {item.is_used ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                                                <XCircle className="w-3.5 h-3.5" />
                                                Used / Claimed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Available
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="col-span-2 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center text-gray-500">
                                <Search className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                                <p>No allowed numbers found.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="text-xs text-gray-500">
                            Showing {numbers.data.length} records
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}