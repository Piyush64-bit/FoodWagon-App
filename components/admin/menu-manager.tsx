'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, UtensilsCrossed } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  restaurantId: string
  restaurantName: string
}

const categories = [
  'Starters',
  'Main Course',
  'Biryani & Rice',
  'Breads',
  'Desserts',
  'Beverages'
]

const sampleRestaurants = [
  { id: '1', name: 'Spice Garden' },
  { id: '2', name: 'Pizza Corner' }
]

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    isVegetarian: false,
    isAvailable: true,
    restaurantId: ''
  })

  useEffect(() => {
    // Load sample menu items
    setMenuItems([
      {
        id: '1',
        name: 'Butter Chicken',
        description: 'Creamy tomato-based chicken curry with aromatic spices',
        price: 320,
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
        category: 'Main Course',
        isVegetarian: false,
        isAvailable: true,
        restaurantId: '1',
        restaurantName: 'Spice Garden'
      },
      {
        id: '2',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
        price: 280,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        category: 'Main Course',
        isVegetarian: true,
        isAvailable: true,
        restaurantId: '2',
        restaurantName: 'Pizza Corner'
      }
    ])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const restaurant = sampleRestaurants.find(r => r.id === formData.restaurantId)
    
    setTimeout(() => {
      if (editingItem) {
        setMenuItems(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData, restaurantName: restaurant?.name || '' }
            : item
        ))
        toast.success('Menu item updated successfully!')
      } else {
        const newItem: MenuItem = {
          id: Date.now().toString(),
          ...formData,
          restaurantName: restaurant?.name || ''
        }
        setMenuItems(prev => [...prev, newItem])
        toast.success('Menu item added successfully!')
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        isVegetarian: false,
        isAvailable: true,
        restaurantId: ''
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      isVegetarian: item.isVegetarian,
      isAvailable: item.isAvailable,
      restaurantId: item.restaurantId
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id))
      toast.success('Menu item deleted successfully!')
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Menu Item Management</CardTitle>
            <CardDescription>
              Add, edit, and manage menu items for your restaurants
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the menu item details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="restaurant">Restaurant</Label>
                  <Select
                    value={formData.restaurantId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, restaurantId: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select restaurant" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleRestaurants.map(restaurant => (
                        <SelectItem key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
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
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vegetarian"
                      checked={formData.isVegetarian}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isVegetarian: !!checked }))
                      }
                    />
                    <Label htmlFor="vegetarian">Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="available"
                      checked={formData.isAvailable}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isAvailable: !!checked }))
                      }
                    />
                    <Label htmlFor="available">Available</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <UtensilsCrossed className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-500">No menu items added yet</p>
            <p className="text-sm text-gray-400">Add your first menu item to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-orange-600">₹{item.price}</span>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {item.restaurantName}
                      </span>
                      {item.isVegetarian && (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                          Veg
                        </span>
                      )}
                      {!item.isAvailable && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
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