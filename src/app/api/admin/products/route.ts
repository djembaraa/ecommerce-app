import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // 🚨 VULNERABILITY WARNING: MISSING FUNCTION LEVEL ACCESS CONTROL 🚨
    // AS REQUESTED BY THE USER FOR DEMO PURPOSES:
    // This backend route does NOT verify if the user is actually an admin.
    // It relies entirely on Next.js Edge Middleware for protection, which can be bypassed 
    // if an attacker directly hits this endpoint without going through the frontend UI,
    // or if the middleware matcher is misconfigured.
    // In production, you MUST verify the user's role (e.g. JWT check) right here!

    const payload = await request.json()
    const { name, category, price, stock } = payload

    if (!name || !category || !price) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Simulasi menyimpan produk baru ke database
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      category,
      price: Number(price),
      stock: Number(stock) || 0,
    }

    // Simulasi delay database
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      message: 'Product added successfully (INSECURELY)',
      product: newProduct
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
