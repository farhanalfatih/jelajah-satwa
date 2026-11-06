"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative h-screen flex items-center justify-center px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            Cara Kerja
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Mulai penjelajahan satwa hanya dalam 3 langkah mudah
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative mb-16">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 -z-10" 
               style={{width: 'calc(100% - 8rem)', left: '4rem'}} />

          {/* Step 1 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Pilih Hewan</h3>
              <p className="text-stone-600 leading-relaxed">
                Masukkan nama hewan yang ingin kamu pelajari. Bisa nama umum atau nama ilmiah.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Tentukan Level</h3>
              <p className="text-stone-600 leading-relaxed">
                Pilih level pemahaman: pemula, menengah, atau lanjutan sesuai kebutuhanmu.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Dapatkan Info</h3>
              <p className="text-stone-600 leading-relaxed">
                AI akan menganalisis dan memberikan informasi lengkap dalam hitungan detik.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-6 bg-amber-600 hover:bg-amber-700">
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
