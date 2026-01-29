'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { type Product, type Platform, formatPrice, getProductTitle, getCategoryName } from '@/lib/mock-data'

interface PlatformTabsProps {
  products: Product[]
}

export function PlatformTabs({ products }: PlatformTabsProps) {
  const [activePlatform, setActivePlatform] = useState<Platform>('PS5')
  const { language } = useLanguage()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()

  const platforms: Platform[] = ['PS4', 'PS5', 'Xbox']
  
  const filteredProducts = products.filter(p => p.platform.includes(activePlatform)).slice(0, 4)

  const titles = {
    ka: 'პლატფორმის მიხედვით',
    en: 'Shop by Platform',
    ru: 'По платформам',
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles[language]}</h2>
          
          {/* Platform Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary/50 glass-card">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activePlatform === platform
                    ? 'bg-primary text-primary-foreground neon-glow-cyan'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const title = getProductTitle(product, language)
            const category = getCategoryName(product.category, language)
            const inWishlist = isInWishlist(product.id)
            const hasDiscount = product.originalPrice && product.originalPrice > product.price
            const discountPercent = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <article className="group glass-card rounded-xl overflow-hidden hover-lift neon-glow-cyan hover:neon-glow-magenta transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {hasDiscount && (
                        <Badge className="bg-destructive text-destructive-foreground border-0">
                          -{discountPercent}%
                        </Badge>
                      )}
                      <Badge className="bg-primary/90 text-primary-foreground border-0">
                        {activePlatform}
                      </Badge>
                    </div>

                    {/* Wishlist */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 rounded-full backdrop-blur-sm transition-all ${
                        inWishlist
                          ? 'bg-accent/80 text-accent-foreground'
                          : 'bg-background/50 text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (inWishlist) {
                          removeFromWishlist(product.id)
                        } else {
                          addToWishlist(product)
                        }
                      }}
                    >
                      <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </Button>

                    {/* Quick Add */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {language === 'ka' ? 'დამატება' : language === 'ru' ? 'В корзину' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">{category}</p>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link href={`/catalog?platform=${activePlatform}`}>
            <Button variant="outline" className="border-border hover:border-primary hover:bg-secondary bg-transparent">
              {language === 'ka' ? `ყველა ${activePlatform} თამაში` : language === 'ru' ? `Все игры ${activePlatform}` : `View All ${activePlatform} Games`}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
