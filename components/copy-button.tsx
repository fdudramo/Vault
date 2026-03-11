"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  textToCopy: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  iconClassName?: string
  showText?: boolean
}

export function CopyButton({ 
  textToCopy, 
  variant = "ghost", 
  size = "icon", 
  className,
  iconClassName = "h-4 w-4",
  showText = false
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy")
    }
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleCopy}
      className={cn(
        className,
        isCopied && "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 border-green-200 dark:text-green-400 dark:hover:text-green-300 dark:bg-green-950/30 dark:hover:bg-green-950/50 dark:border-green-900/50"
      )}
    >
      {isCopied ? <Check className={iconClassName} /> : <Copy className={iconClassName} />}
      {showText && (
        <span className={isCopied ? "ml-2" : "ml-2"}>{isCopied ? "Copied" : "Copy"}</span>
      )}
    </Button>
  )
}
