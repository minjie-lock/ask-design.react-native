/* eslint-disable react-hooks/exhaustive-deps */
import { useConfiguration } from '@/components/configuration';
import { DialogRef } from '@/components/dialog';
import { useEffect, useRef } from 'react';


/**
 * @function useDialog
 * @description 对话
 * @author Lock
 * @returns
 */
export default function useDialog(): DialogRef {

  const dialog = useConfiguration(
    configuration => configuration?.hooks?.dialog
  );

  const on = useRef({});

  useEffect(() => {

    Object.assign(on.current, dialog?.current);
  }, []);

  return on.current;
}
