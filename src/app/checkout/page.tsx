'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart, setIsOpen } = useCartStore()
  
  const [address, setAddress] = useState('')
  const [courier, setCourier] = useState('jne')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Ensure cart sidebar is closed when on checkout page
  useState(() => {
    setIsOpen(false)
  })

  const subtotal = getTotalPrice()
  const shippingCost = 15.00 // Fixed for demo
  const totalAmount = subtotal + shippingCost

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setIsSubmitting(true)

    try {
      // 🚨 VULNERABLE APPROACH (FOR DEMO) 🚨
      // Sending total_amount and shipping_cost from client to be trusted by server
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          courier,
          items,
          total_amount: totalAmount,
          shipping_cost: shippingCost
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        clearCart()
      } else {
        alert(data.error || 'Checkout failed')
      }
    } catch (error) {
      alert('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center max-w-lg">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-in zoom-in duration-500" />
        <h1 className="text-4xl font-black tracking-tight mb-4">Order Placed!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your order has been successfully created and is being processed.
        </p>
        <Button size="lg" className="rounded-full px-8" onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/')}>Go Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Shopping
      </Link>

      <h1 className="text-4xl font-black tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea 
                    required
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address..."
                    className="w-full p-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Shipping Courier</label>
                  <select 
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full p-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="jne">JNE Express</option>
                    <option value="sicepat">SiCepat Halu</option>
                    <option value="jnt">J&T Express</option>
                    <option value="dhl">DHL International</option>
                  </select>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-28 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 mr-4">{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full h-12 text-lg mt-6 shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
