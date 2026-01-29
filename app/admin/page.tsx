"use client"

import { useAdmin } from '@/contexts/admin-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/mock-data'
import {
  DollarSign,
  ShoppingBag,
  Users,
  Gamepad2,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

export default function AdminDashboard() {
  const { stats, orders, users, products } = useAdmin()

  const recentOrders = orders.slice(0, 5)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const activeUsers = users.filter(u => u.status === 'active').length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'refunded':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
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

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to GameVault Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-glass-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-primary/20">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-glass-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <div className="p-2 rounded-lg bg-accent/20">
              <ShoppingBag className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center gap-1 text-sm text-yellow-400 mt-1">
              <Clock className="h-4 w-4" />
              <span>{pendingOrders} pending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-glass-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/20">
              <Users className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
              <CheckCircle className="h-4 w-4" />
              <span>{activeUsers} active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-glass-border hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <Gamepad2 className="h-4 w-4 text-neon-purple" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center gap-1 text-sm text-green-400 mt-1">
              <TrendingUp className="h-4 w-4" />
              <span>+3 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="glass-card border-glass-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-medium">{order.productTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.username} - {order.platform}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatPrice(order.price)}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Completed Orders</span>
              <span className="font-bold text-green-400">
                {orders.filter(o => o.status === 'completed').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Refunded Orders</span>
              <span className="font-bold text-orange-400">
                {orders.filter(o => o.status === 'refunded').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Suspended Users</span>
              <span className="font-bold text-yellow-400">
                {users.filter(u => u.status === 'suspended').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Banned Users</span>
              <span className="font-bold text-red-400">
                {users.filter(u => u.status === 'banned').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Out of Stock</span>
              <span className="font-bold text-red-400">
                {products.filter(p => !p.inStock).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
