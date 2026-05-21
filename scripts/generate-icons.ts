import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'src', 'assets', 'icons');
const OUTPUT = path.join(ROOT, 'src', 'components', 'atoms', 'Icon', 'generated-icons.tsx');

// Atributos SVG → props JSX en camelCase
const ATTR_MAP: Record<string, string> = {
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'font-size': 'fontSize',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'class': 'className',
};

function toJsx(raw: string): string {
  let s = raw.trim();

  // Eliminar declaración XML y atributos xmlns (implícitos en JSX)
  s = s.replace(/<\?xml[^?]*\?>\s*/g, '');
  s = s.replace(/\s+xmlns(?::[a-z]+)?="[^"]*"/g, '');

  // Eliminar width/height del <svg> raíz (el CSS controla las dimensiones)
  s = s.replace(/(<svg\b)([^>]*?)\s+width="[^"]*"/, '$1$2');
  s = s.replace(/(<svg\b)([^>]*?)\s+height="[^"]*"/, '$1$2');

  // Convertir atributos hyphenados a camelCase
  for (const [attr, camel] of Object.entries(ATTR_MAP)) {
    s = s.replace(new RegExp(`\\b${attr}=`, 'g'), `${camel}=`);
  }

  // Inyectar el spread {...props} en el tag de apertura del <svg> raíz
  s = s.replace(/^(\s*<svg)(\s[^>]*)?(\/?>)/m, (_, open, attrs = '', close) =>
    close === '/>' ? `${open}${attrs} {...props}/>` : `${open}${attrs} {...props}>`
  );

  return s;
}

/**
 * Re-indenta el JSX de un SVG manteniendo la jerarquía de tags.
 * Complejidad O(n) sobre las líneas — suficiente para SVGs simples.
 */
function reindent(jsx: string, baseSpaces: number): string {
  const base = ' '.repeat(baseSpaces);
  const step = '  ';

  const lines = jsx
    .trim()
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  let depth = 0;
  return lines.map(line => {
    // Cerrar primero (</tag> o línea de auto-cierre al inicio)
    if (/^<\//.test(line)) depth = Math.max(0, depth - 1);

    const indented = base + step.repeat(depth) + line;

    // Abrir después si es un tag normal (no auto-cierre, no cierre)
    if (/^<[^/!?]/.test(line) && !line.endsWith('/>') && !/<\/[^>]+>$/.test(line)) {
      depth++;
    }

    return indented;
  }).join('\n');
}

function buildEntry(name: string, svgRaw: string): string {
  const jsx = toJsx(svgRaw);
  const body = reindent(jsx, 6); // 6 espacios → alineado con el arrow fn
  return `    '${name}': (props: SVGProps<SVGSVGElement>) => (\n${body}\n    )`;
}

function generate(): void {
  if (!fs.existsSync(ICONS_DIR)) {
    console.warn('⚠️  src/assets/icons/ no encontrado — saltando generación de iconos.');
    return;
  }

  const types = fs.readdirSync(ICONS_DIR)
    .filter(d => fs.statSync(path.join(ICONS_DIR, d)).isDirectory())
    .sort();

  const typeBlocks: string[] = [];
  let total = 0;

  for (const type of types) {
    const dir = path.join(ICONS_DIR, type);
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.svg'))
      .sort();

    if (files.length === 0) continue;

    const entries = files.map(file => {
      const name = path.basename(file, '.svg');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      total++;
      return buildEntry(name, raw);
    });

    typeBlocks.push(`  ${type}: {\n${entries.join(',\n')},\n  }`);
  }

  const content = [
    '// AUTO-GENERATED — DO NOT EDIT DIRECTLY.',
    '// Fuente: src/assets/icons/**/*.svg',
    '// Generador: scripts/generate-icons.ts | Comando: pnpm prebuild',
    '',
    "import type { SVGProps, FC } from 'react';",
    '',
    'type SvgFC = FC<SVGProps<SVGSVGElement>>;',
    '',
    'export const generatedIcons: Record<string, Record<string, SvgFC>> = {',
    typeBlocks.join(',\n'),
    '};',
    '',
  ].join('\n');

  fs.writeFileSync(OUTPUT, content, 'utf-8');
  console.log(`✅ ${total} iconos generados → ${path.relative(ROOT, OUTPUT)}`);
}

generate();
