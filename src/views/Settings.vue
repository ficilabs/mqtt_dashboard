<script setup>
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Save, 
  CheckCircle2 
} from 'lucide-vue-next'
import { ref } from 'vue'

const showToast = ref(false)

const saveSettings = () => {
    showToast.value = true
    setTimeout(() => {
        showToast.value = false
    }, 3000)
}

const user = {
    name: 'Alex Rivera',
    email: 'alex@fici.labs',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop'
}

const mqttConfig = {
    broker: 'wss://broker.hivemq.com:8884/mqtt',
    clientId: 'ledcontrol_94a2b8',
    topicPrefix: 'ficilabs/'
}
</script>

<template>
  <div class="space-y-8 animate-fade-in relative">
    <!-- Success Toast -->
    <div v-if="showToast" 
         class="fixed top-4 right-4 bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 z-50 animate-bounce duration-1000">
      <CheckCircle2 class="w-5 h-5 text-slate-950" />
      Settings Saved
    </div>

    <div>
      <h1 class="text-3xl font-bold text-white mb-2">Workspace Settings</h1>
      <p class="text-slate-400">Configure your personal profile and system preferences.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sidebar Settings Options -->
      <div class="lg:col-span-1 space-y-2">
        <button v-for="item in [
            { icon: User, name: 'Profile' },
            { icon: Shield, name: 'Security' },
            { icon: Bell, name: 'Notifications' },
            { icon: Globe, name: 'MQTT Broker' },
            { icon: Database, name: 'Storage API' }
        ]" :key="item.name" 
           :class="item.name === 'Profile' ? 'bg-slate-800 border-slate-700 text-white' : 'hover:bg-slate-800 text-slate-400 border-transparent'"
           class="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all text-sm font-bold group">
          <component :is="item.icon" class="w-5 h-5 group-hover:text-emerald-400" />
          {{ item.name }}
        </button>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Profile Card -->
        <div class="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
          <div class="flex items-center gap-6 mb-10">
            <div class="relative group">
                <img :src="user.avatar" class="w-24 h-24 rounded-3xl border-4 border-slate-900 shadow-xl group-hover:opacity-75 transition-opacity" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-white font-bold text-[10px] uppercase">Change</div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">{{ user.name }}</h3>
              <p class="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">{{ user.role }}</p>
              <div class="mt-2 flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-400/10 px-3 py-1 rounded-full w-fit border border-emerald-400/20">
                  <Shield class="w-3 h-3" />
                  Verified Organization
                </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px] px-1">Full Name</label>
              <div class="relative">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" v-model="user.name" class="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors shadow-inner" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px] px-1">Email Address</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" v-model="user.email" disabled class="w-full bg-slate-950/20 border border-slate-800 rounded-2xl px-12 py-3.5 text-slate-500 cursor-not-allowed" />
              </div>
            </div>
          </div>
        </div>

        <!-- System Card -->
        <div class="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl overflow-hidden relative group">
          <div class="absolute top-0 right-0 p-8 opacity-10 -rotate-12 transform group-hover:rotate-0 transition-transform duration-700">
              <Globe class="w-32 h-32" />
          </div>
          <h3 class="text-xl font-bold text-white mb-8">System Connectivity</h3>
          
          <div class="space-y-6">
            <div class="space-y-2 relative z-10">
              <label class="block text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px] px-1">MQTT Broker Endpoint</label>
              <input type="text" v-model="mqttConfig.broker" class="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-6 py-3.5 font-mono text-sm text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div class="space-y-2">
                    <label class="block text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px] px-1">Topic Prefix</label>
                    <input type="text" v-model="mqttConfig.topicPrefix" class="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-6 py-3.5 font-mono text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors shadow-inner" />
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px] px-1">Primary Client ID</label>
                    <input type="text" v-model="mqttConfig.clientId" class="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl px-6 py-3.5 font-mono text-sm text-rose-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner" />
                </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex justify-end pt-4">
            <button @click="saveSettings" class="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl transition-all flex items-center gap-3 shadow-lg shadow-emerald-500/20 transform hover:-translate-y-1 active:scale-95">
                <Save class="w-5 h-5" />
                Commit Workspace
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
