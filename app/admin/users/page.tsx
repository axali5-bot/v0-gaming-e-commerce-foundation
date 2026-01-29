"use client"

import { useState } from 'react'
import { useAdmin, type MockUser } from '@/contexts/admin-context'
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
  Users,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Ban,
  ShieldCheck,
  ShieldOff,
  ShieldAlert,
} from 'lucide-react'

export default function AdminUsersPage() {
  const { users, updateUserStatus } = useAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case 'suspended':
        return <ShieldAlert className="h-4 w-4 text-yellow-500" />
      case 'banned':
        return <ShieldOff className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      suspended: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      banned: 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return (
      <Badge className={`${variants[status] || ''} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  // Stats
  const activeUsers = users.filter(u => u.status === 'active').length
  const suspendedUsers = users.filter(u => u.status === 'suspended').length
  const bannedUsers = users.filter(u => u.status === 'banned').length
  const totalSpent = users.reduce((sum, u) => sum + u.totalSpent, 0)

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-green-400" />
          User Management
        </h1>
        <p className="text-muted-foreground mt-1">{users.length} registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-2xl font-bold text-green-400 mt-1">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="text-sm text-muted-foreground">Suspended</div>
            </div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">{suspendedUsers}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-400" />
              <div className="text-sm text-muted-foreground">Banned</div>
            </div>
            <div className="text-2xl font-bold text-red-400 mt-1">{bannedUsers}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-glass-border">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold text-primary mt-1">{formatPrice(totalSpent)}</div>
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
                placeholder="Search by username or email..."
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
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.registeredAt}</TableCell>
                    <TableCell>
                      <span className="font-medium">{user.totalPurchases}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-primary">{formatPrice(user.totalSpent)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        {getStatusBadge(user.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border-glass-border">
                          {user.status !== 'active' && (
                            <DropdownMenuItem
                              onClick={() => updateUserStatus(user.id, 'active')}
                              className="cursor-pointer"
                            >
                              <ShieldCheck className="h-4 w-4 mr-2 text-green-400" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          {user.status !== 'suspended' && (
                            <DropdownMenuItem
                              onClick={() => updateUserStatus(user.id, 'suspended')}
                              className="cursor-pointer"
                            >
                              <ShieldAlert className="h-4 w-4 mr-2 text-yellow-400" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          {user.status !== 'banned' && (
                            <DropdownMenuItem
                              onClick={() => updateUserStatus(user.id, 'banned')}
                              className="cursor-pointer text-destructive"
                            >
                              <ShieldOff className="h-4 w-4 mr-2" />
                              Ban User
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
