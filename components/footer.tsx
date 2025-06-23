import Link from 'next/link'
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">Foodwagon</span>
            </Link>
            <p className="text-gray-400 mb-6">
              The best food delivery service in Jaipur. Fast, reliable, and delicious.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-orange-500 transition-colors">Help</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">For Restaurants</h3>
            <ul className="space-y-3">
              <li><Link href="/partner" className="text-gray-400 hover:text-orange-500 transition-colors">Partner With Us</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-orange-500 transition-colors">Restaurant Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <p>📍 Jaipur, Rajasthan, India</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ hello@foodwagon.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Foodwagon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}