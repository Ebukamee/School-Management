import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronsUpDown, LogOut, Settings } from "lucide-react"
import { Link } from "@inertiajs/react"

interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface NavUserProps {
    user: User;
}

export function NavUser({ user }: NavUserProps) {
    
    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 px-3 py-2 w-full rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group select-none">
                    <Avatar className="h-9 w-9 rounded-lg border border-gray-200 bg-white">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-[#37368b] text-white font-bold">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-gray-700 group-hover:text-[#37368b] transition-colors">
                            {user.name}
                        </span>
                        <span className="truncate text-xs text-gray-400">
                            {user.email}
                        </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-gray-400 group-hover:text-[#37368b]" />
                </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-gray-100 shadow-lg bg-white"
                side="right"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg bg-[#37368b] text-white">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-gray-700">{user.name}</span>
                            <span className="truncate text-xs text-gray-500">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="bg-gray-100" />
                
                {/* --- SIMPLIFIED MENU --- */}
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="text-gray-600 focus:text-[#37368b] focus:bg-blue-50 cursor-pointer">
                        <Link href="/settings" className="w-full flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator className="bg-gray-100" />
                
                <DropdownMenuItem asChild className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                    <Link href="/logout" method="post" as="button" className="w-full flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}