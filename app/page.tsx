"use client"

import React from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPage