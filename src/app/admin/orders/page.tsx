import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminOrdersPage() {
  const mockOrders = [
    { id: "ord_1a2b3c", user: "user123", total: 205.00, status: "PENDING", date: "2024-01-15" },
    { id: "ord_9f8e7d", user: "johndoe", total: 110.00, status: "SHIPPED", date: "2024-01-14" },
    { id: "ord_4x5y6z", user: "janedoe", total: 350.50, status: "DELIVERED", date: "2024-01-10" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium font-mono text-xs">{order.id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={order.status === 'DELIVERED' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
