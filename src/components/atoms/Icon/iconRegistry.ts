import type { SVGProps, FunctionComponent } from 'react';
import * as Solid from '~/assets/icons/solid';
import * as Regular from '~/assets/icons/regular';
import * as Colorful from '~/assets/icons/colorful';

export type SvgFC = FunctionComponent<SVGProps<SVGSVGElement>>;
type Registry = Record<string, Record<string, SvgFC>>;

export const iconRegistry: Registry = {
  solid: {
    'arrow-path': Solid.ArrowPath,
    'bolt': Solid.Bolt,
    'custom-star': Solid.CustomStar,
    'plus': Solid.Plus,
    'minus': Solid.Minus,
  },
  regular: {
    'arrow-path': Regular.ArrowPath,
    'bolt': Regular.Bolt,
    'custom-star': Regular.CustomStar,
    'plus': Regular.Plus,
    'minus': Regular.Minus,
  },
  colorful: {
    'tech-vue': Colorful.TechVue,
  },
};

export function getIcon(type: string, icon: string): SvgFC | null {
  return iconRegistry[type]?.[icon] ?? iconRegistry['solid']?.[icon] ?? null;
}
