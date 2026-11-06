"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface Step1Props {
  namaHewan: string
  setNamaHewan: (value: string) => void
  levelPemahaman: string
  setLevelPemahaman: (value: string) => void
  onNext: () => void
}

const Step1 = ({ namaHewan, setNamaHewan, levelPemahaman, setLevelPemahaman, onNext }: Step1Props) => {
  const [subScreen, setSubScreen] = useState<'nama' | 'level'>('nama')

  const levels = [
    { 
      value: 'pemula', 
      label: 'Pemula', 
      desc: 'Penjelasan dasar dan mudah dipahami',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: 'menengah', 
      label: 'Menengah', 
      desc: 'Informasi lebih detail dengan istilah ilmiah',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: 'lanjutan', 
      label: 'Lanjutan', 
      desc: 'Penjelasan mendalam dan komprehensif',
      icon: '🎓',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const handleNamaNext = () => {
    if (namaHewan.trim()) {
      setSubScreen('level')
    }
  }

  const handleLevelSelect = (value: string) => {
    setLevelPemahaman(value)
    // Auto proceed setelah pilih level
    setTimeout(() => {
      onNext()
    }, 300)
  }

  const handleBack = () => {
    setSubScreen('nama')
  }

  return (
    <div className="h-screen flex items-center justify-center px-6 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="max-w-2xl w-full">
        {/* Screen 1: Input Nama Hewan */}
        {subScreen === 'nama' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🦁</div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
                Jelajahi Dunia Satwa
              </h1>
              <p className="text-xl text-stone-600">
                Masukkan nama hewan yang ingin kamu pelajari
              </p>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="namaHewan"
                  type="text"
                  placeholder="Contoh: Harimau, Gajah, Panda..."
                  value={namaHewan}
                  onChange={(e) => setNamaHewan(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && namaHewan.trim()) {
                      handleNamaNext()
                    }
                  }}
                  className="w-full text-xl py-7 px-6 rounded-2xl border-2 border-stone-200 focus:border-amber-500 transition-all"
                  autoFocus
                />
              </div>

              {/* Popular Animals Suggestions */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['Harimau', 'Gajah', 'Panda', 'Singa', 'Koala'].map((animal) => (
                  <button
                    key={animal}
                    onClick={() => setNamaHewan(animal)}
                    className="px-4 py-2 rounded-full bg-white border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-all text-sm"
                  >
                    {animal}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleNamaNext}
                className="w-full py-7 text-lg rounded-2xl bg-amber-600 hover:bg-amber-700"
                size="lg"
                disabled={!namaHewan.trim()}
              >
                Lanjutkan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Step Indicator */}
            <div className="text-center text-sm text-stone-500">
              Langkah 1 dari 2
            </div>
          </div>
        )}

        {/* Screen 2: Pilih Level Pemahaman */}
        {subScreen === 'level' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-800 font-medium mb-4">
                {namaHewan}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
                Pilih Level Pemahaman
              </h1>
              <p className="text-xl text-stone-600">
                Pilih tingkat detail informasi yang kamu inginkan
              </p>
            </div>

            {/* Level Cards */}
            <div className="grid gap-4">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleLevelSelect(level.value)}
                  className={`group relative overflow-hidden p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${
                    levelPemahaman === level.value
                      ? 'border-amber-500 bg-amber-50 ring-4 ring-amber-100'
                      : 'border-stone-200 bg-white hover:border-amber-400 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon with gradient */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                      {level.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-stone-900 mb-1">
                        {level.label}
                      </div>
                      <div className="text-stone-600">
                        {level.desc}
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <ArrowRight className={`w-6 h-6 transition-all ${
                      levelPemahaman === level.value 
                        ? 'text-amber-600' 
                        : 'text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 py-7 text-lg rounded-2xl border-2"
                size="lg"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Kembali
              </Button>
            </div>

            {/* Step Indicator */}
            <div className="text-center text-sm text-stone-500">
              Langkah 2 dari 2
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step1