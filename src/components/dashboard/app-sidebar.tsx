"use client"

import * as React from "react"
import {
    GalleryVerticalEnd,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    teams: [
        {
            name: "SmartEco",
            logo: GalleryVerticalEnd,
            plan: "Smart Dashboard",
        },
    ],
    navMain: [
        {
            title: "Overview",
            url: "dashboard",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "/dashboard/history",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
