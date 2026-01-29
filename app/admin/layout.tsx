import React from "react"
import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminProvider } from '@/contexts/admin-context'

export const metadata: Metadata = {
  title: 'Admin Panel - GameVault',
  description: 'GameVault Admin Dashboard - Manage games, users, orders, and gift cards',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminProvider>
  )
}
