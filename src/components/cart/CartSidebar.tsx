'use client'

import { useCartStore } from "@/store/useCartStore"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background/80 backdrop-blur-xl border-l">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold tracking-tight">Your Cart</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Trash2 className="h-10 w-10 opacity-50" />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product_id} className="flex gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h4>
                      <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-md hover:bg-background"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-md hover:bg-background"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.product_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4 bg-background">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
