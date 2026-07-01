import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function ProfilePage() {
  const supabase = await createClient()

  // 1. Get current authenticated user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Fetch user's profile details
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // 3. Fetch user's order history
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: false })

  const displayOrders = orders || []

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">My Profile</h1>
        <p className="text-xl text-muted-foreground">
          Welcome back, {profile?.full_name || user.email}!
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Order History</h2>
          
          {displayOrders.length === 0 ? (
            <div className="bg-muted/20 border border-dashed rounded-xl p-12 text-center">
              <p className="text-lg text-muted-foreground">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Shipping</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium font-mono text-xs">{order.id}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === 'DELIVERED' ? 'default' : 
                          order.status === 'SHIPPED' ? 'secondary' : 'outline'
                        }>
                          {order.status || 'PENDING'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        ${Number(order.shipping_cost).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ${Number(order.total_amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
