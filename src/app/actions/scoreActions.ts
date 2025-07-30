'use server'

import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

async function getPersonIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  const userName = cookieStore.get('userName')?.value
  const userEmail = cookieStore.get('userEmail')?.value

  if (!userName || !userEmail) {
    console.error('User name or email not found in cookies.')
    return null
  }

  const { data, error } = await supabase
    .from('personal_details')
    .select('id')
    .eq('name', userName)
    .eq('email', userEmail)
    .single()

  if (error) {
    console.error('Error fetching person ID:', error)
    return null
  }

  return data?.id || null
}

export async function saveM3Q2Feedback(essayAnswer: string) {
  const personId = await getPersonIdFromCookies()

  if (!personId) {
    return { error: 'Person ID not found.' }
  }

  const { data, error } = await supabase
    .from('score')
    .upsert(
      { person: personId, essay_answer: essayAnswer },
      { onConflict: 'person' } // Assumes 'person' column has a UNIQUE constraint
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving M3Q2 feedback:', error)
    return { error }
  }

  return { data }
}

export async function saveM3Q3Feedback(motivationAnswer: string) {
  const personId = await getPersonIdFromCookies()

  if (!personId) {
    return { error: 'Person ID not found.' }
  }

  const { data, error } = await supabase
    .from('score')
    .upsert(
      { person: personId, motivation_answer: motivationAnswer },
      { onConflict: 'person' } // Assumes 'person' column has a UNIQUE constraint
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving M3Q3 feedback:', error)
    return { error }
  }

  return { data }
}
