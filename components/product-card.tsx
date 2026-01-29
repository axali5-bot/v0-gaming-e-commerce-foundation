'use client'

import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { useUser } from '@/contexts/user-context'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/contexts/toast-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import {
  type Product,
  formatPrice,
  getProductTitle,
  getCategoryName,
} from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { referralData, applyReferralDiscount } = useUser()
  const { showToast } = useToast()

  const inWishlist = isInWishlist(product.id)
  const hasReferralDiscount = isAuthenticated && referralData?.hasActiveDiscount
  const referralPrice = hasReferralDiscount ? applyReferralDiscount(product.price) : product.price
  const title = getProductTitle(product, language)
  const category = getCategoryName(product.category, language)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      showToast('Removed from wishlist', 'info')
    } else {
      addToWishlist(product)
      showToast('Added to wishlist', 'success')
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    showToast(`${title} added to cart`, 'success')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <article className="group glass-card rounded-xl overflow-hidden hover-lift neon-glow-cyan hover:neon-glow-magenta transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tags.includes('newRelease') && (
              <Badge className="bg-primary text-primary-foreground border-0">
                {t('newRelease')}
              </Badge>
            )}
            {product.tags.includes('bestseller') && (
              <Badge className="bg-accent text-accent-foreground border-0">
                {t('bestseller')}
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground border-0">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 rounded-full backdrop-blur-sm transition-all ${
              inWishlist
                ? 'bg-accent/80 text-accent-foreground'
                : 'bg-background/50 text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? t('removeFromWishlist') : t('addToWishlist')}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Platform Badges */}
          <div className="absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.platform.slice(0, 3).map((p) => (
              <Badge key={p} variant="secondary" className="bg-background/80 text-foreground text-xs backdrop-blur-sm">
                {p}
              </Badge>
            ))}
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="icon"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs text-primary font-medium uppercase tracking-wider">
            {category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Rating & Platform */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="flex gap-1">
              {product.platform.slice(0, 2).map((p) => (
                <span key={p} className="text-xs text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {hasReferralDiscount ? (
              <>
                <span className="text-lg font-bold text-accent">
                  {formatPrice(referralPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge className="bg-accent/20 text-accent border-accent/30 text-xs border">
                  -10%
                </Badge>
              </>
            ) : (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <p className="text-sm text-destructive font-medium">{t('outOfStock')}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
