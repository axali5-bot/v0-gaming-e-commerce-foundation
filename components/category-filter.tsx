'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/mock-data'

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { t, language } = useLanguage()

  const getCategoryLabel = (cat: typeof categories[number]) => {
    switch (language) {
      case 'ka':
        return cat.nameKa
      case 'ru':
        return cat.nameRu
      default:
        return cat.nameEn
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={
          selectedCategory === null
            ? 'bg-primary text-primary-foreground'
            : 'border-border hover:border-primary hover:text-primary bg-transparent'
        }
      >
        {t('allGames')}
      </Button>
      {categories.map(cat => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(cat.id)}
          className={
            selectedCategory === cat.id
              ? 'bg-primary text-primary-foreground'
              : 'border-border hover:border-primary hover:text-primary bg-transparent'
          }
        >
          {getCategoryLabel(cat)}
        </Button>
      ))}
    </div>
  )
}
