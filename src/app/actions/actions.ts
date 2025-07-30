'use server'

import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export async function createPersonalDetails(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  const { data, error } = await supabase
    .from('personal_details')
    .insert([{ name, email }])

  if (error) {
    console.error('Error inserting data:', error)
    return { error }
  }

  const cookieStore = await cookies()
  cookieStore.set('userName', name, { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 1 week
  cookieStore.set('userEmail', email, { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 1 week

  return { data }
}