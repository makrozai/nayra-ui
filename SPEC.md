# Nayra UI — Especificación del Proyecto

> **Propósito de este documento:** guía completa y autosuficiente para que cualquier IA (o desarrollador) inicialice desde cero el proyecto `@makrozai/nayra-ui`. Incluye las preguntas que la IA debe hacer antes de generar cualquier archivo, el stack completo con versiones exactas, arquitectura, design tokens, lineamientos de diseño, reglas de trabajo Git y configuración de CI/CD.

---

## 1. Preguntas iniciales obligatorias

Antes de generar cualquier archivo, la IA debe confirmar o solicitar las siguientes variables. Los valores por defecto están marcados con `★`.

| # | Pregunta | Valor por defecto ★ |
|---|---|---|
| Q1 | ¿Nombre del paquete npm? | `@makrozai/nayra-ui` ★ |
| Q2 | ¿Scope del registry? | `@makrozai` ★ |
| Q3 | ¿Registry de publicación? | GitHub Packages (`https://npm.pkg.github.com`) ★ |
| Q4 | ¿Nombre del repositorio en GitHub? | `nayra-ui` ★ |
| Q5 | ¿Owner / organización de GitHub? | `makrozai` ★ |
| Q6 | ¿Prefijo de componentes globales? | `Na` (ej. `NaButton`, `NaIcon`) ★ |
| Q7 | ¿Versión mínima de Node.js? | `>=26` ★ |
| Q8 | ¿Rama de producción? | `master` ★ |
| Q9 | ¿Rama de integración? | `develop` ★ |
| Q10 | ¿Licencia? | `MIT` ★ |
| Q11 | ¿Puerto de desarrollo de Storybook? | `6006` ★ |
| Q12 | ¿URL de deploy (GitHub Pages)? | `https://makrozai.github.io/nayra-ui/` ★ |
| Q13 | ¿Sub-ruta de GitHub Pages? | `/nayra-ui/` ★ |
| Q14 | ¿Versión inicial del paquete? | `0.1.0` ★ |

---

## 2. Descripción del proyecto

**Nayra UI** es una librería de componentes para **React 19** construida sobre los siguientes pilares:

- **Clean Architecture**: cada componente es una unidad aislada con su propio contrato de tipos, estilos y tests.
- **Atomic Design**: los componentes se clasifican en Átomos, Moléculas y Organismos.
- **Design Tokens**: todos los valores de diseño (colores, tipografía, espaciado) se expresan como variables CSS nativas.
- **Accesibilidad primero**: WAI-ARIA, roles semánticos y teclado navegable por defecto.
- **Cero dependencias en runtime**: solo `react` y `react-dom` como peers; FontAwesome opcional vía CSS.

---

## 3. Stack tecnológico — versiones exactas

### Runtime / peers

| Paquete | Versión | Nota |
|---|---|---|
| `react` | `^19.1.0` | peer dependency |
| `react-dom` | `^19.1.0` | peer dependency |
| `node` | `>=26` | `.nvmrc` → `26` |
| `pnpm` | `>=10` | gestor de paquetes |

### Herramientas de build

| Paquete | Versión | Rol |
|---|---|---|
| `vite` | `^8.0.0` | Bundler |
| `@vitejs/plugin-react` | `^4.5.0` | Plugin React para Vite |
| `@tailwindcss/vite` | `^4.3.0` | Plugin Tailwind para Vite |
| `tailwindcss` | `^4.3.0` | CSS utility-first |
| `typescript` | `^6.0.0` | Tipado estático |
| `vite-svg-loader` | `^5.1.0` | Importar SVGs como componentes |

### Storybook

| Paquete | Versión | Rol |
|---|---|---|
| `storybook` | `^10.4.0` | Core |
| `@storybook/react-vite` | `^10.4.0` | Framework React + Vite |
| `@storybook/addon-docs` | `^10.4.0` | Documentación automática |
| `@storybook/test-runner` | `^0.24.0` | Tests E2E sobre stories |
| `eslint-plugin-storybook` | `^10.4.0` | Reglas ESLint para stories |

### Testing

