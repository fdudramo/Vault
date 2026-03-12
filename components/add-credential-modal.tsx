"use client"

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Credential } from '@/types';
import { Plus, Edit } from 'lucide-react';

interface AddCredentialModalProps {
  onAdd: (credential: Credential) => void;
  initialData?: Credential;
  trigger?: React.ReactNode;
}

export function AddCredentialModal({ onAdd, initialData, trigger }: AddCredentialModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialData?.name || '');
  const [value, setValue] = useState(initialData?.value || '');
  const [type, setType] = useState<Credential['type']>(initialData?.type || 'apikey');

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setName(initialData?.name || '');
      setValue(initialData?.value || '');
      setType(initialData?.type || 'apikey');
    }
    setOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;

    const newCredential: Credential = {
      id: initialData?.id || uuidv4(),
      name: name.trim(),
      value: value.trim(),
      type,
      createdAt: initialData?.createdAt || Date.now(),
    };

    onAdd(newCredential);
    setOpen(false);
    if (!initialData) {
      setName('');
      setValue('');
      setType('apikey');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <Button size="sm" className="gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50 dark:hover:bg-blue-900/40 shadow-sm">
            {initialData ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {initialData ? "Edit Credential" : "Add Credential"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Credential" : "Add Credential"}</DialogTitle>
            <DialogDescription>
              {initialData ? "Update the details of this credential." : "Store an API key, token, or password for this account."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cred-type">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as Credential['type'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="token">Token</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cred-name">Name / Label</Label>
              <Input
                id="cred-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Production API Key"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cred-value">Value</Label>
              <Input
                id="cred-value"
                type="password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter the secret value"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Save Changes" : "Save Credential"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
