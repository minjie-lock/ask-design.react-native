import { useEffect } from 'react';
import { useConfiguration } from '../../components/configuration';
import { DialogRef } from '../../components/dialog';


/**
 * @function useDialog
 * @description 对话
 * @author Lock
 * @returns
 */
export default function useDialog() {

  const dialog = useConfiguration(
    configuration => configuration?.hooks?.dialog
  );

  const on = {};

  useEffect(() => {
    Object.assign(on, dialog?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return on as DialogRef;
}
