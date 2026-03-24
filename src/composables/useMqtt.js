import { ref, onMounted, onUnmounted } from 'vue'
import mqtt from 'mqtt'

const clientId = 'ledcontrol_' + Math.random().toString(16).substring(2, 10)
const broker = 'wss://broker.hivemq.com:8884/mqtt'
const topicPrefix = 'ficilabs/'

const connectionStatus = ref('Connecting...')
const connectionColor = ref('bg-blue-500')
const connectionIcon = ref('fas fa-spinner fa-spin')
const isConnected = ref(false)

const temperature = ref(0)
const humidity = ref(0)
const lightStates = ref({
  1: false,
  2: false,
  3: false,
  4: false // New Light
})
const livingRoomTemp = ref(0) // New Sensor
const messages = ref([]) 

let client = null

export function useMqtt() {
  const connect = () => {
    if (client) return

    client = mqtt.connect(broker, {
      clientId,
      host: 'broker.hivemq.com',
      port: 8884,
      protocol: 'wss',
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000
    })

    client.on('connect', () => {
      isConnected.value = true
      connectionStatus.value = 'Connected'
      connectionColor.value = 'bg-green-500'
      connectionIcon.value = 'fas fa-check-circle'
      
      client.subscribe([
        `${topicPrefix}led#`,
        `${topicPrefix}temp`,
        `${topicPrefix}hum`,
        `${topicPrefix}livingroom/temp` // New Subscription
      ])
    })

    client.on('message', (topic, message) => {
      const msg = message.toString()
      // Log for history
      messages.value.unshift({
        id: Date.now(),
        topic: topic.replace(topicPrefix, ''),
        content: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      })
      if (messages.value.length > 15) messages.value.pop()

      if (topic.startsWith(`${topicPrefix}led`)) {
        const id = topic.replace(`${topicPrefix}led`, '')
        if (id) {
            lightStates.value[id] = msg === 'on'
        }
      } else if (topic === `${topicPrefix}temp`) {
        temperature.value = parseFloat(msg)
      } else if (topic === `${topicPrefix}hum`) {
        humidity.value = parseFloat(msg)
      } else if (topic === `${topicPrefix}livingroom/temp`) {
        livingRoomTemp.value = parseFloat(msg) // New Logic
      }
    })

    client.on('error', (err) => {
      console.error('MQTT Error:', err)
      connectionStatus.value = 'Error'
      connectionColor.value = 'bg-red-500'
      connectionIcon.value = 'fas fa-exclamation-circle'
    })

    client.on('offline', () => {
      isConnected.value = false
      connectionStatus.value = 'Offline'
      connectionColor.value = 'bg-yellow-500'
      connectionIcon.value = 'fas fa-exclamation-triangle'
    })
  }

  const toggleLight = (id) => {
    if (!client) return
    const newState = !lightStates.value[id]
    const topic = `${topicPrefix}led${id}`
    const message = newState ? 'on' : 'off'
    
    client.publish(topic, message, { qos: 0, retain: false })
    lightStates.value[id] = newState
  }

  onMounted(() => {
    connect()
  })

  return {
    temperature,
    humidity,
    lightStates,
    connectionStatus,
    connectionColor,
    connectionIcon,
    isConnected,
    toggleLight,
    messages,
    livingRoomTemp
  }
}
