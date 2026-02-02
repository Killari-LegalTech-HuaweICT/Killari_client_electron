# Killari: Cliente de Escritorio (Electron)

![Banner del Equipo Killari](https://i.imgur.com/uG9V8jP.png)
_Proyecto participante en la **Huawei ICT Competition 2025—2026 Innovation Competition**._

**Killari: Plataforma de IA para la Aceleración de la Justicia.**

> *"Del Perú para el mundo..."*

---

## 📜 Índice

- [Killari: Cliente de Escritorio (Electron)](#killari-cliente-de-escritorio-electron)
  - [📜 Índice](#-índice)
  - [El Desafío](#el-desafío)
  - [Nuestra Solución: Killari](#nuestra-solución-killari)
  - [💻 Acerca de este Repositorio](#-acerca-de-este-repositorio)
  - [✨ Características Principales](#-características-principales)
  - [🏗️ Arquitectura General](#️-arquitectura-general)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
    - [Cliente (Este Repositorio)](#cliente-este-repositorio)
    - [Plataforma Central (Backend \& IA)](#plataforma-central-backend--ia)
  - [🚀 Cómo Empezar](#-cómo-empezar)
    - [Prerrequisitos](#prerrequisitos)
    - [Instalación](#instalación)
    - [Persistencia local: `electron-store` vs SQLite](#persistencia-local-electron-store-vs-sqlite)
    - [Docker Compose y scripts de desarrollo](#docker-compose-y-scripts-de-desarrollo)
  - [👥 El Equipo](#-el-equipo)
  - [📄 Licencia](#-licencia)

---

## El Desafío

El sistema de justicia en Perú enfrenta una crisis estructural, con una sobrecarga procesal que en 2023 superó los **3.2 millones de casos**. Esta congestión sistémica genera lentitud, reduce la capacidad institucional y erosiona la confianza pública. Factores como la falta de interoperabilidad y la limitada accesibilidad a la información agravan la percepción de ineficiencia.

## Nuestra Solución: Killari

**Killari** nace como una respuesta directa a este desafío. Es una plataforma de **LegalTech** que utiliza la inteligencia artificial de Huawei para transformar la investigación criminal. No buscamos reemplazar el juicio humano, sino potenciarlo, actuando como un **asistente cognitivo** para todos los persecutores del delito, desde la Policía Nacional hasta los fiscales que dirigen la investigación.

El valor de Killari es triple:
1.  **Velocidad:** Reduce drásticamente los tiempos de análisis de documentos.
2.  **Precisión:** Estandariza la recolección de datos y usa IA para detectar conexiones que el ojo humano, fatigado por la sobrecarga, podría pasar por alto.
3.  **Eficiencia Estratégica:** Automatiza tareas repetitivas, liberando a los profesionales para que se concentren en la toma de decisiones, la estrategia y la argumentación.

## 💻 Acerca de este Repositorio

Este repositorio contiene el código fuente para el **cliente de escritorio de Killari**, desarrollado con **Electron** y **TypeScript**.

Nuestra arquitectura técnica se basa en desacoplar la interfaz de usuario del procesamiento computacional intensivo de la IA. Esto nos permite ofrecer una experiencia de usuario fluida y consistente en un cliente de escritorio ligero, mientras que toda la carga de trabajo de análisis de documentos se ejecuta en la infraestructura optimizada para IA de **Huawei Cloud**.

## ✨ Características Principales

- **Interfaz Limpia y Reactiva:** Una experiencia de usuario moderna construida para la eficiencia.
- **Carga Segura de Expedientes:** Permite a los usuarios (fiscales, policías) subir documentos de casos de forma segura.
- **Visualización de Análisis:** Muestra de forma clara e intuitiva los resultados procesados por la IA en el backend (entidades, inconsistencias, patrones).
- **Interacción con Recomendaciones:** Presenta las rutas investigativas y diligencias sugeridas por el motor de IA.
- **Generación de Documentos:** Permite visualizar y exportar los borradores de documentos procesales generados automáticamente.

## 🏗️ Arquitectura General

El sistema funciona bajo un modelo cliente-servidor nativo en la nube:

`[Cliente Electron (Este Repo)] <--> [API Gateway Segura] <--> [Backend en Huawei Cloud (IA, Bases de Datos, Lógica)]`

- **Cliente (Frontend):** La aplicación de escritorio que estás viendo. Responsable de la interacción con el usuario.
- **Backend (Huawei Cloud):** Orquesta los microservicios, modelos de IA (MindSpore, ModelArts) y bases de datos (Document DB, Graph Engine) para realizar el análisis forense de los documentos.

## 🛠️ Tecnologías Utilizadas

### Cliente (Este Repositorio)
- **Framework:** [Electron](https://www.electronjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **UI (Sugerido):** [React](https://reactjs.org/) o [Vue.js](https://vuejs.org/)
- **Estilos:** CSS / SASS

### Plataforma Central (Backend & IA)
- **Cloud:** Huawei Cloud
- **IA & Machine Learning:** MindSpore, CANN, Huawei ModelArts
- **Contenedores:** Cloud Container Engine (CCE)
- **Bases de Datos:** Document DB (DDS), Graph Engine Service (GES), Relational DB (RDS)
- **Almacenamiento:** Object Storage Service (OBS)

## 🚀 Cómo Empezar

Sigue estos pasos para configurar el entorno de desarrollo local y ejecutar el cliente de Killari.

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- [Git](https://git-scm.com/)

### Instalación
1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Killari-LegalTech-HuaweICT/Killari_client_electron.git
    cd Killari_client_electron
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta la aplicación en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación de Electron con hot-reloading para un desarrollo ágil.

4.  **Compila la aplicación para producción:**
    ```bash
    npm run build
    ```
    Esto generará los ejecutables para las diferentes plataformas (Windows, macOS, Linux) en la carpeta `dist`.

### Persistencia local: `electron-store` vs SQLite

Para datos de configuración local (preferencias, token de sesión, flags simples) recomendamos usar `electron-store` (almacenamiento clave-valor en JSON). Es sencillo, seguro y no requiere esquema.

Usa SQLite solo si necesitas capacidades avanzadas de manejo de datos offline (consultas SQL complejas, transacciones, grandes volúmenes). En la mayoría de los casos, y especialmente si tu backend centralizado es la fuente de la verdad, `electron-store` es suficiente.

### Docker Compose y scripts de desarrollo

Se incluye un `docker-compose.yml` para ejecutar el backend (API) y las bases de datos recomendadas (Postgres, MongoDB, Neo4j). También se añadieron scripts útiles en `package.json` para facilitar el flujo de desarrollo:

- `npm run backend:up` — Levanta los servicios del backend en segundo plano (docker-compose up -d).
- `npm run backend:down` — Detiene y elimina los contenedores (docker-compose down).
- `npm run backend:logs` — Muestra logs en vivo de los servicios del backend.
- `npm run client:dev` — Inicia sólo el cliente de Electron en modo desarrollo.
- `npm run dev` — Inicia simultáneamente el backend y el cliente (usa `concurrently`).

Antes de usar `npm run dev` instala las dependencias y `concurrently`:

```bash
npm install
npm install --save-dev concurrently
```

Si al ejecutar `npm run dev` ves el error:

```
"concurrently" no se reconoce como un comando interno o externo
```

Prueba lo siguiente:

- Asegúrate de haber ejecutado `npm install` en la raíz del proyecto.
- Instala `concurrently` localmente si no lo has hecho: `npm install --save-dev concurrently`.
- Cierra y vuelve a abrir la terminal en Windows para que se refresque el PATH de npm.
- Alternativamente, puedes ejecutar el comando usando `npx` sin instalar la dependencia globalmente:

```bash
npx concurrently --kill-others "npm run backend:up" "npm run client:dev"
```

El script `dev` del proyecto ya usa `npx` para evitar este problema en la mayoría de entornos.

Si vas a usar Docker por primera vez, asegúrate de tener `docker` y `docker-compose` instalados. Copia `.env.example` a `.env` y ajusta las contraseñas antes de levantar los servicios.


## 👥 El Equipo

- **Cristofer Ezequiel Anglas Torpoco:** Capitán del Equipo (Ing. Eléctrica y Electrónica)
- **Katherine Nikole Callo Quispe:** Miembro del Equipo (Derecho)
- **Nick Vilcapoma Chamorro:** Miembro del Equipo (Ing. Sistemas)

## 📄 Licencia

Este proyecto está bajo la Licencia [**MIT**](https://choosealicense.com/licenses/mit/). Consulta el archivo `LICENSE` para más detalles.

---
