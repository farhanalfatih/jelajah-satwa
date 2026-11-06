"use client"

import React, { useState } from 'react'
import Step1 from './section/stap1'
import Step2 from './section/step2'
import Step3 from './section/step3'

interface HasilAnalisis {
  deskripsi: string
  habitat: string
  makanan: string
  faktaMenarik: string[]
  statusKonservasi: string
  namaIlmiah?: string
}

type LevelPemahaman = "pemula" | "menengah" | "lanjutan"

const initialResult: HasilAnalisis = {
  deskripsi: '',
  habitat: '',
  makanan: '',
  faktaMenarik: [],
  statusKonservasi: '',
}

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [namaHewan, setNamaHewan] = useState('')
  const [levelPemahaman, setLevelPemahaman] = useState<LevelPemahaman | ''>('')
  const [hasilAnalisis, setHasilAnalisis] = useState<HasilAnalisis>(initialResult)
  const [error, setError] = useState<string | null>(null)

  // Wrapper function to handle type conversion
  const handleSetLevelPemahaman = (value: string) => {
    setLevelPemahaman(value as LevelPemahaman | '')
  }

  const handleNextToStep2 = async () => {
    if (!namaHewan.trim() || !levelPemahaman) {
      setError('Lengkapi nama hewan dan level pemahaman.')
      return
    }

    setCurrentStep(2)
    setError(null)
    
    try {
      // Panggil API Gemini untuk analisis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaHewan: namaHewan.trim(),
          levelPemahaman,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menganalisis hewan')
      }
      
      // Set hasil analisis
      setHasilAnalisis(data)
      setCurrentStep(3)
      
    } catch (err) {
      console.error('Error analyzing animal:', err)
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat menganalisis hewan'
      setError(errorMessage)
      
      // Kembali ke step 1 jika error
      setCurrentStep(1)
      
      // Tampilkan alert dengan pesan error yang lebih jelas
      if (errorMessage.includes('503') || errorMessage.includes('high demand') || errorMessage.includes('sibuk')) {
        alert('⚠️ Gemini API sedang sibuk.\n\nSolusi:\n1. Coba lagi dalam beberapa menit\n2. Atau set USE_DUMMY_DATA=true di .env.local untuk testing')
      } else if (errorMessage.includes('API key') || errorMessage.includes('API Key')) {
        alert('❌ API Key tidak valid.\n\nCek file .env.local dan pastikan GEMINI_API_KEY sudah benar.')
      } else {
        alert(`❌ Error: ${errorMessage}`)
      }
    }
  }

  // Reset
  const handleReset = () => {
    setCurrentStep(1)
    setNamaHewan('')
    setLevelPemahaman('')
    setHasilAnalisis(initialResult)
    setError(null)
  }

  return (
    <div className="min-h-screen py-8">
      {/* Progress Indicator */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                currentStep === step
                  ? 'bg-primary text-primary-foreground'
                  : currentStep > step
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step ? '✓' : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 transition-all ${
                  currentStep > step ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span className={currentStep === 1 ? 'text-foreground font-medium' : ''}>Input Data</span>
          <span className={currentStep === 2 ? 'text-foreground font-medium' : ''}>Analisis</span>
          <span className={currentStep === 3 ? 'text-foreground font-medium' : ''}>Hasil</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto px-6 mb-6">
          <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        </div>
      )}

      {/* Step Components */}
      {currentStep === 1 && (
        <Step1
          namaHewan={namaHewan}
          setNamaHewan={setNamaHewan}
          levelPemahaman={levelPemahaman}
          setLevelPemahaman={handleSetLevelPemahaman}
          onNext={handleNextToStep2}
        />
      )}

      {currentStep === 2 && (
        <Step2 namaHewan={namaHewan} />
      )}

      {currentStep === 3 && (
        <Step3
          namaHewan={namaHewan}
          levelPemahaman={levelPemahaman}
          hasilAnalisis={hasilAnalisis}
          onReset={handleReset}
        />
      )}
    </div>
  )
}