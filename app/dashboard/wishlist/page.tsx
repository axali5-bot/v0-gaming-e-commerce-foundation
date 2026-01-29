'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { useUser } from '@/contexts/user-context'
import { getProductTitle, formatPrice } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Trash2, Gamepad2, Percent } from 'lucide-react'

const translations = {
  ka: {
    wishlist: 'სურვილების სია',
    emptyWishlist: 'სურვილების სია ცარიელია',
    browseGames: 'თამაშების დათვალიერება',
    addToCart: 'კალათაში დამატება',
    remove: 'წაშლა',
    clearAll: 'სიის გასუფთავება',
    items: 'ელემენტი',
    referralPrice: 'რეფერალური ფასი',
  },
  en: {
    wishlist: 'Wishlist',
    emptyWishlist: 'Your wishlist is empty',
    browseGames: 'Browse Games',
    addToCart: 'Add to Cart',
    remove: 'Remove',
    clearAll: 'Clear All',
    items: 'items',
    referralPrice: 'Referral Price',
  },
  ru: {
    wishlist: 'Избранное',
    emptyWishlist: 'Ваш список избранного пуст',
    browseGames: 'Просмотр игр',
    addToCart: 'В корзину',
    remove: 'Удалить',
    clearAll: 'Очистить все',
    items: 'элементов',
    referralPrice: 'Реферальная цена',
  },
}

export default function DashboardWishlistPage() {
  const { language } = useLanguage()
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { referralData, applyReferralDiscount } = useUser()
  const t = translations[language]

  const platformColors: Record<string, string> = {
    PS4: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PS5: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    Xbox: 'bg-green-500/20 text-green-400 border-green-500/30',
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.wishlist}</h1>
          {items.length > 0 && (
            <Badge variant="secondary" className="bg-secondary text-muted-foreground">
              {items.length} {t.items}
            </Badge>
          )}
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            className="border-border hover:border-destructive hover:text-destructive bg-transparent"
            onClick={clearWishlist}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t.clearAll}
          </Button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map(product => {
            const title = getProductTitle(product, language)
            const discountedPrice = applyReferralDiscount(product.price)
            const hasReferralDiscount =
              referralData?.hasActiveDiscount && discountedPrice < product.price

            return (
              <Card
                key={product.id}
                className="glass-card border-glass-border overflow-hidden hover-lift"
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Game Image */}
                    <Link
                      href={`/product/${product.id}`}
                      className="relative w-32 h-32 shrink-0"
                    >
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                            {title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.platform.map(p => (
                            <Badge
                              key={p}
                              variant="outline"
                              className={`${platformColors[p]} text-xs border`}
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          {hasReferralDiscount ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-accent">
                                {discountedPrice.toFixed(2)} ₾
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                {product.price.toFixed(2)} ₾
                              </span>
                              <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                                <Percent className="h-3 w-3 mr-1" />
                                -{referralData?.discountPercentage}%
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromWishlist(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => addToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {t.addToCart}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="glass-card border-glass-border">
          <CardContent className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.emptyWishlist}</h2>
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
