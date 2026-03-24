<script setup>
import { 
  BarChart3, 
  Activity, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Zap
} from 'lucide-vue-next'
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const lineChartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
  datasets: [
    {
      label: 'Avg Temperature',
      borderColor: '#10b981',
      backgroundColor: '#10b98120',
      data: [22, 21, 23, 26, 28, 25, 22],
      fill: true,
      tension: 0.4
    },
    {
      label: 'Avg Humidity',
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f620',
      data: [45, 48, 50, 42, 38, 44, 46],
      fill: true,
      tension: 0.4
    }
  ]
}

const barChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Messages per Day',
    backgroundColor: '#f59e0b',
    data: [1200, 1900, 1500, 2100, 2400, 1800, 1400],
    borderRadius: 8
  }]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#94a3b8' }
    }
  },
  scales: {
    y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
  }
}

const metrics = [
  { name: 'Total Messages', value: '45,281', trend: '+12.5%', isUp: true, icon: Activity, color: 'text-emerald-400' },
  { name: 'Uptime', value: '99.98%', trend: '+0.01%', isUp: true, icon: Clock, color: 'text-blue-400' },
  { name: 'Avg. Latency', value: '42ms', trend: '-2.4%', isUp: false, icon: Zap, color: 'text-amber-400' },
]

</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-white tracking-tight">System Analytics</h1>
        <p class="text-slate-400 text-sm">Deep dive into your MQTT infrastructure performance.</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-sm font-bold flex items-center gap-2 transition-all">
          <Filter class="w-4 h-4" />
          Last 7 Days
        </button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="metric in metrics" :key="metric.name" 
           class="p-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50">
        <div class="flex items-center justify-between mb-4">
          <div :class="metric.color" class="p-3 bg-slate-900/50 rounded-xl">
            <component :is="metric.icon" class="w-5 h-5" />
          </div>
          <div :class="metric.isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'" 
               class="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-current opacity-70">
            <component :is="metric.isUp ? ArrowUpRight : ArrowDownRight" class="w-3 h-3" />
            {{ metric.trend }}
          </div>
        </div>
        <div class="text-sm text-slate-500 font-bold uppercase tracking-wider">{{ metric.name }}</div>
        <div class="text-3xl font-bold text-white mt-1">{{ metric.value }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Line Chart -->
      <div class="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
        <h2 class="text-xl font-bold text-white mb-8 flex items-center gap-2">
          Environment History
        </h2>
        <div class="h-[300px]">
          <Line :data="lineChartData" :options="options" />
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
        <h2 class="text-xl font-bold text-white mb-8 flex items-center gap-2">
          Traffic Volume
        </h2>
        <div class="h-[300px]">
          <Bar :data="barChartData" :options="options" />
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
