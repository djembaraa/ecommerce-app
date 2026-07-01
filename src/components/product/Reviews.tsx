'use client'

import { useState } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

// Mock Data
interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  content: string // Raw HTML
  created_at: string
}

const initialReviews: Review[] = [
  {
    id: '1',
    product_id: '1',
    user_id: 'user123',
    rating: 5,
    content: '<strong>Excellent product!</strong><br/>I really loved the quality. <script>alert("hack")</script>',
    created_at: new Date().toISOString()
  }
]

export function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState('')
  const [rating, setRating] = useState(5)

  // Disimulasikan, bahwa input disimpan mentah ke database, 
  // tetapi dibersihkan saat dirender di layar.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.trim()) return

    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      product_id: productId,
      user_id: 'currentUser', // Mock user
      rating,
      content: newReview, // Save raw input to "database" as requested
      created_at: new Date().toISOString()
    }
    
    setReviews([review, ...reviews])
    setNewReview('')
    setRating(5)
  }

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Customer Reviews</h2>
        
        {/* Write Review Form */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review (Supports HTML: &lt;b&gt;, &lt;i&gt;, &lt;ul&gt;)
                </label>
                <textarea
                  className="w-full min-h-[120px] p-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Share your thoughts. E.g., <b>Great</b> shoes!"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="font-semibold shadow-md">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold">
                        {review.user_id.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-sm">{review.user_id}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`h-4 w-4 ${review.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground opacity-30'}`} 
                      />
                    ))}
                  </div>

                  {/* 
                    XSS Protection applied here. 
                    We save raw input, but sanitize it before dangerouslySetInnerHTML.
                  */}
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(review.content) 
                    }} 
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
