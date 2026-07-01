import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Middleware helper untuk memvalidasi akses admin di setiap route API
async function checkAdminAccess() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { authorized: false, supabase: null }
  
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (!profile || profile.role !== 'admin') return { authorized: false, supabase: null }
  
  return { authorized: true, supabase }
}

export async function POST(request: Request) {
  try {
    const { authorized, supabase } = await checkAdminAccess()
    if (!authorized || !supabase) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
    }

    const payload = await request.json()
    const { data, error } = await supabase
      .from('products')
      .insert(payload)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, product: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { authorized, supabase } = await checkAdminAccess()
    if (!authorized || !supabase) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
    }

    const payload = await request.json()
    const { id, ...updateData } = payload

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, product: data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { authorized, supabase } = await checkAdminAccess()
    if (!authorized || !supabase) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for deletion' }, { status: 400 })
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Product deleted' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 })
  }
}
