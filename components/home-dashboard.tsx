"use client"

import { useState } from 'react';
import { AppItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, User, Key, MessageSquare, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { AddAppModal } from './add-app-modal';
import { CopyButton } from './copy-button';

interface HomeDashboardProps {
  apps: AppItem[];
  onSelectApp: (appId: string, accountId?: string) => void;
  onAddApp: (app: AppItem) => void;
}

export function HomeDashboard({ apps, onSelectApp, onAddApp }: HomeDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten everything for search
  const searchResults: any[] = [];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    
    apps.forEach(app => {
      // Check app match
      if (app.name.toLowerCase().includes(query) || app.description?.toLowerCase().includes(query)) {
        searchResults.push({ type: 'app', app, title: app.name, subtitle: app.description || 'Application' });
      }

      app.accounts.forEach(account => {
        // Check account match
        if (
          account.name.toLowerCase().includes(query) || 
          account.username?.toLowerCase().includes(query) || 
          account.email?.toLowerCase().includes(query)
        ) {
          searchResults.push({ type: 'account', app, account, title: account.name, subtitle: account.email || account.username || `Account in ${app.name}` });
        }

        account.credentials.forEach(cred => {
          if (cred.name.toLowerCase().includes(query) || cred.value.toLowerCase().includes(query)) {
            searchResults.push({ type: 'credential', app, account, credential: cred, title: cred.name, subtitle: `in ${account.name} (${app.name})` });
          }
        });

        account.contexts.forEach(ctx => {
          if (ctx.title.toLowerCase().includes(query) || ctx.content.toLowerCase().includes(query)) {
            searchResults.push({ type: 'context', app, account, context: ctx, title: ctx.title, subtitle: `in ${account.name} (${app.name})` });
          }
        });
      });
    });
  }

  return (
    <div className="flex flex-col h-full space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vault Home</h2>
        <div>
          <AddAppModal onAdd={onAddApp} />
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          id="global-search"
          placeholder="Search anything (apps, accounts, emails, passwords, notes)..." 
          className="pl-12 py-6 text-lg bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50 rounded-xl shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {!searchQuery ? (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">All Applications</h3>
            <div className="grid grid-cols-1 gap-2">
              {apps.map(app => (
                <div 
                  key={app.id} 
                  className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all group"
                  onClick={() => onSelectApp(app.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{app.name}</div>
                      <div className="text-sm text-muted-foreground">{app.accounts.length} accounts</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </div>
              ))}
              {apps.length === 0 && (
                <div className="text-center py-12 border rounded-xl border-dashed text-muted-foreground">
                  No applications yet. Create one to get started.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Search Results</h3>
            {searchResults.length === 0 ? (
              <div className="text-center py-12 border rounded-xl border-dashed text-muted-foreground">
                No results found for &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {searchResults.map((result, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 rounded-xl border bg-card hover:border-primary/50 transition-all group"
                  >
                    <div 
                      className="flex items-center gap-4 flex-1 cursor-pointer"
                      onClick={() => onSelectApp(result.app.id, result.account?.id)}
                    >
                      <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                        {result.type === 'app' && <LayoutGrid className="h-5 w-5" />}
                        {result.type === 'account' && <User className="h-5 w-5" />}
                        {result.type === 'credential' && <Key className="h-5 w-5" />}
                        {result.type === 'context' && (result.context.type === 'chat' ? <MessageSquare className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />)}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {result.title}
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {result.type}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">{result.subtitle}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {result.type === 'account' && result.account.password && (
                        <CopyButton textToCopy={result.account.password} variant="secondary" size="sm" showText />
                      )}
                      {result.type === 'credential' && (
                        <CopyButton textToCopy={result.credential.value} variant="secondary" size="sm" showText />
                      )}
                      {result.type === 'context' && result.context.type === 'link' && (
                        <a href={result.context.content} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      )}
                      <div 
                        className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary cursor-pointer"
                        onClick={() => onSelectApp(result.app.id, result.account?.id)}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
