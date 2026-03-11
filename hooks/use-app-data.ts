import { useState, useEffect } from 'react';
import { AppItem } from '@/types';

const STORAGE_KEY = 'context-keeper-data';

export function useAppData() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setApps(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored apps', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    }
  }, [apps, isLoaded]);

  const addApp = (app: AppItem) => {
    setApps((prev) => [...prev, app]);
  };

  const updateApp = (updatedApp: AppItem) => {
    setApps((prev) => prev.map((app) => (app.id === updatedApp.id ? updatedApp : app)));
  };

  const deleteApp = (appId: string) => {
    setApps((prev) => prev.map(app => app.id === appId ? { ...app, isDeleted: true } : app).filter(app => app.id !== appId));
  };

  return {
    apps,
    isLoaded,
    addApp,
    updateApp,
    deleteApp,
  };
}
