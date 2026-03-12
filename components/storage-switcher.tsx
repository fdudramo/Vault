"use client"

import { useState, useEffect } from "react"
import { Database, HardDrive, Check, ChevronsUpDown, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface StorageSwitcherProps {
  isCollapsed: boolean
}

export function StorageSwitcher({ isCollapsed }: StorageSwitcherProps) {
  const [storageType, setStorageType] = useState<"local" | "supabase">("local")
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")

  useEffect(() => {
    const loadConfig = () => {
      const type = localStorage.getItem("GT_VAULT_STORAGE_TYPE") as "local" | "supabase" | null
      if (type === "supabase") {
        setStorageType("supabase")
      } else {
        setStorageType("local")
      }
    }
    
    loadConfig()
    
    window.addEventListener('storage-changed', loadConfig)
    return () => window.removeEventListener('storage-changed', loadConfig)
  }, [])

  const handleSwitch = (type: "local" | "supabase") => {
    if (type === "supabase") {
      const creds = localStorage.getItem("GT_VAULT_SUPA")
      if (!creds) {
        setShowSetupModal(true)
        return
      }
    }
    
    localStorage.setItem("GT_VAULT_STORAGE_TYPE", type)
    setStorageType(type)
    window.dispatchEvent(new Event('storage-changed'))
    toast.success(`Successfully switched to ${type === 'supabase' ? 'Supabase' : 'Local Storage'}`)
  }

  const handleSaveSupabase = () => {
    if (!supabaseUrl || !supabaseKey) {
      toast.error("Please provide both URL and Key")
      return
    }

    localStorage.setItem("GT_VAULT_SUPA", JSON.stringify({ url: supabaseUrl, key: supabaseKey }))
    localStorage.setItem("GT_VAULT_STORAGE_TYPE", "supabase")
    setStorageType("supabase")
    setShowSetupModal(false)
    window.dispatchEvent(new Event('storage-changed'))
    toast.success("Successfully connected and switched to Supabase")
  }

  const sqlSnippet = `CREATE TABLE vault_apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  accounts JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at BIGINT NOT NULL
);

ALTER TABLE vault_apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON vault_apps FOR ALL USING (true) WITH CHECK (true);`

  const copySql = () => {
    navigator.clipboard.writeText(sqlSnippet)
    toast.success("SQL copied to clipboard")
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start rounded-lg hover:bg-muted",
              isCollapsed ? "h-10 w-10 p-0 justify-center" : "px-3"
            )}
          >
            {storageType === "local" ? (
              <HardDrive className="h-4 w-4 shrink-0" />
            ) : (
              <Database className="h-4 w-4 shrink-0" />
            )}
            {!isCollapsed && (
              <>
                <div className="ml-3 flex flex-col items-start text-left flex-1 overflow-hidden">
                  <span className="text-sm font-medium leading-none truncate w-full">
                    {storageType === "local" ? "Local Storage" : "Supabase"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {storageType === "local" ? "Browser only" : "Cloud synced"}
                  </span>
                </div>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleSwitch("local")} className="cursor-pointer">
            <HardDrive className="mr-2 h-4 w-4" />
            <span>Local Storage</span>
            {storageType === "local" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSwitch("supabase")} className="cursor-pointer">
            <Database className="mr-2 h-4 w-4" />
            <span>Supabase</span>
            {storageType === "supabase" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showSetupModal} onOpenChange={setShowSetupModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Supabase</DialogTitle>
            <DialogDescription>
              Bring your own Supabase project to sync your vault across devices. Your credentials are saved locally in your browser.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="url">Project URL</Label>
              <Input 
                id="url" 
                placeholder="https://xxxx.supabase.co" 
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">Anon Key</Label>
              <Input 
                id="key" 
                type="password"
                placeholder="eyJh..." 
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label>Required Database Setup</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Run this SQL in your Supabase SQL Editor to create the necessary table:
              </p>
              <div className="relative">
                <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto font-mono text-muted-foreground">
                  {sqlSnippet}
                </pre>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 h-6 w-6 bg-background/50 hover:bg-background"
                  onClick={copySql}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetupModal(false)}>Cancel</Button>
            <Button onClick={handleSaveSupabase}>Connect & Switch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
