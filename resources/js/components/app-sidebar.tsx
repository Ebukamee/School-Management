import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    useSidebar,
    SidebarMenuSub,
} from '@/components/ui/sidebar';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Calendar, 
    BarChart3, 
    Home, 
    Users, 
    PlusCircle, 
    FileEdit, 
    List, 
    ChevronRight ,
    ClipboardCheck,
    BookOpen,
    Newspaper, 
    FileText,  
    Send,      
    Hash,      
    Settings   
} from 'lucide-react';
import AppLogoIcon from './app-logo-icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const currentUrl = page.url;
    const user = auth.user;
    const isTeacher = user.role === 'teacher' ;
    const isAdmin = user.role === 'admin' ;
    const isStudent = user.role === 'student' ;
    const isStudentOrTeacher = isTeacher || isStudent;
    const { state } = useSidebar();

    // --- HELPER: Active State Logic ---
    // Checks if the current URL starts with the link href
    const isActive = (href: string) => currentUrl.startsWith(href);

const navItems = [
    // 1. MUTUAL FOR EVERYONE (Teacher, Student, Admin)
    { 
        title: 'Dashboard', 
        href: '/dashboard', 
        icon: LayoutGrid, 
        active: currentUrl === '/dashboard' 
    },

    // 2. MUTUAL FOR TEACHER & STUDENT ONLY (Hidden from Admin)
    ...(!isAdmin ? [{ 
        title: 'Schedule', 
        href: '/schedule', 
        icon: Calendar, 
        active: isActive('/schedule') 
    }] : []),

    // 3. CLASSES (Mutual presence, but different actions)
    ...(isTeacher ? [{
        title: 'Classes',
        icon: Users,
        active: isActive('/classes'),
        items: [
            { title: 'View Classes', href: '/classes', icon: List },
            { title: 'Create Class', href: '/classes/create', icon: PlusCircle },
        ]
    }] : (isStudent ? [{ 
        title: 'Classes', 
        href: '/classes', 
        icon: Users, 
        active: isActive('/classes') 
    }] : [])),

    // 4. RESULTS (Teacher=Manage, Student=View)
    ...(isTeacher ? [{
        title: 'Results',
        icon: BarChart3,
        active: isActive('/results'),
        items: [
            { title: 'Create Result', href: '/results/create', icon: PlusCircle },
            { title: 'Update Results', href: '/results/manage', icon: FileEdit },
        ]
    }] : (isStudent ? [{ 
        title: 'Results', 
        href: '/results', 
        icon: BarChart3, 
        active: isActive('/results') 
    }] : [])),

    // 5. ATTENDANCE (Teacher=Manage, Student=View)
    ...(isTeacher ? [{
        title: 'Attendance',
        icon: ClipboardCheck,
        active: isActive('/attendance'),
        items: [
            { title: 'Manage', href: '/attendance/manage', icon: FileEdit },
            { title: 'Create', href: '/attendance/create', icon: PlusCircle },
        ]
    }] : (isStudent ? [{ 
        title: 'Attendance', 
        href: '/attendance', 
        icon: ClipboardCheck,
        active: isActive('/attendance') 
    }] : [])),

    // 6. HOMEWORK (Teacher=Manage, Student=View)
    ...(isTeacher ? [{
        title: 'Homework',
        icon: BookOpen,
        active: isActive('/homework'),
        items: [
            { title: 'Manage', href: '/homework/manage', icon: FileEdit },
            { title: 'Create', href: '/homework/create', icon: PlusCircle },
        ]
    }] : (isStudent ? [{ 
        title: 'Homework', 
        href: '/homework', 
        icon: BookOpen,
        active: isActive('/homework') 
    }] : [])),

    // 7. ADMIN ONLY ROUTES
    ...(isAdmin ? [
        // Blog Management
        {
            title: 'School Blog',
            icon: Newspaper,
            active: isActive('/blog'),
            items: [
                { title: 'Create Post', href: '/blog/create', icon: PlusCircle },
                { title: 'Drafts', href: '/blog/drafts', icon: FileText },
                { title: 'Published', href: '/blog/published', icon: Send },
            ]
        },
        // Reg Number Management
        {
            title: 'Reg Numbers',
            icon: Hash,
            active: isActive('/allowed-numbers'),
            items: [
                { title: 'Generate New', href: '/allowed-numbers/create', icon: PlusCircle },
                { title: 'Manage All', href: '/allowed-numbers', icon: Settings },
            ]
        }
    ] : []),
];

    return (
        <Sidebar 
            collapsible="icon" 
            className="bg-white border-r border-gray-100 font-sans"
        >
            {/* --- HEADER --- */}
            <SidebarHeader className="h-24 flex items-center justify-center">
                <Link href="/dashboard" className="flex items-center gap-3 group transition-all duration-300">
                    {/* Logo Box */}
                    <div className="w-10 h-10 bg-[#37368b] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                        <AppLogoIcon className="w-6 h-6 fill-current" />
                    </div>
                    
                    {/* Logo Text */}
                    {state === 'expanded' && (
                        <div className="flex flex-col leading-none">
                            <span className="font-extrabold text-xl text-[#37368b] tracking-tight">
                                Goldfield<span className="text-[#F59E0B]">.</span> {/* Yellow Dot */}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pl-0.5">
                                Portal
                            </span>
                        </div>
                    )}
                </Link>
            </SidebarHeader>

            {/* --- CONTENT --- */}
            <SidebarContent className="px-3 py-4 custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-bold text-gray-400/80 uppercase tracking-widest mb-4 px-4">
                        Main Menu
                    </SidebarGroupLabel>
                    
                    <SidebarMenu className="gap-1.5">
                        {navItems.map((item: any) => (
                            <SidebarMenuItem key={item.title}>
                                {item.items ? (
                                    // --- COLLAPSIBLE ITEM ---
                                    <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton 
                                                tooltip={item.title}
                                                className={`
                                                    h-12 w-full justify-between rounded-xl px-4 transition-all duration-200
                                                    text-gray-500 hover:text-[#37368b] hover:bg-[#37368b]/5
                                                    group-data-[state=open]/collapsible:text-[#37368b] group-data-[state=open]/collapsible:bg-[#37368b]/5
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
                                                    <span className="font-semibold">{item.title}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 transition-transform duration-200 text-gray-400 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="mt-1 ml-4 border-l-2 border-gray-100 pl-2 space-y-1">
                                                {item.items.map((subItem: any) => (
                                                    <SidebarMenuButton 
                                                        key={subItem.title} 
                                                        asChild 
                                                        className={`
                                                            h-10 rounded-lg pl-4 text-sm font-medium transition-colors
                                                            ${isActive(subItem.href)
                                                                ? 'text-[#37368b] bg-[#37368b]/10' 
                                                                : 'text-gray-500 hover:text-[#37368b] hover:bg-transparent'
                                                            }
                                                        `}
                                                    >
                                                        <Link href={subItem.href} className="flex items-center gap-2">
                                                            {/* Yellow Dot for active Sub-items */}
                                                            {isActive(subItem.href) && <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />}
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    // --- SINGLE ITEM (The "Cademic" Look) ---
                                    <SidebarMenuButton 
                                        asChild 
                                        tooltip={item.title}
                                        className={`
                                            h-12 rounded-xl px-4 transition-all duration-200 relative overflow-hidden group
                                            ${item.active 
                                                ? 'bg-[#37368b]/5 text-[#37368b]' // Active Background
                                                : 'text-gray-500 hover:bg-[#37368b]/5 hover:text-[#37368b]' // Hover State
                                            }
                                        `}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3">
                                            {/* ACTIVE INDICATOR: The Yellow Vertical Bar */}
                                            {item.active && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[4px] bg-[#F59E0B] rounded-r-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                                            )}
                                            
                                            {item.icon && (
                                                <item.icon 
                                                    className={`
                                                        w-5 h-5 transition-colors 
                                                        ${item.active ? 'text-[#37368b] fill-[#37368b]/10' : 'text-gray-400 group-hover:text-[#37368b]'}
                                                    `} 
                                                />
                                            )}
                                            <span className={`font-semibold ${item.active ? 'font-bold' : ''}`}>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* --- FOOTER --- */}
            <SidebarFooter className="p-4 bg-white border-t border-gray-50">
                <div className="bg-gray-50 rounded-2xl p-1.5 border border-gray-100 hover:border-gray-200 transition-colors">
                    <NavUser user={user} />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}