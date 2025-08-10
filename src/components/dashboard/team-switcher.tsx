"use client"

import Link from "next/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function TeamSwitcher({
    teams,
}: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
        url?: string
    }[]
}) {
    if (!teams || teams.length === 0) return null

    const team = teams[0] // ambil tim pertama langsung

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                    <Link href={team.url ?? "/dashboard"} className="flex items-center gap-2 w-full">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <team.logo className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{team.name}</span>
                            <span className="truncate text-xs">{team.plan}</span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
