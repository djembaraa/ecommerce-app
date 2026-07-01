'use client'

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCartStore } from "@/store/useCartStore"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string;
  }
}

export function ProductCard({ product }: ProductProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url
    })
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0 relative">
        <div className="relative aspect-square bg-secondary/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 mix-blend-multiply" />
          {/* We use a colored div as placeholder for image to look WOW without actual images */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/30 group-hover:scale-105 transition-transform duration-500">
            <span className="text-4xl opacity-20 font-black tracking-tighter mix-blend-overlay uppercase">{product.category}</span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">{product.category}</p>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
      </CardContent>
      
      {/* Gestalt Principle: Proximity (Price and Button are grouped together) */}
      <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between gap-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">Price</span>
          <span className="text-xl font-black text-foreground">${product.price.toFixed(2)}</span>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
