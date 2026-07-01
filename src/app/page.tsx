import { ProductCard } from "@/components/product/ProductCard"

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Ultraboost Light Shoes",
    category: "Adidas",
    price: 190.00,
    image_url: ""
  },
  {
    id: "2",
    name: "Air Max 270",
    category: "Nike",
    price: 160.00,
    image_url: ""
  },
  {
    id: "3",
    name: "RS-X Efekt PRM",
    category: "Puma",
    price: 120.00,
    image_url: ""
  },
  {
    id: "4",
    name: "Classic Leather Shoes",
    category: "Reebok",
    price: 85.00,
    image_url: ""
  },
  {
    id: "5",
    name: "574 Core",
    category: "New Balance",
    price: 89.99,
    image_url: ""
  },
  {
    id: "6",
    name: "Curry Flow 10",
    category: "Under Armour",
    price: 160.00,
    image_url: ""
  },
  {
    id: "7",
    name: "Stan Smith Shoes",
    category: "Adidas",
    price: 100.00,
    image_url: ""
  },
  {
    id: "8",
    name: "Air Force 1 '07",
    category: "Nike",
    price: 110.00,
    image_url: ""
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Featured Products</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover our hand-picked selection of premium footwear and apparel from top brands worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
