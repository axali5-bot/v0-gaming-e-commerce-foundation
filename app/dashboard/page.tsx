'use client'

import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { useUser } from '@/contexts/user-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  Heart,
  Gift,
  TrendingUp,
} from 'lucide-react'

const translations = {
  ka: {
    profileOverview: 'პროფილის მიმოხილვა',
    accountInfo: 'ანგარიშის ინფორმაცია',
    username: 'მომხმარებლის სახელი',
    email: 'ელ-ფოსტა',
    memberSince: 'რეგისტრაციის თარიღი',
    accountStatus: 'ანგარიშის სტატუსი',
    active: 'აქტიური',
    premium: 'პრემიუმი',
    suspended: 'შეჩერებული',
    statistics: 'სტატისტიკა',
    totalPurchases: 'სულ შეძენა',
    totalSpent: 'სულ დახარჯული',
    wishlistItems: 'სურვილების სია',
    referralBonus: 'რეფერალური ბონუსი',
    quickStats: 'სწრაფი სტატისტიკა',
  },
  en: {
    profileOverview: 'Profile Overview',
    accountInfo: 'Account Information',
    username: 'Username',
    email: 'Email',
    memberSince: 'Member Since',
    accountStatus: 'Account Status',
    active: 'Active',
    premium: 'Premium',
    suspended: 'Suspended',
    statistics: 'Statistics',
    totalPurchases: 'Total Purchases',
    totalSpent: 'Total Spent',
    wishlistItems: 'Wishlist Items',
    referralBonus: 'Referral Bonus',
    quickStats: 'Quick Stats',
  },
  ru: {
    profileOverview: 'Обзор профиля',
    accountInfo: 'Информация об аккаунте',
    username: 'Имя пользователя',
    email: 'Эл. почта',
    memberSince: 'Дата регистрации',
    accountStatus: 'Статус аккаунта',
    active: 'Активный',
    premium: 'Премиум',
    suspended: 'Приостановлен',
    statistics: 'Статистика',
    totalPurchases: 'Всего покупок',
    totalSpent: 'Всего потрачено',
    wishlistItems: 'В избранном',
    referralBonus: 'Реферальный бонус',
    quickStats: 'Быстрая статистика',
  },
}

export default function DashboardPage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const { purchases, referralData } = useUser()
  const { itemCount: wishlistCount } = useWishlist()
  const t = translations[language]

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
  }

  const statusLabels: Record<string, string> = {
    active: t.active,
    premium: t.premium,
    suspended: t.suspended,
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    premium: 'bg-accent/20 text-accent border-accent/30',
    suspended: 'bg-destructive/20 text-destructive border-destructive/30',
  }

  const stats = [
    {
      icon: ShoppingBag,
      label: t.totalPurchases,
      value: purchases.length,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: TrendingUp,
      label: t.totalSpent,
      value: `${totalSpent.toFixed(2)} ₾`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Heart,
      label: t.wishlistItems,
      value: wishlistCount,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Gift,
      label: t.referralBonus,
      value: referralData?.hasActiveDiscount ? `-${referralData.discountPercentage}%` : '-',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.profileOverview}</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-glass-border hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Account Information */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5 text-primary" />
            {t.accountInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.username}</p>
                <p className="font-medium text-foreground">{user?.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.email}</p>
                <p className="font-medium text-foreground">{user?.email}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.memberSince}</p>
                <p className="font-medium text-foreground">
                  {user?.createdAt ? formatDate(user.createdAt) : '-'}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.accountStatus}</p>
                <Badge
                  className={`mt-1 ${statusColors[user?.accountStatus || 'active']} border`}
                  variant="outline"
                >
                  {statusLabels[user?.accountStatus || 'active']}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