| Paquete | Versión | Rol |
|---|---|---|
| `vitest` | `^4.1.0` | Runner de tests unitarios |
| `@vitest/coverage-v8` | `^4.1.0` | Cobertura de código |
| `@testing-library/react` | `^16.3.0` | Utilidades de test para React |
| `@testing-library/user-event` | `^14.6.0` | Simulación de interacciones |
| `@testing-library/jest-dom` | `^6.6.0` | Matchers de DOM |
| `happy-dom` | `^20.9.0` | Entorno DOM para Vitest |
| `@playwright/test` | `^1.60.0` | Tests E2E |

### Linting / calidad

| Paquete | Versión | Rol |
|---|---|---|
| `eslint` | `^10.4.0` | Linter |
| `@typescript-eslint/parser` | `^8.0.0` | Parser TS para ESLint |
| `@typescript-eslint/eslint-plugin` | `^8.0.0` | Reglas TS |
| `eslint-plugin-react` | `^7.37.0` | Reglas React |
| `eslint-plugin-react-hooks` | `^5.1.0` | Reglas de hooks |
| `eslint-plugin-jsx-a11y` | `^6.10.0` | Reglas de accesibilidad |

### Tipos

| Paquete | Versión | Rol |
|---|---|---|
| `@types/react` | `^19.1.0` | Tipos para React |
| `@types/react-dom` | `^19.1.0` | Tipos para ReactDOM |
| `@types/node` | `^26.0.0` | Tipos para Node.js |

### Opcionales (iconos)

| Paquete | Versión | Rol |
|---|---|---|
| `@fortawesome/fontawesome-free` | `^7.2.0` | Iconos FontAwesome vía CSS |

---

## 4. Arquitectura

### 4.1 Estructura de carpetas

```
nayra-ui/
├── .github/
│   └── workflows/
│       ├── deploy.yml                  # Build + deploy Storybook + publish npm
│       ├── pr-develop-validation.yml   # Lint + tests + E2E en PR a develop
│       └── auto-pr.yml                 # PR semántico develop → master (manual)
├── .storybook/
│   ├── main.ts                         # Config de Storybook (stories, addons, framework)
│   └── preview.tsx                     # Setup global (ThemeProvider, CSS)
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── main.css                # Entry point de Tailwind + design tokens
│   │       └── themes/
│   │           ├── light.css           # Variables CSS tema claro
│   │           └── dark.css            # Variables CSS tema oscuro
│   ├── components/
│   │   └── [ComponentName]/
│   │       ├── [ComponentName].tsx     # Componente React
│   │       ├── [ComponentName].css     # Estilos específicos (scoped via BEM)
│   │       ├── types.ts                # Props e interfaces
│   │       ├── [ComponentName].stories.tsx  # Stories de Storybook
│   │       └── __tests__/
│   │           └── [ComponentName].spec.tsx
│   ├── hooks/
│   │   └── useNayraTheme.ts            # Hook para gestión del tema activo
│   ├── tokens/
│   │   ├── colors.ts                   # Tokens de color exportados como constantes TS
│   │   ├── typography.ts               # Tokens de tipografía
│   │   └── spacing.ts                  # Tokens de espaciado
│   ├── config.ts                       # Configuración global (prefix, versión)
│   └── index.ts                        # Entry point público de la librería
├── e2e/                                # Tests Playwright contra Storybook
├── dist/                               # Output del build (gitignored)
├── storybook-static/                   # Build de Storybook (gitignored)
├── .nvmrc                              # "26"
├── .npmrc                              # Registry de GitHub Packages
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.mjs
├── pnpm-workspace.yaml
└── README.md
```

### 4.2 Patrón de componente

Cada componente sigue esta estructura estricta:

**`Button.tsx`**
```tsx
import type { NaButtonProps } from './types'
import './Button.css'

export function NaButton({ variant = 'primary', size = 'md', children, ...props }: NaButtonProps) {
  return (
    <button
      className={`c-button c-button--${variant} c-button--${size}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

**`types.ts`**
```ts
export interface NaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
```

**`Button.css`** (BEM + variables CSS)
```css
.c-button {
  display: inline-flex;
  align-items: center;
  border-radius: var(--na-radius-md);
  font-family: var(--na-font-sans);
  cursor: pointer;
  transition: all 150ms ease;
}
.c-button--primary {
  background-color: var(--na-color-primary-500);
  color: var(--na-color-neutral-0);
}
```

