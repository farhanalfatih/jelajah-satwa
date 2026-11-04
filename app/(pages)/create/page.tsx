
"use client";

import React, { useState } from "react";

import Step1 from "./section/stap1";
import Step2 from "./section/step2";
import Step3 from "./section/step3";

import {
  analyzeAnimal,
  HasilAnalisis,
  LevelPemahaman,
} from "@/lib/api";

const initialResult: HasilAnalisis = {
  deskripsi: "",
  habitat: "",
  makanan: "",
  faktaMenarik: [],
  statusKonservasi: "",
};

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [namaHewan, setNamaHewan] = useState("");

  const [levelPemahaman, setLevelPemahaman] =
    useState<LevelPemahaman | "">("");

  const [hasilAnalisis, setHasilAnalisis] =
    useState<HasilAnalisis>(initialResult);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Analisis hewan
  const handleNextToStep2 = async () => {
    if (!namaHewan.trim() || !levelPemahaman) {
      setError("Lengkapi nama hewan dan level pemahaman.");
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentStep(2);

    try {
      const hasil = await analyzeAnimal(
        namaHewan.trim(),
        levelPemahaman
      );

      setHasilAnalisis(hasil);
      setCurrentStep(3);

    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menganalisis hewan.";

      console.error("Analysis error:", err);

      setError(message);
      setCurrentStep(1);

    } finally {
      setLoading(false);
    }
  };

  // Reset
  const handleReset = () => {
    setCurrentStep(1);
    setNamaHewan("");
    setLevelPemahaman("");
    setHasilAnalisis(initialResult);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-8">

      {/* Progress Indicator */}
      <div className="max-w-3xl mx-auto px-6 mb-8">

        <div className="flex items-center justify-center gap-2">

          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>

              <div
                className={`flex items-center justify-center
                w-10 h-10 rounded-full font-semibold
                transition-all ${
                  currentStep === step
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step ? "✓" : step}
              </div>

              {step < 3 && (
                <div
                  className={`w-16 h-1 transition-all ${
                    currentStep > step
                      ? "bg-green-500"
                      : "bg-muted"
                  }`}
                />
              )}

            </React.Fragment>
          ))}

        </div>

        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Input Data</span>
          <span>Analisis</span>
          <span>Hasil</span>
        </div>

      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto px-6 mb-6">
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Step 1 */}
      {currentStep === 1 && (
        <Step1
          namaHewan={namaHewan}
          setNamaHewan={setNamaHewan}
          levelPemahaman={levelPemahaman}
          setLevelPemahaman={setLevelPemahaman}
          onNext={handleNextToStep2}
        />
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <Step2 namaHewan={namaHewan} />
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <Step3
          namaHewan={namaHewan}
          levelPemahaman={levelPemahaman}
          hasilAnalisis={hasilAnalisis}
          onReset={handleReset}
        />
      )}

    </div>
  );
}
