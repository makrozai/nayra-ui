import { SVGProps, FunctionComponent } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Nombre del ícono de FontAwesome (ej. 'fas fa-home')
   * o componente SVG importado mediante vite-svg-loader.
   */
  icon?: string | FunctionComponent<SVGProps<SVGSVGElement>>;
  
  /**
   * Color del ícono (se usa fill="currentColor" por defecto en SVGs o color css)
   */
  color?: string;

  /**
   * Tamaño del ícono (en píxeles)
   */
  size?: number;

  /**
   * Título para accesibilidad (aria-label)
   */
  title?: string;
  
  /**
   * Clases adicionales
   */
  className?: string;
}
