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

  class On {
    static show = toast?.current?.show;
    static hide = toast?.current.hide;
  }


  // useEffect(() => {
  //   Object.assign(on, toast);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return On as unknown as Required<ToastRef>;
}
