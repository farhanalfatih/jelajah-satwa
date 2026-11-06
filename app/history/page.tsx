"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Search, Trash2, Eye } from 'lucide-react'

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data history
  const historyData = [
    { 
      id: 1, 
      name: "Harimau Sumatera", 
      level: "Pemula", 
      date: "10 Nov 2024, 14:30",
      category: "Mamalia",
      icon: "🐯",
      isFavorite: true
    },
    { 
      id: 2, 
      name: "Gajah Afrika", 
      level: "Menengah", 
      date: "9 Nov 2024, 10:15",
      category: "Mamalia",
      icon: "🐘",
      isFavorite: false
    },
    { 
      id: 3, 
      name: "Panda Raksasa", 
      level: "Lanjutan", 
      date: "8 Nov 2024, 16:45",
      category: "Mamalia",
      icon: "🐼",
      isFavorite: true
    },
    { 
      id: 4, 
      name: "Singa", 
      level: "Pemula", 
      date: "7 Nov 2024, 09:20",
      category: "Mamalia",
      icon: "🦁",
      isFavorite: false
    },
    { 
      id: 5, 
      name: "Koala", 
      level: "Menengah", 
      date: "6 Nov 2024, 13:00",
      category: "Mamalia",
      icon: "🐨",
      isFavorite: true
    },
    { 
      id: 6, 
      name: "Komodo", 
      level: "Lanjutan", 
      date: "5 Nov 2024, 11:30",
      category: "Reptilia",
      icon: "🦎",
      isFavorite: false
    },
  ]

  const filteredHistory = historyData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout breadcrumbs={[{ label: 'History' }]}>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">History Penjelajahan</h1>
              <p className="text-stone-600 mt-1">Lihat semua hewan yang pernah kamu jelajahi</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700">
                <Heart className="w-4 h-4 mr-2" />
                Favorit
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari hewan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6"
            />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground">Total Penjelajahan</p>
            <p className="text-2xl font-bold mt-1">{historyData.length}</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground">Favorit</p>
            <p className="text-2xl font-bold mt-1">
              {historyData.filter(h => h.isFavorite).length}
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground">Kategori</p>
            <p className="text-2xl font-bold mt-1">2</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                        {item.level}
                      </span>
                      <span className="text-sm text-stone-500">{item.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className={item.isFavorite ? "text-rose-500" : ""}
                  >
                    <Heart 
                      className="w-4 h-4" 
                      fill={item.isFavorite ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium text-stone-600">Tidak ada hasil</p>
              <p className="text-sm text-muted-foreground mt-1">
                Coba kata kunci lain
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
