'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { useUser } from '@/contexts/user-context'
import { cn } from '@/lib/utils'
import { User, ShoppingBag, Heart, Gift, LogOut, Crown, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const translations = {
  ka: {
    dashboard: 'მართვის პანელი',
    profile: 'პროფილი',
    purchases: 'შეძენები',
    wishlist: 'სურვილები',
    referral: 'რეფერალი',
    logout: 'გამოსვლა',
    backToStore: 'მაღაზიაში დაბრუნება',
    discountActive: 'ფასდაკლება აქტიურია',
  },
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    purchases: 'Purchases',
    wishlist: 'Wishlist',
    referral: 'Referral',
    logout: 'Logout',
    backToStore: 'Back to Store',
    discountActive: 'Discount Active',
  },
  ru: {
    dashboard: 'Панель управления',
    profile: 'Профиль',
    purchases: 'Покупки',
    wishlist: 'Избранное',
    referral: 'Реферал',
    logout: 'Выход',
    backToStore: 'Вернуться в магазин',
    discountActive: 'Скидка активна',
  },
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const { user, logout } = useAuth()
  const { referralData } = useUser()
  const t = translations[language]

  const navItems = [
    { href: '/dashboard', icon: User, label: t.profile },
    { href: '/dashboard/purchases', icon: ShoppingBag, label: t.purchases },
    { href: '/dashboard/wishlist', icon: Heart, label: t.wishlist },
    { href: '/dashboard/referral', icon: Gift, label: t.referral },
  ]

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="glass-card rounded-xl p-4 md:p-6 sticky top-24">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-glass-border">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{user?.username}</p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        {/* Referral Discount Badge */}
        {referralData?.hasActiveDiscount && (
          <div className="mb-6 p-3 rounded-lg bg-accent/10 border border-accent/30">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-accent">{t.discountActive}</p>
                <p className="text-xs text-muted-foreground">-{referralData.discountPercentage}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1 mb-6">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t border-glass-border">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent border-border hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              {t.backToStore}
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {t.logout}
          </Button>
        </div>
      </div>
    </aside>
  )
}
