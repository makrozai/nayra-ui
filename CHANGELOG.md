# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

---

## [0.2.0] - 2026-05-21

### Added
- **Icon Component refactor** — Implementación completa según SPEC v2.0.0.
- **IconGallery** — Componente visualizador para Storybook.
- **SVGs Dinámicos** — Soporte nativo para iconos locales con variantes (solid, regular, brands, colorful).
- Script de autogeneración de registro de iconos.

### Fixed
- **PR Actions**: Arreglado error de redundancia de `role="list"` en ESLint que bloqueaba CI.
- **Dependency Review**: Ajustadas políticas para repositorios públicos sin GHAS.

## [0.1.1] - 2026-05-21

### Fixed
- **Storybook Deploy**: Fix github pages base path configuration in viteFinal for GitHub Pages correctly serving static assets.
- **CI/CD**: Fix npm publish conflict by bumping version to 0.1.1.

---

## [0.1.0] - 2026-05-21

### Added

- **Icon** — Componente atómico con soporte para FontAwesome y SVG custom
  - Props: `icon`, `color`, `size`, `title`, `className`
  - Accesibilidad: `aria-label` y `role="img"` automáticos
  - Storybook: Stories con autodocs y variantes visuales
  - Tests: Unit + E2E con Playwright
- **ConfigProvider** — Proveedor de configuración global
  - Prefijo CSS configurable (`prefixCls`, default: `na`)
  - Hook `usePrefixCls` para generación de clases BEM
  - Hook `useConfig` para acceso al contexto
- **Sistema de build**
  - Vite con output ESM + CJS
  - Generación automática de declaraciones de tipos (`.d.ts`)
  - Script `generate-exports.ts` para barrel files dinámicos
  - Prefijo de exportación configurable via `nayra.config.json`
- **Testing**
  - Vitest con happy-dom para tests unitarios
  - Storybook + Playwright para tests E2E
  - Workspace de Vitest para ambos entornos
- **CI/CD**
  - `deploy-storybook.yml` — Deploy de Storybook a GitHub Pages
  - `publish-package.yml` — Publicación a GitHub Packages
  - `pr-develop-validation.yml` — Validación automática de PRs
  - `auto-pr.yml` — PR automático de develop a master
- **Documentación**
  - README con guía de instalación y uso
  - `docs/ARCHITECTURE.md` — Arquitectura y patrones
  - `docs/CONTRIBUTING.md` — Guía de contribución con Git Flow
  - SPEC.md — Especificación técnica completa
