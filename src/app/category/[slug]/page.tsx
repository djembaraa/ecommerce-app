import { supabase } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

// Note: To use generateStaticParams, you would fetch all categories here.
// But since data might change frequently, we use Server Components for dynamic fetching.

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = params.slug

  // 1. Fetch category details
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  // 2. Fetch products for this category
  let products: any[] = []
  if (category) {
    const { data: prods, error: prodError } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
    
    if (prods) products = prods
  } else if (!catError) {
    // If we're missing Supabase credentials (mock fallback for demo before DB setup)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) {
      products = [] // Let it render empty instead of crashing
    } else {
      notFound()
    }
  } else {
      // In a real scenario where connection fails, you might want to show an error boundary
      // But for demo, if it fails, we'll just pretend it has no products or not found
      if (catError.code === 'PGRST116') { // not found code in PostgREST
          notFound()
      }
  }

  const categoryName = category ? category.name : (slug.charAt(0).toUpperCase() + slug.slice(1))

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">{categoryName} Collection</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover our exclusive selection of {categoryName} products.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <p className="text-lg text-muted-foreground">
            No products found for this category yet.
          </p>
          <p className="text-sm mt-2 text-muted-foreground/60">
            (If you haven't configured Supabase or added data, this will be empty)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.slug || product.id, // Fallback to id if slug is missing
                name: product.name,
                category: categoryName,
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
