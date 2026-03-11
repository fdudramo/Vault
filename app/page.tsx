"use client"

import { useState, useEffect } from 'react';
import { useAppData } from '@/hooks/use-app-data';
import { Sidebar } from '@/components/sidebar';
import { AppDetails } from '@/components/app-details';
import { HomeDashboard } from '@/components/home-dashboard';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { apps, isLoaded, addApp, updateApp, deleteApp } = useAppData();
  const [selectedAppId, setSelectedAppId] = useState<string | null>('home');
  const [jumpToAccountId, setJumpToAccountId] = useState<string | null>(null);

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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        apps={apps} 
        selectedAppId={selectedAppId} 
        onSelectApp={setSelectedAppId} 
        onAddApp={(app) => {
          addApp(app);
          setSelectedAppId(app.id);
        }} 
      />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto h-full">
          {selectedAppId === 'home' || selectedAppId === null ? (
            <HomeDashboard 
              apps={apps} 
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
      </main>
    </div>
  );
}
