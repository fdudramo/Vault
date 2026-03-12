"use client"

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AppItem } from '@/types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddAppModalProps {
  onAdd: (app: AppItem) => void;
  isCollapsed?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  renderTrigger?: React.ReactNode;
}

export function AddAppModal({ onAdd, isCollapsed, className, variant = "outline", renderTrigger }: AddAppModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newApp: AppItem = {
      id: uuidv4(),
      name: name.trim(),
      description: description.trim(),
      url: url.trim(),
      accounts: [],
      createdAt: Date.now(),
    };

    onAdd(newApp);
    setOpen(false);
    setName('');
    setDescription('');
    setUrl('');
    toast.success('App added successfully');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderTrigger || (
          <Button 
            className={className || "w-full justify-start gap-2"} 
            variant={variant}
            size={isCollapsed ? "icon" : "default"}
          >
            <Plus className={isCollapsed ? "h-5 w-5" : "h-4 w-4"} />
            {!isCollapsed && "Add New App"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>
              Create a new space to manage accounts and context for an application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">App Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Vercel, Supabase, OpenAI"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL (Optional)</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What do you use this app for?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save App</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
