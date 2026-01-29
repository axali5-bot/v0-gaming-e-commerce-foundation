'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Gift, Zap, CreditCard, ChevronRight } from 'lucide-react'

export function GiftCardBanner() {
  const { language } = useLanguage()

  const content = {
    ka: {
      title: 'ციფრული სასაჩუქრე ბარათები',
      subtitle: 'სრულყოფილი საჩუქარი მოთამაშეებისთვის',
      description: 'გაუკეთეთ საჩუქარი მეგობრებს და ოჯახს ჩვენი ციფრული სასაჩუქრე ბარათებით',
      cta: 'შეიძინეთ სასაჩუქრე ბარათი',
      features: ['მყისიერი მიწოდება', 'ნებისმიერი თანხა', 'უსაფრთხო გადახდა'],
    },
    en: {
      title: 'Digital Gift Cards',
      subtitle: 'The Perfect Gift for Gamers',
      description: 'Treat your friends and family with our digital gift cards',
      cta: 'Buy Gift Card',
      features: ['Instant Delivery', 'Any Amount', 'Secure Payment'],
    },
    ru: {
      title: 'Цифровые Подарочные Карты',
      subtitle: 'Идеальный Подарок для Геймеров',
      description: 'Порадуйте друзей и семью нашими цифровыми подарочными картами',
      cta: 'Купить Карту',
      features: ['Мгновенная доставка', 'Любая сумма', 'Безопасная оплата'],
    },
  }

  const c = content[language]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl glass-card border border-accent/30">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30">
                  <Gift className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{c.subtitle}</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {c.title}
                </h2>

                <p className="text-lg text-muted-foreground max-w-lg">
                  {c.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {c.features.map((feature, index) => {
                    const icons = [Zap, CreditCard, Gift]
                    const Icon = icons[index]
                    return (
                      <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4">
                  <Link href="/gift-cards">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 neon-glow-magenta group">
                      {c.cta}
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Gift Card Visual */}
              <div className="relative flex-shrink-0">
                <div className="relative w-64 h-40 md:w-80 md:h-48">
                  {/* Card Stack Effect */}
                  <div className="absolute top-4 left-4 w-full h-full rounded-2xl bg-accent/30 transform rotate-6" />
                  <div className="absolute top-2 left-2 w-full h-full rounded-2xl bg-primary/30 transform rotate-3" />
                  
                  {/* Main Card */}
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary via-accent to-primary p-1">
                    <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-foreground">GAME</span>
                        <Gift className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {language === 'ka' ? 'სასაჩუქრე ბარათი' : language === 'ru' ? 'Подарочная карта' : 'Gift Card'}
                        </p>
                        <p className="text-3xl font-bold text-primary">100 ₾</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
