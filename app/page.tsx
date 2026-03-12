"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Key, Shield, Zap, Code, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Database className="size-4 text-emerald-500" />
            </div>
            <span className="font-bold text-lg tracking-tight">Vault</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#docs" className="hover:text-foreground transition-colors">Documentation</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/app">
              <Button className="bg-emerald-500 text-black hover:bg-emerald-600 font-medium">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-8"
            >
              <span className="flex size-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Vault 2.0 is now available
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-6 leading-[1.1]"
            >
              The open source <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                developer vault
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
            >
              Manage your accounts, API keys, tokens, and context across different applications. 
              Built for developers who need secure, fast, and reliable secret management.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <Link href="/app">
                <Button size="lg" className="bg-emerald-500 text-black hover:bg-emerald-600 font-medium w-full sm:w-auto px-8 h-12 text-base">
                  Start your project
                </Button>
              </Link>
              <Link href="#docs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 text-base border-white/10 hover:bg-white/5">
                  Request a demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 border-t border-white/5 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="mb-16 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to build</h2>
              <p className="text-muted-foreground text-lg">
                We provide all the tools to manage your secrets, so you can focus on building your product.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Key className="size-5 text-emerald-400" />,
                  title: "API Key Management",
                  description: "Store and manage API keys securely with environment-specific configurations."
                },
                {
                  icon: <Shield className="size-5 text-emerald-400" />,
                  title: "Secure Storage",
                  description: "End-to-end encryption for all your sensitive data, tokens, and passwords."
                },
                {
                  icon: <Zap className="size-5 text-emerald-400" />,
                  title: "Lightning Fast",
                  description: "Optimized for speed with local-first architecture and instant sync."
                },
                {
                  icon: <Code className="size-5 text-emerald-400" />,
                  title: "Developer First",
                  description: "Built by developers for developers with intuitive UI and keyboard shortcuts."
                },
                {
                  icon: <Database className="size-5 text-emerald-400" />,
                  title: "Context Keeping",
                  description: "Save URLs, snippets, and context alongside your credentials for easy access."
                },
                {
                  icon: <Lock className="size-5 text-emerald-400" />,
                  title: "Access Control",
                  description: "Granular permissions and role-based access control for your team."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
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

        {/* Pricing Section */}
        <section id="pricing" className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Predictable pricing</h2>
              <p className="text-muted-foreground text-lg">
                Start for free, then pay as you grow. No hidden fees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col">
                <h3 className="text-xl font-medium mb-2">Free</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">Perfect for side projects and learning.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Link href="/app" className="w-full mb-8">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                    Get Started
                  </Button>
                </Link>
                <div className="space-y-4 flex-1">
                  {[
                    "Up to 3 projects",
                    "50 secrets per project",
                    "Local storage only",
                    "Community support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.02] flex flex-col relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-emerald-400">Pro</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">For professional developers and small teams.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Link href="/app" className="w-full mb-8">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-medium">
                    Upgrade to Pro
                  </Button>
                </Link>
                <div className="space-y-4 flex-1">
                  {[
                    "Unlimited projects",
                    "Unlimited secrets",
                    "Cloud sync (Supabase)",
                    "Version history (30 days)",
                    "Priority email support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Plan */}
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col">
                <h3 className="text-xl font-medium mb-2">Team</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">For growing teams that need advanced control.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Link href="/app" className="w-full mb-8">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                    Contact Sales
                  </Button>
                </Link>
                <div className="space-y-4 flex-1">
                  {[
                    "Everything in Pro",
                    "Role-based access control",
                    "Audit logs",
                    "SSO / SAML",
                    "Dedicated success manager"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/10"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[800px] rounded-full bg-emerald-500 opacity-20 blur-[120px]"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to secure your workflow?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of developers who trust Vault for their secret management.
            </p>
            <Link href="/app">
              <Button size="lg" className="bg-emerald-500 text-black hover:bg-emerald-600 font-medium px-8 h-14 text-lg rounded-full">
                Start building for free <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Database className="size-5 text-emerald-500" />
            <span className="font-bold text-lg tracking-tight">Vault</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vault Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
