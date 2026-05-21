# Guía de Contribución

¡Gracias por tu interés en contribuir a **Nayra UI**! Esta guía te ayudará a entender nuestro flujo de trabajo y convenciones.

---

## Git Flow

Utilizamos **Git Flow** como estrategia de ramas:

```
master ← PR ← develop ← feature/nombre-del-feature
                      ← hotfix/nombre-del-fix
```

| Rama | Propósito |
|------|-----------|
| `master` | Producción. Solo se actualiza via PR desde `develop`. Cada push dispara el deploy de Storybook y la publicación del paquete. |
| `develop` | Integración. Aquí se fusionan todas las features. Los PRs a `develop` ejecutan la validación automática. |
| `feature/*` | Nuevas funcionalidades. Se crean desde `develop` y se fusionan de vuelta a `develop`. |
| `hotfix/*` | Correcciones urgentes. Se crean desde `master` y se fusionan tanto a `master` como a `develop`. |

### Flujo típico

```bash
# 1. Crear rama de feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/mi-nuevo-componente

# 2. Desarrollar y hacer commits
git add .
git commit -m "feat(button): add Button component"

# 3. Push y crear PR hacia develop
git push origin feature/mi-nuevo-componente
# Crear PR en GitHub: feature/mi-nuevo-componente → develop

# 4. Después de la revisión y merge a develop,
#    crear PR: develop → master (via workflow auto-pr o manual)
```

---

## Convención de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <descripción>
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato (no afecta lógica) |
| `refactor` | Refactorización (no agrega features ni corrige bugs) |
| `test` | Añadir o corregir tests |
| `chore` | Tareas de mantenimiento (CI, dependencias, etc.) |

### Ejemplos

```
feat(icon): add SVG icon support
fix(config): resolve prefix context not updating
docs(readme): update installation instructions
test(icon): add unit tests for accessibility props
chore(ci): add Storybook deploy workflow
```

---

## Cómo crear un componente nuevo

### 1. Crear la estructura de carpetas

```bash
mkdir -p src/components/atoms/Button/__tests__
```

### 2. Crear los archivos

```
src/components/atoms/Button/
├── Button.tsx           # Implementación
├── Button.stories.tsx   # Historias de Storybook
├── button.css           # Estilos (BEM)
├── types.ts             # Interfaces
├── index.ts             # Barrel: export { Button } from './Button'; export type * from './types';
└── __tests__/
    └── Button.spec.tsx  # Tests unitarios
```

### 3. Implementar el componente

```tsx
// Button.tsx
import React from 'react';
import { usePrefixCls } from '~/config/ConfigProvider';
import { ButtonProps } from './types';
import './button.css';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const prefixCls = usePrefixCls('button');
  return (
    <button className={prefixCls} {...props}>
      {children}
    </button>
  );
};
```

### 4. ¡Listo!

No necesitas tocar ningún `index.ts` — el script `generate-exports.ts` detectará automáticamente tu nuevo componente y generará los exports necesarios la próxima vez que ejecutes `pnpm prebuild` o `pnpm build`.

---

## Estándares de código

### Importaciones

- ✅ Usa alias absoluto `~` para todo: `import { X } from '~/config/Y'`
- ❌ No uses rutas relativas profundas: `import { X } from '../../../config/Y'`
- ✅ Importa desde el barrel del componente: `import { Icon } from '~/components/atoms/Icon'`

### CSS

- ✅ Usa nomenclatura BEM: `.na-button`, `.na-button__label`, `.na-button--primary`
- ✅ Co-localiza los estilos junto al componente: `Button/button.css`
- ✅ Usa el hook `usePrefixCls` para generar las clases
- ❌ No uses estilos inline excepto para valores dinámicos (`color`, `size`)

### Testing

- ✅ Cada componente debe tener al menos un test unitario
- ✅ Cada story debe tener al menos un `play` function para testing interactivo
- ✅ Usa `@testing-library/react` para queries de accesibilidad (`getByRole`, etc.)

### Accesibilidad

- ✅ Todos los componentes interactivos deben ser navegables por teclado
- ✅ Usa roles ARIA semánticos
- ✅ Proporciona `aria-label` o `title` para elementos visuales

---

## Validación automática de PRs

Al crear un PR hacia `develop`, el workflow ejecuta automáticamente:

1. ✅ Generación de exports (`pnpm prebuild`)
2. ✅ Linting (`pnpm lint`)
3. ✅ Verificación de tipos (`tsc --noEmit`)
4. ✅ Tests unitarios (`pnpm test`)
5. ✅ Build de librería (`pnpm build`)
6. ✅ Build de Storybook (`pnpm build-storybook`)

**Todos los checks deben pasar antes del merge.**

---

## Publicación

La publicación es automática al hacer merge a `master`:

- **Librería**: Se publica a GitHub Packages (`@makrozai/nayra-ui`)
- **Storybook**: Se despliega a GitHub Pages (`https://makrozai.github.io/nayra-ui/`)

> **Importante**: Recuerda actualizar la versión en `package.json` antes del merge a master si hay cambios funcionales.
