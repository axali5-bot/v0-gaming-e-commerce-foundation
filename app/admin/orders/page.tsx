"use client"

import { useState } from 'react'
import { useAdmin, type MockOrder } from '@/contexts/admin-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  ShoppingBag,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  DollarSign,
  Package,
} from 'lucide-react'

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'refunded':
        return <RefreshCw className="h-4 w-4 text-orange-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      refunded: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return (
      <Badge className={`${variants[status] || ''} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  // Stats
  const completedOrders = orders.filter(o => o.status === 'completed')
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.price, 0)
  const refundedAmount = orders.filter(o => o.status === 'refunded').reduce((sum, o) => sum + o.price, 0)

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShoppingBag className="h-8 w-8 text-accent" />
          Order Management
        </h1>
        <p className="text-muted-foreground mt-1">{orders.length} total orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-2xl font-bold text-primary mt-1">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-400" />
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-2xl font-bold text-green-400 mt-1">{completedOrders.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">{pendingOrders.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-orange-400" />
              <div className="text-sm text-muted-foreground">Refunded</div>
            </div>
            <div className="text-2xl font-bold text-orange-400 mt-1">{formatPrice(refundedAmount)}</div>
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
                placeholder="Search by order ID, product, or username..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <code className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                        #{order.id}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.productTitle}</p>
                        <Badge variant="outline" className="text-xs mt-1">{order.platform}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{order.username}</TableCell>
                    <TableCell>
                      <span className="font-bold text-primary">{formatPrice(order.price)}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.paymentMethod}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border-glass-border">
                          {order.status !== 'completed' && (
                            <DropdownMenuItem
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                              Mark Completed
                            </DropdownMenuItem>
                          )}
                          {order.status === 'pending' && (
                            <DropdownMenuItem
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="cursor-pointer"
                            >
                              <XCircle className="h-4 w-4 mr-2 text-red-400" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                          {order.status === 'completed' && (
                            <DropdownMenuItem
                              onClick={() => updateOrderStatus(order.id, 'refunded')}
                              className="cursor-pointer"
                            >
                              <RefreshCw className="h-4 w-4 mr-2 text-orange-400" />
                              Issue Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
