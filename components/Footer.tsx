"use client"

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Jelajah Satwa</h3>
            <p className="text-stone-400 leading-relaxed">
              Platform pembelajaran interaktif tentang dunia satwa powered by AI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-amber-400 transition-colors">
                  Jelajah
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-400">
            © 2024 Jelajah Satwa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
              Twitter
            </a>
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
