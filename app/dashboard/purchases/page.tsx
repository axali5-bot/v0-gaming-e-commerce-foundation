'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useUser } from '@/contexts/user-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Download, Key, Calendar, Gamepad2, ExternalLink } from 'lucide-react'

const translations = {
  ka: {
    purchaseHistory: 'შეძენების ისტორია',
    noPurchases: 'ჯერ არ გაქვთ შეძენები',
    browseGames: 'თამაშების დათვალიერება',
    downloadKey: 'გადმოწერის კოდი',
    viewGame: 'თამაშის ნახვა',
    platform: 'პლატფორმა',
    price: 'ფასი',
    date: 'თარიღი',
    originalPrice: 'თავდაპირველი ფასი',
    saved: 'დაზოგეთ',
    copyKey: 'კოდის კოპირება',
    copied: 'კოპირებულია!',
    total: 'სულ',
    purchases: 'შეძენა',
  },
  en: {
    purchaseHistory: 'Purchase History',
    noPurchases: 'No purchases yet',
    browseGames: 'Browse Games',
    downloadKey: 'Download Key',
    viewGame: 'View Game',
    platform: 'Platform',
    price: 'Price',
    date: 'Date',
    originalPrice: 'Original Price',
    saved: 'You saved',
    copyKey: 'Copy Key',
    copied: 'Copied!',
    total: 'Total',
    purchases: 'purchases',
  },
  ru: {
    purchaseHistory: 'История покупок',
    noPurchases: 'У вас пока нет покупок',
    browseGames: 'Просмотр игр',
    downloadKey: 'Ключ загрузки',
    viewGame: 'Смотреть игру',
    platform: 'Платформа',
    price: 'Цена',
    date: 'Дата',
    originalPrice: 'Исходная цена',
    saved: 'Вы сэкономили',
    copyKey: 'Копировать ключ',
    copied: 'Скопировано!',
    total: 'Всего',
    purchases: 'покупок',
  },
}

export default function PurchasesPage() {
  const { language } = useLanguage()
  const { purchases } = useUser()
  const t = translations[language]

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0)
  const totalSaved = purchases.reduce(
    (sum, p) => sum + (p.originalPrice ? p.originalPrice - p.price : 0),
    0
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const platformColors: Record<string, string> = {
    PS4: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PS5: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    Xbox: 'bg-green-500/20 text-green-400 border-green-500/30',
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.purchaseHistory}</h1>
        {purchases.length > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">
              {t.total}: <span className="font-bold text-foreground">{purchases.length}</span>{' '}
              {t.purchases}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              <span className="font-bold text-primary">{totalSpent.toFixed(2)} ₾</span>
            </span>
          </div>
        )}
      </div>

      {purchases.length > 0 ? (
        <div className="space-y-4">
          {purchases.map(purchase => (
            <Card
              key={purchase.id}
              className="glass-card border-glass-border overflow-hidden hover-lift"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Game Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                    <Image
                      src={purchase.productImage || '/placeholder.svg'}
                      alt={purchase.productTitle}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${platformColors[purchase.platform]} border`}
                      variant="outline"
                    >
                      {purchase.platform}
                    </Badge>
                  </div>

                  {/* Purchase Details */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {purchase.productTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(purchase.purchaseDate)}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {purchase.price.toFixed(2)} ₾
                          </p>
                          {purchase.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {purchase.originalPrice.toFixed(2)} ₾
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Download Key */}
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 mb-4">
                        <Key className="h-4 w-4 text-accent shrink-0" />
                        <code className="text-sm font-mono text-accent flex-1 truncate">
                          {purchase.downloadKey}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0 text-xs hover:text-primary"
                          onClick={() => copyToClipboard(purchase.downloadKey)}
                        >
                          {t.copyKey}
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link href={`/product/${purchase.productId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-border hover:border-primary hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.viewGame}
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Download className="h-4 w-4 mr-2" />
                        {t.downloadKey}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Summary */}
          {totalSaved > 0 && (
            <Card className="glass-card border-accent/30 bg-accent/5">
              <CardContent className="p-4 flex items-center justify-center gap-2">
                <span className="text-accent font-medium">
                  {t.saved}: {totalSaved.toFixed(2)} ₾
                </span>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass-card border-glass-border">
          <CardContent className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.noPurchases}</h2>
            <Link href="/catalog">
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Gamepad2 className="h-5 w-5 mr-2" />
                {t.browseGames}
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
