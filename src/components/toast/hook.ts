import { useEffect } from 'react';
import { useConfiguration } from '../configuration';
import { ToastRef } from '.';


/**
 * @function useToast
 * @description 轻提示
 * @author Lock
 * @returns
 */
export default function useToast() {

  const toast = useConfiguration(
    configuration => configuration?.hooks?.toast
  );

  const on = {};

  useEffect(() => {
    Object.assign(on, toast?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return on as Required<ToastRef>;
}
