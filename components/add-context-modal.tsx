"use client"

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ContextItem } from '@/types';
import { Plus, Edit } from 'lucide-react';

interface AddContextModalProps {
  onAdd: (context: ContextItem) => void;
  initialData?: ContextItem;
  trigger?: React.ReactNode;
}

export function AddContextModal({ onAdd, initialData, trigger }: AddContextModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [type, setType] = useState<ContextItem['type']>(initialData?.type || 'url');

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setTitle(initialData?.title || '');
      setContent(initialData?.content || '');
      setType(initialData?.type || 'url');
    }
    setOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newContext: ContextItem = {
      id: initialData?.id || uuidv4(),
      title: title.trim(),
      content: content.trim(),
      type,
      createdAt: initialData?.createdAt || Date.now(),
    };

    onAdd(newContext);
    setOpen(false);
    if (!initialData) {
      setTitle('');
      setContent('');
      setType('url');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <Button size="sm" className="gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50 dark:hover:bg-blue-900/40 shadow-sm">
            {initialData ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {initialData ? "Edit Context" : "Add Context"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Context" : "Add Context"}</DialogTitle>
            <DialogDescription>
              {initialData ? "Update the details of this context item." : "Save a URL, chat link, or note related to this account."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ctx-type">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as ContextItem['type'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL / Link</SelectItem>
                  <SelectItem value="chat">Chat Link</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ctx-title">Title</Label>
              <Input
                id="ctx-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Project Dashboard"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ctx-content">Content</Label>
              {type === 'note' ? (
                <Textarea
                  id="ctx-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your note here..."
                  required
                />
              ) : (
                <Input
                  id="ctx-content"
                  type="url"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="https://..."
                  required
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Save Changes" : "Save Context"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
