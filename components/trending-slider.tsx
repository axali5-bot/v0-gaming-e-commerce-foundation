'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Heart, TrendingUp } from 'lucide-react'
import { type Product, formatPrice, getProductTitle } from '@/lib/mock-data'

interface TrendingSliderProps {
  products: Product[]
}

export function TrendingSlider({ products }: TrendingSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const titles = {
    ka: 'ტრენდული ახლა',
    en: 'Trending Now',
    ru: 'В тренде',
  }

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles[language]}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:border-primary hover:bg-secondary bg-transparent"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:border-primary hover:bg-secondary bg-transparent"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const title = getProductTitle(product, language)
            const inWishlist = isInWishlist(product.id)
            const hasDiscount = product.originalPrice && product.originalPrice > product.price
            const discountPercent = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex-shrink-0 w-[280px] group"
              >
                <div className="glass-card rounded-xl overflow-hidden hover-lift transition-all duration-300 group-hover:neon-glow-cyan">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {hasDiscount && (
                        <Badge className="bg-destructive text-destructive-foreground border-0">
                          -{discountPercent}%
                        </Badge>
                      )}
                      <Badge className="bg-accent/90 text-accent-foreground border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {language === 'ka' ? 'ტრენდული' : language === 'ru' ? 'Тренд' : 'Trending'}
                      </Badge>
                    </div>

                    {/* Wishlist */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 rounded-full backdrop-blur-sm ${
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
                      <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
                    </Button>

                    {/* Platforms */}
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {product.platform.map((p) => (
                        <Badge key={p} variant="secondary" className="bg-background/80 text-foreground text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