### 4.3 Entry point (`src/index.ts`)

Todos los exports públicos con prefijo `Na`:

```ts
// Componentes
export { NaButton } from './components/Button/Button'
export type { NaButtonProps } from './components/Button/types'

// Hooks
export { useNayraTheme } from './hooks/useNayraTheme'

// Tokens
export * from './tokens/colors'
export * from './tokens/typography'
export * from './tokens/spacing'

// Config
export { nayraConfig } from './config'
```

### 4.4 Convención de naming

| Elemento | Patrón | Ejemplo |
|---|---|---|
| Archivo de componente | `PascalCase.tsx` | `Button.tsx` |
| Export del componente | `Na` + PascalCase | `NaButton` |
| Props interface | `Na` + PascalCase + `Props` | `NaButtonProps` |
| Emits / Callbacks | `on` + PascalCase | `onCountChange` |
| Hook | `use` + PascalCase | `useNayraTheme` |
| CSS clase raíz | `c-` + kebab-case | `c-button` |
| CSS modificador | `c-[bloque]--[modificador]` | `c-button--primary` |
| CSS variable token | `--na-` + categoría + nombre | `--na-color-primary-500` |
| Story | `[Átomo\|Molécula\|Organismo]/[Nombre]` | `atoms-button--default` |

---

## 5. Design Tokens

### 5.1 Colores

Variables CSS en `src/assets/css/themes/light.css` y `dark.css`:

```css
/* light.css */
:root[data-nayra-theme="light"],
:root:not([data-nayra-theme]) {
  /* Primary — Indigo */
  --na-color-primary-50:  #EEF2FF;
  --na-color-primary-100: #E0E7FF;
  --na-color-primary-200: #C7D2FE;
  --na-color-primary-300: #A5B4FC;
  --na-color-primary-400: #818CF8;
  --na-color-primary-500: #6366F1;  /* base */
  --na-color-primary-600: #4F46E5;
  --na-color-primary-700: #4338CA;
  --na-color-primary-800: #3730A3;
  --na-color-primary-900: #312E81;

  /* Secondary — Violet */
  --na-color-secondary-500: #8B5CF6;
  --na-color-secondary-600: #7C3AED;

  /* Semantic */
  --na-color-success:  #22C55E;
  --na-color-warning:  #F59E0B;
  --na-color-error:    #EF4444;
  --na-color-info:     #3B82F6;

  /* Neutral */
  --na-color-neutral-0:   #FFFFFF;
  --na-color-neutral-50:  #F9FAFB;
  --na-color-neutral-100: #F3F4F6;
  --na-color-neutral-200: #E5E7EB;
  --na-color-neutral-300: #D1D5DB;
  --na-color-neutral-400: #9CA3AF;
  --na-color-neutral-500: #6B7280;
  --na-color-neutral-600: #4B5563;
  --na-color-neutral-700: #374151;
  --na-color-neutral-800: #1F2937;
  --na-color-neutral-900: #111827;
  --na-color-neutral-950: #030712;

  /* Surface */
  --na-surface-bg:       var(--na-color-neutral-0);
  --na-surface-elevated: var(--na-color-neutral-50);
  --na-surface-border:   var(--na-color-neutral-200);

  /* Text */
  --na-text-primary:   var(--na-color-neutral-900);
  --na-text-secondary: var(--na-color-neutral-600);
  --na-text-disabled:  var(--na-color-neutral-400);
  --na-text-inverse:   var(--na-color-neutral-0);
}
```

```css
/* dark.css */
:root[data-nayra-theme="dark"] {
  --na-color-primary-500: #818CF8;  /* más claro en dark para contraste */

  --na-surface-bg:       #0F1117;
  --na-surface-elevated: #1A1D27;
  --na-surface-border:   var(--na-color-neutral-700);

  --na-text-primary:   var(--na-color-neutral-50);
  --na-text-secondary: var(--na-color-neutral-400);
  --na-text-disabled:  var(--na-color-neutral-600);
  --na-text-inverse:   var(--na-color-neutral-900);
}
```

