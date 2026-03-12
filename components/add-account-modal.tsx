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
import { Account, AuthMethod } from '@/types';
import { Plus, Edit } from 'lucide-react';

interface AddAccountModalProps {
  onAdd: (account: Account) => void;
  initialData?: Account;
  trigger?: React.ReactNode;
}

export function AddAccountModal({ onAdd, initialData, trigger }: AddAccountModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [username, setUsername] = useState(initialData?.username || '');
  const [password, setPassword] = useState(initialData?.password || '');
  const [authMethod, setAuthMethod] = useState<AuthMethod>(initialData?.authMethod || 'email');

  useEffect(() => {
    if (open) {
      setName(initialData?.name || '');
      setEmail(initialData?.email || '');
      setUsername(initialData?.username || '');
      setPassword(initialData?.password || '');
      setAuthMethod(initialData?.authMethod || 'email');
    }
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAccount: Account = {
      id: initialData?.id || uuidv4(),
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password,
      authMethod,
      credentials: initialData?.credentials || [],
      contexts: initialData?.contexts || [],
      createdAt: initialData?.createdAt || Date.now(),
    };

    onAdd(newAccount);
    setOpen(false);
    if (!initialData) {
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setAuthMethod('email');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <Button size="sm" className="gap-2">
            {initialData ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {initialData ? "Edit Account" : "Add Account"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Account" : "Add New Account"}</DialogTitle>
            <DialogDescription>
              {initialData ? "Update the details of this account profile." : "Add a new account profile for this application."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="account-name">Account Name / Label</Label>
              <Input
                id="account-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Personal, Work, Admin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="auth-method">Sign In Method</Label>
              <Select value={authMethod} onValueChange={(v) => setAuthMethod(v as AuthMethod)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email & Password</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username (Optional)</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Save Changes" : "Save Account"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
