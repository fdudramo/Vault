"use client"

import { useState, useEffect } from 'react';
import { useAppData } from '@/hooks/use-app-data';
import { Sidebar } from '@/components/sidebar';
import { AppDetails } from '@/components/app-details';
import { LayoutGrid } from 'lucide-react';

export default function Home() {
  const { apps, isLoaded, addApp, updateApp, deleteApp } = useAppData();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Auto-select first app if none selected and apps exist
  useEffect(() => {
    if (isLoaded && !selectedAppId && apps.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAppId(apps[0].id);
    }
  }, [isLoaded, apps, selectedAppId]);

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
          {selectedApp ? (
            <AppDetails 
              app={selectedApp} 
              onUpdate={updateApp} 
              onDelete={(id) => {
                deleteApp(id);
                setSelectedAppId(null);
              }} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-primary/5 rounded-full mb-4">
                <LayoutGrid className="h-12 w-12 text-primary/40" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome to your Vault</h2>
              <p className="text-muted-foreground max-w-md">
                Select an application from the sidebar or create a new one to start managing your accounts, API keys, and context.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
