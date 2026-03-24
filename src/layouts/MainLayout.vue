<script setup>
import { 
  LayoutDashboard, 
  Cpu, 
  BarChart2, 
  Settings, 
  LogOut,
  Zap,
  Bell,
  Search,
  User
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Devices', icon: Cpu, path: '/devices' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

const handleLogout = () => {
    // In a real app, clear tokens here
    window.location.href = '/'
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-950 text-slate-200">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl hidden lg:flex flex-col sticky top-0 h-screen">
      <div class="p-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Zap class="text-slate-950 w-5 h-5" />
        </div>
        <span class="text-xl font-bold text-white tracking-tight">FiciLabs</span>
      </div>

      <nav class="flex-grow px-4 mt-6">
        <div class="space-y-1">
          <router-link 
            v-for="item in menuItems" 
            :key="item.name" 
            :to="item.path"
            :class="[
              route.path === item.path 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            ]"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium text-sm">{{ item.name }}</span>
          </router-link>
        </div>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors group">
          <LogOut class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span class="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Body -->
    <div class="flex-grow flex flex-col min-w-0">
      <!-- Navbar -->
      <header class="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
        <div class="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-96 max-w-full">
          <Search class="w-4 h-4 text-slate-500 mr-2" />
          <input type="text" placeholder="Search devices..." class="bg-transparent border-none outline-none text-sm w-full text-slate-300 placeholder:text-slate-600" />
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative">
            <Bell class="w-5 h-5" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          </button>
          <div class="h-8 w-[1px] bg-slate-800 mx-2"></div>
          <div class="flex items-center gap-3 pl-2 cursor-pointer group">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Alex Rivera</div>
              <div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pro Plan</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              <User class="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-grow p-8 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>
