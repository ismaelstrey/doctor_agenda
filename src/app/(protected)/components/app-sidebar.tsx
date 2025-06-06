import { CalendarDays, LayoutDashboard, Stethoscope, UsersRound } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import ButtonExit from "./button-exit"

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "Agendamentos",
        url: "/appointments",
        icon: CalendarDays,
    },
    {
        title: "Médicos",
        url: "/doctors",
        icon: Stethoscope,
    },
    {
        title: "Pacientes",
        url: "/patients",
        icon: UsersRound,
    },

]

export async function AppSidebar() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/login");
    }
  

    return (
        <Sidebar>
            <SidebarHeader className="border-b p-4">
                <Image
                    src="/logo.svg"
                    alt="Doutor agenda"
                    width={136}
                    height={28}
                    className="mx-auto"
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="justify-center mb-4 border-t">
                <SidebarContent>                   
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <SidebarMenuButton>
                                    {session?.user?.email}
             
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                          <SidebarMenuButton asChild>
                          <ButtonExit/>
                            </SidebarMenuButton>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarContent>                
            </SidebarFooter>
        </Sidebar>
    )
}