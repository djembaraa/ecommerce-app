'use client'

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Adidas",
    href: "/category/adidas",
    description: "Explore the latest collection of Adidas shoes, clothing, and accessories.",
  },
  {
    title: "Nike",
    href: "/category/nike",
    description: "Just Do It. Shop Nike for the latest athletic wear and sneakers.",
  },
  {
    title: "Puma",
    href: "/category/puma",
    description: "Forever Faster. Discover Puma's sports and lifestyle products.",
  },
  {
    title: "Reebok",
    href: "/category/reebok",
    description: "Fitness and classic style apparel and footwear from Reebok.",
  },
  {
    title: "New Balance",
    href: "/category/new-balance",
    description: "Comfort meets style with New Balance sneakers and athletic gear.",
  },
  {
    title: "Under Armour",
    href: "/category/under-armour",
    description: "Innovative sportswear designed to make you better.",
  }
]

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm font-medium transition-colors hover:text-primary">Brands</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background border rounded-lg shadow-lg">
              {categories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/new-arrivals" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium")}>
              New Arrivals
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/sale" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium text-red-500 hover:text-red-600")}>
              Sale
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
