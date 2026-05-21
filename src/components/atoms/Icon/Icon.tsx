import React from 'react';
import type { IconProps, IconType } from './types';
import { getIcon } from './iconRegistry';
import '@fortawesome/fontawesome-free/css/all.css';
import './icon.css';

const FA_PREFIX: Record<string, string> = {
  solid: 'fa-solid',
  regular: 'fa-regular',
  brands: 'fa-brands',
};

type A11yProps =
  | { 'aria-label': string; role: 'img' }
  | { 'aria-hidden': true };

function buildA11yProps(ariaLabel?: string): A11yProps {
  return ariaLabel
    ? { 'aria-label': ariaLabel, role: 'img' }
    : { 'aria-hidden': true };
}

function buildWrapperStyle(size?: number, rotate?: number): React.CSSProperties {
  return {
    ...(size !== undefined && { fontSize: size }),
    ...(rotate !== undefined && { transform: `rotate(${rotate}deg)` }),
  };
}

export const Icon: React.FC<IconProps> = ({
  icon,
  source = 'font',
  type = 'solid',
  size,
  ariaLabel,
  rotate,
  className = '',
}) => {
  const wrapperStyle = buildWrapperStyle(size, rotate);
  const a11yProps = buildA11yProps(ariaLabel);

  if (source === 'font') {
    const faPrefix = FA_PREFIX[type] ?? 'fa-solid';
    const classes = ['c-icon', faPrefix, `fa-${icon}`, className].filter(Boolean).join(' ');
    return (
      <span className="c-icon-wrapper" style={wrapperStyle}>
        <i className={classes} {...a11yProps} />
      </span>
    );
  }

  return renderSvgIcon(icon, type, wrapperStyle, className, a11yProps);
};

function renderSvgIcon(
  icon: string,
  type: IconType,
  wrapperStyle: React.CSSProperties,
  className: string,
  a11yProps: A11yProps
): React.ReactElement | null {
  const SvgIcon = getIcon(type, icon);
  if (!SvgIcon) return null;

  const isColorful = type === 'colorful';
  const classes = ['c-icon', isColorful ? 'c-icon--colorful' : 'c-icon--svg', className]
    .filter(Boolean)
    .join(' ');

  return React.createElement(
    'span',
    { className: 'c-icon-wrapper', style: wrapperStyle },
    React.createElement(SvgIcon, {
      className: classes,
      ...(a11yProps as React.SVGProps<SVGSVGElement>),
    })
  );
}
