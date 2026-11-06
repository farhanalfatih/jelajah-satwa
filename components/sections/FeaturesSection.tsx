"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Search, BookOpen, Heart } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Search,
    title: "Pencarian Cerdas",
    description: "Cukup masukkan nama hewan, AI kami akan memberikan informasi lengkap dan akurat tentang habitat, makanan, dan fakta menarik dalam hitungan detik.",
    image: "🔍",
    color: "from-blue-500 to-cyan-500",
    link: "/create"
  },
  {
    id: 2,
    icon: BookOpen,
    title: "3 Level Pemahaman",
    description: "Pilih level pemula, menengah, atau lanjutan. Penjelasan disesuaikan dengan tingkat pemahamanmu untuk pengalaman belajar yang optimal dan efektif.",
    image: "📚",
    color: "from-purple-500 to-pink-500",
    link: "/create"
  },
  {
    id: 3,
    icon: Heart,
    title: "Koleksi Favoritmu",
    description: "Simpan hewan favoritmu dalam koleksi pribadi. Akses kapan saja untuk belajar kembali tentang satwa yang kamu suka dan bagikan dengan teman.",
    image: "❤️",
    color: "from-rose-500 to-red-500",
    link: "/dashboard"
  }
]

const FeaturesSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0)

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  const feature = features[currentFeature]
  const Icon = feature.icon

  return (
    <section id="features" className="relative h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Jelajah Satwa menyediakan berbagai fitur untuk pengalaman belajar yang menyenangkan
          </p>
        </div>

        {/* Feature Slider */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Image/Icon */}
            <div className="relative">
              <div className={`aspect-square rounded-3xl bg-gradient-to-br ${feature.color} p-12 flex items-center justify-center shadow-2xl transform transition-all duration-500`}>
                <div className="text-9xl">{feature.image}</div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-300 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                <Icon className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  Fitur {currentFeature + 1} dari {features.length}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-stone-900">
                {feature.title}
              </h3>

              <p className="text-xl text-stone-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="pt-4">
                <Link href={feature.link}>
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Coba Fitur Ini
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevFeature}
              className="p-3 rounded-full bg-stone-100 hover:bg-amber-600 hover:text-white transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 px-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentFeature
                      ? 'w-8 h-3 bg-amber-600'
                      : 'w-3 h-3 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextFeature}
              className="p-3 rounded-full bg-stone-100 hover:bg-amber-600 hover:text-white transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
