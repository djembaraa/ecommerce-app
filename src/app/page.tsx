import { ProductCard } from "@/components/product/ProductCard"
import { supabase } from '@/lib/supabase'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch real data from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .limit(8)
  
  // If Supabase is not configured or error occurs, fallback to empty array
  // so the user knows they need to configure it
  const displayProducts = products || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Featured Products</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover our hand-picked selection of premium footwear and apparel from top brands worldwide.
        </p>
      </div>

      {displayProducts.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <p className="text-lg text-muted-foreground">
            Welcome! It looks like you haven't added products to your Supabase database yet.
          </p>
          <p className="text-sm mt-2 text-muted-foreground/60">
            (Or the .env.local configuration is missing)
          </p>
        </div>
      ) : (
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
      )}
    </div>
  )
}
