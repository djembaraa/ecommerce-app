import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // 🚨 VULNERABILITY WARNING 🚨
    // AS REQUESTED BY THE USER FOR DEMO PURPOSES:
    // We are trusting the total_amount and shipping_cost directly from the frontend payload.
    // In a real production application, THIS MUST BE CALCULATED ON THE SERVER
    // by fetching the prices of the product IDs from the database.
    const { 
      address, 
      courier, 
      items, 
      total_amount, 
      shipping_cost 
    } = payload

    // Simulasi validasi minimal
    if (!address || !courier || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // SIMULASI: Menyimpan pesanan ke database (SOT.md schema)
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: "user123", // Simulated authenticated user
      total_amount: total_amount, // ⚠️ Insecure: Trusted from client
      shipping_cost: shipping_cost, // ⚠️ Insecure: Trusted from client
      status: "PENDING",
      payment_details: {
        method: "Credit Card",
        status: "Unpaid"
      },
      created_at: new Date().toISOString()
    }

    // Simulasi delay database
    await new Promise(resolve => setTimeout(resolve, 800))

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
