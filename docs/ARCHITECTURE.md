# Arquitectura de Nayra UI

Este documento describe la arquitectura, patrones de diseño y convenciones utilizadas en el proyecto `@makrozai/nayra-ui`.

---

## Visión general

```
nayra-ui/
├── .github/workflows/          # CI/CD (GitHub Actions)
│   ├── deploy-storybook.yml    # Deploy Storybook → GitHub Pages
│   ├── publish-package.yml     # Publicar librería → GitHub Packages
│   ├── pr-develop-validation.yml  # Validación de PRs
│   └── auto-pr.yml             # PR automático develop → master
├── .storybook/                 # Configuración de Storybook
│   ├── main.ts                 # Framework, addons, stories glob
│   ├── preview.tsx             # Decorators globales, parámetros
│   ├── vitest.config.ts        # Config de tests E2E de Storybook
│   └── vitest.setup.ts         # Setup de tests E2E
├── docs/                       # Documentación modularizada
│   ├── ARCHITECTURE.md         # (este archivo)
│   └── CONTRIBUTING.md         # Guía de contribución
├── scripts/
│   └── generate-exports.ts     # Generación dinámica de barrel files
├── src/
│   ├── assets/css/             # Estilos globales (ITCSS)
│   ├── components/             # Componentes (Atomic Design)
│   │   ├── atoms/              # Componentes base
│   │   ├── molecules/          # Composiciones simples
│   │   └── organisms/          # Composiciones complejas
│   ├── config/                 # ConfigProvider y utilidades
│   └── index.ts                # Entry point (AUTO-GENERADO)
├── nayra.config.json           # Configuración global (prefijo)
├── tsconfig.json               # TypeScript (desarrollo)
├── tsconfig.build.json         # TypeScript (emisión de .d.ts)
├── vite.config.ts              # Vite (build de librería)
└── vitest.config.ts            # Vitest (tests unitarios)
```

---

## Atomic Design

Los componentes se organizan siguiendo la metodología [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/):

| Nivel | Directorio | Descripción | Ejemplo |
|-------|-----------|-------------|---------|
| **Átomos** | `src/components/atoms/` | Elementos UI indivisibles | `Icon`, `Button` |
| **Moléculas** | `src/components/molecules/` | Combinaciones de átomos | `InputGroup`, `SearchBar` |
| **Organismos** | `src/components/organisms/` | Secciones complejas | `Navbar`, `Sidebar` |

### Estructura de un componente

Cada componente sigue esta estructura estándar:

```
src/components/atoms/Icon/
├── Icon.tsx              # Implementación del componente
├── Icon.stories.tsx      # Historias de Storybook
├── icon.css              # Estilos específicos (BEM)
├── types.ts              # Interfaces y tipos
├── index.ts              # Barrel file (re-exporta componente y tipos)
└── __tests__/
    └── Icon.spec.tsx     # Tests unitarios
```

---

## ITCSS + BEM

### ITCSS (Inverted Triangle CSS)

La arquitectura CSS sigue ITCSS para controlar la especificidad:

```
src/assets/css/
├── main.css              # Entry point que importa todas las capas
├── settings/             # Variables CSS, design tokens
├── tools/                # Mixins, funciones
├── generic/              # Reset, normalize
├── elements/             # Estilos de elementos HTML base
├── objects/              # Patrones de layout
├── components/           # (en cada componente, co-localizados)
└── utilities/            # Clases de utilidad (!important)
```

### BEM (Block Element Modifier)

Todos los componentes usan la convención BEM con prefijo configurable:

```css
/* Bloque */
.na-icon { }

/* Elemento */
.na-icon__label { }

/* Modificador */
.na-icon--large { }
```

El prefijo `na` es configurable via `ConfigProvider`:

```tsx
<ConfigProvider prefixCls="custom">
  <Icon icon="fas fa-home" />
  {/* Genera: class="custom-icon fas fa-home" */}
</ConfigProvider>
```

