import { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Newspaper, ChevronRight, Clock, Calendar } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Define the interface
interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    readTime: string;
    category?: string;
}

// 2. Define Props
interface BlogSectionProps {
    blogPosts: BlogPost[];
}

const BlogSection = ({ blogPosts }: BlogSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null); 
    const [visiblePosts, setVisiblePosts] = useState<number>(6);

    // Animations
    useGSAP(() => {
        // 1. Animate Header Elements
        gsap.from(".anim-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", 
            }
        });

        // 2. FIXED: Animate Blog Cards using Batch
        // This fixes the grid issue by animating cards only when they scroll into view
        ScrollTrigger.batch(".anim-post", {
            onEnter: (batch) => {
                gsap.from(batch, {
                    y: 60,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all" // Removes transforms after animation to prevent layout bugs
                });
            },
            start: "top 90%", // Starts animating when top of card hits 90% of viewport
            once: true // Only animate once
        });

    }, { scope: containerRef });

    // Empty State
    if (!blogPosts || blogPosts.length === 0) {
        return (
            <div className="py-24 text-center bg-[#f8f9fc]">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Newspaper className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">No news updates posted yet.</p>
            </div>
        );
    }

    const loadMore = () => {
        setVisiblePosts((prev) => prev + 3);
        // We need to refresh ScrollTrigger after loading more posts so it detects the new elements
        setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    return (
        <section className="py-20 lg:py-28 bg-[#f8f9fc]" ref={containerRef}>
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Section Header */}
                <div className="anim-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="text-left max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 bg-[#ffc53a] rounded-full animate-pulse"></span>
                            <span className="text-xs font-extrabold text-[#37368b] uppercase tracking-widest">Update Hub</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#37368b] mb-6 tracking-tight">
                            Latest School News
                        </h2>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">
                            Catch up on the latest achievements, events, and important announcements from our vibrant school community.
                        </p>
                    </div>
                    
                    <Link 
                        href="/blog" 
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#37368b]/10 hover:border-[#37368b] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <span className="text-[#37368b] font-bold">Visit Full Blog</span>
                        <div className="w-8 h-8 bg-[#37368b] text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogPosts.slice(0, visiblePosts).map((post) => (
                        <article
                            key={post.id}
                            className="anim-post group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 hover:-translate-y-1 transition-all duration-300 border border-white"
                        >
                            {/* Image Wrapper */}
                            <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/95 backdrop-blur-md text-[#37368b] px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffc53a]"></span>
                                        {post.category || 'General'}
                                    </span>
                                </div>
                            </Link>

                            {/* Content Wrapper */}
                            <div className="p-8 flex flex-col flex-1">
                                {/* Meta Data */}
                                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block mb-3">
                                    <h3 className="text-xl font-extrabold text-gray-900 leading-tight group-hover:text-[#37368b] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                                    {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#ffc53a]/20 flex items-center justify-center text-[#d97706] font-bold text-xs uppercase">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900">{post.author}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Author</span>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href={`/blog/${post.slug}`} 
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#37368b] hover:text-white transition-all duration-300"
                                    >
                                        <ChevronRight className="w-5 h-5 ml-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load More Button */}
                {visiblePosts < blogPosts.length && (
                    <div className="text-center">
                        <button
                            onClick={loadMore}
                            className="px-10 py-4 bg-white border-2 border-[#37368b] text-[#37368b] hover:bg-[#37368b] hover:text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-indigo-900/10 active:scale-95"
                        >
                            Load More Stories
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;