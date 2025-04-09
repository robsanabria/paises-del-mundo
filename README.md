
# 🌍 Países del Mundo

[![Deploy with Vercel](https://vercel.com/button)](https://paises-del-mundo.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![FlexSearch](https://img.shields.io/badge/FlexSearch-Indexing-orange)](https://github.com/nextapps-de/flexsearch)

> Una app fullstack para buscar información de países usando un motor de búsqueda indexado ultra-rápido.

🌐 **Demo online**: [https://paises-del-mundo.vercel.app](https://paises-del-mundo.vercel.app)

---

## ⚙️ Tecnologías Utilizadas

### 🔁 Backend (API de búsqueda)
- **Node.js** – Entorno de ejecución para JavaScript en el servidor.
- **Express.js** – Framework minimalista para construir APIs REST.
- **FlexSearch.js** – Búsqueda en memoria ultrarrápida para indexar y consultar datos.
- **csv-parser** – Carga y parseo del archivo `countries.csv`.
- **CORS** – Permite comunicación entre frontend y backend.

### 💻 Frontend (Interfaz de Usuario)
- **React.js** – Librería para construir interfaces reactivas y modulares.
- **Vite** – Herramienta de desarrollo para bundling rápido.
- **Axios** – Cliente HTTP para consumir la API desde React.
- **Tailwind CSS** – Framework CSS utility-first para estilizado moderno.

### 🚀 Despliegue y DevOps
- **Vercel** – Hosting para frontend + backend serverless.
- **vercel.json** – Define cómo construir, enrutar y desplegar ambos lados.
- **npm / Git** – Manejo de paquetes y control de versiones.

---

## 📁 Estructura del Proyecto

```
/
├── backend/
│   └── src/
│       └── server.js        # API de búsqueda
│       └── countries.csv    # Base de datos CSV
├── frontend/
│   └── src/                 # App React + Tailwind
├── vercel.json              # Configuración para despliegue
└── README.md
```

---

## 🛠️ Instalación y desarrollo local

```bash
# Clonar el repo
git clone https://github.com/robsanabria/paises-del-mundo.git
cd paises-del-mundo

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install

# Ejecutar backend (en puerto 3001)
cd ../backend
npm run dev

# Ejecutar frontend (en puerto 5173 con proxy a /api)
cd ../frontend
npm run dev
```

---

## 🔍 Funcionalidad principal

- Carga inicial de un archivo CSV de países con su información relevante.
- Creación de un índice de búsqueda con FlexSearch.
- Búsqueda en tiempo real desde el frontend.
- Visualización instantánea de resultados con UI responsiva.

---

## 📦 Despliegue en Vercel

```bash
# Instalar CLI de Vercel si no la tenés
npm i -g vercel

# Login
vercel login

# Desplegar (enlaza proyecto y sube frontend + backend)
vercel --prod
```

---

## 🧠 Conceptos aplicados

- 🧩 Componentes desacoplados frontend/backend.
- ⚡ Búsqueda indexada con rendimiento óptimo.
- 🚀 Despliegue serverless para escalar sin servidor dedicado.
- 🔁 Comunicación eficiente entre cliente y API.

---

## 📜 Licencia

MIT © [robsanabria](https://github.com/robsanabria)
