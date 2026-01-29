"use client"

import { useState } from 'react'
import { useAdmin } from '@/contexts/admin-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/mock-data'
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
import { Label } from '@/components/ui/label'
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
  Trash2,
  Search,
  Gift,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'

const giftCardValues = [25, 50, 100, 150, 200, 500]

export default function AdminGiftCardsPage() {
  const { giftCards, addGiftCard, deleteGiftCard } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<number>(50)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredCards = giftCards.filter(gc => {
    const matchesSearch = gc.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || gc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddGiftCard = () => {
    addGiftCard(selectedValue)
    setIsAddDialogOpen(false)
  }

  const handleDeleteCard = (id: string) => {
    if (confirm('Are you sure you want to delete this gift card?')) {
      deleteGiftCard(id)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'used':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      used: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      expired: 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return (
      <Badge className={`${variants[status] || ''} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  // Stats
  const activeCards = giftCards.filter(gc => gc.status === 'active')
  const totalActiveValue = activeCards.reduce((sum, gc) => sum + gc.value, 0)
  const usedCards = giftCards.filter(gc => gc.status === 'used')
  const totalUsedValue = usedCards.reduce((sum, gc) => sum + gc.value, 0)

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Gift className="h-8 w-8 text-accent" />
            Gift Cards
          </h1>
          <p className="text-muted-foreground mt-1">{giftCards.length} gift cards total</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Generate Card
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-glass-border">
            <DialogHeader>
              <DialogTitle>Generate New Gift Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Card Value</Label>
                <Select value={selectedValue.toString()} onValueChange={v => setSelectedValue(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {giftCardValues.map(value => (
                      <SelectItem key={value} value={value.toString()}>
                        {formatPrice(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddGiftCard} className="w-full bg-accent hover:bg-accent/80">
                Generate Gift Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Cards</div>
            <div className="text-2xl font-bold">{giftCards.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Active Cards</div>
            <div className="text-2xl font-bold text-green-400">{activeCards.length}</div>
            <div className="text-sm text-muted-foreground">{formatPrice(totalActiveValue)} value</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Used Cards</div>
            <div className="text-2xl font-bold text-yellow-400">{usedCards.length}</div>
            <div className="text-sm text-muted-foreground">{formatPrice(totalUsedValue)} redeemed</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Expired Cards</div>
            <div className="text-2xl font-bold text-red-400">
              {giftCards.filter(gc => gc.status === 'expired').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card border-glass-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by code..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gift Cards Table */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle>All Gift Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Used By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCards.map(card => (
                  <TableRow key={card.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-mono bg-secondary px-2 py-1 rounded text-primary">
                          {card.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyCode(card.code)}
                          className="h-8 w-8 hover:bg-primary/20"
                        >
                          {copiedCode === card.code ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-accent">{formatPrice(card.value)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(card.status)}
                        {getStatusBadge(card.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{card.createdAt}</TableCell>
                    <TableCell>
                      {card.usedBy ? (
                        <div>
                          <p className="font-medium">{card.usedBy}</p>
                          <p className="text-sm text-muted-foreground">{card.usedAt}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCard(card.id)}
                        className="hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