### 5.2 Tipografía

```css
:root {
  --na-font-sans:  'Inter', system-ui, -apple-system, sans-serif;
  --na-font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  --na-text-xs:   0.75rem;   /* 12px */
  --na-text-sm:   0.875rem;  /* 14px */
  --na-text-base: 1rem;      /* 16px */
  --na-text-lg:   1.125rem;  /* 18px */
  --na-text-xl:   1.25rem;   /* 20px */
  --na-text-2xl:  1.5rem;    /* 24px */
  --na-text-3xl:  1.875rem;  /* 30px */
  --na-text-4xl:  2.25rem;   /* 36px */

  --na-font-normal:   400;
  --na-font-medium:   500;
  --na-font-semibold: 600;
  --na-font-bold:     700;

  --na-leading-tight:  1.25;
  --na-leading-normal: 1.5;
  --na-leading-loose:  1.75;
}
```

### 5.3 Espaciado y geometría

```css
:root {
  /* Espaciado — múltiplos de 4px */
  --na-space-1:  0.25rem;   /* 4px  */
  --na-space-2:  0.5rem;    /* 8px  */
  --na-space-3:  0.75rem;   /* 12px */
  --na-space-4:  1rem;      /* 16px */
  --na-space-5:  1.25rem;   /* 20px */
  --na-space-6:  1.5rem;    /* 24px */
  --na-space-8:  2rem;      /* 32px */
  --na-space-10: 2.5rem;    /* 40px */
  --na-space-12: 3rem;      /* 48px */
  --na-space-16: 4rem;      /* 64px */

  /* Bordes */
  --na-radius-sm:   0.25rem;  /* 4px  */
  --na-radius-md:   0.5rem;   /* 8px  */
  --na-radius-lg:   0.75rem;  /* 12px */
  --na-radius-xl:   1rem;     /* 16px */
  --na-radius-full: 9999px;

  /* Sombras */
  --na-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --na-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --na-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Transiciones */
  --na-transition-fast:   100ms ease;
  --na-transition-normal: 150ms ease;
  --na-transition-slow:   300ms ease;
}
```

---

## 6. Lineamientos de diseño y API de componentes

### 6.1 Reglas de accesibilidad (obligatorias)

- Todo elemento interactivo debe tener `aria-label` o texto visible.
- Usar roles semánticos (`<button>`, `<nav>`, `<main>`, etc.) antes que `role=`.
- Contraste mínimo AA: texto normal 4.5:1, texto grande 3:1.
- Soporte completo de teclado: `Tab`, `Enter`, `Space`, `Escape`, flechas.
- No usar color como único canal de información.
- Usar `aria-live` para cambios dinámicos de contenido.

### 6.2 API de componentes

```ts
// Estructura estándar de props
interface NaComponentProps {
  // 1. Variantes y estado
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean

  // 2. Contenido
  children?: React.ReactNode

  // 3. Accesibilidad
  'aria-label'?: string

  // 4. Extensibilidad — siempre al final
  className?: string
  style?: React.CSSProperties
}
```

Reglas:
- Props booleanas: usar la forma corta (`disabled` no `isDisabled`).
- Callbacks: siempre `on` + PascalCase (`onClick`, `onChange`, `onValueChange`).
- Valores por defecto declarados en la firma de la función, nunca en `defaultProps`.
- Spread de `...rest` hacia el elemento nativo raíz para máxima compatibilidad.
- No incluir lógica de negocio: los componentes son puros de presentación.

### 6.3 Nivel Atomic Design

| Nivel | Regla | Ejemplos |
|---|---|---|
| Átomo | Un solo elemento nativo o primario | Button, Icon, Input, Badge, Spinner |
| Molécula | Composición de 2-4 átomos con lógica propia | SearchField, FormGroup, Tooltip |
| Organismo | Sección completa de UI con estado | Header, DataTable, Modal, Form |

---

## 7. Configuración de archivos clave

### 7.1 `package.json`