---

## ConfigProvider — Sistema de prefijos

El `ConfigProvider` proporciona un prefijo global para las clases CSS generadas por los componentes. Esto permite:

1. **Evitar colisiones** con otros frameworks CSS
2. **Personalización por proyecto** al consumir la librería
3. **White-labeling** para distintas marcas

### Flujo del prefijo

```
nayra.config.json (build-time)     ConfigProvider (runtime)
         │                                  │
         ▼                                  ▼
  generate-exports.ts              usePrefixCls('icon')
         │                                  │
         ▼                                  ▼
  export { Icon as NaIcon }         clase: "na-icon"
```

- **Build-time**: El script `generate-exports.ts` lee `nayra.config.json` y genera los exports con el prefijo apropiado (`NaIcon`, `NaButton`, etc.)
- **Runtime**: El hook `usePrefixCls` lee el contexto de `ConfigProvider` y genera las clases CSS BEM con el prefijo configurado.

---

## Generación automática de exports

El script `scripts/generate-exports.ts` automatiza la creación de barrel files para eliminar el mantenimiento manual:

### ¿Qué genera?

1. **`src/index.ts`** — Entry point de la librería con exports prefijados
2. **`src/components/index.ts`** — Re-exporta todos los niveles atómicos
3. **`src/components/atoms/index.ts`** — Re-exporta todos los átomos

### ¿Cuándo se ejecuta?

- Automáticamente via `pnpm prebuild` (hook de npm)
- Antes de cada `pnpm build`

### Flujo de trabajo para desarrolladores

> **No edites manualmente** los archivos `index.ts` marcados como `AUTO-GENERATED`.
> Simplemente crea tu carpeta de componente y el script se encargará del resto.

---

## Testing

### Tests unitarios (Vitest + happy-dom)

```bash
pnpm test          # Ejecutar una vez
pnpm test:watch    # Modo watch
```

- Configuración: `vitest.config.ts`
- Setup: `src/test-setup.ts`
- Convención: `__tests__/ComponentName.spec.tsx`

### Tests E2E (Storybook + Playwright)

```bash
pnpm test:e2e      # Tests de interacción en Storybook
```

- Configuración: `.storybook/vitest.config.ts`
- Se ejecutan las funciones `play` definidas en los stories

### Todos los tests

```bash
pnpm test:all      # Unit + E2E
```

---

## Build de la librería

El build se ejecuta en 3 fases:

```bash
pnpm build
# Equivale a:
# 1. tsc --noEmit           → Verificación de tipos (sin emitir)
# 2. vite build             → Bundle JS/CSS (ESM + CJS)
# 3. tsc -p tsconfig.build.json → Emitir .d.ts (declaraciones de tipos)
```

### Output (`dist/`)

| Archivo | Formato | Descripción |
|---------|---------|-------------|
| `nayra-ui.js` | ESM | Módulo ES para bundlers modernos |
| `nayra-ui.cjs` | CJS | CommonJS para compatibilidad |
| `nayra-ui.css` | CSS | Estilos compilados |
| `index.d.ts` | TypeScript | Declaraciones de tipos |
| `**/*.d.ts` | TypeScript | Tipos de cada componente |

---

## Alias de importación

El proyecto usa el alias `~` para importaciones absolutas desde `src/`:

```typescript
// ✅ Correcto — alias absoluto
import { usePrefixCls } from '~/config/ConfigProvider';

// ❌ Incorrecto — ruta relativa profunda
import { usePrefixCls } from '../../../config/ConfigProvider';
```

**Configuración:**
- `vite.config.ts` → `resolve.alias: { '~': './src' }`
- `tsconfig.json` → `paths: { "~/*": ["./src/*"] }`

> **Nota:** El `src/index.ts` (auto-generado) es la única excepción que usa rutas relativas, ya que es el entry point del build y sus `.d.ts` deben ser resolvibles por los consumidores.
