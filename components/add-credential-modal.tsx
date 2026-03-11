"use client"

import { useState } from 'react';
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
import { Plus } from 'lucide-react';

interface AddCredentialModalProps {
  onAdd: (credential: Credential) => void;
}

export function AddCredentialModal({ onAdd }: AddCredentialModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<Credential['type']>('apikey');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;

    const newCredential: Credential = {
      id: uuidv4(),
      name: name.trim(),
      value: value.trim(),
      type,
      createdAt: Date.now(),
    };

    onAdd(newCredential);
    setOpen(false);
    setName('');
    setValue('');
    setType('apikey');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Credential
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Credential</DialogTitle>
            <DialogDescription>
              Store an API key, token, or password for this account.
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
            <Button type="submit">Save Credential</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
