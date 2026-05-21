import React, { createContext, useContext, ReactNode } from 'react';

export interface ConfigContextProps {
  /**
   * Prefijo global para las clases CSS generadas.
   * Útil cuando se usa la librería junto a otros frameworks para evitar colisiones.
   * @default 'na'
   */
  prefixCls?: string;
}

const defaultContext: ConfigContextProps = {
  prefixCls: 'na',
};

const ConfigContext = createContext<ConfigContextProps>(defaultContext);

export interface ConfigProviderProps extends ConfigContextProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  prefixCls = 'na',
}) => {
  return (
    <ConfigContext.Provider value={{ prefixCls }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

/**
 * Hook utilitario para generar la clase base (bloque BEM) con su prefijo.
 * @param suffix Nombre del bloque (ej. 'icon', 'button')
 * @returns Cadena concatenada (ej. 'na-icon')
 */
export const usePrefixCls = (suffix: string) => {
  const { prefixCls } = useConfig();
  return prefixCls ? `${prefixCls}-${suffix}` : suffix;
};
