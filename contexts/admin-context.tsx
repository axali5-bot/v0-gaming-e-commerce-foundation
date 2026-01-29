"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { products as initialProducts, type Product } from '@/lib/mock-data'

export interface GiftCard {
  id: string
  value: number
  code: string
  status: 'active' | 'used' | 'expired'
  createdAt: string
  usedAt?: string
  usedBy?: string
}

export interface MockUser {
  id: string
  username: string
  email: string
  registeredAt: string
  totalPurchases: number
  totalSpent: number
  status: 'active' | 'suspended' | 'banned'
}

export interface MockOrder {
  id: string
  userId: string
  username: string
  productId: string
  productTitle: string
  platform: string
  price: number
  status: 'completed' | 'pending' | 'refunded' | 'cancelled'
  createdAt: string
  paymentMethod: string
}

interface AdminContextType {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Gift Cards
  giftCards: GiftCard[]
  addGiftCard: (value: number) => void
  deleteGiftCard: (id: string) => void
  
  // Users
  users: MockUser[]
  updateUserStatus: (id: string, status: MockUser['status']) => void
  
  // Orders
  orders: MockOrder[]
  updateOrderStatus: (id: string, status: MockOrder['status']) => void
  
  // Stats
  stats: {
    totalRevenue: number
    totalOrders: number
    totalUsers: number
    totalProducts: number
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Initial mock data
const initialGiftCards: GiftCard[] = [
  { id: 'gc1', value: 50, code: 'GV50-ABCD-1234', status: 'active', createdAt: '2026-01-15' },
  { id: 'gc2', value: 100, code: 'GV100-EFGH-5678', status: 'used', createdAt: '2026-01-10', usedAt: '2026-01-20', usedBy: 'user1' },
  { id: 'gc3', value: 200, code: 'GV200-IJKL-9012', status: 'active', createdAt: '2026-01-25' },
  { id: 'gc4', value: 50, code: 'GV50-MNOP-3456', status: 'expired', createdAt: '2025-12-01' },
  { id: 'gc5', value: 100, code: 'GV100-QRST-7890', status: 'active', createdAt: '2026-01-28' },
]

const initialUsers: MockUser[] = [
  { id: 'u1', username: 'GamerPro99', email: 'gamer@example.com', registeredAt: '2025-06-15', totalPurchases: 12, totalSpent: 1450.50, status: 'active' },
  { id: 'u2', username: 'NightOwl', email: 'night@example.com', registeredAt: '2025-08-20', totalPurchases: 5, totalSpent: 420.00, status: 'active' },
  { id: 'u3', username: 'CyberKnight', email: 'cyber@example.com', registeredAt: '2025-10-01', totalPurchases: 8, totalSpent: 890.25, status: 'active' },
  { id: 'u4', username: 'ShadowHunter', email: 'shadow@example.com', registeredAt: '2025-11-10', totalPurchases: 3, totalSpent: 210.00, status: 'suspended' },
  { id: 'u5', username: 'DragonSlayer', email: 'dragon@example.com', registeredAt: '2025-12-05', totalPurchases: 15, totalSpent: 2100.75, status: 'active' },
  { id: 'u6', username: 'StormRider', email: 'storm@example.com', registeredAt: '2026-01-01', totalPurchases: 2, totalSpent: 180.00, status: 'active' },
  { id: 'u7', username: 'BannedUser', email: 'banned@example.com', registeredAt: '2025-09-15', totalPurchases: 1, totalSpent: 59.99, status: 'banned' },
]

const initialOrders: MockOrder[] = [
  { id: 'o1', userId: 'u1', username: 'GamerPro99', productId: '1', productTitle: 'Cyber Nexus 2077', platform: 'PS5', price: 159.99, status: 'completed', createdAt: '2026-01-28', paymentMethod: 'Card' },
  { id: 'o2', userId: 'u5', username: 'DragonSlayer', productId: '6', productTitle: 'Dragon Quest: Eternal', platform: 'PS5', price: 149.99, status: 'completed', createdAt: '2026-01-27', paymentMethod: 'PayPal' },
  { id: 'o3', userId: 'u2', username: 'NightOwl', productId: '2', productTitle: 'Shadow Warriors: Legends', platform: 'Xbox', price: 139.99, status: 'pending', createdAt: '2026-01-29', paymentMethod: 'Card' },
  { id: 'o4', userId: 'u3', username: 'CyberKnight', productId: '4', productTitle: 'Racing Thunder GT', platform: 'PS4', price: 99.99, status: 'completed', createdAt: '2026-01-26', paymentMethod: 'Gift Card' },
  { id: 'o5', userId: 'u1', username: 'GamerPro99', productId: '3', productTitle: 'Starfield Odyssey', platform: 'Xbox', price: 179.99, status: 'refunded', createdAt: '2026-01-20', paymentMethod: 'Card' },
  { id: 'o6', userId: 'u6', username: 'StormRider', productId: '7', productTitle: 'Survival Island', platform: 'PS5', price: 79.99, status: 'completed', createdAt: '2026-01-25', paymentMethod: 'PayPal' },
  { id: 'o7', userId: 'u4', username: 'ShadowHunter', productId: '10', productTitle: 'Dungeon Crawler X', platform: 'PS4', price: 59.99, status: 'cancelled', createdAt: '2026-01-15', paymentMethod: 'Card' },
]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [users, setUsers] = useState<MockUser[]>([])
  const [orders, setOrders] = useState<MockOrder[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('admin_products')
    const storedGiftCards = localStorage.getItem('admin_giftCards')
    const storedUsers = localStorage.getItem('admin_users')
    const storedOrders = localStorage.getItem('admin_orders')

    setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts)
    setGiftCards(storedGiftCards ? JSON.parse(storedGiftCards) : initialGiftCards)
    setUsers(storedUsers ? JSON.parse(storedUsers) : initialUsers)
    setOrders(storedOrders ? JSON.parse(storedOrders) : initialOrders)
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    if (giftCards.length > 0) {
      localStorage.setItem('admin_giftCards', JSON.stringify(giftCards))
    }
  }, [giftCards])

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('admin_users', JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('admin_orders', JSON.stringify(orders))
    }
  }, [orders])

  // Product functions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product_${Date.now()}`,
    }
    setProducts(prev => [...prev, newProduct])
  }

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p))
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Gift Card functions
  const addGiftCard = (value: number) => {
    const code = `GV${value}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    const newCard: GiftCard = {
      id: `gc_${Date.now()}`,
      value,
      code,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setGiftCards(prev => [...prev, newCard])
  }

  const deleteGiftCard = (id: string) => {
    setGiftCards(prev => prev.filter(gc => gc.id !== id))
  }

  // User functions
  const updateUserStatus = (id: string, status: MockUser['status']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u))
  }

  // Order functions
  const updateOrderStatus = (id: string, status: MockOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  // Calculate stats
  const stats = {
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.price, 0),
    totalOrders: orders.length,
    totalUsers: users.length,
    totalProducts: products.length,
  }

  return (
    <AdminContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      giftCards,
      addGiftCard,
      deleteGiftCard,
      users,
      updateUserStatus,
      orders,
      updateOrderStatus,
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
