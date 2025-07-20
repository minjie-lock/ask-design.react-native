import { useConfiguration } from '@/components/configuration';
import { DialogRef } from '@/components/dialog';


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

  class On {
    static show = dialog?.current.show;
    static hide = dialog?.current.hide;
    static alert = dialog?.current.alert;
    static confirm = dialog?.current.confirm;
  }

  return On as Required<DialogRef>;
}
