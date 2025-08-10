"use client";

import { UserButton } from "@clerk/nextjs";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-8 w-8 rounded-lg",
                            },
                        }}
                    />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
