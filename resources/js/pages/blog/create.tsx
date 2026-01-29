import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReactMarkdown from 'react-markdown'; 
import { 
    Image as ImageIcon, 
    Save, 
    Send, 
    AlertCircle, 
    ArrowLeft, 
    X,
    MoreVertical,
    Settings,
    FileText
} from 'lucide-react';

// Editor Imports
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// --- CUSTOM CSS FOR EASYMDE TO MAKE IT SLEEK ---
// You can put this in your global CSS, but included here for portability
const customEditorStyles = `
    .EasyMDEContainer { border: none; }
    .editor-toolbar { 
        border: none !important; 
        background: transparent !important; 
        opacity: 0.6; 
        transition: opacity 0.2s;
        padding: 0;
    }
    .editor-toolbar:hover { opacity: 1; }
    .CodeMirror { 
        border: none !important; 
        background: transparent !important;
        font-family: 'Inter', sans-serif; /* Or your app font */
        font-size: 1.125rem;
        color: #1f2937;
        padding: 0;
        min-height: 400px;
    }
    .editor-statusbar { display: none !important; }
    .CodeMirror-cursor { border-left: 2px solid #37368b !important; }
    .editor-preview { background: #f9fafb; padding: 2rem; }
`;

export default function Create() {
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        cover_image: null as File | null,
        is_published: false,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Cleanup object URL on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // Memoized Editor Options
    const editorOptions = useMemo(() => {
        return {
            spellChecker: false,
            placeholder: "Tell your story...",
            status: false,
            autosave: {
                enabled: true,
                uniqueId: "school_blog_draft_v2", 
                delay: 2000,
            },
            toolbar: [
                "bold", "italic", "heading-2", "heading-3", "|", 
                "quote", "unordered-list", "ordered-list", "|", 
                "link", "clean-block"
            ] as any,
            minHeight: "400px",
        };
    }, []);

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
        // We manually mutate data here just before send, 
        // or prefer setData('is_published', publishStatus) and useEffect to trigger submit
        // But for Inertia helper, passing data directly to post is safer:
        
        const formData = {
            ...data,
            is_published: publishStatus
        };

        post('/blog', {
            data: formData, // Inertia usually handles this automatically with useForm
            forceFormData: true,
            onSuccess: () => {
                localStorage.removeItem("smde_school_blog_draft_v2");
            }
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Blog', href: '/blog' }, { title: 'Compose', href: '#' }]}>
            <Head title="Write New Post" />
            <style>{customEditorStyles}</style>

            <div className="h-[calc(100vh-65px)] flex flex-col md:flex-row bg-white overflow-hidden">
                
                {/* ================= LEFT COLUMN: WRITER ================= */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">
                    
                    {/* Top Toolbar */}
                    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                        <Link href="/blog" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Post Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                            <div className="h-6 w-px bg-gray-200 mx-1"></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                {data.is_published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-3xl w-full mx-auto px-6 pb-20 mt-8">
                        
                        {/* 1. Cover Image Banner */}
                        <div className="group relative mb-8 rounded-2xl overflow-hidden bg-gray-50 border border-dashed border-gray-200 hover:border-gray-300 transition-all min-h-[160px] flex flex-col items-center justify-center">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Cover" className="w-full h-auto max-h-[400px] object-cover" />
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label htmlFor="cover_upload" className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg shadow-sm cursor-pointer backdrop-blur-sm">
                                            <ImageIcon className="w-4 h-4" />
                                        </label>
                                        <button onClick={removeImage} className="bg-white/90 hover:bg-white text-red-500 p-2 rounded-lg shadow-sm backdrop-blur-sm">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label htmlFor="cover_upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-10">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-gray-400 group-hover:text-[#37368b] group-hover:scale-110 transition-all">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700">Add a cover image</span>
                                </label>
                            )}
                            <input type="file" onChange={handleImageChange} className="hidden" id="cover_upload" accept="image/*" />
                        </div>

                        {/* 2. Title Input */}
                        <div className="mb-6">
                            <textarea 
                                placeholder="Post Title" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full text-4xl md:text-5xl font-extrabold text-gray-900 border-none focus:ring-0 placeholder-gray-300 px-0 bg-transparent resize-none overflow-hidden leading-tight"
                                rows={1}
                                onInput={(e) => {
                                    e.currentTarget.style.height = 'auto';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* 3. Settings / Metadata (Conditional) */}
                        {showSettings && (
                            <div className="mb-8 p-6 bg-gray-50 rounded-xl animate-in slide-in-from-top-2 border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Post Metadata</h3>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt / Summary</label>
                                    <textarea 
                                        value={data.excerpt}
                                        onChange={e => setData('excerpt', e.target.value)}
                                        className="w-full rounded-lg border-gray-200 text-sm focus:border-[#37368b] focus:ring-[#37368b]"
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
                            <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                                <AlertCircle className="w-4 h-4" />
                                {errors.content}
                            </div>
                        )}

                    </div>

                    {/* Bottom Action Bar (Mobile Sticky) */}
                    <div className="sticky bottom-0 z-20 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden">
                        <span className="text-xs text-gray-400 font-medium">
                            {data.content ? data.content.split(' ').length : 0} words
                        </span>
                        <div className="flex gap-3">
                            <button onClick={() => handleSubmit(false)} disabled={processing} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                <Save className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleSubmit(true)} disabled={processing} className="px-4 py-2 bg-[#37368b] text-white rounded-full font-bold text-sm">
                                Publish
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: PREVIEW & ACTIONS ================= */}
                <div className="w-[400px] xl:w-[480px] bg-gray-50 border-l border-gray-200 flex-col hidden lg:flex">
                    
                    {/* Preview Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white/50 backdrop-blur-md">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Live Preview
                        </h2>
                        <span className="text-xs text-gray-400">{data.content ? data.content.split(' ').length : 0} words</span>
                    </div>

                    {/* Device Frame */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <div className="bg-white rounded-[2rem] border-[8px] border-gray-800 shadow-2xl min-h-[600px] overflow-hidden relative mx-auto max-w-[340px]">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                            
                            {/* Screen Content */}
                            <div className="h-full overflow-y-auto custom-scrollbar p-5 pt-10 pb-20">
                                {preview && (
                                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm" />
                                )}
                                <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                                    {data.title || "Your Title Here"}
                                </h1>
                                <div className="prose prose-sm prose-blue max-w-none">
                                    <ReactMarkdown>{data.content || "Start typing to see preview..."}</ReactMarkdown>
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
                                className="w-full py-3 bg-[#37368b] hover:bg-[#2a2970] text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            >
                                <Send className="w-4 h-4" /> Publish Now
                            </button>
                            <button 
                                onClick={() => handleSubmit(false)} 
                                disabled={processing}
                                className="w-full py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <Save className="w-4 h-4" /> Save as Draft
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-xs text-gray-400">
                                {processing ? 'Saving changes...' : 'Last saved just now'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}