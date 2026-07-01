'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // 1. Create user in Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  // 2. Insert into public.users table as requested by user
  if (data.user) {
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email,
        role: 'user',
        // Note: created_at is likely handled by default now() in DB
      })
    
    // Optionally create profile
    if (!insertError) {
      await supabase
        .from('profiles')
        .insert({
          user_id: data.user.id,
          full_name: fullName,
          settings: {}
        })
    }
  }

  // Redirect to login after successful signup
  redirect('/login?message=Check your email to confirm your account (or login directly if auto-confirm is enabled)')
}
