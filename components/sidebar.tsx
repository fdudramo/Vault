"use client"

import { useState } from 'react';
import { AppItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddAppModal } from './add-app-modal';
import { StorageSwitcher } from './storage-switcher';
import { LayoutGrid, Menu, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  apps: AppItem[];
  selectedAppId: string | null;
  onSelectApp: (id: string) => void;
  onAddApp: (app: AppItem) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ apps, selectedAppId, onSelectApp, onAddApp, isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delay={500}>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <div 
        className={cn(
          "flex flex-col h-screen border-r bg-card/50 transition-all duration-300 ease-in-out z-50",
          "fixed inset-y-0 left-0 lg:relative lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className={cn("p-4 flex items-center h-16", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-semibold text-xl text-primary truncate">
              <LayoutGrid className="h-6 w-6 shrink-0" />
              <span>Vault</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="shrink-0 rounded-lg hover:bg-muted"
            onClick={() => {
              if (onMobileClose && isMobileOpen) {
                onMobileClose();
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="px-3 py-2">
          <AddAppModal 
            onAdd={onAddApp} 
            isCollapsed={isCollapsed}
            className={cn(
              "transition-all duration-300 ease-in-out shadow-sm hover:shadow-md",
              isCollapsed 
                ? "w-12 h-12 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 mx-auto flex items-center justify-center p-0" 
                : "w-full justify-start gap-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 px-4 py-6 text-base font-medium"
            )}
            variant="ghost"
          />
        </div>

        <div className="px-3 py-2 space-y-1">
          <Tooltip>
            <TooltipTrigger render={
              <Button 
                variant={selectedAppId === 'home' || selectedAppId === null ? "secondary" : "ghost"} 
                className={cn(
                  "w-full transition-all duration-200",
                  isCollapsed ? "justify-center px-0 h-10 rounded-lg" : "justify-start rounded-r-lg rounded-l-none -ml-3 pl-6 h-10",
                  (selectedAppId === 'home' || selectedAppId === null) ? "" : "text-muted-foreground"
                )}
                onClick={() => {
                  onSelectApp('home');
                  setTimeout(() => {
                    document.getElementById('global-search')?.focus();
                  }, 100);
                }}
              >
                <Search className={cn("h-5 w-5", !isCollapsed && "mr-4")} />
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">Search</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                )}
              </Button>
            } />
            {isCollapsed && <TooltipContent side="right">Search (⌘K)</TooltipContent>}
          </Tooltip>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {apps.length === 0 ? (
              !isCollapsed && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No apps added yet
                </div>
              )
            ) : (
              apps.map((app) => (
                <Tooltip key={app.id}>
                  <TooltipTrigger render={
                    <Button
                      variant={selectedAppId === app.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full transition-all duration-200",
                        isCollapsed ? "justify-center px-0 h-10 rounded-lg" : "justify-start rounded-r-lg rounded-l-none -ml-3 pl-6 h-10 font-normal"
                      )}
                      onClick={() => onSelectApp(app.id)}
                    >
                      <div className={cn(
                        "flex items-center justify-center shrink-0 rounded-lg bg-muted text-muted-foreground font-semibold text-xs",
                        isCollapsed ? "h-6 w-6" : "h-5 w-5 mr-4"
                      )}>
                        {app.name.charAt(0).toUpperCase()}
                      </div>
                      {!isCollapsed && <span className="truncate">{app.name}</span>}
                    </Button>
                  } />
                  {isCollapsed && <TooltipContent side="right">{app.name}</TooltipContent>}
                </Tooltip>
              ))
            )}
          </div>
        </ScrollArea>
        
        {!isCollapsed && (
          <div className="p-4 text-xs text-muted-foreground text-center">
            <StorageSwitcher isCollapsed={isCollapsed} />
          </div>
        )}
        {isCollapsed && (
          <div className="p-4 flex justify-center">
            <StorageSwitcher isCollapsed={isCollapsed} />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
