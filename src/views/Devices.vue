<script setup>
import { ref } from 'vue'
import { 
  Cpu, 
  Plus, 
  MoreVertical, 
  Wifi, 
  WifiOff, 
  Settings, 
  Trash2,
  X 
} from 'lucide-vue-next'

const devices = ref([
  { id: 'iot-001', name: 'Living Room Hub', type: 'ESP32', status: 'Online', topic: 'ficilabs/living-room' },
  { id: 'iot-002', name: 'Kitchen Node', type: 'ESP8266', status: 'Online', topic: 'ficilabs/kitchen' },
  { id: 'iot-003', name: 'Garage Controller', type: 'Custom', status: 'Offline', topic: 'ficilabs/garage' },
])

const isModalOpen = ref(false)
const newDevice = ref({ name: '', type: 'ESP32', topic: '' })

const addDevice = () => {
    if (newDevice.value.name) {
        devices.value.push({
            id: 'iot-00' + (devices.value.length + 1),
            ...newDevice.value,
            status: 'Offline'
        })
        isModalOpen.value = false
        newDevice.value = { name: '', type: 'ESP32', topic: '' }
    }
}

const deleteDevice = (id) => {
    devices.value = devices.value.filter(d => d.id !== id)
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Device Management</h1>
        <p class="text-slate-400">Total of {{ devices.length }} registered devices.</p>
      </div>
      <button @click="isModalOpen = true" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
        <Plus class="w-5 h-5" />
        Add Device
      </button>
    </div>

    <!-- Device List -->
    <div class="grid grid-cols-1 gap-4">
      <div v-for="device in devices" :key="device.id" 
           class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-500/30 transition-all group">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors">
            <Cpu class="w-8 h-8" />
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-bold text-white">{{ device.name }}</h3>
              <span :class="device.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'" 
                    class="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-current opacity-70">
                {{ device.status }}
              </span>
            </div>
            <div class="text-xs text-slate-500 font-mono mt-1">{{ device.id }} • {{ device.type }}</div>
          </div>
        </div>

        <div class="hidden lg:block h-10 w-[1px] bg-slate-800"></div>

        <div class="flex flex-col">
          <span class="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Mqtt Path</span>
          <span class="text-sm font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{{ device.topic }}</span>
        </div>

        <div class="flex items-center gap-3">
          <button @click="deleteDevice(device.id)" class="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-500 rounded-xl transition-all">
            <Trash2 class="w-5 h-5" />
          </button>
          <button class="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
            <MoreVertical class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add Device Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" @click="isModalOpen = false"></div>
        <div class="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-10">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-white">New Gateway Node</h2>
                <button @click="isModalOpen = false" class="text-slate-500 hover:text-white transition-colors">
                    <X class="w-6 h-6" />
                </button>
            </div>

            <div class="space-y-6">
                <div>
                    <label class="block text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-2 px-1">Friendly Name</label>
                    <input v-model="newDevice.name" type="text" placeholder="e.g. Master Bedroom" class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500" />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-2 px-1">Hardware Type</label>
                        <select v-model="newDevice.type" class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 appearance-none">
                            <option>ESP32</option>
                            <option>ESP8266</option>
                            <option>Raspberry Pi</option>
                            <option>Custom Node</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-2 px-1">Topic Suffix</label>
                        <input v-model="newDevice.topic" type="text" placeholder="esp-32" class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                </div>

                <div class="pt-4">
                    <button @click="addDevice" class="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                        Initialize Device
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Empty State Placeholder -->
    <div v-if="devices.length === 0" class="p-12 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-50">
      <div class="p-6 bg-slate-900 rounded-full mb-6">
        <WifiOff class="w-12 h-12 text-slate-700" />
      </div>
      <h3 class="text-xl font-bold text-white mb-2">Connect New Gateway</h3>
      <p class="text-slate-500 text-sm max-w-sm">No active gateways found in your current region. Configure a bridge to start receiving live data streams.</p>
    </div>
  </div>
</template>
