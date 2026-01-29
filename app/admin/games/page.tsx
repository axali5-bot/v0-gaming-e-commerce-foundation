"use client"

import { useState } from 'react'
import { useAdmin } from '@/contexts/admin-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice, type Product, type Category, type Platform, type Tag } from '@/lib/mock-data'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Gamepad2,
  Star,
} from 'lucide-react'
import Image from 'next/image'

const categories: Category[] = ['action', 'adventure', 'rpg', 'strategy', 'sports', 'simulation']
const platforms: Platform[] = ['PS4', 'PS5', 'Xbox']
const tags: Tag[] = ['newRelease', 'bestseller', 'featured', 'discount', 'trending']

interface GameFormData {
  title: string
  titleKa: string
  titleRu: string
  description: string
  descriptionKa: string
  descriptionRu: string
  price: number
  originalPrice?: number
  image: string
  category: Category
  platform: Platform[]
  tags: Tag[]
  rating: number
  reviewCount: number
  inStock: boolean
  releaseDate: string
  developer: string
  publisher: string
}

const defaultFormData: GameFormData = {
  title: '',
  titleKa: '',
  titleRu: '',
  description: '',
  descriptionKa: '',
  descriptionRu: '',
  price: 0,
  originalPrice: undefined,
  image: '/games/cyber-nexus.jpg',
  category: 'action',
  platform: ['PS5'],
  tags: [],
  rating: 4.5,
  reviewCount: 0,
  inStock: true,
  releaseDate: new Date().toISOString().split('T')[0],
  developer: '',
  publisher: '',
}

export default function AdminGamesPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<GameFormData>(defaultFormData)

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.developer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddGame = () => {
    addProduct({
      ...formData,
      images: [formData.image],
    } as Omit<Product, 'id'>)
    setFormData(defaultFormData)
    setIsAddDialogOpen(false)
  }

  const handleEditGame = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        images: [formData.image],
      })
      setEditingProduct(null)
      setIsEditDialogOpen(false)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      titleKa: product.titleKa,
      titleRu: product.titleRu,
      description: product.description,
      descriptionKa: product.descriptionKa,
      descriptionRu: product.descriptionRu,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      platform: product.platform,
      tags: product.tags,
      rating: product.rating,
      reviewCount: product.reviewCount,
      inStock: product.inStock,
      releaseDate: product.releaseDate,
      developer: product.developer,
      publisher: product.publisher,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteGame = (id: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      deleteProduct(id)
    }
  }

  const togglePlatform = (platform: Platform) => {
    setFormData(prev => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...prev.platform, platform]
    }))
  }

  const toggleTag = (tag: Tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const GameForm = ({ onSubmit, submitLabel }: { onSubmit: () => void, submitLabel: string }) => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Title (EN)</Label>
          <Input
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Game title in English"
          />
        </div>
        <div className="space-y-2">
          <Label>Title (KA)</Label>
          <Input
            value={formData.titleKa}
            onChange={e => setFormData(prev => ({ ...prev, titleKa: e.target.value }))}
            placeholder="Game title in Georgian"
          />
        </div>
        <div className="space-y-2">
          <Label>Title (RU)</Label>
          <Input
            value={formData.titleRu}
            onChange={e => setFormData(prev => ({ ...prev, titleRu: e.target.value }))}
            placeholder="Game title in Russian"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description (EN)</Label>
        <Textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Game description in English"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Description (KA)</Label>
          <Textarea
            value={formData.descriptionKa}
            onChange={e => setFormData(prev => ({ ...prev, descriptionKa: e.target.value }))}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label>Description (RU)</Label>
          <Textarea
            value={formData.descriptionRu}
            onChange={e => setFormData(prev => ({ ...prev, descriptionRu: e.target.value }))}
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Original Price</Label>
          <Input
            type="number"
            value={formData.originalPrice || ''}
            onChange={e => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || undefined }))}
            placeholder="Optional"
          />
        </div>
        <div className="space-y-2">
          <Label>Rating</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={e => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Review Count</Label>
          <Input
            type="number"
            value={formData.reviewCount}
            onChange={e => setFormData(prev => ({ ...prev, reviewCount: parseInt(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value: Category) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Release Date</Label>
          <Input
            type="date"
            value={formData.releaseDate}
            onChange={e => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Image Path</Label>
          <Input
            value={formData.image}
            onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="/games/example.jpg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Developer</Label>
          <Input
            value={formData.developer}
            onChange={e => setFormData(prev => ({ ...prev, developer: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Publisher</Label>
          <Input
            value={formData.publisher}
            onChange={e => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Platforms</Label>
        <div className="flex gap-4">
          {platforms.map(platform => (
            <label key={platform} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.platform.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <span>{platform}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={formData.inStock}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: !!checked }))}
        />
        <span>In Stock</span>
      </label>

      <Button onClick={onSubmit} className="w-full bg-primary hover:bg-primary/80">
        {submitLabel}
      </Button>
    </div>
  )

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            Games Management
          </h1>
          <p className="text-muted-foreground mt-1">{products.length} games in catalog</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/80" onClick={() => setFormData(defaultFormData)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-glass-border max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Game</DialogTitle>
            </DialogHeader>
            <GameForm onSubmit={handleAddGame} submitLabel="Add Game" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="glass-card border-glass-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games by title or developer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Games Table */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle>All Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-secondary">
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-muted-foreground">{product.developer}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {product.platform.map(p => (
                          <Badge key={p} className="bg-secondary text-xs">{p}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(product)}
                          className="hover:bg-primary/20 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteGame(product.id)}
                          className="hover:bg-destructive/20 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass-card border-glass-border max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Game</DialogTitle>
          </DialogHeader>
          <GameForm onSubmit={handleEditGame} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
