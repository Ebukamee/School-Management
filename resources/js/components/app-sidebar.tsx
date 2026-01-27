import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Calendar, BarChart3, Home, Users, PlusCircle, FileEdit, List } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';
import { useEffect, useState } from 'react';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isTeacherOrAdmin = user.role === 'teacher' || user.role === 'admin';

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Schedule',
            href: '/schedule',
            icon: Calendar,
        },

        // --- RESULTS (Teacher: Create/Update | Student: View) ---
        ...(isTeacherOrAdmin ? [
            {
                title: 'Results',
                href: '#', 
                icon: BarChart3,
                items: [
                    { title: 'Create Result', href: '/results/create', icon: PlusCircle },
                    { title: 'Update Results', href: '/results/manage', icon: FileEdit },
                ],
            }
        ] : [
            { title: 'Results', href: '/results', icon: BarChart3 }
        ]),

        // --- CLASSES (Teacher: View All + Create | Student: View) ---
        ...(isTeacherOrAdmin ? [
            {
                title: 'Classes',
                href: '#',
                icon: Users,
                items: [
                    { title: 'View Classes', href: '/classes', icon: List }, // <-- Allows visiting /classes
                    { title: 'Create Class', href: '/classes/create', icon: PlusCircle },
                    { title: 'Update Class', href: '/classes/update', icon: FileEdit },
                ],
            }
        ] : [
            { title: 'Classes', href: '/classes', icon: Users }
        ]),

        // --- HOMEWORK (Teacher: View All + Create | Student: View) ---
        ...(isTeacherOrAdmin ? [
            {
                title: 'Homework',
                href: '#',
                icon: Home,
                items: [
                    { title: 'View Homework', href: '/homework', icon: List }, // <-- Allows visiting /homework
                    { title: 'Create Homework', href: '/homework/create', icon: PlusCircle },
                    { title: 'Manage Homework', href: '/homework/manage', icon: FileEdit },
                ],
            }
        ] : [
            { title: 'Homework', href: '/homework', icon: Home }
        ]),
    ];

    return (
        <Sidebar 
            collapsible="icon" 
            variant="inset"
            className="bg-gradient-to-b from-white to-yellow-50/30 border-r-2 border-yellow-400"
        >
            <SidebarHeader className="border-b border-[#37368b]/10 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            asChild
                            className="bg-[#37368b] hover:bg-[#2a2970] border-2 border-yellow-400 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                            <Link href={dashboard()} prefetch>
                                <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-20">
                                    <div className={`transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}`}>
                                        <AppLogoIcon className="w-full h-full" /> 
                                    </div>
                                    <h1 className={`font-bold tracking-tight transition-colors duration-300 ${
                                        isScrolled ? 'text-[#1e40af] text-lg' : 'text-white text-xl'
                                    }`}>
                                        Goldfield<span className="font-light opacity-80">Jr.</span>
                                    </h1>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="p-4">
                <div className="mb-4 px-2">
                    <h3 className="text-[#37368b] font-bold text-sm uppercase tracking-wide">Main Menu</h3>
                </div>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-[#37368b]/10">
                <div className="mb-4 px-2">
                    <h3 className="text-[#37368b] font-bold text-sm uppercase tracking-wide">Resources</h3>
                </div>
                <div className="mt-6">
                    <NavUser />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}