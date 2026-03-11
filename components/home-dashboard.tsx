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
    <div className="flex flex-col h-full space-y-4 md:space-y-6 max-w-4xl mx-auto px-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Vault Home</h2>
        <div>
          <AddAppModal onAdd={onAddApp} />
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          id="global-search"
          placeholder="Search anything..." 
          className="pl-10 md:pl-12 py-5 md:py-6 text-base md:text-lg bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50 rounded-xl shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-8 no-scrollbar">
        {!searchQuery ? (
          <div className="space-y-4">
            <h3 className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">All Applications</h3>
            <div className="grid grid-cols-1 gap-2">
              {apps.map(app => (
                <div 
                  key={app.id} 
                  className="flex items-center justify-between p-3 md:p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all group"
                  onClick={() => onSelectApp(app.id)}
                >
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                      <LayoutGrid className="h-4 w-4 md:h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-semibold text-base md:text-lg truncate">{app.name}</div>
                      <div className="text-xs text-muted-foreground">{app.accounts.length} accounts</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 md:h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 shrink-0" />
                </div>
              ))}
              {apps.length === 0 && (
                <div className="text-center py-12 border rounded-xl border-dashed text-muted-foreground text-sm">
                  No applications yet. Create one to get started.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">Search Results</h3>
            {searchResults.length === 0 ? (
              <div className="text-center py-12 border rounded-xl border-dashed text-muted-foreground text-sm">
                No results found for &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {searchResults.map((result, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2 md:p-3 rounded-xl border bg-card hover:border-primary/50 transition-all group"
                  >
                    <div 
                      className="flex items-center gap-3 md:gap-4 flex-1 cursor-pointer overflow-hidden"
                      onClick={() => onSelectApp(result.app.id, result.account?.id)}
                    >
                      <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                        {result.type === 'app' && <LayoutGrid className="h-4 w-4 md:h-5 w-5" />}
                        {result.type === 'account' && <User className="h-4 w-4 md:h-5 w-5" />}
                        {result.type === 'credential' && <Key className="h-4 w-4 md:h-5 w-5" />}
                        {result.type === 'context' && (result.context.type === 'chat' ? <MessageSquare className="h-4 w-4 md:h-5 w-5" /> : <LinkIcon className="h-4 w-4 md:h-5 w-5" />)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-medium flex items-center gap-2 text-sm md:text-base">
                          <span className="truncate">{result.title}</span>
                          <span className="text-[8px] md:text-[10px] uppercase tracking-wider px-1 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                            {result.type}
                          </span>
                        </div>
                        <div className="text-[10px] md:text-sm text-muted-foreground truncate">{result.subtitle}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {result.type === 'account' && result.account.password && (
                        <CopyButton textToCopy={result.account.password} variant="secondary" size="sm" className="h-7 md:h-8" />
                      )}
                      {result.type === 'credential' && (
                        <CopyButton textToCopy={result.credential.value} variant="secondary" size="sm" className="h-7 md:h-8" />
                      )}
                      {result.type === 'context' && result.context.type === 'link' && (
                        <a href={result.context.content} target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                          <LinkIcon className="h-3.5 w-3.5 md:h-4 w-4" />
                        </a>
                      )}
                      <div 
                        className="p-1.5 md:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary cursor-pointer"
                        onClick={() => onSelectApp(result.app.id, result.account?.id)}
                      >
                        <ArrowRight className="h-3.5 w-3.5 md:h-4 w-4" />
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
