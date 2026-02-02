import { useState, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Trash2, Search, AlertCircle, Users, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
    };
}

export default function UserIndex({ users, filters }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState(filters.search || '');
    
    // 1. GET SHARED PROPS (Auth & Flash/Errors)
    const { auth, flash, errors } = usePage<any>().props;
    const currentUser = auth.user;
    
    // Handle Search Trigger
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true });
    };

    // Handle Delete Confirmation
    const handleDelete = (user: User) => {
        if (user.id === currentUser.id) return; // Prevent self-delete
        
        if (confirm(`Are you sure you want to delete ${user.name}? This cannot be undone.`)) {
            router.delete(`/users/${user.id}`, {
                preserveScroll: true
            });
        }
    };

    // Animation
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".anim-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" });
        tl.from(".anim-alert", { height: 0, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4");
        tl.from(".anim-table", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
    }, { scope: containerRef });

    return (
        <AppLayout>
            <div ref={containerRef} className="w-[90%] mx-auto p-4 md:p-6 lg:p-8 font-sans">
                
                {/* Header & Actions */}
                <div className="anim-header flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        {/* ICON BADGE */}
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
                            <Users className="w-4 h-4 text-[#ffc53a]" />
                            <span className="text-xs font-extrabold text-[#37368b] uppercase tracking-widest">System Administration</span>
                        </div>
                        
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-2.5 bg-[#ffc53a] text-white rounded-xl shadow-lg shadow-indigo-900/20">
                                <Users className="w-6 h-6" />
                            </span>
                            User <span className="text-[#37368b]">Management</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Manage accounts, roles, and access permissions for the platform.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-gray-100 bg-white focus:border-[#37368b] focus:ring-0 text-sm font-bold text-gray-700 placeholder-gray-400 transition-all shadow-sm"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                        </form>
                    </div>
                </div>

                {/* 2. FLASH MESSAGES & ERRORS */}
                {(flash?.success || Object.keys(errors).length > 0) && (
                    <div className="anim-alert mb-6">
                        {flash?.success && (
                            <div className="bg-green-50 border border-green-100 text-green-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-bold">{flash?.success}</span>
                            </div>
                        )}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 border border-red-100 text-red-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm mt-2">
                                <XCircle className="w-5 h-5 text-red-600" />
                                <div className="text-sm font-bold">
                                    <p>Please fix the following errors:</p>
                                    <ul className="list-disc list-inside mt-1">
                                        {Object.values(errors).map((error: any, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Users Table Card */}
                <div className="anim-table bg-white rounded-xl shadow-2xl shadow-indigo-900/5 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/80 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">User Profile</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Role Access</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Date Joined</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-[#37368b]/5 flex items-center justify-center text-[#37368b] font-black text-sm border border-[#37368b]/10 group-hover:bg-[#37368b] group-hover:text-white transition-all duration-300">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-gray-900 text-sm group-hover:text-[#37368b] transition-colors">{user.name}</p>
                                                            
                                                            {/* 3. YOU TAG */}
                                                            {user.id === currentUser.id && (
                                                                <span className="px-2 py-0.5 rounded-md bg-[#ffc53a] text-[#37368b] text-[10px] font-extrabold border border-[#eeb025]">
                                                                    YOU
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 font-medium mt-0.5">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize border
                                                    ${user.role === 'admin' 
                                                        ? 'bg-purple-50 text-purple-700 border-purple-100' 
                                                        : user.role === 'teacher' 
                                                            ? 'bg-blue-50 text-blue-700 border-blue-100' 
                                                            : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}
                                                >
                                                    {user.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-gray-500 font-bold">
                                                {new Date(user.created_at).toLocaleDateString(undefined, { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {/* Disable delete for self */}
                                                {user.id !== currentUser.id && (
                                                    <button
                                                        onClick={() => handleDelete(user)}
                                                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-24 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                                    <AlertCircle className="w-8 h-8 opacity-30" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-gray-900">No users found</p>
                                                    <p className="text-sm font-medium">We couldn't find any matches for "{search}"</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.data.length > 0 && (
                        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                Showing Page {users.current_page} of {users.last_page}
                            </span>
                            <div className="flex flex-wrap justify-center gap-2">
                                {users.links.map((link, i) => (
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-4 py-2 text-xs font-extrabold rounded-xl border transition-all
                                                ${link.active 
                                                    ? 'bg-[#37368b] text-white border-[#37368b] shadow-lg shadow-indigo-900/20' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#37368b] hover:text-[#37368b]'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span 
                                            key={i}
                                            className="px-4 py-2 text-xs font-extrabold rounded-xl border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}