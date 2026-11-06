"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface Step3Props {
  namaHewan: string
  levelPemahaman: string
  hasilAnalisis: {
    deskripsi: string
    habitat: string
    makanan: string
    faktaMenarik: string[]
    statusKonservasi: string
    namaIlmiah?: string
  }
  onReset: () => void
}

const Step3 = ({ namaHewan, levelPemahaman, hasilAnalisis, onReset }: Step3Props) => {
  const [foto, setFoto] = useState<string | null>(null)
  const [loadingFoto, setLoadingFoto] = useState(true)

  useEffect(() => {
    const fetchFoto = async () => {
      try {
        setLoadingFoto(true)
        const response = await fetch(`/api/animal-photo?animal=${encodeURIComponent(namaHewan)}`)
        const data = await response.json()
        
        if (data.success && data.imageUrl) {
          setFoto(data.imageUrl)
        }
      } catch (error) {
        console.error('Error fetching photo:', error)
      } finally {
        setLoadingFoto(false)
      }
    }

    fetchFoto()
  }, [namaHewan])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm font-medium">
            ✓ Analisis Selesai
          </div>
          <h1 className="text-3xl font-bold">{namaHewan}</h1>
          {hasilAnalisis.namaIlmiah && (
            <p className="text-sm italic text-muted-foreground">
              {hasilAnalisis.namaIlmiah}
            </p>
          )}
          <p className="text-muted-foreground">
            Level: <span className="capitalize font-medium">{levelPemahaman}</span>
          </p>
        </div>

        <Separator />

        {/* Photo Section */}
        {loadingFoto ? (
          <div className="w-full h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Memuat foto...</span>
          </div>
        ) : foto ? (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-muted">
            <Image
              src={foto}
              alt={namaHewan}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}

        <Separator />

        {/* Konten Hasil */}
        <div className="space-y-6">
          {/* Deskripsi */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Deskripsi
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {hasilAnalisis.deskripsi}
            </p>
          </section>

          {/* Habitat */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              Habitat
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {hasilAnalisis.habitat}
            </p>
          </section>

          {/* Makanan */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">🍖</span>
              Makanan
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {hasilAnalisis.makanan}
            </p>
          </section>

          {/* Fakta Menarik */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Fakta Menarik
            </h2>
            <ul className="space-y-2">
              {hasilAnalisis.faktaMenarik.map((fakta, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span className="leading-relaxed">{fakta}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Status Konservasi */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              Status Konservasi
            </h2>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground leading-relaxed">
                {hasilAnalisis.statusKonservasi}
              </p>
            </div>
          </section>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-3 md:grid">
          <Button onClick={onReset} variant="outline" className="flex-1">
            Jelajahi Hewan Lain
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step3
