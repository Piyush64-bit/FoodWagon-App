import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, Truck, MapPin } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import Header from '@/components/header'
import MenuSection from '@/components/menu-section'

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: {
      menuItems: {
        where: { isAvailable: true },
        orderBy: { category: 'asc' }
      }
    }
  })

  if (!restaurant) {
    notFound()
  }

  // Group menu items by category
  const menuByCategory = restaurant.menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof restaurant.menuItems>)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Restaurant Hero */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>₹{restaurant.deliveryFee} delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {restaurant.cuisine}
                </span>
                {restaurant.description && (
                  <p className="text-gray-600 max-w-2xl">{restaurant.description}</p>
                )}
              </div>
              {restaurant.phone && (
                <div className="mt-4 lg:mt-0">
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="font-semibold">{restaurant.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Menu</h2>
          
          {Object.keys(menuByCategory).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No menu items available</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(menuByCategory).map(([category, items]) => (
                <MenuSection
                  key={category}
                  category={category}
                  items={items}
                  restaurant={restaurant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}