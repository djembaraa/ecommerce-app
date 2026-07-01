import { supabase } from '@/lib/supabase'
import { Reviews } from '@/components/product/Reviews'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = params.slug

  // 1. Fetch product by slug
  const { data: product, error: prodError } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('slug', slug)
    .single()

  if (!product) {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) {
      // Fallback UI if Supabase is not configured yet
      return (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Database connection is not configured. Please add Supabase credentials to .env.local.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      )
    }
    notFound()
  }

  // Parse details json if exists
  const details = product.details || {}
  const features = details.features || [
    "Premium quality materials",
    "Durable construction",
    "Exclusive design"
  ]
  const description = details.description || "Discover the perfect blend of style and comfort with this premium product."
  const categoryName = product.categories?.name || "Uncategorized"

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images (Placeholder or from DB) */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary/30 rounded-3xl overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/30" />
            <span className="text-6xl font-black opacity-20 uppercase tracking-tighter mix-blend-overlay">
              {categoryName}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-secondary/30 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{categoryName}</p>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{product.name}</h1>
            <p className="text-3xl font-bold">${Number(product.price).toFixed(2)}</p>
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>

          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-3">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons - Gestalt Proximity */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t">
            <Button className="flex-1 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl shadow-sm">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl shadow-sm">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 pt-10 border-t">
        <Reviews productId={product.id} />
      </div>
    </div>
  )
}
