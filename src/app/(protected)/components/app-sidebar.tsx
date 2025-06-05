import { CalendarDays, LayoutDashboard, Stethoscope, UsersRound } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
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

export function AppSidebar() {
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
        </Sidebar>
    )
}