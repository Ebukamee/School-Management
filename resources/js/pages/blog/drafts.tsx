import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    FileText, 
    Edit, 
    Trash2, 
    Clock, 
    Plus, 
    ImageIcon,
    AlertCircle,
    PencilLine
} from 'lucide-react';

interface Draft {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    updated_at: string;
    cover_image: string | null;
}

export default function Drafts({ drafts }: { drafts: Draft[] }) {
    
    const handleDelete = (slug :string) => {
        if (confirm('Are you sure you want to delete this draft? This cannot be undone.')) {
            router.delete(`/blog/${slug}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Blog', href: '/blog' }, { title: 'My Drafts', href: '#' }]}>
            <Head title="My Drafts" />

            <div className="w-[90%] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="p-3 bg-[#ffc53a] text-white rounded-xl shadow-sm">
                                <FileText className="w-6 h-6" />
                            </span>
                            My Drafts
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Manage your unpublished posts and work in progress.
                        </p>
                    </div>

                    <Link 
                        href="/blog/create" 
                        className="inline-flex items-center gap-2 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span>New Draft</span>
                    </Link>
                </div>

                {/* --- DRAFTS GRID --- */}
                {drafts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {drafts.map((draft) => (
                            <div 
                                key={draft.id} 
                                className="group flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 w-full overflow-hidden bg-gray-50 border-b border-gray-50">
                                    {draft.cover_image ? (
                                        <img 
                                            src={'/storage/' + draft.cover_image} 
                                            alt={draft.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fc]">
                                            <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                    
                                    {/* Draft Badge */}
                                    <div className="absolute top-4 left-4 bg-amber-100/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-extrabold text-amber-700 shadow-sm uppercase tracking-wide border border-amber-200">
                                        Draft
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Last Saved */}
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        <span>Saved {new Date(draft.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-[#37368b] transition-colors line-clamp-2">
                                        {draft.title || <span className="italic text-gray-400">Untitled Draft</span>}
                                    </h3>
                                    
                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow font-medium">
                                        {draft.excerpt || "No content preview available..."}
                                    </p>

                                    {/* Action Footer */}
                                    <div className="flex items-center gap-3 pt-5 border-t border-gray-50 mt-auto">
                                        <Link 
                                            href={`/blog/${draft.slug}/edit`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-[#37368b] hover:bg-[#37368b] hover:text-white rounded-xl text-sm font-bold transition-all duration-200"
                                        >
                                            <PencilLine className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleDelete(draft.slug)}
                                            className="inline-flex items-center justify-center p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                                            title="Delete Draft"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* --- EMPTY STATE --- */
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No drafts found</h3>
                        <p className="text-gray-500 max-w-sm text-center mt-2 font-medium">
                            You don't have any pending drafts right now.
                        </p>
                        <Link 
                            href="/blog/create" 
                            className="mt-8 inline-flex items-center gap-2 text-[#37368b] font-bold hover:underline bg-blue-50 px-6 py-3 rounded-xl transition-colors hover:bg-blue-100"
                        >
                            Start writing <PencilLine className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Footer Note */}
                {drafts.length > 0 && (
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-gray-400 font-medium bg-gray-50 px-4 py-2 rounded-full">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Drafts are visible only to you and other administrators.</span>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}