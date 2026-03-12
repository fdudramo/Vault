"use client"

import { useState, useEffect } from "react"
import { Settings, AlertTriangle, Trash2, LogOut, Database, HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ManageVaultProps {
  isCollapsed: boolean
}

export function ManageVault({ isCollapsed }: ManageVaultProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [storageType, setStorageType] = useState<"local" | "supabase">("local")
  const [supabaseUrl, setSupabaseUrl] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("GT_VAULT_STORAGE_TYPE") as "local" | "supabase" | null
    if (type === "supabase") {
      setStorageType("supabase")
      const creds = localStorage.getItem("GT_VAULT_SUPA")
      if (creds) {
        try {
          const parsed = JSON.parse(creds)
          setSupabaseUrl(parsed.url)
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isOpen])

  const [confirmClearLocal, setConfirmClearLocal] = useState(false)
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)

  const handleClearLocalData = () => {
    localStorage.removeItem("context-keeper-data")
    toast.success("Local data cleared")
    window.location.reload()
  }

  const handleDisconnectSupabase = () => {
    localStorage.removeItem("GT_VAULT_SUPA")
    localStorage.setItem("GT_VAULT_STORAGE_TYPE", "local")
    toast.success("Disconnected from Supabase")
    window.location.reload()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        setConfirmClearLocal(false)
        setConfirmDisconnect(false)
      }
    }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "w-full justify-start rounded-lg hover:bg-muted mb-2",
            isCollapsed ? "h-10 w-10 p-0 justify-center" : "px-3"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium">Manage Vault</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Vault</DialogTitle>
          <DialogDescription>
            View and manage your vault storage settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {storageType === "local" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Local Storage</p>
                  <p className="text-xs text-muted-foreground">Data is saved only in this browser.</p>
                </div>
              </div>
              
              <div className="space-y-2 border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <h4 className="text-sm font-semibold">Danger Zone</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  This will permanently delete all your vault data from this browser.
                </p>
                {!confirmClearLocal ? (
                  <Button variant="destructive" size="sm" onClick={() => setConfirmClearLocal(true)} className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Local Data
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setConfirmClearLocal(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleClearLocalData} className="flex-1">
                      Confirm Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium">Supabase Connected</p>
                  <p className="text-xs text-muted-foreground truncate" title={supabaseUrl || ""}>
                    {supabaseUrl || "Unknown URL"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border rounded-lg p-4">
                <h4 className="text-sm font-semibold">Disconnect</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Remove Supabase credentials from this browser and switch to local storage. Your data in Supabase will not be deleted.
                </p>
                {!confirmDisconnect ? (
                  <Button variant="outline" size="sm" onClick={() => setConfirmDisconnect(true)} className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect Supabase
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setConfirmDisconnect(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDisconnectSupabase} className="flex-1">
                      Confirm Disconnect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
