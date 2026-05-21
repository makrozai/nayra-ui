import { create } from 'storybook/theming';
import config from '../nayra.config.json';

const { storybook: sb } = config;

const shared = {
  brandTitle: sb.brand.title,
  brandUrl: sb.brand.url,
  brandImage: sb.brand.image ?? undefined,
  fontBase: sb.fonts.base,
  fontCode: sb.fonts.code,
  appBorderRadius: 6,
  inputBorderRadius: 4,
};

export const lightTheme = create({
  ...shared,
  base: 'light',
  colorPrimary: sb.colors.light.primary,
  colorSecondary: sb.colors.light.secondary,
  appBg: sb.colors.light.appBg,
  appContentBg: sb.colors.light.appContentBg,
  appBorderColor: sb.colors.light.appBorderColor,
  textColor: sb.colors.light.text,
  textMutedColor: sb.colors.light.textMuted,
  barBg: sb.colors.light.barBg,
  barTextColor: sb.colors.light.barText,
  barSelectedColor: sb.colors.light.barSelected,
  barHoverColor: sb.colors.light.primary,
  inputBg: sb.colors.light.inputBg,
  inputBorder: sb.colors.light.inputBorder,
  inputTextColor: sb.colors.light.inputText,
});

export const darkTheme = create({
  ...shared,
  base: 'dark',
  colorPrimary: sb.colors.dark.primary,
  colorSecondary: sb.colors.dark.secondary,
  appBg: sb.colors.dark.appBg,
  appContentBg: sb.colors.dark.appContentBg,
  appBorderColor: sb.colors.dark.appBorderColor,
  textColor: sb.colors.dark.text,
  textMutedColor: sb.colors.dark.textMuted,
  barBg: sb.colors.dark.barBg,
  barTextColor: sb.colors.dark.barText,
  barSelectedColor: sb.colors.dark.barSelected,
  barHoverColor: sb.colors.dark.primary,
  inputBg: sb.colors.dark.inputBg,
  inputBorder: sb.colors.dark.inputBorder,
  inputTextColor: sb.colors.dark.inputText,
});
