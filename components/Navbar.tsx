"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-amber-600">🦁</div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-stone-900' : 'text-stone-900'
            }`}>
              Jelajah Satwa
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors hover:text-amber-600 ${
                isScrolled ? 'text-stone-700' : 'text-stone-900'
              }`}
            >
              Beranda
            </Link>
            <Link 
              href="#features" 
              className={`font-medium transition-colors hover:text-amber-600 ${
                isScrolled ? 'text-stone-700' : 'text-stone-900'
              }`}
            >
              Fitur
            </Link>
            <Link 
              href="#how-it-works" 
              className={`font-medium transition-colors hover:text-amber-600 ${
                isScrolled ? 'text-stone-700' : 'text-stone-900'
              }`}
            >
              Cara Kerja
            </Link>
            <Link 
              href="/dashboard" 
              className={`font-medium transition-colors hover:text-amber-600 ${
                isScrolled ? 'text-stone-700' : 'text-stone-900'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/create">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Mulai Jelajah
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-900" />
            ) : (
              <Menu className="w-6 h-6 text-stone-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="block font-medium text-stone-700 hover:text-amber-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              href="#features" 
              className="block font-medium text-stone-700 hover:text-amber-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fitur
            </Link>
            <Link 
              href="#how-it-works" 
              className="block font-medium text-stone-700 hover:text-amber-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cara Kerja
            </Link>
            <Link 
              href="/dashboard" 
              className="block font-medium text-stone-700 hover:text-amber-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link href="/create" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Mulai Jelajah
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
