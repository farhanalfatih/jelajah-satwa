"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-stone-50 -z-10" />
      
      <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-sm border border-stone-200 animate-fade-in">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
          <span className="text-xs sm:text-sm font-medium text-stone-700">Jelajahi Dunia Satwa dengan AI</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight px-4">
          Kenali Satwa
          <br />
          <span className="text-amber-600">Lebih Dekat</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed px-4">
          Platform pembelajaran interaktif yang menggunakan AI untuk memberikan informasi lengkap
          tentang berbagai hewan di dunia, disesuaikan dengan tingkat pemahamanmu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 px-4">
          <Link href="/create" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-amber-600 hover:bg-amber-700">
              Mulai Jelajah
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-stone-300 hover:bg-stone-100">
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="pt-8 sm:pt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">1000+</div>
            <div className="text-xs sm:text-sm text-stone-600">Spesies Hewan</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">AI</div>
            <div className="text-xs sm:text-sm text-stone-600">Powered</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">3</div>
            <div className="text-xs sm:text-sm text-stone-600">Level Belajar</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
