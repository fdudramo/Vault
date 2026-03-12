"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutGrid, Lock, Mail, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export function AuthScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Try to sign in first
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // If sign in fails with invalid credentials, it might be a new user
        if (signInError.message.includes("Invalid login credentials")) {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          })
          
          if (signUpError) {
            // If the user is already registered, it means they just entered the wrong password
            if (signUpError.message.includes("User already registered")) {
              throw new Error("Invalid password for this account.")
            }
            throw signUpError
          } else {
            toast.success("Account created successfully! You are now signed in.")
          }
        } else {
          // Some other error occurred during sign in
          throw signInError
        }
      } else {
        toast.success("Successfully signed in")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setOauthLoading(true)
    try {
      const redirectTo = `${window.location.origin}/app`
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      toast.error(error.message || "Unable to sign in with Google")
      setOauthLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <LayoutGrid className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Account Vault</h1>
          <p className="text-muted-foreground mt-2">
            Securely manage your accounts and API keys
          </p>
        </div>

        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Sign In or Create Account
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Please wait..." : "Continue"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading}
          >
            <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M21.6 12.227c0-.71-.064-1.39-.182-2.045H12v3.87h5.37c-.232 1.25-.94 2.31-2.01 3.02v2.51h3.25c1.9-1.75 2.99-4.33 2.99-7.355z"
                  fill="#4285F4"
                />
                <path
                  d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.25-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.58-4.1H3.06v2.58C4.71 19.98 8.08 22 12 22z"
                  fill="#34A853"
                />
                <path
                  d="M6.42 13.9A5.99 5.99 0 0 1 6.1 12c0-.66.12-1.3.32-1.9V7.52H3.06A9.996 9.996 0 0 0 2 12c0 1.6.39 3.12 1.06 4.48l3.36-2.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 6.04c1.47 0 2.8.5 3.84 1.5l2.88-2.88C16.96 2.86 14.7 2 12 2 8.08 2 4.71 4.02 3.06 7.52l3.36 2.58C7.2 7.75 9.4 6.04 12 6.04z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            {oauthLoading ? "Redirecting..." : "Continue with Google"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            If you don&apos;t have an account, one will be created automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
