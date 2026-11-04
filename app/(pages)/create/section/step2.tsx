"use client"

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Step2Props {
  namaHewan: string
}

const Step2 = ({ namaHewan }: Step2Props) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Menganalisis Informasi</h2>
            <p className="text-muted-foreground">
              AI sedang mengumpulkan informasi tentang <span className="font-semibold text-foreground">{namaHewan}</span>
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="space-y-4 pt-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="pt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Mencari data tentang {namaHewan}...</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Menganalisis karakteristik...</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Menyusun informasi...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2
