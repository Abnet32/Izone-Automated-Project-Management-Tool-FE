"use client";

import { Sidebar, SidebarHeader, SidebarSeparator, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Home, LayoutTemplate, Calendar, Search, Settings } from "lucide-react";
import { WorkspaceGroup } from "./sidebar/WorkspaceGroup";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Boards", url: "/boards", icon: LayoutTemplate },
  { title: "Templates", url: "/templates", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex items-center gap-2">
              <Link href="/">
                <Image src="/Group%2010.png" alt="logo" width={26} height={26} />
                <span className="font-semibold">Trello</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        <WorkspaceGroup />
      </SidebarContent>
    </Sidebar>
  );
}




// "use client"

// import * as React from "react"
// import {
//   IconCamera,
//   IconChartBar,
//   IconDashboard,
//   IconDatabase,
//   IconFileAi,
//   IconFileDescription,
//   IconFileWord,
//   IconFolder,
//   IconHelp,
//   IconInnerShadowTop,
//   IconListDetails,
//   IconReport,
//   IconSearch,
//   IconSettings,
//   IconUsers,
// } from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
// import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: IconDashboard,
//     },
//     {
//       title: "Lifecycle",
//       url: "#",
//       icon: IconListDetails,
//     },
//     {
//       title: "Analytics",
//       url: "#",
//       icon: IconChartBar,
//     },
//     {
//       title: "Projects",
//       url: "#",
//       icon: IconFolder,
//     },
//     {
//       title: "Team",
//       url: "#",
//       icon: IconUsers,
//     },
//   ],
//   navClouds: [
//     {
//       title: "Capture",
//       icon: IconCamera,
//       isActive: true,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Proposal",
//       icon: IconFileDescription,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Prompts",
//       icon: IconFileAi,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Settings",
//       url: "#",
//       icon: IconSettings,
//     },
//     {
//       title: "Get Help",
//       url: "#",
//       icon: IconHelp,
//     },
//     {
//       title: "Search",
//       url: "#",
//       icon: IconSearch,
//     },
//   ],
//   documents: [
//     {
//       name: "Data Library",
//       url: "#",
//       icon: IconDatabase,
//     },
//     {
//       name: "Reports",
//       url: "#",
//       icon: IconReport,
//     },
//     {
//       name: "Word Assistant",
//       url: "#",
//       icon: IconFileWord,
//     },
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <a href="#">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">Acme Inc.</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
