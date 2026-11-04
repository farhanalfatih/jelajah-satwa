"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Step1Props {
  namaHewan: string
  setNamaHewan: (value: string) => void
  levelPemahaman: string
  setLevelPemahaman: (value: string) => void
  onNext: () => void
}

const Step1 = ({ namaHewan, setNamaHewan, levelPemahaman, setLevelPemahaman, onNext }: Step1Props) => {
  const levels = [
    { value: 'pemula', label: 'Pemula', desc: 'Penjelasan dasar dan mudah dipahami' },
    { value: 'menengah', label: 'Menengah', desc: 'Informasi lebih detail dengan istilah ilmiah' },
    { value: 'lanjutan', label: 'Lanjutan', desc: 'Penjelasan mendalam dan komprehensif' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (namaHewan.trim() && levelPemahaman) {
      onNext()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Jelajahi Dunia Satwa</h1>
          <p className="text-muted-foreground">
            Masukkan nama hewan yang ingin kamu pelajari
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Nama Hewan */}
          <div className="space-y-2">
            <label htmlFor="namaHewan" className="text-sm font-medium">
              Nama Hewan
            </label>
            <Input
              id="namaHewan"
              type="text"
              placeholder="Contoh: Harimau, Gajah, Panda..."
              value={namaHewan}
              onChange={(e) => setNamaHewan(e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Pilihan Level Pemahaman */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Level Pemahaman
            </label>
            <div className="grid gap-3">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setLevelPemahaman(level.value)}
                  className={`p-4 border rounded-lg text-left transition-all hover:border-primary ${
                    levelPemahaman === level.value
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border'
                  }`}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {level.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Button Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!namaHewan.trim() || !levelPemahaman}
          >
            Mulai Jelajah
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Step1