<script setup>
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Zap as ZapIcon
} from 'lucide-vue-next'

const features = [
  { title: 'Global Broker', desc: 'Connect from anywhere to our high-availability MQTT brokers.', icon: Zap },
  { title: 'Secure by Design', desc: 'Enterprise-grade encryption and device authentication baked in.', icon: ShieldCheck },
  { title: 'Pro Analytics', desc: 'Process millions of messages and visualize data in real-time.', icon: BarChart3 },
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ZapIcon class="text-white w-6 h-6" />
          </div>
          <span class="text-xl font-bold tracking-tight">Fici<span class="text-emerald-500">Labs</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#pricing" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
          <router-link to="/login" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</router-link>
          <router-link to="/dashboard" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full transition-all duration-300 transform hover:scale-105">
            Get Started
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>
      
      <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          v2.0 is now live
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Next-Gen IoT <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Management for SaaS</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Monitor, control, and analyze your MQTT-connected devices with a professional, real-time dashboard built for scale.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/dashboard" class="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
            Go to Console
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </router-link>
          <button class="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all duration-300 border border-slate-700">
            View Live Demo
          </button>
        </div>

        <!-- Dashboard Preview -->
        <div class="mt-20 relative px-4">
          <div class="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] border border-slate-800 p-2 shadow-2xl overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop" 
                 alt="Dashboard Preview" 
                 class="rounded-[2rem] border border-slate-800 shadow-inner w-full h-[500px] object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="p-8 bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-700/50 text-center max-w-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <BarChart3 class="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
                <p class="text-slate-400 text-sm">Experience sub-second latency with our high-performance MQTT engine.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-slate-900/50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to scale</h2>
          <p class="text-slate-400">Professional tools for IoT developers and enterprise teams.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
              <component :is="feature.icon" class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">{{ feature.title }}</h3>
            <p class="text-slate-400 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-slate-800">
      <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex items-center gap-2">
          <ZapIcon class="text-emerald-500 w-6 h-6" />
          <span class="text-lg font-bold">FiciLabs</span>
        </div>
        <div class="flex items-center gap-6 text-slate-500">
          <Github class="w-5 h-5 hover:text-white cursor-pointer" />
          <Twitter class="w-5 h-5 hover:text-white cursor-pointer" />
          <Linkedin class="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
        <div class="text-slate-500 text-sm">
          © 2026 Fici Labs. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>