```json
{
  "name": "@makrozai/nayra-ui",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "main": "dist/nayra-ui.js",
  "module": "dist/nayra-ui.js",
  "types": "dist/index.d.ts",
  "style": "dist/style.css",
  "engines": { "node": ">=26" },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "public"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/nayra-ui.js"
    },
    "./style.css": "./dist/style.css"
  },
  "sideEffects": ["**/*.css"],
  "files": ["dist"],
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc --emitDeclarationOnly",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:storybook": "test-storybook --url http://localhost:6006",
    "test:storybook:ci": "test-storybook --url http://localhost:6006 --ci",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.2.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.60.0",
    "@storybook/addon-docs": "^10.4.0",
    "@storybook/react-vite": "^10.4.0",
    "@storybook/test-runner": "^0.24.0",
    "@tailwindcss/vite": "^4.3.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@types/node": "^26.0.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@vitejs/plugin-react": "^4.5.0",
    "@vitest/coverage-v8": "^4.1.0",
    "eslint": "^10.4.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-storybook": "^10.4.0",
    "happy-dom": "^20.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "storybook": "^10.4.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^8.0.0",
    "vite-svg-loader": "^5.1.0",
    "vitest": "^4.1.0"
  }
}
```

### 7.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "dist",
    "rootDir": "./src",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"]
}
```

### 7.3 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgLoader()],
  resolve: {
    alias: { '~': resolve(__dirname, './src') }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NayraUI',
      fileName: () => 'nayra-ui.js',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'style.[ext]'
      }
    }
  }
})
```

### 7.4 `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [react(), svgLoader()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.spec.tsx', 'src/**/*.spec.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/index.ts', 'src/test-setup.ts']
    }
  }
})
```

### 7.5 `src/test-setup.ts`

```ts
import '@testing-library/jest-dom'
```

### 7.6 `playwright.config.ts`

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:6006' },
  webServer: {
    command: 'pnpm storybook',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
})
```

### 7.7 `.storybook/main.ts`

```ts
import type { StorybookConfig } from '@storybook/react-vite'
import type { InlineConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(tsx|ts)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: (viteConfig: InlineConfig) => {
    if (process.env.STORYBOOK_BASE_PATH) {
      viteConfig.base = process.env.STORYBOOK_BASE_PATH
    }
    return viteConfig
  }
}

export default config
```

### 7.8 `.storybook/preview.tsx`

```tsx
import type { Preview } from '@storybook/react-vite'
import '../src/assets/css/main.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
```

### 7.9 `eslint.config.mjs`

```js
import storybook from 'eslint-plugin-storybook'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.storybook/**', '*.config.*',
              'src/**/__tests__/**', 'src/**/*.stories.tsx', 'e2e/**']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    settings: { react: { version: 'detect' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/interactive-supports-focus': 'warn'
    }
  },
  ...storybook.configs['flat/recommended']
]
```

### 7.10 `pnpm-workspace.yaml`

```yaml
allowBuilds:
  '@swc/core': true
  esbuild: true
  unrs-resolver: true
```

### 7.11 `.npmrc`

```
@makrozai:registry=https://npm.pkg.github.com
```

### 7.12 `.nvmrc`

```
26
```

---

## 8. Reglas Git y Gitflow

### 8.1 Ramas

| Rama | Propósito | Reglas |
|---|---|---|
| `master` | Producción | Protegida. Solo merge desde `develop` vía workflow manual |
| `develop` | Integración | Protegida. Destino de todos los PRs de trabajo |
| `feat/*` | Nueva funcionalidad | Parte de `develop`, PR a `develop` |
| `fix/*` | Corrección de bug | Parte de `develop`, PR a `develop` |
| `refactor/*` | Refactorización | Parte de `develop`, PR a `develop` |
| `docs/*` | Solo documentación | Parte de `develop`, PR a `develop` |
| `chore/*` | Mantenimiento, deps | Parte de `develop`, PR a `develop` |
| `ci/*` | CI/CD | Parte de `develop`, PR a `develop` |
| `test/*` | Solo tests | Parte de `develop`, PR a `develop` |
| `build/*` | Sistema de build | Parte de `develop`, PR a `develop` |

**Nomenclatura:** `tipo/descripcion-corta-en-kebab-case`

Ejemplos válidos: `feat/na-button`, `fix/icon-gallery-filter`, `docs/tokens-api`

