'use client'

import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MegaMenu } from "./MegaMenu"
import { CartSidebar } from "../cart/CartSidebar"

export function Header() {
  const { getTotalItems, setIsOpen } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl -rotate-3">M</span>
            </div>
            <span className="font-bold text-2xl tracking-tighter hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              MegaMart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <MegaMenu />
          </div>
        </div>

        {/* Robust Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <Input 
            type="search" 
            placeholder="Search for products, brands and more..." 
            className="w-full pl-10 pr-24 h-12 rounded-full bg-secondary/50 border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base shadow-inner"
          />
          <div className="absolute inset-y-1 right-1 flex items-center">
            <Button size="sm" className="h-full rounded-full px-6 font-semibold">
              Search
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full hover:bg-secondary">
            <User className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full hover:bg-secondary transition-transform active:scale-95"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm animate-in zoom-in"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation/Search placeholder */}
      <div className="md:hidden px-4 pb-4">
         <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="w-full pl-9 h-10 rounded-full bg-secondary/50 border-transparent"
          />
        </div>
      </div>

      <CartSidebar />
    </header>
  )
}
