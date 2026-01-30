import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Head, useForm, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReactMarkdown from 'react-markdown'; 
import { 
    Image as ImageIcon, 
    Save, 
    Send, 
    AlertCircle, 
    ArrowLeft, 
    X,
    Settings,
    FileText,
    PenTool,
    Trash2
} from 'lucide-react';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const customEditorStyles = `
    .EasyMDEContainer { border: none; }
    .editor-toolbar { 
        border: none !important; 
        background: transparent !important; 
        opacity: 0.6; 
        transition: opacity 0.2s;
        padding: 0 1rem;
    }
    .editor-toolbar:hover { opacity: 1; }
    .CodeMirror { 
        border: none !important; 
        background: transparent !important;
        font-family: 'Inter', sans-serif;
        font-size: 1.125rem;
        color: #374151;
        padding: 1rem;
        min-height: 400px;
    }
    .editor-statusbar { display: none !important; }
    .CodeMirror-cursor { border-left: 2px solid #37368b !important; }
    .editor-preview { background: #f9fafb; padding: 2rem; }
`;

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    is_published: boolean;
    slug: string;
}

// Define the shape of your Page Props
interface PageProps {
    blog: BlogPost; // Or 'draft' if you named it that in your Controller
    [key: string]: any;
}

export default function Edit() {
    
    // 1. GET DATA VIA USEPAGE
    // This retrieves the 'blog' prop directly from the Inertia page context
    const { blog } = usePage<PageProps>().props;

    // 2. Initialize Form with Data from usePage
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        cover_image: null as File | null,
        is_published: !!blog.is_published,
        slug : blog.slug || '',
    });

    const [preview, setPreview] = useState<string | null>(
        blog.cover_image ? `/storage/${blog.cover_image}` : null
    );
    
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const editorOptions = useMemo(() => {
        return {
            spellChecker: false,
            placeholder: "Continue your story...",
            status: false,
            autosave: {
                enabled: true,
                uniqueId: `school_blog_edit_${blog.id}`,
                delay: 2000,
            },
            toolbar: [
                "bold", "italic", "heading-2", "heading-3", "|", 
                "quote", "unordered-list", "ordered-list", "|", 
                "link", "clean-block"
            ] as any,
            minHeight: "400px",
        };
    }, [blog.id]);

    const onContentChange = useCallback((value: string) => {
        setData('content', value);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setData('cover_image', null);
        setPreview(null);
    };

    const handleSubmit = (publishStatus: boolean) => {
        data.is_published = publishStatus;

        post(`/blog/${blog.slug}`, {
            forceFormData: true,
            onSuccess: () => {
                localStorage.removeItem(`smde_school_blog_edit_${blog.id}`);
            }
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure? This post will be permanently deleted.')) {
            router.delete(`/blog/${blog.id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Blog', href: '/blog' }, { title: 'Edit Post', href: '#' }]}>
            <Head title={`Edit: ${data.title}`} />
            <style>{customEditorStyles}</style>

            <div className="h-[calc(100vh-65px)] flex flex-col md:flex-row bg-white overflow-hidden">
                
                {/* ================= LEFT COLUMN: WRITER ================= */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">
                    
                    {/* Top Toolbar */}
                    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                        <Link href="/blog/drafts" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#37368b] transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setShowSettings(!showSettings)}
                                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${showSettings ? 'text-[#37368b]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                            
                            <div className="h-4 w-px bg-gray-200"></div>
                            
                            {data.is_published ? (
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">Live</span>
                            ) : (
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded">Draft</span>
                            )}
                        </div>
                    </div>

                    <div className="max-w-3xl w-full mx-auto px-8 pb-32 mt-10">
                        
                        {/* 1. Cover Image Banner */}
                        <div className="group relative mb-10 rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#37368b]/30 transition-all min-h-[200px] flex flex-col items-center justify-center">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Cover" className="w-full h-auto max-h-[400px] object-cover" />
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label htmlFor="cover_upload" className="bg-white hover:text-[#37368b] text-gray-600 p-2.5 rounded-xl shadow-lg cursor-pointer transition-all">
                                            <ImageIcon className="w-4 h-4" />
                                        </label>
                                        <button onClick={removeImage} className="bg-white hover:text-red-500 text-gray-600 p-2.5 rounded-xl shadow-lg transition-all">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label htmlFor="cover_upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-12">
                                    <div className="w-14 h-14 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-3 text-gray-400 group-hover:text-[#37368b] group-hover:scale-110 transition-all">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-800">Add Cover Image</span>
                                </label>
                            )}
                            <input type="file" onChange={handleImageChange} className="hidden" id="cover_upload" accept="image/*" />
                        </div>

                        {/* 2. Title Input */}
                        <div className="mb-8">
                            <textarea 
                                placeholder="Post Title" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full text-4xl md:text-5xl font-extrabold text-gray-900 border-none focus:ring-0 placeholder-gray-300 px-0 bg-transparent resize-none overflow-hidden leading-tight tracking-tight"
                                rows={1}
                                onInput={(e) => {
                                    e.currentTarget.style.height = 'auto';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            />
                            {errors.title && <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title}</p>}
                        </div>

                        {/* 3. Settings (Metadata) */}
                        {showSettings && (
                            <div className="mb-10 p-6 bg-gray-50 rounded-2xl animate-in slide-in-from-top-4 border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <PenTool className="w-3 h-3" /> Post Metadata
                                    </h3>
                                    <button 
                                        onClick={handleDelete}
                                        className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete Post
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt / Summary</label>
                                    <textarea 
                                        value={data.excerpt}
                                        onChange={e => setData('excerpt', e.target.value)}
                                        className="w-full rounded-xl border-gray-200 text-sm font-medium text-gray-700 focus:border-[#37368b] focus:ring-1 focus:ring-[#37368b] bg-white p-3"
                                        rows={3}
                                        placeholder="A short summary for search results and previews..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* 4. Markdown Editor */}
                        <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-900 focus-within:prose-p:text-gray-900 transition-colors">
                            <SimpleMDE 
                                value={data.content} 
                                onChange={onContentChange}
                                options={editorOptions} 
                            />
                        </div>
                        {errors.content && (
                            <div className="flex items-center gap-2 text-red-500 text-sm font-bold mt-4 bg-red-50 p-3 rounded-xl">
                                <AlertCircle className="w-4 h-4" />
                                {errors.content}
                            </div>
                        )}

                    </div>

                    {/* Bottom Action Bar (Mobile Sticky) */}
                    <div className="sticky bottom-0 z-20 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                            {data.content ? data.content.split(' ').length : 0} words
                        </span>
                        <div className="flex gap-3">
                            <button onClick={() => handleSubmit(false)} disabled={processing} className="p-3 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                <Save className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleSubmit(true)} disabled={processing} className="px-6 py-3 bg-[#37368b] text-white rounded-xl font-bold text-sm shadow-lg">
                                {data.is_published ? 'Update' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: PREVIEW & ACTIONS ================= */}
                <div className="w-[400px] xl:w-[480px] bg-gray-50 border-l border-gray-200 flex-col hidden lg:flex">
                    
                    {/* Preview Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white/50 backdrop-blur-md">
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#37368b]" /> Live Preview
                        </h2>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-200/50 px-2 py-1 rounded-md">
                            {data.content ? data.content.split(' ').length : 0} words
                        </span>
                    </div>

                    {/* Device Frame */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50/50">
                        <div className="bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl min-h-[650px] overflow-hidden relative mx-auto max-w-[360px]">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-2xl z-10"></div>
                            
                            {/* Screen Content */}
                            <div className="h-full overflow-y-auto custom-scrollbar p-6 pt-12 pb-20">
                                {preview && (
                                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm" />
                                )}
                                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                                    {data.title || "Your Title Here"}
                                </h1>
                                <div className="prose prose-sm prose-blue max-w-none text-gray-600 leading-relaxed">
                                    <ReactMarkdown>{data.content || "*Start typing to see how your post looks...*"}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Actions Footer */}
                    <div className="p-6 bg-white border-t border-gray-200">
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => handleSubmit(true)} 
                                disabled={processing}
                                className="w-full py-3.5 bg-[#37368b] hover:bg-[#2a2970] text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
                            >
                                <Send className="w-4 h-4" /> 
                                {data.is_published ? 'Update Live Post' : 'Publish Post'}
                            </button>
                            <button 
                                onClick={() => handleSubmit(false)} 
                                disabled={processing}
                                className="w-full py-3.5 text-gray-600 font-bold text-sm bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <Save className="w-4 h-4" /> Save as Draft
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {processing ? 'Saving changes...' : 'Last updated recently'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}