import { useEffect } from 'react';
import { useConfiguration } from '../../components/configuration';
import { ToastRef } from '../../components/toast';


/**
 * @function useToast
 * @description 轻提示
 * @author Lock
 * @returns
 */
export default function useToast() {

  const toast = useConfiguration(
    configuration => configuration.hooks.toast
  );

  const on = {};

  useEffect(() => {
    Object.assign(on, toast.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return on as ToastRef;
}
