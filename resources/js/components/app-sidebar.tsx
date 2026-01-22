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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, BookText, Calendar, BarChart3, Home, Users } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { useEffect, useState } from 'react';

const mainNavItems: NavItem[] = [
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
    {
        title: 'Results',
        href: '/results',
        icon: BarChart3,
    },
    {
        title: 'Classes',
        href: '/classes',
        icon: Users,
    },
    {
        title: 'Homework',
        href: '/homework',
        icon: Home,
    },
];



export function AppSidebar() {
     const [isScrolled, setIsScrolled] = useState(false);
    
      useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
                <NavMain 
                    items={mainNavItems} 
                    // className="space-y-1"
                />
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-[#37368b]/10">
                <div className="mb-4 px-2">
                    <h3 className="text-[#37368b] font-bold text-sm uppercase tracking-wide">Resources</h3>
                </div>
                <div className="mt-6">
                    <NavUser />
                </div>
                
                {/* Fun decorative element */}
                <div className="mt-4 pt-4 border-t border-[#37368b]/10">
                    <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#37368b] rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-center text-xs text-[#37368b]/60 mt-2 font-medium">
                        Learning is Fun! 🎓
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}