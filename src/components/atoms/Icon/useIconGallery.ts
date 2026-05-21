import { useState, useMemo } from 'react';
import { generatedIcons } from './generated-icons';
import type { IconType } from './types';

export type IconVariant = IconType;

export interface IconEntry {
  name: string;
  variants: IconVariant[];
  primaryVariant: IconVariant;
}

export const VARIANT_ORDER: IconVariant[] = ['solid', 'regular', 'brands', 'colorful'];

function buildIconRegistry(): IconEntry[] {
  const map = new Map<string, Set<IconVariant>>();

  for (const [variant, icons] of Object.entries(generatedIcons)) {
    for (const name of Object.keys(icons)) {
      if (!map.has(name)) map.set(name, new Set());
      map.get(name)!.add(variant as IconVariant);
    }
  }

  return Array.from(map.entries())
    .map(([name, variantSet]) => {
      const variants = VARIANT_ORDER.filter(v => variantSet.has(v));
      return { name, variants, primaryVariant: variants[0] };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const iconRegistry = buildIconRegistry();

export function useIconGallery() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return iconRegistry;
    return iconRegistry.filter(icon => icon.name.toLowerCase().includes(q));
  }, [query]);

  return {
    icons: iconRegistry,
    query,
    setQuery,
    filtered,
    total: iconRegistry.length,
  };
}
