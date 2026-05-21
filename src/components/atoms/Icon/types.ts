export type IconSource = 'font' | 'svg';
export type IconType = 'solid' | 'regular' | 'brands' | 'colorful';

export interface IconProps {
  icon: string;
  source?: IconSource;
  type?: IconType;
  size?: number;
  ariaLabel?: string;
  rotate?: number;
  className?: string;
}
