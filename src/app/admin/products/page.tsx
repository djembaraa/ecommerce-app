'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: "1", name: "Ultraboost Light", category: "Adidas", price: 190.00, stock: 45 },
    { id: "2", name: "Air Max 270", category: "Nike", price: 160.00, stock: 12 },
  ])
  
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' })

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call to the vulnerable endpoint
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    
    if (res.ok) {
      const data = await res.json()
      setProducts([...products, data.product])
      setNewProduct({ name: '', category: '', price: '', stock: '' })
    } else {
      alert("Failed to add product")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
      </div>

      {/* Add Product Form */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="flex gap-4 items-end">
          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">Name</label>
            <Input required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Stan Smith" />
          </div>
          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">Category</label>
            <Input required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} placeholder="e.g. Adidas" />
          </div>
          <div className="space-y-2 w-32">
            <label className="text-sm font-medium">Price</label>
            <Input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} placeholder="0.00" />
          </div>
          <div className="space-y-2 w-32">
            <label className="text-sm font-medium">Stock</label>
            <Input required type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} placeholder="0" />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${Number(product.price).toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
