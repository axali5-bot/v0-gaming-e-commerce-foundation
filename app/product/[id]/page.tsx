'use client'

import { use, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { useUser } from '@/contexts/user-context'
import { useAuth } from '@/contexts/auth-context'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  products,
  formatPrice,
  getProductTitle,
  getProductDescription,
  getCategoryName,
} from '@/lib/mock-data'
import {
  Heart,
  ShoppingCart,
  Star,
  Calendar,
  Building2,
  ChevronLeft,
  Check,
  X,
  Zap,
  Shield,
  Download,
} from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const { language, t } = useLanguage()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { referralData, applyReferralDiscount, addPurchase } = useUser()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false)

  const hasReferralDiscount = isAuthenticated && referralData?.hasActiveDiscount

  const product = products.find(p => p.id === id)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    notFound()
  }

  const inWishlist = isInWishlist(product.id)
  const title = getProductTitle(product, language)
  const description = getProductDescription(product, language)
  const category = getCategoryName(product.category, language)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0
  const referralPrice = hasReferralDiscount ? applyReferralDiscount(product.price) : product.price

  const images = product.images || [product.image, product.image, product.image]

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleBuyNow = () => {
    // Mock purchase - add to purchase history and show success message
    if (product) {
      addPurchase(product, product.platform[0], referralPrice, hasReferralDiscount ? product.price : undefined)
    }
    setShowPurchaseSuccess(true)
    setTimeout(() => setShowPurchaseSuccess(false), 3000)
  }

  const features = {
    ka: [
      { icon: Zap, label: 'მყისიერი ციფრული მიწოდება' },
      { icon: Shield, label: 'უსაფრთხო გადახდა' },
      { icon: Download, label: 'ჩამოტვირთეთ მყისიერად' },
    ],
    en: [
      { icon: Zap, label: 'Instant Digital Delivery' },
      { icon: Shield, label: 'Secure Payment' },
      { icon: Download, label: 'Download Instantly' },
    ],
    ru: [
      { icon: Zap, label: 'Мгновенная цифровая доставка' },
      { icon: Shield, label: 'Безопасная оплата' },
      { icon: Download, label: 'Скачайте мгновенно' },
    ],
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('home')}
          </Link>
        </nav>

        {/* Purchase Success Toast */}
        {showPurchaseSuccess && (
          <div className="fixed top-24 right-4 z-50 glass-card rounded-xl p-4 border border-green-500/50 animate-in slide-in-from-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'ka' ? 'შეძენა წარმატებულია!' : language === 'ru' ? 'Покупка успешна!' : 'Purchase Successful!'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ka' ? 'თამაში მზადაა ჩამოტვირთვისთვის' : language === 'ru' ? 'Игра готова к загрузке' : 'Game ready for download'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-all duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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

              {/* Platform Badges */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product.platform.map((p) => (
                  <Badge key={p} className="bg-background/80 text-foreground backdrop-blur-sm border-0">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-primary font-medium uppercase tracking-wider">
              {category}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount.toLocaleString()} {t('reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              {hasReferralDiscount ? (
                <>
                  <span className="text-4xl font-bold text-accent">
                    {formatPrice(referralPrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-accent/20 text-accent border-accent/30 text-sm border">
                    -{referralData?.discountPercentage}% Referral
                  </Badge>
                </>
              ) : (
                <>
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice!)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-medium">{t('inStock')}</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-destructive" />
                  <span className="text-destructive font-medium">{t('outOfStock')}</span>
                </>
              )}
            </div>

            {/* Instant Digital Delivery Banner */}
            <div className="glass-card rounded-xl p-4 border border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {language === 'ka' ? 'მყისიერი ციფრული მიწოდება' : language === 'ru' ? 'Мгновенная цифровая доставка' : 'Instant Digital Delivery'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ka' ? 'მიიღეთ კოდი წამებში' : language === 'ru' ? 'Получите код за секунды' : 'Get your code in seconds'}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{t('description')}</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ka' ? 'გამოშვების თარიღი' : language === 'ru' ? 'Дата выхода' : 'Release Date'}
                  </p>
                  <p className="font-medium text-foreground">
                    {new Date(product.releaseDate).toLocaleDateString(
                      language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ka' ? 'დეველოპერი' : language === 'ru' ? 'Разработчик' : 'Developer'}
                  </p>
                  <p className="font-medium text-foreground">{product.developer}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {features[language].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-cyan"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('addToCart')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`flex-1 border-border hover:border-accent hover:text-accent bg-transparent ${
                  inWishlist ? 'border-accent text-accent' : ''
                }`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-5 w-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                {inWishlist ? t('removeFromWishlist') : t('addToWishlist')}
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 neon-glow-magenta"
              disabled={!product.inStock}
              onClick={handleBuyNow}
            >
              {t('buyNow')}
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
