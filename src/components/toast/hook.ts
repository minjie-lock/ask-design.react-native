/* eslint-disable react-hooks/exhaustive-deps */
import { useConfiguration } from '../configuration';
import { ToastRef } from '.';
import { useEffect, useRef } from 'react';


/**
 * @function useToast
 * @description 轻提示
 * @author Lock
 * @returns {ToastRef}
 */
export default function useToast(): Required<ToastRef> {

  const toast = useConfiguration(
    configuration => configuration?.hooks?.toast
  );

  const on = useRef<ToastRef>({});


  useEffect(() => {
    Object.assign(on.current, toast?.current);
  }, []);

  return on.current as Required<ToastRef>;
}
