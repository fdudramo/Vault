"use client"

import { useState, useEffect } from 'react';
import { AppItem, Account, Credential, ContextItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddAccountModal } from './add-account-modal';
import { AddCredentialModal } from './add-credential-modal';
import { AddContextModal } from './add-context-modal';
import { AddAppModal } from './add-app-modal';
import { ConfirmDeleteDialog } from './confirm-delete-dialog';
import { CopyButton } from './copy-button';
import { Copy, ExternalLink, Key, Link as LinkIcon, MessageSquare, Trash2, User, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface AppDetailsProps {
  app: AppItem;
  onUpdate: (app: AppItem) => void;
  onDelete: (id: string) => void;
  jumpToAccountId?: string | null;
  clearJumpToAccountId?: () => void;
}

export function AppDetails({ app, onUpdate, onDelete, jumpToAccountId, clearJumpToAccountId }: AppDetailsProps) {
  const [selectionHistory, setSelectionHistory] = useState<Record<string, string>>({});
  const [currentAppId, setCurrentAppId] = useState(app.id);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    app.accounts.length > 0 ? app.accounts[0].id : null
  );

  useEffect(() => {
    if (jumpToAccountId) {
      if (selectedAccountId !== jumpToAccountId) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedAccountId(jumpToAccountId);
        setSelectionHistory(prev => ({ ...prev, [app.id]: jumpToAccountId }));
      }
      if (clearJumpToAccountId) {
        clearJumpToAccountId();
      }
    } else if (app.id !== currentAppId) {
      setCurrentAppId(app.id);
      const historyId = selectionHistory[app.id];
      if (historyId && app.accounts.some(a => a.id === historyId)) {
        setSelectedAccountId(historyId);
      } else if (app.accounts.length > 0) {
        setSelectedAccountId(app.accounts[0].id);
      } else {
        setSelectedAccountId(null);
      }
    }
  }, [app.id, app.accounts, currentAppId, jumpToAccountId, selectedAccountId, selectionHistory, clearJumpToAccountId]);

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    setSelectionHistory(prev => ({ ...prev, [app.id]: accountId }));
  };

  const handleAddAccount = (account: Account) => {
    const updatedApp = {
      ...app,
      accounts: [...app.accounts, account],
    };
    onUpdate(updatedApp);
    setSelectedAccountId(account.id);
    toast.success('Account added successfully');
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
    toast.success('Account deleted successfully');
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
    toast.success('Credential added successfully');
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
    toast.success('Credential deleted successfully');
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
    toast.success('Context added successfully');
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
    toast.success('Context deleted successfully');
  };

  const handleEditAccount = (updatedAccount: Account) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => a.id === updatedAccount.id ? updatedAccount : a),
    };
    onUpdate(updatedApp);
    toast.success('Account updated successfully');
  };

  const handleEditCredential = (accountId: string, updatedCredential: Credential) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return {
            ...a,
            credentials: a.credentials.map(c => c.id === updatedCredential.id ? updatedCredential : c)
          };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
    toast.success('Credential updated successfully');
  };

  const handleEditContext = (accountId: string, updatedContext: ContextItem) => {
    const updatedApp = {
      ...app,
      accounts: app.accounts.map(a => {
        if (a.id === accountId) {
          return {
            ...a,
            contexts: a.contexts.map(c => c.id === updatedContext.id ? updatedContext : c)
          };
        }
        return a;
      }),
    };
    onUpdate(updatedApp);
    toast.success('Context updated successfully');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const selectedAccount = app.accounts.find(a => a.id === selectedAccountId);

  return (
    <div className="flex flex-col h-full space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{app.name}</h2>
            <AddAppModal 
              onAdd={onUpdate} 
              initialData={app} 
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Edit className="h-4 w-4" />
                </Button>
              } 
            />
          </div>
          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-1 mt-1 text-xs md:text-sm break-all"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              {app.url}
            </a>
          )}
          {app.description && (
            <p className="text-muted-foreground mt-2 text-sm md:text-base">{app.description}</p>
          )}
        </div>
        <ConfirmDeleteDialog 
          onConfirm={() => {
            onDelete(app.id);
            toast.success('App deleted successfully');
          }}
          title="Delete App?"
          description={`Are you sure you want to delete "${app.name}"? This will permanently delete all associated accounts, credentials, and context.`}
        >
          <Button variant="destructive" size="sm" className="w-full md:w-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete App
          </Button>
        </ConfirmDeleteDialog>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg md:text-xl font-semibold">Accounts</h3>
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
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Account List - Horizontal scroll on mobile, vertical on desktop */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:col-span-1 no-scrollbar">
            {app.accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelectAccount(account.id)}
                className={`flex-shrink-0 md:w-full text-left px-4 py-3 rounded-lg transition-all border whitespace-nowrap md:whitespace-normal ${
                  selectedAccountId === account.id
                    ? 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30 shadow-sm'
                    : 'border-transparent hover:bg-muted'
                }`}
              >
                <div className="font-medium text-sm md:text-base">{account.name}</div>
                <div className={`text-[10px] md:text-xs mt-1 ${selectedAccountId === account.id ? 'text-blue-600/80 dark:text-blue-300/80' : 'text-muted-foreground'}`}>
                  {account.authMethod}
                </div>
              </button>
            ))}
          </div>

          {/* Account Details */}
          <div className="md:col-span-3">
            {selectedAccount && (
              <Card className="glass-card border-border/50 shadow-sm overflow-hidden">
                <CardHeader className="p-4 md:p-6 pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl md:text-2xl flex items-center gap-2 flex-wrap">
                        <span className="truncate">{selectedAccount.name}</span>
                        <Badge variant="secondary" className="capitalize text-[10px] font-normal shrink-0">
                          {selectedAccount.authMethod}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2 space-y-2">
                        {selectedAccount.email && (
                          <div className="flex items-center gap-2 text-xs md:text-sm">
                            <span className="font-medium text-foreground shrink-0">Email:</span>
                            <span className="truncate">{selectedAccount.email}</span>
                            <CopyButton textToCopy={selectedAccount.email} variant="ghost" size="icon" className="h-6 w-6 shrink-0" iconClassName="h-3 w-3" />
                          </div>
                        )}
                        {selectedAccount.username && (
                          <div className="flex items-center gap-2 text-xs md:text-sm">
                            <span className="font-medium text-foreground shrink-0">User:</span>
                            <span className="truncate">{selectedAccount.username}</span>
                            <CopyButton textToCopy={selectedAccount.username} variant="ghost" size="icon" className="h-6 w-6 shrink-0" iconClassName="h-3 w-3" />
                          </div>
                        )}
                        {selectedAccount.password && (
                          <div className="flex items-center gap-2 text-xs md:text-sm">
                            <span className="font-medium text-foreground shrink-0">Pass:</span>
                            <span className="font-mono tracking-widest">••••••••</span>
                            <CopyButton textToCopy={selectedAccount.password} variant="ghost" size="icon" className="h-6 w-6 shrink-0" iconClassName="h-3 w-3" />
                          </div>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <AddAccountModal 
                        onAdd={handleEditAccount} 
                        initialData={selectedAccount} 
                        trigger={
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <ConfirmDeleteDialog
                        onConfirm={() => handleDeleteAccount(selectedAccount.id)}
                        title="Delete Account?"
                        description={`Are you sure you want to delete the account "${selectedAccount.name}"? This will permanently delete all associated credentials and context.`}
                      >
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </ConfirmDeleteDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <Tabs defaultValue="credentials" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="credentials" className="text-xs md:text-sm">Credentials</TabsTrigger>
                      <TabsTrigger value="context" className="text-xs md:text-sm">Context</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credentials" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">API Keys</h4>
                        <AddCredentialModal onAdd={(cred) => handleAddCredential(selectedAccount.id, cred)} />
                      </div>
                      
                      {selectedAccount.credentials.length === 0 ? (
                        <div className="text-center py-6 text-xs text-muted-foreground border rounded-md border-dashed">
                          No credentials stored.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedAccount.credentials.map((cred) => (
                            <div key={cred.id} className="flex items-center justify-between p-2 md:p-3 border rounded-md bg-background/50 gap-2">
                              <div className="flex items-center gap-2 md:gap-3 overflow-hidden min-w-0">
                                <div className="p-1.5 md:p-2 bg-primary/10 rounded-md text-primary shrink-0">
                                  <Key className="h-3 w-3 md:h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                  <div className="font-medium text-xs md:text-sm truncate">{cred.name}</div>
                                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 md:gap-2">
                                    <span className="uppercase">{cred.type}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <CopyButton textToCopy={cred.value} variant="secondary" size="sm" className="h-7 md:h-8" />
                                <AddCredentialModal 
                                  onAdd={(updatedCred) => handleEditCredential(selectedAccount.id, updatedCred)} 
                                  initialData={cred}
                                  trigger={
                                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                                      <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                  }
                                />
                                <ConfirmDeleteDialog
                                  onConfirm={() => handleDeleteCredential(selectedAccount.id, cred.id)}
                                  title="Delete Credential?"
                                  description={`Are you sure you want to delete the credential "${cred.name}"?`}
                                >
                                  <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </ConfirmDeleteDialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="context" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Context</h4>
                        <AddContextModal onAdd={(ctx) => handleAddContext(selectedAccount.id, ctx)} />
                      </div>
                      
                      {selectedAccount.contexts.length === 0 ? (
                        <div className="text-center py-6 text-xs text-muted-foreground border rounded-md border-dashed">
                          No context stored.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedAccount.contexts.map((ctx) => (
                            <div key={ctx.id} className="flex items-start justify-between p-2 md:p-3 border rounded-md bg-background/50 gap-2">
                              <div className="flex items-start gap-2 md:gap-3 overflow-hidden min-w-0">
                                <div className="p-1.5 md:p-2 bg-primary/10 rounded-md text-primary shrink-0 mt-0.5">
                                  {ctx.type === 'chat' ? <MessageSquare className="h-3 w-3 md:h-4 w-4" /> : <LinkIcon className="h-3 w-3 md:h-4 w-4" />}
                                </div>
                                <div className="overflow-hidden">
                                  <div className="font-medium text-xs md:text-sm truncate">{ctx.title}</div>
                                  {ctx.type === 'note' ? (
                                    <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap line-clamp-3">{ctx.content}</p>
                                  ) : (
                                    <a href={ctx.content} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block mt-1">
                                      {ctx.content}
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <AddContextModal 
                                  onAdd={(updatedCtx) => handleEditContext(selectedAccount.id, updatedCtx)} 
                                  initialData={ctx}
                                  trigger={
                                    <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7 md:h-8 md:w-8">
                                      <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                  }
                                />
                                <ConfirmDeleteDialog
                                  onConfirm={() => handleDeleteContext(selectedAccount.id, ctx.id)}
                                  title="Delete Context?"
                                  description={`Are you sure you want to delete the context "${ctx.title}"?`}
                                >
                                  <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7 md:h-8 md:w-8">
                                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </ConfirmDeleteDialog>
                              </div>
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