### 8.2 Commits — Conventional Commits

Formato: `<tipo>[scope opcional]: <descripción imperativa en minúscula>`

```
feat(button): add ghost variant
fix(icon): correct aria-label for SVG icons
refactor!: remove deprecated NaHeader export
docs(readme): update installation instructions
chore(deps): upgrade storybook to 10.5.0
ci: add node 26 to test matrix
test(button): cover disabled state interactions
build: configure rollup to externalize react-dom
```

Reglas:
- Descripción en inglés, presente imperativo, sin punto final.
- Scope entre paréntesis cuando el cambio es específico de un componente o área.
- `!` después del tipo para breaking changes.
- Footer `BREAKING CHANGE: <descripción>` para cambios que rompen la API pública.
- **Nunca** incluir `Co-Authored-By` ni atribuciones a IA en commits ni PRs.
- **Nunca** hacer `git add .` — siempre stagear archivos específicos.

### 8.3 Pull Requests

- El título del PR es igual al mensaje del commit principal (Conventional Commits).
- El PR siempre va a `develop`, nunca directamente a `master`.
- El PR de `develop` → `master` se genera exclusivamente desde GitHub Actions → "Auto PR to master" → Run workflow.
- El PR debe incluir un checklist de verificación.
- No fusionar con checks fallidos.

### 8.4 Inicio de cada tarea

```bash
git checkout master && git pull origin master
git checkout develop && git pull origin develop
git checkout -b feat/nombre-de-la-tarea
```

### 8.5 Cierre de tarea (antes de push)

```bash
git fetch origin
git merge origin/develop   # resolver conflictos si los hay
git push origin feat/nombre-de-la-tarea
# Crear PR en GitHub hacia develop
```

---

## 9. CI/CD — GitHub Actions

### 9.1 `pr-develop-validation.yml`

Disparo: `pull_request` hacia `develop`

Pasos en orden:
1. Checkout (`fetch-depth: 0`)
2. Setup pnpm v10
3. Setup Node.js v26
4. `pnpm install --frozen-lockfile`
5. `pnpm lint`
6. `pnpm test`
7. `pnpm build`
8. `pnpm storybook:build`
9. Install Playwright Chromium: `pnpm playwright install chromium --with-deps`
10. `pnpm test:e2e`
11. `npx http-server storybook-static -p 6006 -s &` + `npx wait-on http://localhost:6006 -t 30000` + `pnpm test:storybook:ci`
12. Upload artifacts en fallo: Playwright report, `dist/`, `storybook-static/`

### 9.2 `deploy.yml`

Disparo: `push` a `master`

Pasos:
1. Checkout
2. Setup pnpm + Node.js v26
3. `pnpm install --frozen-lockfile`
4. `pnpm lint`
5. `pnpm test`
6. `pnpm build`
7. `pnpm storybook:build` con `STORYBOOK_BASE_PATH: /nayra-ui/`
8. Deploy a GitHub Pages (`gh-pages` branch)
9. Verificar si la versión ya existe en GitHub Packages
10. Si no existe: `pnpm publish` con `NODE_AUTH_TOKEN`

### 9.3 `auto-pr.yml`

Disparo: `workflow_dispatch` con input opcional `version_override`

Funcionalidad:
- Calcula la próxima versión semántica desde los commits (BREAKING → MAJOR, `feat` → MINOR, `fix` → PATCH)
- Genera changelog agrupado por tipo
- Crea o actualiza PR de `develop` → `master`
- Incluye checklist de aprobación

---

## 10. Instrucciones de inicialización paso a paso

La IA debe seguir estos pasos **en orden exacto** tras resolver todas las preguntas de la Sección 1:

