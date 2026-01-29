'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { ProductCard } from '@/components/product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { products, categories, platforms, type Platform, type Category } from '@/lib/mock-data'
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X, Filter } from 'lucide-react'

function CatalogContent() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  const platformParam = searchParams.get('platform') as Platform | null

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platformParam ? [platformParam] : [])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const maxPrice = Math.max(...products.map(p => p.price))

  const pageTitle = {
    ka: 'კატალოგი',
    en: 'Catalog',
    ru: 'Каталог',
  }

  const filterLabels = {
    ka: {
      platforms: 'პლატფორმები',
      genres: 'ჟანრები',
      priceRange: 'ფასის დიაპაზონი',
      clearAll: 'გასუფთავება',
      filters: 'ფილტრები',
    },
    en: {
      platforms: 'Platforms',
      genres: 'Genres',
      priceRange: 'Price Range',
      clearAll: 'Clear All',
      filters: 'Filters',
    },
    ru: {
      platforms: 'Платформы',
      genres: 'Жанры',
      priceRange: 'Диапазон цен',
      clearAll: 'Сбросить',
      filters: 'Фильтры',
    },
  }

  const labels = filterLabels[language]

  const sortOptions = {
    ka: {
      default: 'სორტირება',
      'price-asc': 'ფასი (დაბალიდან)',
      'price-desc': 'ფასი (მაღალიდან)',
      rating: 'რეიტინგი',
    },
    en: {
      default: 'Sort By',
      'price-asc': 'Price (Low to High)',
      'price-desc': 'Price (High to Low)',
      rating: 'Rating',
    },
    ru: {
      default: 'Сортировка',
      'price-asc': 'Цена (по возрастанию)',
      'price-desc': 'Цена (по убыванию)',
      rating: 'Рейтинг',
    },
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedPlatforms([])
    setSearchQuery('')
    setSortBy('default')
    setPriceRange([0, 200])
  }

  const activeFiltersCount = 
    (selectedCategory ? 1 : 0) + 
    selectedPlatforms.length + 
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Apply filter from URL param
    if (filterParam === 'featured') {
      result = result.filter(p => p.tags.includes('featured'))
    } else if (filterParam === 'new') {
      result = result.filter(p => p.tags.includes('newRelease'))
    } else if (filterParam === 'discount') {
      result = result.filter(p => p.tags.includes('discount'))
    }

    // Apply platform filter
    if (selectedPlatforms.length > 0) {
      result = result.filter(p => 
        selectedPlatforms.some(platform => p.platform.includes(platform))
      )
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Apply price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.titleKa.toLowerCase().includes(query) ||
          p.titleRu.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [selectedCategory, selectedPlatforms, searchQuery, sortBy, filterParam, priceRange])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {pageTitle[language]}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length}{' '}
            {language === 'ka' ? 'თამაში ნაპოვნია' : language === 'ru' ? 'игр найдено' : 'games found'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">{labels.filters}</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                  >
                    {labels.clearAll}
                  </Button>
                )}
              </div>

              {/* Platform Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">{labels.platforms}</h4>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        selectedPlatforms.includes(platform)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">{labels.genres}</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => {
                    const name = language === 'ka' ? category.nameKa : language === 'ru' ? category.nameRu : category.nameEn
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category.id ? null : category.id as Category
                        )}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{labels.priceRange}</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={200}
                    min={0}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} ₾</span>
                    <span>{priceRange[1]} ₾</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-primary"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden border-border hover:border-primary bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {labels.filters}
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                )}
              </Button>

              {/* Sort & View */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="h-9 px-3 rounded-md bg-input border border-border text-foreground text-sm focus:border-primary focus:outline-none"
                >
                  <option value="default">{sortOptions[language].default}</option>
                  <option value="price-asc">{sortOptions[language]['price-asc']}</option>
                  <option value="price-desc">{sortOptions[language]['price-desc']}</option>
                  <option value="rating">{sortOptions[language].rating}</option>
                </select>

                <div className="flex items-center border border-border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none h-9 w-9 ${viewMode === 'grid' ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none h-9 w-9 ${viewMode === 'list' ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden glass-card rounded-xl p-4 mb-6 space-y-4">
                {/* Platform Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{labels.platforms}</h4>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map(platform => (
                      <button
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          selectedPlatforms.includes(platform)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genre Filter */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{labels.genres}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => {
                      const name = language === 'ka' ? category.nameKa : language === 'ru' ? category.nameRu : category.nameEn
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.id ? null : category.id as Category
                          )}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            selectedCategory === category.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {name}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">{labels.priceRange}</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={200}
                    min={0}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} ₾</span>
                    <span>{priceRange[1]} ₾</span>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border hover:border-primary bg-transparent"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {labels.clearAll}
                  </Button>
                )}
              </div>
            )}

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedPlatforms.map(platform => (
                  <Badge
                    key={platform}
                    variant="secondary"
                    className="bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    onClick={() => togglePlatform(platform)}
                  >
                    {platform}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {language === 'ka' 
                      ? categories.find(c => c.id === selectedCategory)?.nameKa
                      : language === 'ru'
                      ? categories.find(c => c.id === selectedCategory)?.nameRu
                      : categories.find(c => c.id === selectedCategory)?.nameEn}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    onClick={() => setPriceRange([0, 200])}
                  >
                    {priceRange[0]} - {priceRange[1]} ₾
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'grid grid-cols-1 gap-4'
                }
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <SlidersHorizontal className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {t('noResults')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'ka'
                    ? 'სცადეთ სხვა ფილტრების გამოყენება'
                    : language === 'ru'
                    ? 'Попробуйте использовать другие фильтры'
                    : 'Try using different filters'}
                </p>
                <Button
                  variant="outline"
                  className="border-border hover:border-primary bg-transparent"
                  onClick={clearFilters}
                >
                  {labels.clearAll}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
