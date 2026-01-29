'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Product, Platform } from '@/lib/mock-data'
import { useAuth } from './auth-context'

export interface Purchase {
  id: string
  productId: string
  productTitle: string
  productImage: string
  platform: Platform
  price: number
  originalPrice?: number
  purchaseDate: string
  downloadKey: string
}

export interface ReferralData {
  referralCode: string
  referralLink: string
  invitedUsers: number
  successfulReferrals: number
  hasActiveDiscount: boolean
  discountPercentage: number
}

interface UserContextType {
  purchases: Purchase[]
  referralData: ReferralData | null
  addPurchase: (product: Product, platform: Platform, price: number, originalPrice?: number) => void
  applyReferralDiscount: (price: number) => number
  generateReferralCode: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const PURCHASES_STORAGE_KEY = 'gamestore_purchases'
const REFERRAL_STORAGE_KEY = 'gamestore_referral'

// Mock purchase history data
const mockPurchases: Purchase[] = [
  {
    id: 'p1',
    productId: '1',
    productTitle: 'Cyber Nexus 2077',
    productImage: '/games/cyber-nexus.jpg',
    platform: 'PS5',
    price: 159.99,
    originalPrice: 199.99,
    purchaseDate: '2025-12-15T10:30:00Z',
    downloadKey: 'CYBER-XXXX-YYYY-ZZZZ',
  },
  {
    id: 'p2',
    productId: '2',
    productTitle: 'Shadow Warriors: Legends',
    productImage: '/games/shadow-warriors.jpg',
    platform: 'PS5',
    price: 139.99,
    purchaseDate: '2025-11-20T14:45:00Z',
    downloadKey: 'SHADOW-AAAA-BBBB-CCCC',
  },
  {
    id: 'p3',
    productId: '4',
    productTitle: 'Racing Thunder GT',
    productImage: '/games/racing-thunder.jpg',
    platform: 'Xbox',
    price: 99.99,
    originalPrice: 129.99,
    purchaseDate: '2025-10-05T09:15:00Z',
    downloadKey: 'RACING-DDDD-EEEE-FFFF',
  },
]

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [referralData, setReferralData] = useState<ReferralData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      try {
        // Load purchases
        const storedPurchases = localStorage.getItem(`${PURCHASES_STORAGE_KEY}_${user.id}`)
        if (storedPurchases) {
          setPurchases(JSON.parse(storedPurchases))
        } else {
          // Initialize with mock data for demo
          setPurchases(mockPurchases)
          localStorage.setItem(`${PURCHASES_STORAGE_KEY}_${user.id}`, JSON.stringify(mockPurchases))
        }

        // Load referral data
        const storedReferral = localStorage.getItem(`${REFERRAL_STORAGE_KEY}_${user.id}`)
        if (storedReferral) {
          setReferralData(JSON.parse(storedReferral))
        } else {
          // Generate new referral data
          const newReferralData: ReferralData = {
            referralCode: `GV${user.id.slice(-6).toUpperCase()}`,
            referralLink: `https://gamevault.ge/ref/${user.id.slice(-6).toUpperCase()}`,
            invitedUsers: 3, // Mock data
            successfulReferrals: 2, // Mock data
            hasActiveDiscount: true, // Mock data - has active 10% discount
            discountPercentage: 10,
          }
          setReferralData(newReferralData)
          localStorage.setItem(`${REFERRAL_STORAGE_KEY}_${user.id}`, JSON.stringify(newReferralData))
        }
      } catch (error) {
        console.error('Failed to load user data from localStorage:', error)
      }
    } else {
      setPurchases([])
      setReferralData(null)
    }
    setIsLoaded(true)
  }, [isAuthenticated, user])

  // Save purchases to localStorage
  useEffect(() => {
    if (isLoaded && isAuthenticated && user) {
      try {
        localStorage.setItem(`${PURCHASES_STORAGE_KEY}_${user.id}`, JSON.stringify(purchases))
      } catch (error) {
        console.error('Failed to save purchases to localStorage:', error)
      }
    }
  }, [purchases, isLoaded, isAuthenticated, user])

  // Save referral data to localStorage
  useEffect(() => {
    if (isLoaded && isAuthenticated && user && referralData) {
      try {
        localStorage.setItem(`${REFERRAL_STORAGE_KEY}_${user.id}`, JSON.stringify(referralData))
      } catch (error) {
        console.error('Failed to save referral data to localStorage:', error)
      }
    }
  }, [referralData, isLoaded, isAuthenticated, user])

  const addPurchase = useCallback(
    (product: Product, platform: Platform, price: number, originalPrice?: number) => {
      const newPurchase: Purchase = {
        id: 'p' + Math.random().toString(36).substr(2, 9),
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        platform,
        price,
        originalPrice,
        purchaseDate: new Date().toISOString(),
        downloadKey: `${product.title.slice(0, 5).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      }
      setPurchases(prev => [newPurchase, ...prev])
    },
    []
  )

  const applyReferralDiscount = useCallback(
    (price: number): number => {
      if (referralData?.hasActiveDiscount) {
        return price * (1 - referralData.discountPercentage / 100)
      }
      return price
    },
    [referralData]
  )

  const generateReferralCode = useCallback(() => {
    if (user) {
      const newCode = `GV${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      setReferralData(prev =>
        prev
          ? {
              ...prev,
              referralCode: newCode,
              referralLink: `https://gamevault.ge/ref/${newCode}`,
            }
          : null
      )
    }
  }, [user])

  return (
    <UserContext.Provider
      value={{
        purchases,
        referralData,
        addPurchase,
        applyReferralDiscount,
        generateReferralCode,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
