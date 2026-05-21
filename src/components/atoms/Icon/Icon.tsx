import React from 'react';
import { usePrefixCls } from '~/config/ConfigProvider';
import { IconProps } from './types';
import '@fortawesome/fontawesome-free/css/all.css';
import './icon.css';

export const Icon: React.FC<IconProps> = ({
  icon,
  color,
  size = 24,
  title,
  className = '',
  ...props
}) => {
  const prefixCls = usePrefixCls('icon');
  const isFontAwesome = typeof icon === 'string';
  const a11yProps = title ? { 'aria-label': title, role: 'img' } : { 'aria-hidden': true };

  const style = {
    color,
    fontSize: isFontAwesome ? size : undefined,
    width: !isFontAwesome ? size : undefined,
    height: !isFontAwesome ? size : undefined,
  };

  const classes = [prefixCls, isFontAwesome ? icon : '', className].filter(Boolean).join(' ');

  if (isFontAwesome) {
    return (
      <i
        className={classes}
        style={style}
        {...a11yProps}
      />
    );
  }

  if (icon) {
    const SvgIcon = icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    return (
      <SvgIcon
        className={classes}
        style={{ ...style, fill: 'currentColor' }}
        {...a11yProps}
        {...props}
      />
    );
  }

  return null;
};
