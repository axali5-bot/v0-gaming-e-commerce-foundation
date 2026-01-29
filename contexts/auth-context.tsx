'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: string
  accountStatus: 'active' | 'premium' | 'suspended'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'gamestore_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      }
    } catch (error) {
      console.error('Failed to load auth from localStorage:', error)
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        if (user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      } catch (error) {
        console.error('Failed to save auth to localStorage:', error)
      }
    }
  }, [user, isLoading])

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock login - always succeeds with valid email format
    if (email.includes('@')) {
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        username: email.split('@')[0],
        email: email,
        createdAt: new Date().toISOString(),
        accountStatus: 'active',
      }
      setUser(mockUser)
      return true
    }
    return false
  }, [])

  const register = useCallback(
    async (username: string, email: string, _password: string): Promise<boolean> => {
      // Mock registration - always succeeds
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        username,
        email,
        createdAt: new Date().toISOString(),
        accountStatus: 'active',
      }
      setUser(mockUser)
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...updates } : null))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
