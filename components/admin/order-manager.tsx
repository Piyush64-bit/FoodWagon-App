'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import toast from 'react-hot-toast'

interface Order {
  id: string
  userId: string
  restaurantName: string
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED'
  deliveryAddress: string
  phone: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  createdAt: string
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PREPARING: 'bg-orange-100 text-orange-800',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
}

const statusOptions = [
  'PENDING',
  'CONFIRMED', 
  'PREPARING',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED'
]

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Load sample orders
    setOrders([
      {
        id: '1',
        userId: 'user_1',
        restaurantName: 'Spice Garden',
        totalAmount: 569,
        status: 'CONFIRMED',
        deliveryAddress: '123 Main Street, C-Scheme, Jaipur',
        phone: '+91 9876543210',
        items: [
          { name: 'Butter Chicken', quantity: 2, price: 320 },
          { name: 'Naan', quantity: 3, price: 60 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        userId: 'user_2',
        restaurantName: 'Pizza Corner',
        totalAmount: 329,
        status: 'PREPARING',
        deliveryAddress: '456 Park Avenue, Malviya Nagar, Jaipur',
        phone: '+91 9876543211',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 280 }
        ],
        createdAt: new Date(Date.now() - 1800000).toISOString() // 30 mins ago
      }
    ])
  }, [])

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    toast.success(`Order status updated to ${newStatus.toLowerCase().replace('_', ' ')}`)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          View and manage incoming orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-500">No orders yet</p>
            <p className="text-sm text-gray-400">Orders will appear here when customers place them</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.restaurantName}</p>
                    <p className="text-sm text-gray-500">{formatTime(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">₹{order.totalAmount}</p>
                    <Badge className={statusColors[order.status]}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Delivery Details</h4>
                    <p className="text-sm text-gray-600 mb-1">{order.deliveryAddress}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Update Status</p>
                  </div>
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}