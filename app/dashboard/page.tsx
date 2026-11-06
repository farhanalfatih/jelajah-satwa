"use client"

import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Button } from "@/components/ui/button"
import { Search, Heart, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data - nanti bisa diganti dengan real data dari database
  const recentAnimals = [
    { id: 1, name: "Harimau", level: "Pemula", date: "2 jam lalu", icon: "🐯" },
    { id: 2, name: "Gajah", level: "Menengah", date: "1 hari lalu", icon: "🐘" },
    { id: 3, name: "Panda", level: "Lanjutan", date: "2 hari lalu", icon: "🐼" },
  ]

  const stats = [
    { label: "Hewan Dijelajahi", value: "12", icon: Search, color: "text-blue-600" },
    { label: "Favorit", value: "8", icon: Heart, color: "text-rose-600" },
    { label: "Level Tertinggi", value: "Lanjutan", icon: TrendingUp, color: "text-purple-600" },
  ]

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Dashboard' }]}>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
          <p className="text-stone-600">Selamat datang kembali! Lihat aktivitas penjelajahan satwa kamu.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-stone-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Animals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Penjelajahan Terakhir</h2>
            <Link href="/create">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Jelajah Lagi
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recentAnimals.map((animal) => (
              <div
                key={animal.id}
                className="group rounded-xl border bg-card p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{animal.icon}</div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-5 h-5 text-stone-400 hover:text-rose-500 hover:fill-rose-500 transition-colors" />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                    {animal.level}
                  </span>
                  <span>{animal.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State for More Content */}
        <div className="rounded-xl border bg-muted/50 p-12 text-center">
          <div className="text-6xl mb-4">🦁</div>
          <h3 className="text-xl font-bold mb-2">Mulai Petualangan Baru</h3>
          <p className="text-muted-foreground mb-6">
            Jelajahi lebih banyak hewan dan pelajari fakta menarik tentang mereka
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Jelajah Satwa Baru
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
