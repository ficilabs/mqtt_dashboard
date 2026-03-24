<script setup>
import { useMqtt } from '../composables/useMqtt'
import { computed, ref, onMounted, watch } from 'vue'
import { 
  Thermometer, 
  Droplets, 
  Lightbulb, 
  Activity,
  Wifi,
  WifiOff,
  LineChart as LineChartIcon,
  RefreshCw
} from 'lucide-vue-next'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const { 
  temperature, 
  humidity, 
  lightStates, 
  connectionStatus, 
  isConnected,
  toggleLight,
  messages,
  livingRoomTemp // New
} = useMqtt()

const connectionColor = computed(() => {
  if (connectionStatus.value === 'Connected') return 'text-emerald-400'
  if (connectionStatus.value === 'Offline') return 'text-amber-400'
  return 'text-rose-400'
})

const stats = computed(() => [
  { name: 'Global Temp', value: `${temperature.value}°C`, icon: Thermometer, color: 'text-orange-400' },
  { name: 'Humidity', value: `${humidity.value}%`, icon: Droplets, color: 'text-blue-400' },
  { name: 'Living Room', value: `${livingRoomTemp.value}°C`, icon: Activity, color: 'text-emerald-400' },
])

// Chart Data
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Temperature (°C)',
      backgroundColor: '#f97316',
      borderColor: '#f97316',
      data: [],
      tension: 0.4
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#94a3b8',
      bodyColor: '#f8fafc',
      borderColor: '#334155',
      borderWidth: 1
    }
  },
  scales: {
    y: { 
      grid: { color: '#334155' },
      ticks: { color: '#94a3b8' }
    },
    x: { 
      grid: { display: false },
      ticks: { color: '#94a3b8' }
    }
  }
}

watch(temperature, (newVal) => {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  chartData.value.labels.push(now)
  chartData.value.datasets[0].data.push(newVal)
  
  if (chartData.value.labels.length > 20) {
    chartData.value.labels.shift()
    chartData.value.datasets[0].data.shift()
  }
})

</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-white">Live Insights</h1>
        <p class="text-slate-400">Real-time monitoring for your IoT ecosystem.</p>
      </div>
      <div class="flex items-center gap-4">
        <button class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all">
            <RefreshCw class="w-3.5 h-3.5" />
            Scan & Sync
        </button>
        <div class="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50">
            <component :is="isConnected ? Wifi : WifiOff" :class="connectionColor" class="w-5 h-5" />
            <span class="text-sm font-medium text-slate-200">{{ connectionStatus }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.name" 
           class="group p-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden">
        <div class="flex items-center justify-between mb-4">
          <div :class="stat.color" class="p-3 bg-slate-900/50 rounded-xl">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div class="flex items-center gap-2">
            <button class="p-1.5 hover:bg-slate-700/50 rounded-lg text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <RefreshCw class="w-3.5 h-3.5" />
            </button>
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
          </div>
        </div>
        <div class="text-sm text-slate-400 font-medium">{{ stat.name }}</div>
        <div class="text-3xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
          {{ stat.value }}
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Chart Card -->
      <div class="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <LineChartIcon class="w-6 h-6 text-emerald-400" />
            Temperature Trend
          </h2>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span class="text-xs text-slate-400 font-bold uppercase">Real-time</span>
          </div>
        </div>
        <div class="h-[300px]">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Quick Controls -->
      <div class="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb class="w-6 h-6 text-amber-400" />
          Quick Controls
        </h2>
        <div class="space-y-4">
          <div v-for="id in [1, 2, 3, 4]" :key="id" 
               class="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-700/30">
            <div class="flex items-center gap-4">
              <div :class="lightStates[id] ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'" 
                   class="p-3 rounded-xl transition-colors duration-300">
                <Lightbulb class="w-5 h-5" />
              </div>
              <div>
                <div class="text-white font-semibold">Light {{ id }}</div>
                <div class="text-[10px] text-slate-500 uppercase font-black tracking-widest">Main Room</div>
              </div>
            </div>
            <button 
              @click="toggleLight(id)"
              :class="lightStates[id] ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-700'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300"
            >
              <span 
                :class="lightStates[id] ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        <!-- NEW: Live Signal Console -->
        <h2 class="text-xl font-bold text-white mt-10 mb-6 flex items-center gap-2">
            <Activity class="w-6 h-6 text-emerald-400" />
            Live Event Stream
        </h2>
        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="msg in messages" :key="msg.id" 
                 class="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex flex-col gap-1.5 animate-slide-in">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{{ msg.topic }}</span>
                    <span class="text-[10px] font-mono text-slate-500">{{ msg.time }}</span>
                </div>
                <div class="text-xs text-slate-300 font-mono break-all">{{ msg.content }}</div>
            </div>
            <!-- Empty state -->
             <div v-if="messages.length === 0" class="flex flex-col items-center justify-center py-10 text-slate-600">
                <WifiOff class="w-8 h-8 mb-2" />
                <p class="text-[10px] uppercase font-bold">Waiting for signals...</p>
             </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
@keyframes slide-in {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}
</style>
