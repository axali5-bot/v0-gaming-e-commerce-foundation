'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { HeroSection } from '@/components/hero-section'
import { TrendingSlider } from '@/components/trending-slider'
import { PlatformTabs } from '@/components/platform-tabs'
import { GiftCardBanner } from '@/components/gift-card-banner'
import { ProductCard } from '@/components/product-card'
import { CategoryFilter } from '@/components/category-filter'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/mock-data'
import { ChevronRight, Flame, Sparkles, Tag } from 'lucide-react'

export default function HomePage() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  const trendingProducts = products.filter(p => p.tags.includes('trending'))
  const featuredProducts = products.filter(p => p.tags.includes('featured')).slice(0, 4)
  const newReleases = products.filter(p => p.tags.includes('newRelease')).slice(0, 4)
  const discountedProducts = products.filter(p => p.tags.includes('discount')).slice(0, 4)

  const sectionTitles = {
    ka: {
      featured: 'რჩეული თამაშები',
      newReleases: 'ახალი გამოშვებები',
      discounted: 'ფასდაკლებები',
      allGames: 'ყველა თამაში',
    },
    en: {
      featured: 'Featured Games',
      newReleases: 'New Releases',
      discounted: 'On Sale',
      allGames: 'All Games',
    },
    ru: {
      featured: 'Рекомендуемые игры',
      newReleases: 'Новинки',
      discounted: 'Скидки',
      allGames: 'Все игры',
    },
  }

  const titles = sectionTitles[language]

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero Section */}
      <HeroSection />

      {/* Trending Slider */}
      <TrendingSlider products={trendingProducts} />

      {/* Featured Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles.featured}</h2>
            </div>
            <Link href="/catalog?filter=featured">
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-secondary">
                {t('viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Tabs Section */}
      <PlatformTabs products={products} />

      {/* New Releases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles.newReleases}</h2>
            </div>
            <Link href="/catalog?filter=new">
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-secondary">
                {t('viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Banner */}
      <GiftCardBanner />

      {/* Discounted Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Tag className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles.discounted}</h2>
            </div>
            <Link href="/catalog?filter=discount">
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-secondary">
                {t('viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Games Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{titles.allGames}</h2>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
