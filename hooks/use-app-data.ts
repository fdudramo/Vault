import { useState, useEffect } from 'react';
import { AppItem } from '@/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY = 'context-keeper-data';
const SUPA_CREDS_KEY = 'GT_VAULT_SUPA';
const STORAGE_TYPE_KEY = 'GT_VAULT_STORAGE_TYPE'; // 'local' or 'supabase'

export function useAppData() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storageType, setStorageType] = useState<'local' | 'supabase'>('local');
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  // Load storage type and initialize Supabase if needed
  useEffect(() => {
    const loadConfig = () => {
      const type = localStorage.getItem(STORAGE_TYPE_KEY) as 'local' | 'supabase' | null;
      if (type === 'supabase') {
        const credsStr = localStorage.getItem(SUPA_CREDS_KEY);
        if (credsStr) {
          try {
            const creds = JSON.parse(credsStr);
            if (creds.url && creds.key) {
              try {
                const client = createClient(creds.url, creds.key);
                setSupabaseClient(client);
                setStorageType('supabase');
              } catch (err: any) {
                console.error("Failed to initialize Supabase client", err);
                setError(`Failed to initialize Supabase client: ${err.message || 'Invalid URL or Key'}`);
                setIsLoaded(true);
              }
            } else {
              setStorageType('local');
              setSupabaseClient(null);
              setError(null);
            }
          } catch (e) {
            setStorageType('local');
            setSupabaseClient(null);
            setError(null);
          }
        } else {
          setStorageType('local');
          setSupabaseClient(null);
          setError(null);
        }
      } else {
        setStorageType('local');
        setSupabaseClient(null);
        setError(null);
      }
    };

    loadConfig();

    window.addEventListener('storage-changed', loadConfig);
    return () => window.removeEventListener('storage-changed', loadConfig);
  }, []);

  // Fetch data when storageType or supabaseClient changes
  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);
      if (storageType === 'local') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            setApps(JSON.parse(stored));
          } catch (e) {
            console.error('Failed to parse stored apps', e);
          }
        } else {
          setApps([]);
        }
        setIsLoaded(true);
      } else if (storageType === 'supabase' && supabaseClient) {
        try {
          const { data, error } = await supabaseClient.from('vault_apps').select('*');
          if (error) throw error;
          
          // Map from DB format to AppItem
          const loadedApps: AppItem[] = (data || []).map(row => ({
            id: row.id,
            name: row.name,
            url: row.url,
            accounts: row.accounts || [],
            createdAt: row.created_at
          }));
          setApps(loadedApps);
          setError(null);
        } catch (e: any) {
          console.error('Failed to fetch from Supabase', e);
          setError(e.message || 'Failed to connect to Supabase. Check your credentials and RLS policies.');
          setApps([]);
        } finally {
          setIsLoaded(true);
        }
      }
    }
    
    // Only fetch if local, or if supabase is ready
    if (storageType === 'local' || (storageType === 'supabase' && supabaseClient)) {
      fetchData();
    }
  }, [storageType, supabaseClient]);

  // Save to local storage whenever apps change (only if local)
  useEffect(() => {
    if (isLoaded && storageType === 'local') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    }
  }, [apps, isLoaded, storageType]);

  const addApp = async (app: AppItem) => {
    setApps((prev) => [...prev, app]);
    if (storageType === 'supabase' && supabaseClient) {
      try {
        const { error } = await supabaseClient.from('vault_apps').insert({
          id: app.id,
          name: app.name,
          url: app.url,
          accounts: app.accounts,
          created_at: app.createdAt
        });
        if (error) throw error;
      } catch (e: any) {
        console.error('Failed to add to Supabase', e);
        setError(`Failed to add app: ${e.message}`);
      }
    }
  };

  const updateApp = async (updatedApp: AppItem) => {
    setApps((prev) => prev.map((app) => (app.id === updatedApp.id ? updatedApp : app)));
    if (storageType === 'supabase' && supabaseClient) {
      try {
        const { error } = await supabaseClient.from('vault_apps').update({
          name: updatedApp.name,
          url: updatedApp.url,
          accounts: updatedApp.accounts
        }).eq('id', updatedApp.id);
        if (error) throw error;
      } catch (e: any) {
        console.error('Failed to update in Supabase', e);
        setError(`Failed to update app: ${e.message}`);
      }
    }
  };

  const deleteApp = async (appId: string) => {
    setApps((prev) => prev.filter(app => app.id !== appId));
    if (storageType === 'supabase' && supabaseClient) {
      try {
        const { error } = await supabaseClient.from('vault_apps').delete().eq('id', appId);
        if (error) throw error;
      } catch (e: any) {
        console.error('Failed to delete from Supabase', e);
        setError(`Failed to delete app: ${e.message}`);
      }
    }
  };

  return {
    apps,
    isLoaded,
    error,
    addApp,
    updateApp,
    deleteApp,
  };
}
