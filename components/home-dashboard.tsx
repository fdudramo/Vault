"use client"

import { useState } from 'react';
import { AppItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, LayoutGrid, User, Key } from 'lucide-react';
import { AddAppModal } from './add-app-modal';

interface HomeDashboardProps {
  apps: AppItem[];
  onSelectApp: (id: string) => void;
  onAddApp: (app: AppItem) => void;
}

export function HomeDashboard({ apps, onSelectApp, onAddApp }: HomeDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const totalAccounts = apps.reduce((acc, app) => acc + app.accounts.length, 0);
  const totalCredentials = apps.reduce((acc, app) => acc + app.accounts.reduce((cAcc, a) => cAcc + a.credentials.length, 0), 0);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.accounts.some(a => 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Home</h2>
        <AddAppModal onAdd={onAddApp} />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search apps, accounts, emails, usernames..." 
          className="pl-9 max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccounts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credentials Stored</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredentials}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Quick Jump</h3>
        {filteredApps.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-dashed text-muted-foreground">
            No results found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map(app => (
              <Card 
                key={app.id} 
                className="cursor-pointer hover:border-primary/50 transition-colors" 
                onClick={() => onSelectApp(app.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{app.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{app.description || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {app.accounts.length} account{app.accounts.length !== 1 ? 's' : ''}
                  </div>
                  {app.accounts.length > 0 && searchQuery && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {app.accounts.filter(a => 
                        a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        a.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        a.email?.toLowerCase().includes(searchQuery.toLowerCase())
                      ).slice(0, 3).map(acc => (
                        <span key={acc.id} className="text-xs bg-secondary px-2 py-1 rounded-md truncate max-w-full">
                          {acc.name} {acc.username ? `(@${acc.username})` : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
