"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  HistoryIcon, 
  CompassIcon, 
  HeartIcon, 
  BookOpenIcon, 
  SettingsIcon,
  PawPrint
} from "lucide-react"

// Data untuk Jelajah Satwa
const data = {
  user: {
    name: "Guest User",
    email: "guest@jelajahsatwa.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Jelajah Satwa",
      logo: (
        <PawPrint className="text-amber-600" />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
      isActive: true,
    },
    {
      title: "Jelajah Satwa",
      url: "/create",
      icon: (
        <CompassIcon />
      ),
      isActive: false,
    },
    {
      title: "History",
      url: "#",
      icon: (
        <HistoryIcon />
      ),
      items: [
        {
          title: "Semua History",
          url: "/history",
        },
        {
          title: "Favorit",
          url: "/history/favorites",
        },
        {
          title: "Terakhir Dilihat",
          url: "/history/recent",
        },
      ],
    },
    {
      title: "Koleksi",
      url: "#",
      icon: (
        <HeartIcon />
      ),
      items: [
        {
          title: "Mamalia",
          url: "/collection/mammals",
        },
        {
          title: "Aves (Burung)",
          url: "/collection/birds",
        },
        {
          title: "Reptilia",
          url: "/collection/reptiles",
        },
        {
          title: "Amfibi",
          url: "/collection/amphibians",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Belajar Satwa",
      url: "/learn",
      icon: (
        <BookOpenIcon />
      ),
    },
    {
      name: "Pengaturan",
      url: "/settings",
      icon: (
        <SettingsIcon />
      ),
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
