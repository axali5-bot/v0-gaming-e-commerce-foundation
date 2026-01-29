'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { formatPrice, getProductTitle } from '@/lib/mock-data'
import { ShoppingCart, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { language, t } = useLanguage()
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart()

  const pageTitle = {
    ka: 'კალათა',
    en: 'Shopping Cart',
    ru: 'Корзина',
  }

  const emptyMessage = {
    ka: 'თქვენი კალათა ცარიელია',
    en: 'Your cart is empty',
    ru: 'Ваша корзина пуста',
  }

  const clearLabel = {
    ka: 'კალათის გასუფთავება',
    en: 'Clear Cart',
    ru: 'Очистить корзину',
  }

  const subtotalLabel = {
    ka: 'ჯამი',
    en: 'Subtotal',
    ru: 'Итого',
  }

  const checkoutLabel = {
    ka: 'გადახდაზე გადასვლა',
    en: 'Proceed to Checkout',
    ru: 'Перейти к оплате',
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle[language]}
            </h1>
            {items.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-muted-foreground">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              className="border-border hover:border-destructive hover:text-destructive bg-transparent"
              onClick={clearCart}
            >
              {clearLabel[language]}
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="glass-card rounded-xl p-4 flex gap-4"
                >
                  <Link href={`/product/${product.id}`} className="shrink-0">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={getProductTitle(product, language)}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {getProductTitle(product, language)}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border hover:border-primary bg-transparent"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-foreground">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border hover:border-primary bg-transparent"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-primary">
                          {formatPrice(product.price * quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {language === 'ka' ? 'შეკვეთის მიმოხილვა' : language === 'ru' ? 'Сводка заказа' : 'Order Summary'}
                </h2>
                <div className="space-y-4 mb-6">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {getProductTitle(product, language)} x{quantity}
                      </span>
                      <span className="text-foreground">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">{subtotalLabel[language]}</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-cyan"
                >
                  {checkoutLabel[language]}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {emptyMessage[language]}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {language === 'ka'
                ? 'დაათვალიერეთ ჩვენი კატალოგი და დაამატეთ თამაშები კალათაში'
                : language === 'ru'
                ? 'Просмотрите наш каталог и добавьте игры в корзину'
                : 'Browse our catalog and add games to your cart'}
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
