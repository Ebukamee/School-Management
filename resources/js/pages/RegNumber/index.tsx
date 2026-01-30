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
            destroy(`/allowed-numbers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Allowed Numbers', href: '#' }]}>
            <Head title="Allowed Registration Numbers" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </span>
                            Registration Whitelist
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Manage the pool of valid registration numbers students can claim.
                        </p>
                    </div>
                    
                    <Link
                        href="/allowed-numbers/create"
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Number
                    </Link>
                </div>

                {/* --- TABLE CARD --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50 text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Reg Number</div>
                        <div className="col-span-4">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* Data Rows */}
                    <div className="divide-y divide-gray-50">
                        {numbers.data.length > 0 ? (
                            numbers.data.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/80 transition-colors group">
                                    
                                    <div className="col-span-1 text-gray-400 font-mono text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    
                                    <div className="col-span-5 font-bold text-gray-900 font-mono text-sm group-hover:text-[#37368b] transition-colors">
                                        {item.reg_number}
                                    </div>
                                    
                                    <div className="col-span-4">
                                        {item.is_used ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-red-50 text-red-600 border border-red-100">
                                                <XCircle className="w-3.5 h-3.5" />
                                                Used
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Available
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="col-span-2 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-16 text-center text-gray-500">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No Numbers Found</h3>
                                <p className="text-sm mt-1">There are no allowed numbers in the system yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Total Records: <span className="text-[#37368b]">{numbers.data.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}