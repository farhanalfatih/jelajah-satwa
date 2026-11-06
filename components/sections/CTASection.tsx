"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold">
          Siap Menjelajahi Dunia Satwa?
        </h2>
        <p className="text-xl md:text-2xl text-amber-50 leading-relaxed max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pelajar yang telah menemukan cara baru untuk mempelajari 
          tentang kehidupan satwa di seluruh dunia.
        </p>

        {/* Features List */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">✓</span>
            </div>
            <span className="text-amber-50">Informasi akurat dari AI</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">✓</span>
            </div>
            <span className="text-amber-50">Gratis untuk semua level</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">✓</span>
            </div>
            <span className="text-amber-50">Tanpa batasan pencarian</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">✓</span>
            </div>
            <span className="text-amber-50">Update informasi terkini</span>
          </div>
        </div>

        <div className="pt-8">
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-amber-600 hover:bg-stone-50">
              Jelajah Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
