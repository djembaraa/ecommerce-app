import { ProductCard } from "@/components/product/ProductCard"
import { supabase } from '@/lib/supabase'

export default async function NewArrivalsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('id', { ascending: false })
    .limit(8)
  
  const displayProducts = products || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">New Arrivals</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Check out the latest additions to our collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {displayProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.slug || product.id,
              name: product.name,
              category: product.categories?.name || "Uncategorized",
              price: product.price,
              image_url: product.image_urls?.[0] || ""
            }} 
          />
        ))}
      </div>
    </div>
  )
}
