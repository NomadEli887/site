import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Companion {
  id: string
  name: string
  age: number
  photo_url: string
  bio: string
  categories: string[]
  languages: string[]
  hourly_rate: number
  location: string
  rating: number
  reviews_count: number
  is_available: boolean
}

export interface Booking {
  id: string
  companion_id: string
  client_name: string
  client_phone: string
  client_email?: string
  activity_type: string
  preferred_date: string
  preferred_time: string
  duration_hours: number
  notes?: string
  status: string
}

export const categories = [
  'Мероприятия',
  'Прогулки',
  'Кино',
  'Театр',
  'Рестораны',
  'Бассейн',
  'Шопинг',
  'Поездки',
  'Музеи',
  'Спорт',
]
