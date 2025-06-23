import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import AdminDashboard from '@/components/admin/admin-dashboard'

export default async function AdminPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return <AdminDashboard />
}