"use client"

import { AppItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddAppModal } from './add-app-modal';
import { LayoutGrid, Settings } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

interface SidebarProps {
  apps: AppItem[];
  selectedAppId: string | null;
  onSelectApp: (id: string) => void;
  onAddApp: (app: AppItem) => void;
}

export function Sidebar({ apps, selectedAppId, onSelectApp, onAddApp }: SidebarProps) {
  return (
    <div className="w-64 border-r bg-card/50 flex flex-col h-screen">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <span>Vault</span>
        </div>
        <ModeToggle />
      </div>
      
      <div className="p-4">
        <AddAppModal onAdd={onAddApp} />
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {apps.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              No apps added yet
            </div>
          ) : (
            apps.map((app) => (
              <Button
                key={app.id}
                variant={selectedAppId === app.id ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => onSelectApp(app.id)}
              >
                <span className="truncate">{app.name}</span>
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t text-xs text-muted-foreground text-center">
        ContextKeeper v1.0
      </div>
    </div>
  );
}
