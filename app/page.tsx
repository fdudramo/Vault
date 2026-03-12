"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Database className="size-4 text-blue-500" />
            </div>
            <span className="font-bold text-lg tracking-tight">Vault</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/app">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 font-medium">
                Get your own vault, free.
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 mb-8"
            >
              <span className="flex size-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              the vault u r looking for
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-6 leading-[1.1]"
            >
              bring your db to<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                your vault
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-left"
            >
              i have different accounts for different apps. each app i signed into using different accounts that represent different things for me and i use them for different purposes. in each account i may have generated some tokens, api keys, had different chats and urls for things i did in there. i always forget which one is for what.
              <br /><br />
              so i built this vault to keep everything organized. now i know exactly what i have where.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/app">
                <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600 font-medium w-full sm:w-auto px-8 h-12 text-base">
                  get your own vault, free.
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What you get Section */}
        <section className="py-24 border-t border-white/5 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="mb-16 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">what u get</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Database className="size-5 text-blue-400" />,
                  title: "one vault per app",
                  description: "keep each app's accounts, tokens, api keys, and context all in one place."
                },
                {
                  icon: <Copy className="size-5 text-blue-400" />,
                  title: "copy fast",
                  description: "one click to copy any token or key. no more digging through settings."
                },
                {
                  icon: <CheckCircle2 className="size-5 text-blue-400" />,
                  title: "its free",
                  description: "local storage is free. supabase sync is $1/month. thats it."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
