import { Clock, Shield, Truck } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Get your food delivered in 30-45 minutes or less'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your payments and personal data are always protected'
  },
  {
    icon: Truck,
    title: 'Live Tracking',
    description: 'Track your order in real-time from kitchen to your door'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Foodwagon?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make food delivery simple, fast, and reliable in Jaipur
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}