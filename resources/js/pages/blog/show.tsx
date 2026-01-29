import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReactMarkdown from 'react-markdown';
import { 
    Clock, 
    Calendar, 
    ChevronLeft, 
    User, 
    Share2, 
    MessageCircle 
} from 'lucide-react';

// 1. Defined Interface for better type safety
interface BlogPost {
    id: number;
    title: string;
    content?: string;
    body?: string;
    description?: string;
    cover_image: string | null;
    created_at: string;
    author?: {
        name: string;
        avatar?: string;
    };
}

interface Props {
    blog: BlogPost;
}

export default function Show({ blog }: Props) {
    
    // 2. Content Fallback Logic
    const safeContent = blog.content || blog.body || blog.description || '';
    
    // 3. Calculate Read Time
    const readTime = Math.ceil(safeContent.split(' ').length / 200) + ' min read';

    // 4. Format Date
    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Blog', href: '/blog' }, { title: blog.title || 'Post', href: '#' }]}>
            <Head title={blog.title} />

            <div className="max-w-5xl  mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* --- NAVIGATION --- */}
                <div className="flex justify-between items-center mb-8">
                    <Link 
                        href="/blog" 
                        className="group inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#37368b] transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#37368b] transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        Back to News
                    </Link>

                    <button className="text-gray-400 hover:text-[#37368b] transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                <article className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* --- ARTICLE HEADER --- */}
                    <div className="p-8 md:p-12 pb-0">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                            <span className="flex items-center gap-1.5 text-[#37368b] bg-blue-50 px-3 py-1 rounded-lg">
                                <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {readTime}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                            {blog.title}
                        </h1>

                        {/* Author Section */}
                        <div className="flex items-center justify-between border-t border-b border-gray-50 py-6 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center text-[#37368b] font-bold overflow-hidden">
                                    {blog.author?.avatar ? (
                                        <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        blog.author?.name ? blog.author.name.charAt(0) : <User className="w-5 h-5" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{blog.author?.name || 'Goldfield Admin'}</p>
                                    <p className="text-xs font-medium text-gray-500">Author</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- HERO IMAGE --- */}
                    {blog.cover_image && (
                        <div className="px-8 md:px-12 mb-10">
                            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm">
                                <img 
                                    src={'/storage/' + blog.cover_image} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                                />
                            </div>
                        </div>
                    )}

                    {/* --- MARKDOWN CONTENT --- */}
                    <div className="px-8 md:px-12 pb-16">
                        <div className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-bold prose-headings:text-[#37368b] 
                            prose-a:text-[#37368b] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-xl prose-img:shadow-md
                            prose-blockquote:border-l-4 prose-blockquote:border-[#F59E0B] prose-blockquote:bg-yellow-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                        ">
                            <ReactMarkdown>{safeContent}</ReactMarkdown>
                        </div>
                    </div>

                </article>

                {/* --- FOOTER / CTA --- */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm mb-4">Enjoyed this article?</p>
                    <Link href="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-200 hover:border-[#37368b] hover:text-[#37368b] rounded-xl font-bold text-gray-600 transition-all shadow-sm hover:shadow-md">
                        Read more news
                    </Link>
                </div>

            </div>
        </AppLayout>
    );
}