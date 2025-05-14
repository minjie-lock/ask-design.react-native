import { createContext, Fragment, useContext, useRef } from 'react';
import type { ConfigurationProps } from './types';
import { light } from '../styles';
import Toast, { ToastRef } from '../toast';

type State = Required<Omit<ConfigurationProps, 'children'>>;

const Arrangement = createContext<State>({
  scheme: {
    components: light?.components,
  },
  hooks: {
    toast: {
      current: {
        show: () => {

        },
        hide: () => {

        },
      },
    },
  },
});


/**
 * @function Configuration
 * @description 全局配置组件
 * @author Lock
 * @param props;
 * @returns;
 */
export default function Configuration(
  props: ConfigurationProps
) {

  const {
    children,
    ...rest
  } = props;

  const toast = useRef<ToastRef>({});

  const value: State = {
    scheme: {
      components: {
        ...light?.components,
        ...rest,
      },
    },
    hooks: {
      toast,
    },
    ...rest,
  };

  return (
    <Fragment>
      <Arrangement.Provider value={value}>
        {children}
      </Arrangement.Provider>
      <Toast ref={toast} />
    </Fragment>
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
