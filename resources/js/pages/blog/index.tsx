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
import Navbar from '@/components/ui/NavHome';

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
        <>
        <Navbar />
            <Head title="School News" />

            <div className="w-[90%] mt-[100px] mx-auto p-4 md:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                           
                            School News
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium ml-1">
                            Catch up on the latest announcements, student achievements, and events.
                        </p>
                    </div>

               
                </div>

                {/* --- BLOG GRID --- */}
                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link 
                                key={blog.slug} 
                                href={`/blog/${blog.slug}`} 
                                className="group flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-52 w-full overflow-hidden bg-gray-50">
                                    {blog.cover_image ? (
                                        <img 
                                            src={'/storage/' + blog.cover_image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fc]">
                                            <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                    
                                    {/* Read Time Badge */}
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-extrabold text-gray-600 shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                                        <Clock className="w-3 h-3 text-[#37368b]" />
                                        {blog.read_time}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#ffc53a] mb-3 uppercase tracking-widest">
                                        <Calendar className="w-3 h-3 text-gray-400" />
                                        <span className="text-gray-400">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-[#37368b] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    
                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
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
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#37368b] flex items-center justify-center group-hover:bg-[#37368b] group-hover:text-white transition-all duration-300">
                                            <ChevronRight className="w-4 h-4 ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* --- EMPTY STATE --- */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-[#ffc53a]/10 rounded-full flex items-center justify-center mb-4 border border-[#ffc53a]/20">
                            <Newspaper className="w-8 h-8 text-[#d97706]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No news yet</h3>
                        <p className="text-gray-500 max-w-sm text-center mt-2 font-medium">
                            The school blog is currently empty. Check back later for updates!
                        </p>
                        {auth.user && (
                            <Link 
                                href="/blog/create" 
                                className="mt-6 inline-flex items-center gap-2 text-[#37368b] font-bold hover:underline"
                            >
                                Create first post <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                )}
            </div>

        </>
    );
}