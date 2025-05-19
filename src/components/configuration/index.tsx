import { createContext, useContext, useRef } from 'react';
import type { ConfigurationProps } from './types';
import { dark, light } from '../styles';
import Toast, { ToastRef } from '../toast';
import Dialog, { DialogRef } from '../dialog';
import { useColorScheme } from 'react-native';

type State = Required<Omit<ConfigurationProps, 'children' | 'hooks'>> &
{
  hooks?: ConfigurationProps['hooks']
};

const Arrangement = createContext<State>({
  scheme: {
    components: light?.components,
  },
});


/**
 * @function Configuration
 * @description 全局配置组件
 * @author Lock
 * @param props;
 * @returns {React.ReactNode}
 */
export default function Configuration(
  props: ConfigurationProps
): React.ReactNode {

  const {
    children,
    ...rest
  } = props;

  const toast = useRef<ToastRef | {}>({});
  const dialog = useRef<DialogRef | {}>({});

  const scheme = useColorScheme();

  const value: State = {
    scheme: {
      components: {
        ...(scheme === 'dark' ? dark?.components : light?.components),
        ...rest.scheme?.components,
      },
    },
    hooks: {
      toast,
      dialog,
    },
    ...rest,
  };

  return (
    <Arrangement.Provider value={value}>
      {children}
      <Toast ref={toast as React.RefObject<ToastRef>} />
      <Dialog ref={dialog as React.RefObject<DialogRef>} />
    </Arrangement.Provider>
  );
}


type Fn<F extends Fn<F>> = (configuration: State) => ReturnType<F>;
type Configuration<F extends Fn<F>> = F extends Function ? ReturnType<F> : State;

export function useConfiguration<F extends Fn<F>>(
  fn?: F
): Configuration<F> {
  const configuration = useContext(Arrangement);

  if (typeof fn === 'function') {
    return fn(configuration) as Configuration<F>;
  }
  return configuration as Configuration<F>;
}
