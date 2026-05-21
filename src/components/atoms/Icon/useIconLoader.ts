import { useState, useEffect } from 'react';
import type React from 'react';
import type { IconType } from './types';

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type SvgModuleMap = Record<string, () => Promise<{ default: SvgComponent }>>;

const svgModules = import.meta.glob<{ default: SvgComponent }>(
  '../../../assets/icons/**/*.svg'
) as SvgModuleMap;

function getLoader(type: string, icon: string) {
  return svgModules[`../../../assets/icons/${type}/${icon}.svg`];
}

export function useIconLoader(icon: string, type: IconType): SvgComponent | null {
  const [component, setComponent] = useState<SvgComponent | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      let loader = getLoader(type, icon);
      // Fallback automático a 'solid' cuando el tipo pedido no existe
      if (!loader && type !== 'solid') {
        loader = getLoader('solid', icon);
      }
      if (!loader) {
        if (!cancelled) setComponent(null);
        return;
      }
      try {
        const mod = await loader();
        if (!cancelled) setComponent(() => mod.default);
      } catch {
        if (!cancelled) setComponent(null);
      }
    }

    resolve();
    return () => { cancelled = true; };
  }, [icon, type]);

  return component;
}
