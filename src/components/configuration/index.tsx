import { createContext, useContext } from 'react';
import type { ConfigurationProps } from './types';
import { light } from '../styles';

type State = Required<Omit<ConfigurationProps, 'children'>>;

const Arrangement = createContext<State>({
  scheme: {
    components: light?.components,
  },
});


/**
 * @function Configuration
 * @description 全局配置组件
 * @param props 
 * @returns 
 */
export default function Configuration(
  props: ConfigurationProps
) {

  const {
    children,
    ...rest
  } = props;

  const value: State = {
    scheme: {
      components: {
        ...light?.components,
        ...rest,
      },
    },
    ...rest,
  };

  return (
    <Arrangement.Provider value={value}>
      {children}
    </Arrangement.Provider>
  );
}


type Fn<F extends Fn<F>> = (configuration: State) => ReturnType<F>;

export function useConfiguration<F extends Fn<F>>(fn?: F):
F extends Function ? ReturnType<F> : State {
  const configuration = useContext(Arrangement);
  if (typeof fn === 'function') {
    return fn(configuration);
  }
  return configuration;
}