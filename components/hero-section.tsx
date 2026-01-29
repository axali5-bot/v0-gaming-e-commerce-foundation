'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Gamepad2, Zap, Shield, Play } from 'lucide-react'
import { products, formatPrice, getProductTitle } from '@/lib/mock-data'

export function HeroSection() {
  const { t, language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Get featured games for hero rotation
  const heroGames = products.filter(p => p.tags.includes('trending') || p.tags.includes('featured')).slice(0, 3)
  const currentGame = heroGames[currentSlide]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroGames.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroGames.length])

  const heroContent = {
    ka: {
      badge: 'ახალი თამაშები ყოველ კვირას',
      title: 'აღმოაჩინე თამაშების სამყარო',
      subtitle: 'საუკეთესო თამაშები საუკეთესო ფასებში. მყისიერი ციფრული მიწოდება.',
      cta: 'კატალოგის ნახვა',
      playCta: 'თამაშის ნახვა',
    },
    en: {
      badge: 'New games every week',
      title: 'Discover the World of Gaming',
      subtitle: 'Best games at the best prices. Instant digital delivery.',
      cta: 'Browse Catalog',
      playCta: 'View Game',
    },
    ru: {
      badge: 'Новые игры каждую неделю',
      title: 'Откройте Мир Игр',
      subtitle: 'Лучшие игры по лучшим ценам. Мгновенная цифровая доставка.',
      cta: 'Смотреть Каталог',
      playCta: 'Смотреть Игру',
    },
  }

  const content = heroContent[language]

  const features = [
    { icon: Gamepad2, label: language === 'ka' ? '10,000+ თამაში' : language === 'ru' ? '10,000+ игр' : '10,000+ Games' },
    { icon: Zap, label: language === 'ka' ? 'მყისიერი მიწოდება' : language === 'ru' ? 'Мгновенная доставка' : 'Instant Delivery' },
    { icon: Shield, label: language === 'ka' ? 'უსაფრთხო გადახდა' : language === 'ru' ? 'Безопасная оплата' : 'Secure Payment' },
  ]

  const gameTitle = getProductTitle(currentGame, language)
  const hasDiscount = currentGame.originalPrice && currentGame.originalPrice > currentGame.price
  const discountPercent = hasDiscount
    ? Math.round(((currentGame.originalPrice! - currentGame.price) / currentGame.originalPrice!) * 100)
    : 0

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {heroGames.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={game.image || "/placeholder.svg"}
              alt={getProductTitle(game, language)}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">{content.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              {content.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl text-pretty">
            {content.subtitle}
          </p>

          {/* Featured Game Card */}
          <div className="glass-card rounded-xl p-4 max-w-md border border-primary/20 hover-lift transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={currentGame.image || "/placeholder.svg"}
                  alt={gameTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {currentGame.tags.includes('newRelease') && (
                    <Badge className="bg-primary text-primary-foreground text-xs border-0">
                      {language === 'ka' ? 'ახალი' : language === 'ru' ? 'Новинка' : 'NEW'}
                    </Badge>
                  )}
                  {hasDiscount && (
                    <Badge className="bg-destructive text-destructive-foreground text-xs border-0">
                      -{discountPercent}%
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground truncate">{gameTitle}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-primary">{formatPrice(currentGame.price)}</span>
                  {hasDiscount && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(currentGame.originalPrice!)}
                    </span>
                  )}
                </div>
                <div className="flex gap-1 mt-2">
                  {currentGame.platform.map((p) => (
                    <Badge key={p} variant="secondary" className="text-xs bg-secondary/80">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-cyan group">
                {content.cta}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/product/${currentGame.id}`}>
              <Button size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary bg-transparent group">
                <Play className="mr-2 h-5 w-5" />
                {content.playCta}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-6 pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'bg-muted-foreground/50 hover:bg-muted-foreground'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
