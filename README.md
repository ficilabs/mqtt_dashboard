# ⚡ FiciLabs — Enterprise IoT Command Center

<div align="center">

![FiciLabs Banner](https://a.storyblok.com/f/290600019888888/1280x720/531bb38f8a/bd0675f4-7af3-45e1-b788-99357e0c3938.png&auto=format&fit=crop)

**A production-grade, real-time IoT management dashboard powered by MQTT, Vue 3, and Chart.js.**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![MQTT](https://img.shields.io/badge/MQTT-5.x-660066?style=flat-square&logo=eclipse-mosquitto)](https://mqtt.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](#) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## 📖 Overview

**FiciLabs** is a full-featured, enterprise-grade IoT Command Center designed to **monitor, control, and analyze** MQTT-connected devices in real time. Built with Vue 3 and a sleek dark-themed UI, it provides a professional interface for developers and IoT engineers to manage their hardware infrastructure from any browser.

Whether you're managing smart home sensors, industrial gateways, or ESP32/ESP8266 nodes, FiciLabs gives you the control panel you've always wanted.

---

## ✨ Features

### 🏠 Live Dashboard
- Real-time sensor data display (temperature, humidity, custom readings)
- Live temperature trend chart with auto-scrolling history (last 20 data points)
- Interactive light/relay controls via MQTT publish
- Live event stream console showing all incoming MQTT messages

### 📡 Device Management
- Register and manage IoT gateway nodes (ESP32, ESP8266, Raspberry Pi, Custom)
- Assign MQTT topic paths to individual devices
- Online/Offline status tracking
- Add and remove devices dynamically

### 📊 System Analytics
- Environment history line charts (temperature & humidity over time)
- Daily message traffic bar chart
- Key metrics: total messages, system uptime, average latency

### ⚙️ Workspace Settings
- Personal profile management
- MQTT broker endpoint configuration
- Client ID and topic prefix customization
- Save confirmation with animated toast notification

### 🔐 Authentication UI
- Clean login page with enterprise OAuth branding
- Seamless routing to the main dashboard

### 🌐 Landing Page
- Marketing-ready landing page with hero section, features, and CTA buttons
- Animated dashboard preview section
- Responsive navbar with smooth scroll links

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Routing** | [Vue Router 4](https://router.vuejs.org/) |
| **Charts** | [Chart.js 4](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) |
| **Icons** | [Lucide Vue Next](https://lucide.dev/) |
| **IoT Protocol** | [MQTT.js 5](https://github.com/mqttjs/MQTT.js) (WebSocket over WSS) |
| **MQTT Broker** | [HiveMQ Public Broker](https://www.hivemq.com/mqtt/public-mqtt-broker/) |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |

---

## 📁 Project Structure

```
mqtt-dashboard-vue/
├── public/
├── src/
│   ├── composables/
│   │   └── useMqtt.js          # MQTT client logic (connect, subscribe, publish)
│   ├── layouts/
│   │   └── MainLayout.vue      # App shell: sidebar + topbar
│   ├── router/
│   │   └── index.js            # Vue Router config
│   ├── views/
│   │   ├── Landing.vue         # Public marketing page
│   │   ├── Login.vue           # Authentication UI
│   │   ├── Dashboard.vue       # Main live monitoring view
│   │   ├── Devices.vue         # Device management
│   │   ├── Analytics.vue       # Charts and metrics
│   │   └── Settings.vue        # User & system settings
│   ├── App.vue                 # Root component
│   ├── main.js                 # App entry point
│   └── style.css               # Global Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.cjs
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.0.0`
- **npm** `>= 8.0.0` (or `pnpm` / `yarn`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ficilabs-iot-dashboard.git

# 2. Navigate into the project
cd ficilabs-iot-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory, ready to deploy.

### Preview Production Build

```bash
npm run preview
```

---

## 🔌 MQTT Configuration

FiciLabs connects to the **HiveMQ public broker** by default. You can change this in `src/composables/useMqtt.js`:

```js
// src/composables/useMqtt.js

const broker = 'wss://broker.hivemq.com:8884/mqtt'
const topicPrefix = 'ficilabs/'
```

### Default Topic Schema

| Topic | Direction | Description |
|---|---|---|
| `ficilabs/temp` | Subscribe | Global temperature sensor |
| `ficilabs/hum` | Subscribe | Global humidity sensor |
| `ficilabs/livingroom/temp` | Subscribe | Secondary temperature node |
| `ficilabs/led1` | Pub/Sub | Light relay #1 control |
| `ficilabs/led2` | Pub/Sub | Light relay #2 control |
| `ficilabs/led3` | Pub/Sub | Light relay #3 control |
| `ficilabs/led4` | Pub/Sub | Light relay #4 control |

### Example: Publishing from ESP32 (Arduino)

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* broker = "broker.hivemq.com";
const int port = 1883;

void publishTemperature(float temp) {
  char payload[10];
  dtostrf(temp, 4, 2, payload);
  client.publish("ficilabs/temp", payload);
}
```

---

## 🖥️ Application Routes

| Route | View | Description |
|---|---|---|
| `/` | `Landing.vue` | Public marketing homepage |
| `/login` | `Login.vue` | User authentication page |
| `/dashboard` | `Dashboard.vue` | Live sensor & control panel |
| `/devices` | `Devices.vue` | Device registry |
| `/analytics` | `Analytics.vue` | Charts & performance metrics |
| `/settings` | `Settings.vue` | Profile & system configuration |

---

## 🌍 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

> ⚠️ Add a `vercel.json` to handle SPA routing:
> ```json
> {
>   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
> }
> ```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Add _redirects file to /public:
/*  /index.html  200
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## 🔮 Roadmap & Future Features

- [ ] **Authentication** — Real JWT-based login with protected routes
- [ ] **Custom MQTT Broker** — UI to configure broker endpoint without code changes
- [ ] **Device Groups** — Organize nodes into rooms or zones
- [ ] **Alert Rules** — Trigger notifications when sensor thresholds are exceeded
- [ ] **Data Persistence** — Store historical sensor data with a backend (Node.js + InfluxDB or Firebase)
- [ ] **Mobile Sidebar** — Responsive drawer navigation for mobile devices
- [ ] **Dark/Light Theme Toggle** — User preference with localStorage persistence
- [ ] **Multi-user Support** — Team workspaces with role-based access
- [ ] **MQTT over TLS** — Certificate-based secure device auth
- [ ] **Webhook Integrations** — Slack, Discord, Telegram alerts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-amazing-feature

# 3. Commit your changes
git commit -m "feat: add your amazing feature"

# 4. Push to your branch
git push origin feature/your-amazing-feature

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<div align="center">

**FiciLabs Team**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/your-handle)

*Built with ❤️ for the IoT developer community.*

</div>

---

<div align="center">
  <sub>⭐ Star this repo if you found it useful!</sub>
</div>
