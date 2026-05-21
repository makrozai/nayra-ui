# @makrozai/nayra-ui

[![Build Status](https://github.com/makrozai/nayra-ui/actions/workflows/publish-package.yml/badge.svg)](https://github.com/makrozai/nayra-ui/actions/workflows/publish-package.yml)
[![Storybook](https://github.com/makrozai/nayra-ui/actions/workflows/deploy-storybook.yml/badge.svg)](https://makrozai.github.io/nayra-ui/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Nayra UI** es una librería de componentes para **React 19**, construida con TypeScript estricto, Atomic Design y accesibilidad de primer nivel.

---

## ✨ Características

- ⚛️ **React 19** — Componentes funcionales modernos con hooks
- 🎨 **Design Tokens** — Variables CSS nativas para temas personalizables
- ♿ **Accesibilidad** — WAI-ARIA, roles semánticos y navegación por teclado
- 🧩 **Atomic Design** — Organización en átomos, moléculas y organismos
- 🏗️ **BEM + ITCSS** — Nomenclatura y arquitectura CSS escalable
- 🔧 **Prefijo configurable** — Prefijo de componentes (`Na` por defecto) configurable via `nayra.config.json`
- 📦 **Tree-shakeable** — ESM + CJS con declaraciones de tipos incluidas
- 📖 **Storybook** — Documentación interactiva y testing visual

---

## 📦 Instalación

### 1. Configurar el registry de GitHub Packages

Crea un archivo `.npmrc` en la raíz de tu proyecto consumidor:

```
@makrozai:registry=https://npm.pkg.github.com
```

### 2. Autenticación

```bash
npm login --scope=@makrozai --registry=https://npm.pkg.github.com
```

### 3. Instalar

```bash
# pnpm (recomendado)
pnpm add @makrozai/nayra-ui

# npm
npm install @makrozai/nayra-ui

# yarn
yarn add @makrozai/nayra-ui
```

---

## 🚀 Uso rápido

```tsx
import { NaIcon } from '@makrozai/nayra-ui';
import '@makrozai/nayra-ui/style.css';

function App() {
  return <NaIcon icon="fas fa-home" size={24} title="Home" />;
}
```

### Personalizar el prefijo CSS

Envuelve tu aplicación con `ConfigProvider` para cambiar el prefijo de clases CSS:

```tsx
import { ConfigProvider, NaIcon } from '@makrozai/nayra-ui';

function App() {
  return (
    <ConfigProvider prefixCls="my-app">
      <NaIcon icon="fas fa-home" size={24} title="Home" />
      {/* Genera: class="my-app-icon fas fa-home" */}
    </ConfigProvider>
  );
}
```

---

## 🛠️ Desarrollo local

### Requisitos previos

| Herramienta | Versión |
|-------------|---------|
| Node.js     | ≥26 (ver `.nvmrc`) |
| pnpm        | ≥9      |

### Setup

```bash
# Clonar el repositorio
git clone https://github.com/makrozai/nayra-ui.git
cd nayra-ui

# Instalar dependencias
pnpm install

# Iniciar Storybook
pnpm storybook
```

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo Vite |
| `pnpm build` | Build completo de la librería (type-check + bundle + .d.ts) |
| `pnpm prebuild` | Genera exports dinámicos y barrel files |
| `pnpm storybook` | Inicia Storybook en `localhost:6006` |
| `pnpm build-storybook` | Compila Storybook estático |
| `pnpm test` | Tests unitarios con Vitest |
| `pnpm test:e2e` | Tests E2E con Storybook + Playwright |
| `pnpm test:all` | Ejecuta todos los tests |
| `pnpm lint` | Linting con ESLint |

---

## 📐 Arquitectura

Consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para una guía completa de la arquitectura del proyecto, incluyendo estructura de carpetas, patrones de diseño y convenciones.

## 🤝 Contribución

Consulta [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) para la guía de contribución con Git Flow, convención de commits y proceso de PR.

## 📝 Changelog

Consulta [CHANGELOG.md](CHANGELOG.md) para el historial de cambios.

---

## 📖 Documentación interactiva

La documentación completa de componentes está disponible en el Storybook desplegado:

🔗 **[https://makrozai.github.io/nayra-ui/](https://makrozai.github.io/nayra-ui/)**

---

## 📄 Licencia

[MIT](LICENSE) © makrozai
