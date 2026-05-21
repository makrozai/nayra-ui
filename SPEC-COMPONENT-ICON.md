# Spec — Componente Icon

> **Versión:** 2.0.0 — Mayo 2026
> **Nivel Atomic Design:** Átomo
> **Agnóstico de tecnología:** las secciones de implementación usan pseudocódigo; la IA debe adaptarlos al framework del proyecto (React, Vue, Svelte, etc.). Las secciones §CSS, §SVGs y §Tests reflejan el comportamiento exacto validado en producción.

---

## Tabla de contenidos

1. [Propósito y alcance](#1-propósito-y-alcance)
2. [Clasificación y jerarquía](#2-clasificación-y-jerarquía)
3. [API del componente](#3-api-del-componente)
4. [Estados y variantes](#4-estados-y-variantes)
5. [Set de iconos del proyecto](#5-set-de-iconos-del-proyecto)
6. [Arquitectura de archivos](#6-arquitectura-de-archivos)
7. [Arquitectura CSS — BEM + ITCSS](#7-arquitectura-css--bem--itcss)
8. [Lógica del componente](#8-lógica-del-componente)
9. [Accesibilidad](#9-accesibilidad)
10. [Storybook — Stories requeridas](#10-storybook--stories-requeridas)
11. [Tests unitarios](#11-tests-unitarios)
12. [Tests E2E — Playwright](#12-tests-e2e--playwright)
13. [Componente IconGallery](#13-componente-icongallery)
14. [Guía de uso](#14-guía-de-uso)
15. [Checklist de implementación](#15-checklist-de-implementación)

---

## 1. Propósito y alcance

### 1.1 ¿Qué hace?

El componente `Icon` renderiza un icono de dos posibles fuentes:

- **`source='font'`** — Icono de una librería de fuentes de iconos (ej. FontAwesome). Renderiza un `<i>` con las clases CSS correspondientes.
- **`source='svg'`** — Icono SVG local resuelto dinámicamente desde `src/assets/icons/{type}/{icon}.svg`. Renderiza el SVG inline como componente.

### 1.2 ¿Qué NO hace?

- No aplica animaciones propias (spin, pulse, etc.). Si se necesita movimiento, se añade CSS externo sobre `.c-icon-wrapper`.
- No gestiona colores directamente: hereda `color` del contexto CSS (`currentColor`), excepto `type='colorful'` que preserva los colores del SVG.
- No tiene estado interno ni emite eventos.
- No es focusable por sí mismo.

### 1.3 Componentes generados por este spec

| Componente | Rol |
|---|---|
| `Icon` | Átomo principal — renderiza un icono |
| `IconGallery` | Organismo interno — explorador visual para Storybook |

---

## 2. Clasificación y jerarquía

```
Atomic Design
└── Átomo
    └── Icon
        ├── source='font'   → renderiza <i> con clases FontAwesome
        └── source='svg'    → renderiza SVG inline desde archivos locales
            ├── type='solid'    → SVG relleno, hereda currentColor
            ├── type='regular'  → SVG outline, hereda currentColor
            ├── type='brands'   → SVG de marca, hereda currentColor
            └── type='colorful' → SVG multicolor, preserva colores originales

ITCSS Layer → Component (prefijo c-)
BEM Block   → .c-icon-wrapper (contenedor externo)
BEM Block   → .c-icon         (elemento icono)
```

**Posición en ITCSS:**

| Capa ITCSS | Contenido | Prefijo |
|---|---|---|
| 1. Settings | Variables CSS (`--na-*`) | — |
| 2. Tools | Mixins/funciones (si aplica) | — |
| 3. Generic | Normalize, reset | — |
| 4. Elements | Estilos base de `<svg>`, `<i>` | — |
| 5. Objects | Patrones de layout reutilizables | `o-` |
| **6. Components** | **`.c-icon-wrapper`, `.c-icon` viven aquí** | `c-` |
| 7. Utilities | Helpers atómicos | `u-` |

---

## 3. API del componente

### 3.1 Props

| Prop | Tipo | Default | Requerida | Descripción |
|---|---|---|---|---|
| `icon` | `string` | — | ✅ | Nombre del icono. Para `source='font'`: clase FA sin prefijo (ej. `'house'`, `'heart'`, `'github'`). Para `source='svg'`: nombre exacto del archivo SVG sin extensión (ej. `'custom-star'`, `'tech-vue'`). |
| `source` | `'font' \| 'svg'` | `'font'` | ❌ | Origen del icono. `'font'` = librería de fuentes externa. `'svg'` = archivo SVG local en `src/assets/icons/`. |
| `type` | `'solid' \| 'regular' \| 'brands' \| 'colorful'` | `'solid'` | ❌ | Variante del icono. Para `source='font'`: corresponde al peso FA (`fa-solid`, `fa-regular`, `fa-brands`). Para `source='svg'`: subdirectorio dentro de `src/assets/icons/`. |
| `size` | `number \| undefined` | `undefined` | ❌ | Tamaño en píxeles. Si se omite, el icono hereda el `font-size` del elemento padre (`1em`). Se aplica como `font-size` en el contenedor para que tanto los iconos de fuente como los SVG escalen juntos. |
| `ariaLabel` | `string \| undefined` | `undefined` | ❌ | Etiqueta accesible para lectores de pantalla. Si se omite, el icono es **decorativo** (`aria-hidden="true"`). Si se provee, el elemento tiene `aria-label` y el valor. |
| `rotate` | `number \| undefined` | `undefined` | ❌ | Rotación en grados (ej. `90`, `180`, `270`). Se aplica como `transform: rotate(Ndeg)` en el contenedor. |

### 3.2 Eventos emitidos

El componente `Icon` **no emite eventos**. Es puramente de presentación.

### 3.3 Slots / Children

No tiene slots ni children. El contenido es el elemento icono generado internamente.

---

## 4. Estados y variantes

### 4.1 Variantes de tipo (`type`)

| Valor | Descripción | Fuente SVG | Comportamiento de color |
|---|---|---|---|
| `'solid'` *(default)* | Relleno | `src/assets/icons/solid/*.svg` | Hereda `currentColor` (fill) |
| `'regular'` | Outline | `src/assets/icons/regular/*.svg` | Hereda `currentColor` (fill) |
| `'brands'` | Marca / terceros | `src/assets/icons/brands/*.svg` | Hereda `currentColor` (fill) |
| `'colorful'` | Multicolor | `src/assets/icons/colorful/*.svg` | Preserva colores originales del SVG |

### 4.2 Tamaño (`size`)

| Valor | Resultado | Nota |
|---|---|---|
| `undefined` *(default)* | Hereda `font-size` del padre (`1em`) | El icono escala junto al texto |
| `number` (ej. `32`) | `font-size: 32px` en `.c-icon-wrapper` | FA y SVG escalan via `font-size` |

**Los SVGs de `solid/` y `regular/` usan `width: 1em; height: 1em`**, por lo que siempre respetan el `font-size` del contenedor.

### 4.3 Rotación (`rotate`)

Aplica `transform: rotate(Ndeg)` en `.c-icon-wrapper`. Ejemplo: `rotate=90` gira el icono 90° en sentido horario.

### 4.4 Matriz de estados de prueba

| Estado | Props recomendadas | Icono sugerido |
|---|---|---|
| Default font | `source='font' icon='house' type='solid'` | FA house solid |
| Font solid | `source='font' icon='heart' type='solid' size={48}` | FA heart solid |
| Font regular | `source='font' icon='heart' type='regular' size={48}` | FA heart regular |
| Font brands | `source='font' icon='github' type='brands' size={48}` | FA github brands |
| SVG solid | `source='svg' icon='custom-star' type='solid' size={64}` | custom-star solid |
| SVG regular | `source='svg' icon='custom-star' type='regular' size={64}` | custom-star regular |
| SVG colorful | `source='svg' icon='tech-vue' type='colorful' size={64}` | tech-vue colorful |
| Fallback automático | `source='svg' icon='custom-star' type='brands' size={48}` | resuelve en 'solid' |
| Herencia tamaño | `source='font' icon='bell'` (sin size) | Hereda 24px del padre |
| Herencia color | `source='font' icon='bell'` con padre `color: primary` | Icono en color del padre |
| Rotación | `source='font' icon='arrow-right' rotate={90} size={32}` | FA arrow rotado |
| Decorativo | sin `ariaLabel` | `aria-hidden="true"` |
| Accesible | `ariaLabel='Confirmado'` | `aria-label` presente |

---

## 5. Set de iconos del proyecto

### 5.1 Estructura de carpetas

```
src/assets/icons/
├── solid/
│   ├── arrow-path.svg     (flecha circular de recarga)
│   ├── bolt.svg           (rayo / energía)
│   ├── custom-star.svg    (estrella de 5 puntas, rellena)
│   ├── minus.svg          (línea horizontal)
│   └── plus.svg           (cruz de suma)
├── regular/
│   ├── arrow-path.svg     (versión outline más fina de arrow-path)
│   ├── bolt.svg           (versión outline de bolt)
│   ├── custom-star.svg    (estrella de 5 puntas, outline)
│   ├── minus.svg          (línea horizontal, trazo más fino)
│   └── plus.svg           (cruz de suma, trazo más fino)
└── colorful/
    └── tech-vue.svg       (logotipo de Vue.js con colores de marca)
```

### 5.2 Reglas para todos los SVGs

**SVGs de `solid/` y `regular/`:**
- Usar `fill="currentColor"` en el elemento raíz `<svg>`.
- No incluir colores hardcoded en paths ni grupos.
- Tamaño visual normalizado a `viewBox="0 0 24 24"` preferido (o el del diseño original manteniendo proporciones).
- El componente aplica `width: 1em; height: 1em` vía CSS, no directamente en el SVG.

**SVGs de `colorful/`:**
- No usar `fill="currentColor"` ni `stroke="currentColor"`.
- Los colores van directamente en los `fill` de cada `<path>`.
- El componente no inyecta ningún `color`, solo aplica `width: 1em; height: 1em`.

### 5.3 Código fuente exacto de cada icono

#### `solid/arrow-path.svg` — Flecha circular de recarga

```xml
<svg viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903H14.25a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 .75-.75V2.598a.75.75 0 0 0-1.5 0v4.956l-1.903-1.903a9 9 0 0 0-15.065 4.035.75.75 0 0 0 1.473.373ZM19.245 13.941a7.5 7.5 0 0 1-12.548 3.364L4.794 15.402H9.75a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 1.5 0v-4.956l1.903 1.903a9 9 0 0 0 15.065-4.035.75.75 0 0 0-1.473-.373Z" clip-rule="evenodd"/>
</svg>
```

#### `regular/arrow-path.svg` — Flecha circular, trazo fino

```xml
<svg viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M4.93 10.243a7.25 7.25 0 0 1 12.378-3.16L19.5 9.274H14.25a.5.5 0 0 0 0 1h6.25a.5.5 0 0 0 .5-.5V3.524a.5.5 0 0 0-1 0v5.25l-2.192-2.191a8.25 8.25 0 0 0-14.073 3.597.5.5 0 1 0 .976.215l.22-.152ZM19.07 13.757a7.25 7.25 0 0 1-12.378 3.16L4.5 14.726H9.75a.5.5 0 0 0 0-1H3.5a.5.5 0 0 0-.5.5v6.25a.5.5 0 0 0 1 0v-5.25l2.192 2.191a8.25 8.25 0 0 0 14.073-3.597.5.5 0 0 0-.976-.215l-.22.152Z" clip-rule="evenodd"/>
</svg>
```

#### `solid/bolt.svg` — Rayo

```xml
<svg viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.303H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.142Z" clip-rule="evenodd"/>
</svg>
```

#### `regular/bolt.svg` — Rayo, outline

```xml
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M3.75 13.5 14.25 2.25 12 10.5h8.25L10.5 21.75 12.75 13.5H3.75Z" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
```

#### `solid/custom-star.svg` — Estrella rellena (viewBox 576×512)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
</svg>
```

#### `regular/custom-star.svg` — Estrella outline

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6 68.6-141.3C270.3 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
</svg>
```

#### `solid/plus.svg` y `regular/plus.svg` — Cruz de suma

```xml
<!-- solid/plus.svg -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z"/>
</svg>

<!-- regular/plus.svg -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12.75 5a.75.75 0 0 0-1.5 0v6.25H5a.75.75 0 0 0 0 1.5h6.25V19a.75.75 0 0 0 1.5 0v-6.25H19a.75.75 0 0 0 0-1.5h-6.25V5Z"/>
</svg>
```

#### `solid/minus.svg` y `regular/minus.svg` — Línea horizontal

```xml
<!-- solid/minus.svg -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 11a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2H5Z"/>
</svg>

<!-- regular/minus.svg -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 11.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5H5Z"/>
</svg>
```

#### `colorful/tech-vue.svg` — Logo de Vue.js

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221" width="100%" height="100%">
  <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h51.2L128 132.4L204.8 0z"/>
  <path fill="#35495E" d="M51.2 0L128 132.4L204.8 0h-47.5L128 92.1L70.7 0H51.2z"/>
</svg>
```

---

## 6. Arquitectura de archivos

```
src/components/Icon/
├── Icon.[tsx|vue|svelte]          # Componente principal
├── Icon.css                       # Estilos BEM de .c-icon-wrapper y .c-icon
├── types.ts                       # IconProps, IconVariant, IconSource
├── useIconLoader.[ts]             # Hook/composable: carga SVGs dinámicamente
├── useIconGallery.[ts]            # Hook/composable: registra y filtra iconos
├── IconGallery.[tsx|vue|svelte]   # Componente galería (para Storybook)
├── IconGallery.css                # Estilos BEM de .c-icon-gallery
├── Icon.stories.[tsx|ts]          # 10 stories de Storybook
└── __tests__/
    ├── IconGallery.spec.[tsx|ts]  # 14 tests del componente IconGallery
    └── useIconGallery.spec.ts     # 12 tests del hook/composable de galería
```

---

## 7. Arquitectura CSS — BEM + ITCSS

### 7.1 Mapa BEM completo

```
.c-icon-wrapper                  → Block externo (el <span> contenedor)
.c-icon                          → Block interno (el <i> o <svg> del icono)
.c-icon--svg                     → Modifier de .c-icon: SVG que hereda currentColor
.c-icon--colorful                → Modifier de .c-icon: SVG multicolor sin currentColor

.c-icon-gallery                  → Block (contenedor de la galería)
.c-icon-gallery__toolbar         → Element (barra con search + contador)
.c-icon-gallery__search          → Element (input type="search")
.c-icon-gallery__count           → Element (contador "N / M", aria-live="polite")
.c-icon-gallery__grid            → Element (lista de iconos, role="list")
.c-icon-gallery__item            → Element (un ítem de la lista)
.c-icon-gallery__name            → Element (nombre del icono)
.c-icon-gallery__variants        → Element (contenedor de badges de variante)
.c-icon-gallery__badge           → Element (un badge de variante)
.c-icon-gallery__empty           → Element (mensaje cuando no hay resultados)
```

### 7.2 CSS de `Icon.css`

```css
/* ==========================================================================
   COMPONENT: Icon
   Layer ITCSS: Component (c-)
   ========================================================================== */

/* Contenedor externo — centra el icono, hereda el color del padre */
.c-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  /* transition-transform se aplica vía Tailwind en el elemento .c-icon interno */
}

/* Elemento icono — válido para <i> (FontAwesome) y para el SVG component */
.c-icon {
  display: inline-block;
  /* transition-transform: 300ms */
}

/* SVG que hereda currentColor: dimensiones em para escalar con font-size */
.c-icon--svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

/* SVG colorful: mismas dimensiones pero sin inyectar currentColor */
.c-icon--colorful {
  width: 1em;
  height: 1em;
  /* fill y stroke provienen del propio SVG */
}
```

> **Nota de implementación con Tailwind CSS v4:** en el proyecto de referencia este CSS usa directivas `@apply`. La IA puede usar `@apply inline-flex items-center justify-center` en `.c-icon-wrapper` y `@apply inline-block transition-transform duration-300` en `.c-icon`. El comportamiento final debe ser idéntico.

### 7.3 CSS de `IconGallery.css`

```css
/* ==========================================================================
   COMPONENT: IconGallery
   Layer ITCSS: Component (c-)
   Solo para Storybook — no se incluye en el bundle de la librería
   ========================================================================== */

.c-icon-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 56rem;   /* ~896px */
  margin: 0 auto;
  padding: 1.5rem;
}

.c-icon-gallery__toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.c-icon-gallery__search {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: inherit;
  font-size: 0.875rem;
  outline: none;
}
.c-icon-gallery__search:focus {
  border-color: var(--na-color-primary-500, #6366F1);
}

.c-icon-gallery__count {
  font-size: 0.875rem;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  opacity: 0.5;
}

.c-icon-gallery__grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  list-style: none;
  padding: 0;
  margin: 0;
}

.c-icon-gallery__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  cursor: default;
}

.c-icon-gallery__name {
  font-size: 0.75rem;
  font-family: monospace;
  word-break: break-all;
  line-height: 1.25;
  opacity: 0.8;
}

.c-icon-gallery__variants {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
}

.c-icon-gallery__badge {
  font-size: 0.625rem;   /* 10px */
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  background-color: rgba(99,102,241,0.2);
  color: var(--na-color-primary-500, #6366F1);
}

.c-icon-gallery__empty {
  font-size: 0.875rem;
  text-align: center;
  padding: 3rem 0;
  opacity: 0.4;
}
```

---

## 8. Lógica del componente

### 8.1 Pseudocódigo del componente Icon

```
COMPONENTE Icon(props):
  { source = 'font', icon, type = 'solid', size, ariaLabel, rotate } = props

  // Solo relevante si source='svg':
  { SvgComponent, activeType } = useIconLoader(props)

  // Estilos dinámicos del contenedor
  dynamicStyles = {}
  SI size !== undefined:
    dynamicStyles.fontSize = `${size}px`
  SI rotate !== undefined:
    dynamicStyles.transform = `rotate(${rotate}deg)`

  // Clases CSS para FontAwesome
  fontAwesomeClasses = []
  SI source === 'font':
    fontAwesomeClasses = [`fa-${type}`, `fa-${icon}`]

  RENDERIZAR:
    <span
      class="c-icon-wrapper"
      style={dynamicStyles}
    >
      SI source === 'font':
        <i
          class="c-icon"
          + fontAwesomeClasses
          aria-label={ariaLabel}
          aria-hidden={!ariaLabel}
        />

      SI source === 'svg' && SvgComponent existe:
        <SvgComponent
          class="c-icon"
          + (activeType === 'colorful' ? 'c-icon--colorful' : 'c-icon--svg')
          aria-label={ariaLabel}
          aria-hidden={!ariaLabel}
        />
    </span>
```

### 8.2 `useIconLoader` — carga asíncrona de SVGs

```
HOOK useIconLoader(props):
  // Mapa estático de todos los SVGs (generado en build time)
  // Vite: import.meta.glob('/src/assets/icons/**/*.svg', { query: '?component' })
  svgModules = { '/src/assets/icons/solid/plus.svg': loader, ... }

  SvgComponent = ref(null)    // ref reactivo al componente SVG cargado
  activeType   = ref(props.type || 'solid')  // tipo efectivamente resuelto

  FUNCIÓN getSvgLoader(type, icon):
    keys = Object.keys(svgModules)

    // 1. Buscar variante exacta
    exactSuffix = `/src/assets/icons/${type}/${icon}.svg`
    exactMatch  = keys.find(k => k.endsWith(exactSuffix))
    SI exactMatch:
      RETORNAR { loader: svgModules[exactMatch], resolvedType: type }

    // 2. Fallback: probar otras variantes en orden
    fallbackOrder = ['solid', 'regular', 'brands', 'colorful']
    PARA CADA fallbackType EN fallbackOrder (saltando el type original):
      suffix = `/src/assets/icons/${fallbackType}/${icon}.svg`
      match  = keys.find(k => k.endsWith(suffix))
      SI match:
        RETORNAR { loader: svgModules[match], resolvedType: fallbackType }

    RETORNAR null   // icono no encontrado en ninguna variante

  // Watcher reactivo — se re-ejecuta cuando cambia source, icon o type
  WATCH [source, icon, type] (immediate):
    SI source === 'svg' && icon && type:
      match = getSvgLoader(type, icon)
      SI match:
        module = AWAIT match.loader()
        SvgComponent.value = module.default ?? module
        activeType.value   = match.resolvedType
      SINO:
        SvgComponent.value = null
    SINO:
      SvgComponent.value = null

  RETORNAR { SvgComponent, activeType }
```

> **Nota importante:** el loader es **asíncrono**. En frameworks con reactividad (Vue, Solid) se usa un `ref` + `watch`. En React se usa `useState` + `useEffect`. El componente debe renderizar `null` mientras `SvgComponent` es `null` (carga o icono inexistente).

### 8.3 `useIconGallery` — registro y filtrado de iconos

```
TIPOS:
  IconVariant = 'solid' | 'regular' | 'brands' | 'colorful'
  IconEntry   = { name: string, variants: IconVariant[], primaryVariant: IconVariant }

CONSTANTE VARIANT_ORDER = ['solid', 'regular', 'brands', 'colorful']

FUNCIÓN buildIconRegistry():
  svgModules = import.meta.glob('/src/assets/icons/**/*.svg', { query: '?component' })
  map = Map<name, Set<IconVariant>>()

  PARA CADA path EN svgModules.keys():
    Extraer variant y name de /src/assets/icons/{variant}/{name}.svg
    map.get(name).add(variant)

  RETORNAR Array.from(map.entries())
    .map(([name, variantSet]) => {
      variants = VARIANT_ORDER.filter(v => variantSet.has(v))
      primaryVariant = variants[0]    // primer variant según VARIANT_ORDER
      RETORNAR { name, variants, primaryVariant }
    })
    .sort((a, b) => a.name.localeCompare(b.name))  // orden alfabético

// Construir una sola vez (los módulos glob son estáticos en build time)
iconRegistry = buildIconRegistry()

HOOK useIconGallery():
  query    = ref('')   // string reactivo para el v-model del input

  filtered = computed(() => {
    q = query.value.toLowerCase().trim()
    SI q vacío: RETORNAR iconRegistry
    RETORNAR iconRegistry.filter(icon => icon.name.toLowerCase().includes(q))
  })

  RETORNAR {
    icons:    iconRegistry,    // readonly — el catálogo completo sin filtrar
    query,                     // Ref<string> — para v-model en el input
    filtered,                  // ComputedRef<IconEntry[]> — resultado filtrado
    total:    iconRegistry.length   // número — no cambia con el filtro
  }
```

---

## 9. Accesibilidad

### 9.1 Reglas obligatorias

| Situación | Comportamiento requerido |
|---|---|
| Sin `ariaLabel` (decorativo) | `aria-hidden="true"` en el `<i>` o `<SvgComponent>`. El `.c-icon-wrapper` no necesita atributos ARIA adicionales. |
| Con `ariaLabel` (significativo) | `aria-label="{valor}"` en el `<i>` o `<SvgComponent>`. Sin `aria-hidden`. |
| Nunca focusable | El componente nunca debe tener `tabindex`. |
| En botón solo icono | El `<button>` padre lleva el `aria-label`; el `<Icon>` es decorativo. |
| En galería | Cada `<Icon>` dentro de `<IconGallery>` lleva `ariaLabel={icon.name}` (significativo). |

### 9.2 Ejemplos correctos

```html
<!-- Decorativo: el texto visible explica la acción -->
<button>
  <Icon source="font" icon="plus" />
  Añadir elemento
</button>

<!-- Significativo: botón solo-icono, el padre lleva aria-label -->
<button aria-label="Cerrar modal">
  <Icon source="svg" icon="custom-star" ariaLabel="Cerrar" />
</button>

<!-- Galería: cada icono tiene ariaLabel con su nombre -->
<Icon source="svg" icon="arrow-path" type="solid" ariaLabel="arrow-path" size={40} />
```

### 9.3 Ejemplo incorrecto

```html
<!-- ❌ Botón solo-icono sin nombre accesible en ningún lugar -->
<button>
  <Icon source="font" icon="xmark" />
</button>
```

---

## 10. Storybook — Stories requeridas

### 10.1 Metadata

```
title: 'Atoms/Icon'
component: Icon
tags: ['autodocs']
args: { source: 'font', icon: 'house', type: 'solid' }
```

### 10.2 ArgTypes

```ts
argTypes: {
  source:   { control: 'radio',  options: ['font', 'svg'],
              description: 'Origen: fuente externa o SVG local',
              table: { category: 'Configuración' } },
  icon:     { control: 'text',
              description: "Nombre del icono (FA sin prefijo o nombre exacto del SVG)",
              table: { category: 'Configuración' } },
  type:     { control: 'select', options: ['solid', 'regular', 'brands', 'colorful'],
              description: 'Variante / peso del icono',
              table: { category: 'Configuración' } },
  size:     { control: 'number',
              description: 'Tamaño en px. Omitir = hereda font-size del padre.',
              table: { category: 'Apariencia' } },
  rotate:   { control: 'number',
              description: 'Rotación en grados',
              table: { category: 'Apariencia' } },
  ariaLabel:{ control: 'text',
              description: 'Etiqueta accesible. Omitir = decorativo (aria-hidden).',
              table: { category: 'Accesibilidad' } },
}
```

### 10.3 Las 10 stories obligatorias

| Nombre story | Export ID | Props clave | Propósito |
|---|---|---|---|
| `FontAwesomeSolid` | `atoms-icon--font-awesome-solid` | `source='font' icon='heart' type='solid' size={48}` | FA solid |
| `FontAwesomeRegular` | `atoms-icon--font-awesome-regular` | `source='font' icon='heart' type='regular' size={48}` | FA regular |
| `FontAwesomeBrands` | `atoms-icon--font-awesome-brands` | `source='font' icon='github' type='brands' size={48}` | FA brands |
| `SvgLocalSolid` | `atoms-icon--svg-local-solid` | `source='svg' icon='custom-star' type='solid' size={64}` | SVG solid local |
| `SvgLocalRegular` | `atoms-icon--svg-local-regular` | `source='svg' icon='custom-star' type='regular' size={64}` | SVG regular local |
| `SvgLocalColorful` | `atoms-icon--svg-local-colorful` | `source='svg' icon='tech-vue' type='colorful' size={64}` | SVG multicolor; el padre tiene `color: error` para demostrar que colorful NO lo hereda |
| `VariantFallback` | `atoms-icon--variant-fallback` | `source='svg' icon='custom-star' type='brands' size={48}` | Demuestra fallback a `solid` cuando `brands` no existe en local |
| `SizeInheritanceAndColor` | `atoms-icon--size-inheritance-and-color` | `source='font' icon='bell'` (sin size) | Hereda font-size y color del padre (24px, color primary) |
| `Transformations` | `atoms-icon--transformations` | `source='font' icon='arrow-right' rotate={90} size={32}` | Rotación via prop `rotate` |
| `Gallery` | `atoms-icon--gallery` | — | `IconGallery` completo con `layout: 'fullscreen'` |

### 10.4 Notas de implementación de stories especiales

**`SvgLocalColorful`:** renderizar el icono dentro de un padre con `color: var(--na-color-error)` o equivalente, con un texto explicativo que indique "Preserva sus colores nativos sin heredar el rojo del padre".

**`VariantFallback`:** renderizar el icono dentro de un contenedor con texto explicativo: "Se solicita variante `brands` del icono `custom-star`, la cual NO existe localmente. El componente resuelve automáticamente en la variante disponible (`solid`)".

**`SizeInheritanceAndColor`:** renderizar el icono dentro de un padre con `font-size: 24px` y `color: var(--na-color-primary-500)`. Mostrar texto junto al icono: "Heredando color y tamaño de fuente (24px)".

**`Gallery`:** renderizar `<IconGallery />` directamente. Configurar `parameters.layout = 'fullscreen'`.

---

## 11. Tests unitarios

### 11.1 Suite: `useIconGallery.spec` — 12 tests

```
TEST 1: expone el catálogo completo de iconos
  → { icons, total } = useIconGallery()
  → icons.length > 0
  → total === icons.length

TEST 2: cada entrada tiene name, variants y primaryVariant
  → PARA CADA icon EN icons:
  →   icon.name es truthy
  →   icon.variants.length > 0
  →   icon.variants contiene icon.primaryVariant

TEST 3: filtered devuelve todos cuando query está vacío
  → { icons, filtered } = useIconGallery()
  → filtered.value.length === icons.length

TEST 4: filtra por nombre (case-insensitive)
  → query.value = 'STAR'
  → filtered.value.every(i => i.name.toLowerCase().includes('star'))

TEST 5: filtra parcialmente
  → query.value = 'cust'
  → filtered.value.some(i => i.name.includes('custom'))

TEST 6: devuelve lista vacía sin coincidencias
  → query.value = 'xzxzxz_inexistente'
  → filtered.value.length === 0

TEST 7: iconos ordenados alfabéticamente
  → names = icons.map(i => i.name)
  → names es igual a [...names].sort((a, b) => a.localeCompare(b))

TEST 8: el icono 'custom-star' existe en el catálogo
  → star = icons.find(i => i.name === 'custom-star')
  → star existe
  → star.variants.length > 0

TEST 9: el icono 'tech-vue' existe con variante 'colorful'
  → vue = icons.find(i => i.name === 'tech-vue')
  → vue existe
  → vue.variants contiene 'colorful'

TEST 10: primaryVariant sigue el orden solid > regular > brands > colorful
  → VARIANT_ORDER = ['solid', 'regular', 'brands', 'colorful']
  → PARA CADA icon:
  →   expected = variant en icon.variants con menor índice en VARIANT_ORDER
  →   icon.primaryVariant === expected

TEST 11: total no cambia al modificar query
  → initialTotal = total
  → query.value = 'star'
  → total === initialTotal
  → filtered.value.length <= total

TEST 12: restaura todos al limpiar query
  → query.value = 'star'
  → filtered.value.length < icons.length
  → query.value = ''
  → filtered.value.length === icons.length
```

### 11.2 Suite: `IconGallery.spec` — 14 tests

> Importante: usar un **stub de `NaIcon`** para evitar la carga asíncrona de SVGs en unit tests. El stub debe aceptar las props `source`, `icon`, `type`, `size`, `ariaLabel` y renderizar `<span class="icon-stub" data-icon={icon} data-type={type}>`.

```
TEST 1: renderiza sin errores
  → mount(IconGallery, { stubs: { NaIcon: NaIconStub } })
  → .c-icon-gallery existe

TEST 2: muestra al menos un icono
  → .c-icon-gallery__item.length > 0

TEST 3: muestra el input de búsqueda con placeholder
  → input[type="search"] existe
  → input.placeholder es truthy

TEST 4: el input tiene aria-label accesible
  → input[type="search"].aria-label es truthy

TEST 5: muestra el contador total/filtrado
  → .c-icon-gallery__count existe
  → [aria-live="polite"] existe

TEST 6: el contador tiene formato "N / M"
  → .c-icon-gallery__count.text() coincide con /\d+ \/ \d+/

TEST 7: filtra al escribir en el buscador
  → totalBefore = .c-icon-gallery__item.length
  → input.setValue('star')
  → totalAfter = .c-icon-gallery__item.length
  → totalAfter <= totalBefore
  → totalAfter > 0

TEST 8: el contador se actualiza al filtrar
  → before = .c-icon-gallery__count.text()
  → input.setValue('star')
  → after = .c-icon-gallery__count.text()
  → after !== before

TEST 9: muestra mensaje empty cuando no hay resultados
  → input.setValue('xzxzxz_inexistente')
  → .c-icon-gallery__empty existe
  → .c-icon-gallery__grid NO existe

TEST 10: el mensaje empty incluye el término buscado
  → input.setValue('termino_raro')
  → .c-icon-gallery__empty.text() contiene 'termino_raro'

TEST 11: muestra el nombre de cada icono
  → .c-icon-gallery__name.length > 0
  → CADA .c-icon-gallery__name.text().trim() es truthy

TEST 12: muestra al menos un badge de variante por icono
  → PARA CADA .c-icon-gallery__item:
  →   .c-icon-gallery__badge.length > 0

TEST 13: restaura resultados al borrar búsqueda
  → input.setValue('star') → filtered = items.length
  → input.setValue('')     → restored = items.length
  → restored > filtered

TEST 14: el grid tiene role="list"
  → .c-icon-gallery__grid.attributes('role') === 'list'
```

---

## 12. Tests E2E — Playwright

### 12.1 Suite: `e2e/icon-gallery.spec` — 9 tests

```
URL base: /iframe.html?id=atoms-icon--gallery&viewMode=story
Selector de espera: .c-icon-gallery (timeout: 10 000ms)

TEST 1: muestra la galería con al menos un icono
  → .c-icon-gallery__item.first() es visible
  → .c-icon-gallery__item.count() > 0

TEST 2: muestra el campo de búsqueda
  → input[type="search"] es visible
  → input[type="search"].aria-label contiene /icono/i

TEST 3: muestra el contador total/filtrado
  → .c-icon-gallery__count es visible
  → .c-icon-gallery__count.text() coincide con /\d+ \/ \d+/

TEST 4: filtrar por "star" reduce los resultados
  → before = .c-icon-gallery__item.count()
  → page.fill('input[type="search"]', 'star')
  → after = .c-icon-gallery__item.count()
  → after <= before  y  after > 0

TEST 5: búsqueda sin resultados muestra mensaje empty
  → page.fill('input[type="search"]', 'xzxzxz_inexistente')
  → .c-icon-gallery__empty es visible
  → .c-icon-gallery__grid NO es visible

TEST 6: cada icono muestra su nombre
  → .c-icon-gallery__name.first() es visible
  → .c-icon-gallery__name.first().textContent().trim() es truthy

TEST 7: cada icono muestra al menos un badge de variante
  → .c-icon-gallery__badge.first() es visible

TEST 8: el contador se actualiza al filtrar
  → before = .c-icon-gallery__count.textContent()
  → page.fill('input[type="search"]', 'star')
  → expect(.c-icon-gallery__count).not.toHaveText(before)

TEST 9: restaura resultados al borrar búsqueda
  → input.fill('star') → filtered = .c-icon-gallery__item.count()
  → input.fill('')     → restored = .c-icon-gallery__item.count()
  → restored > filtered
```

---

## 13. Componente IconGallery

### 13.1 Propósito

`IconGallery` es un organismo para exploración visual en Storybook. **No se exporta en el `index.ts` principal de la librería** (o si se exporta, debe documentarse como herramienta de desarrollo interna).

### 13.2 Pseudocódigo

```
COMPONENTE IconGallery():
  { filtered, query, total } = useIconGallery()

  RENDERIZAR:
    <div class="c-icon-gallery">

      <div class="c-icon-gallery__toolbar">
        <input
          type="search"
          class="c-icon-gallery__search"
          placeholder="Buscar icono..."
          aria-label="Buscar iconos locales"
          v-model={query}    // o value={query} onChange={e => setQuery(e.target.value)}
        />
        <span class="c-icon-gallery__count" aria-live="polite">
          {filtered.length} / {total}
        </span>
      </div>

      SI filtered.length === 0:
        <p class="c-icon-gallery__empty">
          No se encontró ningún icono con "{query}"
        </p>
      SINO:
        <ul class="c-icon-gallery__grid" role="list">
          PARA CADA icon EN filtered:
            <li class="c-icon-gallery__item" key={icon.name}>
              <Icon
                source="svg"
                icon={icon.name}
                type={icon.primaryVariant}
                size={40}
                ariaLabel={icon.name}
              />
              <span class="c-icon-gallery__name">{icon.name}</span>
              <div class="c-icon-gallery__variants">
                PARA CADA v EN icon.variants:
                  <span class="c-icon-gallery__badge" key={v}>{v}</span>
              </div>
            </li>
        </ul>
    </div>
```

> **Detalles críticos:**
> - El `<Icon>` en la galería siempre usa `size={40}` (px) y `ariaLabel={icon.name}`.
> - El mensaje empty incluye el valor actual de `query` entre comillas.
> - El contador usa `aria-live="polite"` para anunciar cambios a lectores de pantalla.

---

## 14. Guía de uso

### 14.1 Uso con FontAwesome (source='font')

```html
<!-- Solid (default) -->
<Icon source="font" icon="house" />

<!-- Regular -->
<Icon source="font" icon="heart" type="regular" size={24} />

<!-- Brands -->
<Icon source="font" icon="github" type="brands" size={32} />

<!-- Con tamaño fijo en px -->
<Icon source="font" icon="bell" size={48} />

<!-- Heredando font-size del padre (sin size) -->
<span style="font-size: 1.5rem">
  <Icon source="font" icon="star" type="solid" />
</span>

<!-- Con rotación -->
<Icon source="font" icon="arrow-right" rotate={90} size={24} />
```

### 14.2 Uso con SVG local (source='svg')

```html
<!-- Solid local -->
<Icon source="svg" icon="custom-star" type="solid" size={32} />

<!-- Regular local -->
<Icon source="svg" icon="arrow-path" type="regular" size={24} />

<!-- Colorful — preserva colores del SVG -->
<Icon source="svg" icon="tech-vue" type="colorful" size={48} />

<!-- Fallback automático: si 'brands' no existe, resuelve en 'solid' -->
<Icon source="svg" icon="custom-star" type="brands" size={32} />
```

### 14.3 Icono en botón (patrón correcto)

```html
<!-- Botón con texto: Icon es decorativo (sin ariaLabel) -->
<button type="button">
  <Icon source="font" icon="plus" />
  Añadir elemento
</button>

<!-- Botón solo icono: aria-label en el botón, Icon sin ariaLabel -->
<button type="button" aria-label="Cerrar">
  <Icon source="font" icon="xmark" />
</button>
```

### 14.4 Herencia de color

```html
<!-- El icono hereda el color del padre vía currentColor -->
<span style="color: var(--na-color-error)">
  <Icon source="font" icon="triangle-exclamation" size={20} />
  Ha ocurrido un error
</span>

<!-- Colorful NO hereda el color del padre -->
<span style="color: red">
  <Icon source="svg" icon="tech-vue" type="colorful" size={32} />
  <!-- El logo de Vue mantiene sus colores originales -->
</span>
```

### 14.5 Lo que NUNCA se debe hacer

```html
<!-- ❌ Icon interactivo sin wrapper semántico -->
<Icon source="font" icon="xmark" onClick={handleClose} />

<!-- ❌ Forzar colores directamente en la prop -->
<Icon source="font" icon="check" color="#6366F1" />   <!-- No existe esta prop -->

<!-- ❌ Botón solo-icono sin aria-label -->
<button>
  <Icon source="font" icon="xmark" />   <!-- El botón no tiene nombre accesible -->
</button>

<!-- ❌ Añadir tabindex al Icon -->
<Icon source="font" icon="info" tabindex="0" />
```

---

## 15. Checklist de implementación

### Estructura y archivos

- [x] `Icon.tsx` con props: `source`, `icon`, `type`, `size`, `ariaLabel`, `rotate`
- [x] `Icon.css` con las 4 clases: `.c-icon-wrapper`, `.c-icon`, `.c-icon--svg`, `.c-icon--colorful`
- [x] `types.ts` con `IconProps`, `IconVariant` (`'solid' | 'regular' | 'brands' | 'colorful'`), `IconSource` (`'font' | 'svg'`)
- [x] `useIconLoader` con: carga asíncrona, fallback en orden `VARIANT_ORDER`, retorna `{ SvgComponent, activeType }`
- [x] `useIconGallery` con: `VARIANT_ORDER`, `buildIconRegistry()`, retorna `{ icons, query, filtered, total }`
- [x] Los 11 SVGs del set mínimo en `src/assets/icons/` (5 solid + 5 regular + 1 colorful)
- [x] `IconGallery` con: toolbar (search + contador), grid con role="list", mensaje empty con término, `aria-live="polite"` en contador
- [x] `Icon.stories` con las 10 stories exactas

### CSS y estilos

- [x] `.c-icon-wrapper` usa `display: inline-flex; align-items: center; justify-content: center; color: inherit`
- [x] `.c-icon--svg` tiene `width: 1em; height: 1em; fill: currentColor`
- [x] `.c-icon--colorful` tiene `width: 1em; height: 1em` **sin** `fill: currentColor`
- [x] `size` numérico se aplica como `font-size: Npx` en `.c-icon-wrapper` (no en el SVG)
- [x] `rotate` se aplica como `transform: rotate(Ndeg)` en `.c-icon-wrapper`
- [x] No hay colores hardcoded en `Icon.css`

### Accesibilidad

- [x] Sin `ariaLabel` → `aria-hidden="true"` en el `<i>` o `<SvgComponent>`
- [x] Con `ariaLabel` → `aria-label="{valor}"` en el `<i>` o `<SvgComponent>`, sin `aria-hidden`
- [x] El componente nunca tiene `tabindex`
- [x] En `IconGallery`, cada `<Icon>` tiene `ariaLabel={icon.name}`
- [x] `.c-icon-gallery__count` tiene `aria-live="polite"`
- [x] `.c-icon-gallery__grid` tiene `role="list"`

### Tests

- [x] `pnpm test` → 12 tests de `useIconGallery.spec` en verde
- [x] `pnpm test` → 14 tests de `IconGallery.spec` en verde (con Icon stub vía `vi.mock`)
- [ ] `pnpm test:e2e` → 9 tests de `icon-gallery.spec` en verde (Playwright contra Storybook) — pendiente

### Build

- [ ] `pnpm build` sin errores — pendiente verificación
- [ ] `pnpm storybook:build` sin errores — pendiente verificación
- [x] Las 10 stories se renderizan sin errores de consola (excepto 404 de favicon.ico, aceptable)

---

*Spec generado para Nayra Design System — Componente Icon*
*Versión del spec: 2.0.0 — Mayo 2026 — Validado contra implementación de producción*