```bash
# 1. Crear repositorio en GitHub (privado o público según Q-PR)
gh repo create makrozai/nayra-ui --public --clone

# 2. Configurar ramas protegidas
gh api repos/makrozai/nayra-ui/branches/main/protection --method PUT \
  --field required_pull_request_reviews[required_approving_review_count]=1

# 3. Crear estructura base
cd nayra-ui
mkdir -p .github/workflows .storybook src/{assets/css/themes,components,hooks,tokens} e2e

# 4. Crear archivos de configuración
# (package.json, tsconfig.json, vite.config.ts, vitest.config.ts,
#  playwright.config.ts, eslint.config.mjs, pnpm-workspace.yaml,
#  .npmrc, .nvmrc, .gitignore)

# 5. Inicializar git y ramas
git init
git checkout -b develop
git add .
git commit -m "chore: initial project setup"
git remote add origin https://github.com/makrozai/nayra-ui.git
git push -u origin develop
git checkout -b master
git push -u origin master

# 6. Instalar dependencias
pnpm install

# 7. Inicializar Storybook (NO usar storybook init — genera archivos innecesarios)
# Crear manualmente .storybook/main.ts y .storybook/preview.tsx

# 8. Crear design tokens (main.css, themes/light.css, themes/dark.css)

# 9. Crear primer componente (Icon recomendado como smoke test)

# 10. Verificar stack completo
pnpm lint          # debe pasar sin errores
pnpm test          # debe pasar
pnpm build         # debe generar dist/
pnpm storybook:build  # debe generar storybook-static/
```

---

## 11. Checklist de verificación final

Antes de dar el proyecto como inicializado, verificar cada punto:

- [ ] `pnpm lint` sin errores ni warnings
- [ ] `pnpm test` — todos los tests en verde
- [ ] `pnpm build` — genera `dist/nayra-ui.js` y `dist/style.css`
- [ ] `tsc --noEmit` sin errores de tipos
- [ ] `pnpm storybook:build` exitoso
- [ ] `pnpm test:e2e` — todos los tests Playwright en verde
- [ ] `dist/index.d.ts` generado con tipos correctos
- [ ] `.storybook/` contiene solo `main.ts` y `preview.tsx`
- [ ] Variables CSS `--na-*` accesibles en el iframe de Storybook
- [ ] `react` y `react-dom` están en `peerDependencies`, no en `dependencies`
- [ ] `.npmrc` apunta a GitHub Packages para `@makrozai`
- [ ] Ramas `master` y `develop` en el remoto
- [ ] Los 3 workflows de GitHub Actions presentes en `.github/workflows/`
- [ ] `README.md` con instrucciones de instalación, badges y tabla de componentes

---

## 12. Patrón de story (referencia)

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NaButton } from './Button'

const meta: Meta<typeof NaButton> = {
  title: 'Atoms/Button',
  component: NaButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof NaButton>

export const Default: Story = {
  args: { children: 'Button', variant: 'primary', size: 'md' }
}

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' }
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true }
}
```

---

## 13. Patrón de test unitario (referencia)

```tsx
// src/components/Button/__tests__/Button.spec.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NaButton } from '../Button'

describe('NaButton', () => {
  it('renders children', () => {
    render(<NaButton>Click me</NaButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<NaButton onClick={handleClick}>Click</NaButton>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<NaButton onClick={handleClick} disabled>Click</NaButton>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies variant class', () => {
    render(<NaButton variant="ghost">Ghost</NaButton>)
    expect(screen.getByRole('button')).toHaveClass('c-button--ghost')
  })
})
```

---

## 14. README mínimo esperado

```md
# Nayra UI

Librería de componentes React 19, TypeScript estricto, Tailwind CSS v4 y Storybook 10.

![Version](https://img.shields.io/badge/version-0.1.0-6366f1?style=flat-square)
![React](https://img.shields.io/badge/React-19%2B-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0%2B-3178c6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**Storybook:** https://makrozai.github.io/nayra-ui/

## Instalación

\`\`\`bash
echo "@makrozai:registry=https://npm.pkg.github.com" >> .npmrc
npm install @makrozai/nayra-ui
\`\`\`

\`\`\`tsx
import { NaButton } from '@makrozai/nayra-ui'
import '@makrozai/nayra-ui/style.css'
\`\`\`

## Componentes

| Componente | Nivel | Descripción |
|---|---|---|
| `NaIcon` | Átomo | Iconos FontAwesome + SVGs locales |
```

---

*Spec generado para Nayra UI — React 19 + Storybook 10 + Vite 8 + TypeScript 6*
*Versión del spec: 1.0.0 — Mayo 2026*
