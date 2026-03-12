"use client"

import { useState, useEffect } from 'react';
import { useAppData } from '@/hooks/use-app-data';
import { Sidebar } from '@/components/sidebar';
import { AppDetails } from '@/components/app-details';
import { HomeDashboard } from '@/components/home-dashboard';
import { LayoutGrid, Menu, Search, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddAppModal } from '@/components/add-app-modal';

export default function Home() {
  const { apps, isLoaded, addApp, updateApp, deleteApp } = useAppData();
  const [selectedAppId, setSelectedAppId] = useState<string | null>('home');
  const [jumpToAccountId, setJumpToAccountId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSelectedAppId('home');
        setTimeout(() => {
          document.getElementById('global-search')?.focus();
        }, 100);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <LayoutGrid className="h-8 w-8 text-primary" />
          <p className="text-muted-foreground">Loading Vault...</p>
        </div>
      </div>
    );
  }

  const selectedApp = apps.find(a => a.id === selectedAppId);
  const isHome = selectedAppId === 'home' || selectedAppId === null;

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      <Sidebar 
        apps={apps} 
        selectedAppId={selectedAppId} 
        onSelectApp={(id) => {
          setSelectedAppId(id);
          setIsMobileMenuOpen(false);
        }} 
        onAddApp={(app) => {
          addApp(app);
          setSelectedAppId(app.id);
          setIsMobileMenuOpen(false);
        }} 
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Material Design App Bar - Mobile Only */}
        <header className="lg:hidden flex items-center h-16 px-4 border-b bg-card/50 backdrop-blur-md z-20 sticky top-0">
          <div className="flex items-center gap-3 w-full">
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0"
              onClick={() => {
                if (isHome) {
                  setIsMobileMenuOpen(true);
                } else {
                  setSelectedAppId('home');
                }
              }}
            >
              {isHome ? <Menu className="h-6 w-6" /> : <ArrowLeft className="h-6 w-6" />}
            </Button>
            
            <div className="flex-1 min-w-0">
              {isHome ? (
                <div className="relative group max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="global-search-header"
                    placeholder="Search Vault..." 
                    className="pl-9 h-10 bg-muted/50 border-none rounded-full focus-visible:ring-1 focus-visible:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold truncate leading-tight">{selectedApp?.name}</h1>
                  {selectedApp?.description && (
                    <p className="text-[10px] text-muted-foreground truncate leading-tight">{selectedApp.description}</p>
                  )}
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0"
              onClick={() => {
                setSelectedAppId('home');
                setTimeout(() => {
                  document.getElementById('global-search-header')?.focus();
                }, 100);
              }}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 no-scrollbar">
          <div className="max-w-5xl mx-auto h-full">
            {isHome ? (
              <HomeDashboard 
                apps={apps} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectApp={(appId, accountId) => {
                  setSelectedAppId(appId);
                  if (accountId) setJumpToAccountId(accountId);
                }} 
                onAddApp={(app) => {
                  addApp(app);
                  setSelectedAppId(app.id);
                }} 
              />
            ) : selectedApp ? (
              <AppDetails 
                app={selectedApp} 
                onUpdate={updateApp} 
                onDelete={(id) => {
                  deleteApp(id);
                  setSelectedAppId('home');
                }} 
                jumpToAccountId={jumpToAccountId}
                clearJumpToAccountId={() => setJumpToAccountId(null)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-primary/5 rounded-full mb-4">
                  <LayoutGrid className="h-12 w-12 text-primary/40" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">App not found</h2>
                <p className="text-muted-foreground max-w-md">
                  The selected application could not be found. It may have been deleted.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedAppId('home')}
                >
                  Return Home
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button (FAB) - Mobile Only */}
        {isHome && (
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <AddAppModal 
              onAdd={addApp}
              className="h-14 w-14 rounded-2xl shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center p-0"
              variant="default"
              renderTrigger={
                <Button className="h-14 w-14 rounded-2xl shadow-xl p-0">
                  <Plus className="h-6 w-6" />
                </Button>
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}
