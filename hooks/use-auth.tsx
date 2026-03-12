"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type Plan = 'free' | 'paid'

interface Profile {
  id: string
  email: string
  plan: Plan
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
      
      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }
      return data as Profile
    } catch (e) {
      console.error('Exception fetching profile:', e)
      return null
    }
  }

  const createProfile = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email ?? '',
          plan: 'free',
        })
        .select('*')
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        return null
      }
      return data as Profile
    } catch (e) {
      console.error('Exception creating profile:', e)
      return null
    }
  }

  const ensureProfile = async (user: User) => {
    const existing = await fetchProfile(user.id)
    if (existing) return existing
    return createProfile(user)
  }

  const refreshProfile = async () => {
    if (user) {
      const p = await ensureProfile(user)
      setProfile(p)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const p = await ensureProfile(session.user)
          setProfile(p)
        }
      } catch (e) {
        console.error('Error in initAuth:', e)
        setUser(null)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null)
        if (session?.user) {
          const p = await ensureProfile(session.user)
          setProfile(p)
        } else {
          setProfile(null)
        }
      } catch (e) {
        console.error('Error in onAuthStateChange:', e)
        setUser(null)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
