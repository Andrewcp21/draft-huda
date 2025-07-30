'use server'

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

  return { data }
}
