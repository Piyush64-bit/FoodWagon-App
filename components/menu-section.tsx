'use client'

import Image from 'next/image'
import { Plus, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import toast from 'react-hot-toast'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isVegetarian: boolean
  isAvailable: boolean
}

interface Restaurant {
  id: string
  name: string
}

interface MenuSectionProps {
  category: string
  items: MenuItem[]
  restaurant: Restaurant
}

export default function MenuSection({ category, items, restaurant }: MenuSectionProps) {
  const { addItem, items: cartItems, restaurantId } = useCartStore()

  const handleAddToCart = (item: MenuItem) => {
    // Check if adding from different restaurant
    if (restaurantId && restaurantId !== restaurant.id && cartItems.length > 0) {
      const proceed = window.confirm(
        'Adding items from a different restaurant will clear your current cart. Continue?'
      )
      if (!proceed) return
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    })

    toast.success(`${item.name} added to cart!`)
  }

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = cartItems.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">
        {category}
      </h3>
      
      <div className="grid gap-6">
        {items.map((item) => {
          const quantityInCart = getItemQuantityInCart(item.id)
          
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
                      {item.isVegetarian && (
                        <Leaf className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {quantityInCart > 0 && (
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                          {quantityInCart} in cart
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {!item.isAvailable ? 'Not Available' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
                
                <div className="w-full lg:w-48 h-48 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}