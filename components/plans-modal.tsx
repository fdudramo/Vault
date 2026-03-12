"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Shield, Database, HardDrive, Lock } from "lucide-react";

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlansModal({ isOpen, onClose }: PlansModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="p-6 sm:p-8 bg-muted/40 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Choose Your Vault Plan
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              Secure your accounts exactly how you want.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
          {/* Free Plan */}
          <div className="p-6 sm:p-8 flex flex-col h-full bg-background">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Free Plan</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Perfect for simple local storage.
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <HardDrive className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Local storage only</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">
                  Secure: no one can access your passwords but you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Nothing linked to your account</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-sm italic">
                  Note: If you clear your browser storage, cache, or update,
                  your data will be gone!
                </span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Fully Free
            </Button>
          </div>

          {/* Paid Plan */}
          <div className="p-6 sm:p-8 flex flex-col h-full bg-primary/5 relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-primary">Pro Plan</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Take control with your own database.
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">$1</span>
              <span className="text-muted-foreground">
                /mo (billed annually)
              </span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium">
                  Bring your own database (Supabase)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Maximum security</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">
                  DB credentials saved in your Chrome storage (none linked to
                  your account)
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <span className="text-sm italic">
                  Note: If you clear browser storage, you just need to
                  re-authenticate your Supabase. Your data is safe!
                </span>
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={() => window.open("https://t.me/OmarGatara", "_blank")}
            >
              Talk to me
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
