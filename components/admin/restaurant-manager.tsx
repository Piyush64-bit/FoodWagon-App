'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import toast from 'react-hot-toast'

interface Restaurant {
  id: string
  name: string
  address: string
  cuisine: string
  image: string
  rating: number
  description?: string
  phone?: string
  deliveryFee: number
  deliveryTime: string
  isActive: boolean
}

const cuisineTypes = [
  'Indian',
  'Italian', 
  'Chinese',
  'Mexican',
  'Continental',
  'Fast Food',
  'Desserts'
]

export default function RestaurantManager() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cuisine: '',
    image: '',
    description: '',
    phone: '',
    deliveryFee: 49,
    deliveryTime: '30-45 mins'
  })

  useEffect(() => {
    // Load sample restaurant data
    setRestaurants([
      {
        id: '1',
        name: 'Spice Garden',
        address: 'C-Scheme, Jaipur',
        cuisine: 'Indian',
        image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
        rating: 4.5,
        description: 'Authentic Indian cuisine with traditional flavors',
        phone: '+91 9876543210',
        deliveryFee: 49,
        deliveryTime: '30-45 mins',
        isActive: true
      },
      {
        id: '2',
        name: 'Pizza Corner',
        address: 'Malviya Nagar, Jaipur',
        cuisine: 'Italian',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        rating: 4.2,
        description: 'Fresh Italian pizzas and pasta',
        phone: '+91 9876543211',
        deliveryFee: 39,
        deliveryTime: '25-35 mins',
        isActive: true
      }
    ])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (editingRestaurant) {
        setRestaurants(prev => prev.map(r => 
          r.id === editingRestaurant.id 
            ? { ...r, ...formData, rating: r.rating, isActive: r.isActive }
            : r
        ))
        toast.success('Restaurant updated successfully!')
      } else {
        const newRestaurant: Restaurant = {
          id: Date.now().toString(),
          ...formData,
          rating: 4.0,
          isActive: true
        }
        setRestaurants(prev => [...prev, newRestaurant])
        toast.success('Restaurant added successfully!')
      }

      setIsDialogOpen(false)
      setEditingRestaurant(null)
      setFormData({
        name: '',
        address: '',
        cuisine: '',
        image: '',
        description: '',
        phone: '',
        deliveryFee: 49,
        deliveryTime: '30-45 mins'
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant)
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      image: restaurant.image,
      description: restaurant.description || '',
      phone: restaurant.phone || '',
      deliveryFee: restaurant.deliveryFee,
      deliveryTime: restaurant.deliveryTime
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(prev => prev.filter(r => r.id !== id))
      toast.success('Restaurant deleted successfully!')
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Restaurant Management</CardTitle>
            <CardDescription>
              Add, edit, and manage your restaurants
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the restaurant details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Restaurant Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Select
                      value={formData.cuisine}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, cuisine: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineTypes.map(cuisine => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryFee">Delivery Fee (₹)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      value={formData.deliveryFee}
                      onChange={(e) => setFormData(prev => ({ ...prev, deliveryFee: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryTime">Delivery Time</Label>
                    <Input
                      id="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                      placeholder="30-45 mins"
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-500">No restaurants added yet</p>
            <p className="text-sm text-gray-400">Add your first restaurant to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.address}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                        {restaurant.cuisine}
                      </span>
                      <span>⭐ {restaurant.rating}</span>
                      <span>₹{restaurant.deliveryFee} delivery</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(restaurant)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(restaurant.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}