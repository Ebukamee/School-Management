import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Plus, 
    Clock, 
    Calendar, 
    ChevronRight, 
    Newspaper,
    ImageIcon 
} from 'lucide-react';

interface Blog {
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    read_time: string;
    created_at: string;
    author: {
        name: string;
        image?: string;
    };
}

export default function Index({ blogs }: { blogs: Blog[] }) {
    const { auth } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={[{ title: 'Blog', href: '#' }]}>
            <Head title="School News" />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-blue-50 text-[#37368b] rounded-xl">
                                <Newspaper className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                School News
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg ml-1">
                            Catch up on the latest announcements, student achievements, and events.
                        </p>
                    </div>

                    {/* Write Button (Only if logged in) */}
                    {auth.user && (
                        <Link 
                            href="/blog/create" 
                            className="flex-shrink-0 bg-[#37368b] hover:bg-[#2a2970] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-900/10 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Write Post</span>
                        </Link>
                    )}
                </div>

                {/* --- BLOG GRID --- */}
                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link 
                                key={blog.slug} 
                                href={`/blog/${blog.slug}`} 
                                className="group flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                    {blog.cover_image ? (
                                        <img 
                                            src={'/storage/' + blog.cover_image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                                            <ImageIcon className="w-12 h-12 text-[#37368b]/20 mb-2" />
                                            <span className="text-xs font-bold text-[#37368b]/40 uppercase tracking-widest">No Cover Image</span>
                                        </div>
                                    )}
                                    
                                    {/* Read Time Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 text-[#37368b]" />
                                        {blog.read_time}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-[#37368b] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    
                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                        {blog.excerpt}
                                    </p>

                                    {/* Footer: Author & Arrow */}
                                    <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-500">
                                                {blog.author.image ? (
                                                    <img src={blog.author.image} alt={blog.author.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    blog.author.name.charAt(0)
                                                )}
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{blog.author.name}</span>
                                        </div>
                                        
                                        {/* Stylized Action Button */}
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#37368b] flex items-center justify-center group-hover:bg-[#37368b] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                                            <ChevronRight className="w-4 h-4 ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* --- EMPTY STATE --- */
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Newspaper className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No news yet</h3>
                        <p className="text-gray-500 max-w-sm text-center mt-2">
                            The school blog is currently empty. Check back later for updates!
                        </p>
                        {auth.user && (
                            <Link href="/blog/create" className="mt-6 text-[#37368b] font-bold hover:underline flex items-center gap-1">
                                Create first post <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}