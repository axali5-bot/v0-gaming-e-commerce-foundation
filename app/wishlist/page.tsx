'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
  const { t, language } = useLanguage()
  const { items, clearWishlist } = useWishlist()

  const pageTitle = {
    ka: 'სურვილების სია',
    en: 'Wishlist',
    ru: 'Избранное',
  }

  const emptyMessage = {
    ka: 'თქვენი სურვილების სია ცარიელია',
    en: 'Your wishlist is empty',
    ru: 'Ваш список избранного пуст',
  }

  const clearLabel = {
    ka: 'სიის გასუფთავება',
    en: 'Clear Wishlist',
    ru: 'Очистить список',
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle[language]}
            </h1>
            {items.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-muted-foreground">
                {items.length}
              </span>
            )}
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              className="border-border hover:border-destructive hover:text-destructive bg-transparent"
              onClick={clearWishlist}
            >
              {clearLabel[language]}
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {emptyMessage[language]}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {language === 'ka'
                ? 'დაამატეთ თამაშები სურვილების სიაში, რომ მოგვიანებით მარტივად იპოვოთ'
                : language === 'ru'
                ? 'Добавляйте игры в избранное, чтобы легко найти их позже'
                : 'Add games to your wishlist to easily find them later'}
            </p>
            <Link href="/catalog">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingBag className="h-5 w-5 mr-2" />
                {t('catalog')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
