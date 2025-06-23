'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { useUser } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface CartSheetProps {
  children: React.ReactNode
}

export default function CartSheet({ children }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const { isSignedIn } = useUser()
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  
  const deliveryFee = 49
  const total = getTotalPrice()
  const grandTotal = total + deliveryFee

  const handleOrder = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to place an order')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsOrdering(true)
    
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Order placed successfully! 🎉')
      clearCart()
      setIsOpen(false)
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsOrdering(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Your Cart ({items.length})
          </SheetTitle>
          <SheetDescription>
            Review your items before placing the order
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some delicious items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    <p className="text-sm font-medium text-orange-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <SheetFooter>
              {isSignedIn ? (
                <Button 
                  onClick={handleOrder} 
                  disabled={isOrdering}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isOrdering ? 'Placing Order...' : `Place Order - ₹${grandTotal.toFixed(2)}`}
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Sign In to Order
                  </Button>
                </SignInButton>
              )}
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}