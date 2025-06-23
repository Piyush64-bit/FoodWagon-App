import Hero from '@/components/hero'
import RestaurantGrid from '@/components/restaurant-grid'
import Features from '@/components/features'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { menuItems: true }
      }
    },
    orderBy: { rating: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Features />
      <RestaurantGrid restaurants={restaurants} />
      <Footer />
    </div>
  )
}