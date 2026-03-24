<script setup>
import { ShieldCheck, ArrowRight, Zap } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>

    <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl">
      <div class="text-center mb-10">
        <router-link to="/" class="inline-flex items-center gap-2 mb-8 group">
          <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Zap class="text-slate-950 w-6 h-6" />
          </div>
          <span class="text-2xl font-bold text-white">FiciLabs</span>
        </router-link>
        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-slate-400">Enter your credentials to access the console.</p>
      </div>

      <form @submit.prevent="$router.push('/dashboard')" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-slate-400 mb-2 px-1 uppercase tracking-widest text-[10px]">Email Address</label>
          <input type="email" placeholder="alex@example.com" class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" required />
        </div>
        <div>
          <div class="flex justify-between mb-2 px-1">
            <label class="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">Password</label>
            <a href="#" class="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-widest">Forgot?</a>
          </div>
          <input type="password" placeholder="••••••••" class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" required />
        </div>

        <button type="submit" class="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group">
          Sign In
          <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-slate-500 text-sm">
          Don't have an account? 
          <a href="#" class="text-emerald-500 font-bold hover:underline">Start Free Trial</a>
        </p>
      </div>
      
      <div class="mt-10 pt-8 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-600">
        <ShieldCheck class="w-4 h-4" />
        <span class="text-[10px] uppercase font-bold tracking-widest leading-none">Secured by Enterprise OAuth</span>
      </div>
    </div>
  </div>
</template>
