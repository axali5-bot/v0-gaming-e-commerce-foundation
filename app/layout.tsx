import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/language-context'
import { AuthProvider } from '@/contexts/auth-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { CartProvider } from '@/contexts/cart-context'
import { UserProvider } from '@/contexts/user-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AIAssistant } from '@/components/ai-assistant'
import { ToastProvider } from '@/contexts/toast-context'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'GameVault - Premium Gaming Store',
    template: '%s | GameVault',
  },
  description: 'Your ultimate destination for gaming. Discover PS4, PS5, and Xbox games with instant digital delivery. Best prices in Georgian Lari.',
  keywords: ['games', 'gaming', 'e-commerce', 'video games', 'PS4', 'PS5', 'Xbox', 'digital games', 'game keys', 'Georgia gaming'],
  authors: [{ name: 'GameVault' }],
  creator: 'GameVault',
  publisher: 'GameVault',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'GameVault - Premium Gaming Store',
    description: 'Your ultimate destination for gaming. Discover PS4, PS5, and Xbox games with instant digital delivery.',
    type: 'website',
    locale: 'ka_GE',
    alternateLocale: ['en_US', 'ru_RU'],
    siteName: 'GameVault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameVault - Premium Gaming Store',
    description: 'Your ultimate destination for gaming. Instant digital delivery.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#0d0d14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ka">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <UserProvider>
                <WishlistProvider>
                  <CartProvider>
                    <Header />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                    <AIAssistant />
                  </CartProvider>
                </WishlistProvider>
              </UserProvider>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
