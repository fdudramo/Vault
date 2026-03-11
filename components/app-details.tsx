"use client"

import { useState } from 'react';
import { AppItem, Account, Credential, ContextItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddAccountModal } from './add-account-modal';
import { AddCredentialModal } from './add-credential-modal';
import { AddContextModal } from './add-context-modal';
import { Copy, ExternalLink, Key, Link as LinkIcon, MessageSquare, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';

interface AppDetailsProps {
  app: AppItem;
  onUpdate: (app: AppItem) => void;
  onDelete: (id: string) => void;
}

export function AppDetails({ app, onUpdate, onDelete }: AppDetailsProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    app.accounts.length > 0 ? app.accounts[0].id : null
  );

  const handleAddAccount = (account: Account) => {
    const updatedApp = {
      ...app,
      accounts: [...app.accounts, account],
    };
    onUpdate(updatedApp);
    setSelectedAccountId(account.id);
  };

  const handleDeleteAccount = (accountId: string) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.filter(a => a.id !== accountId),
    };
    onUpdate(updatedApp);
    if (selectedAccountId === accountId) {
      setSelectedAccountId(updatedApp.accounts.length > 0 ? updatedApp.accounts[0].id : null);
    }
  };

  const handleAddCredential = (accountId: string, credential: Credential) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return { ...a, credentials: [...a.credentials, credential] };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
  };

  const handleDeleteCredential = (accountId: string, credentialId: string) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return { ...a, credentials: a.credentials.filter(c => c.id !== credentialId) };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
  };

  const handleAddContext = (accountId: string, context: ContextItem) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return { ...a, contexts: [...a.contexts, context] };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
  };

  const handleDeleteContext = (accountId: string, contextId: string) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return { ...a, contexts: a.contexts.filter(c => c.id !== contextId) };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  const selectedAccount = app.accounts.find(a => a.id === selectedAccountId);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{app.name}</h2>
          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-1 mt-1 text-sm"
            >
              <ExternalLink className="h-3 w-3" />
              {app.url}
            </a>
          )}
          {app.description && (
            <p className="text-muted-foreground mt-2">{app.description}</p>
          )}
        </div>
        <Button variant="destructive" size="sm" onClick={() => onDelete(app.id)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete App
        </Button>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-xl font-semibold">Accounts</h3>
        <AddAccountModal onAdd={handleAddAccount} />
      </div>

      {app.accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
          <User className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No accounts yet</h3>
          <p className="text-muted-foreground max-w-sm mt-1 mb-4">
            Add an account to start tracking credentials and context for {app.name}.
          </p>
          <AddAccountModal onAdd={handleAddAccount} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Account List Sidebar */}
          <div className="md:col-span-1 space-y-2">
            {app.accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedAccountId === account.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="font-medium">{account.name}</div>
                <div className={`text-xs mt-1 ${selectedAccountId === account.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {account.authMethod}
                </div>
              </button>
            ))}
          </div>

          {/* Account Details */}
          <div className="md:col-span-3">
            {selectedAccount && (
              <Card className="glass-card border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {selectedAccount.name}
                        <Badge variant="secondary" className="capitalize text-xs font-normal">
                          {selectedAccount.authMethod}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2 space-y-1">
                        {selectedAccount.email && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">Email:</span>
                            <span>{selectedAccount.email}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => copyToClipboard(selectedAccount.email!)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {selectedAccount.username && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">Username:</span>
                            <span>{selectedAccount.username}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => copyToClipboard(selectedAccount.username!)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteAccount(selectedAccount.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="credentials" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="credentials">Credentials</TabsTrigger>
                      <TabsTrigger value="context">Context & Links</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credentials" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">API Keys & Tokens</h4>
                        <AddCredentialModal onAdd={(cred) => handleAddCredential(selectedAccount.id, cred)} />
                      </div>
                      
                      {selectedAccount.credentials.length === 0 ? (
                        <div className="text-center py-6 text-sm text-muted-foreground border rounded-md border-dashed">
                          No credentials stored for this account.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedAccount.credentials.map((cred) => (
                            <div key={cred.id} className="flex items-center justify-between p-3 border rounded-md bg-background/50">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2 bg-primary/10 rounded-md text-primary shrink-0">
                                  <Key className="h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                  <div className="font-medium text-sm truncate">{cred.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="uppercase">{cred.type}</span>
                                    <span>•</span>
                                    <span>{format(cred.createdAt, 'MMM d, yyyy')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Button variant="secondary" size="sm" onClick={() => copyToClipboard(cred.value)}>
                                  Copy
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteCredential(selectedAccount.id, cred.id)}>
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="context" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">URLs, Chats & Notes</h4>
                        <AddContextModal onAdd={(ctx) => handleAddContext(selectedAccount.id, ctx)} />
                      </div>
                      
                      {selectedAccount.contexts.length === 0 ? (
                        <div className="text-center py-6 text-sm text-muted-foreground border rounded-md border-dashed">
                          No context stored for this account.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedAccount.contexts.map((ctx) => (
                            <div key={ctx.id} className="flex items-start justify-between p-3 border rounded-md bg-background/50">
                              <div className="flex items-start gap-3 overflow-hidden">
                                <div className="p-2 bg-primary/10 rounded-md text-primary shrink-0 mt-0.5">
                                  {ctx.type === 'chat' ? <MessageSquare className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                                </div>
                                <div className="overflow-hidden">
                                  <div className="font-medium text-sm truncate">{ctx.title}</div>
                                  {ctx.type === 'note' ? (
                                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{ctx.content}</p>
                                  ) : (
                                    <a href={ctx.content} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate block mt-1">
                                      {ctx.content}
                                    </a>
                                  )}
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDeleteContext(selectedAccount.id, ctx.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
