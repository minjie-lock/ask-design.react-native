import { useConfiguration } from '../../components/configuration';


type ToastOptions = {
  onClose?: () => void;
  /**
   * 提示内容
   */
  content?: React.ReactNode;
  /**
   * 显示时长
  */
  duration?: number;
  /**
   * 图标
  */
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
  /**
   * 显示位置
  */
  position?: 'top' | 'bottom' | 'center';
}

export default function useToast() {

  const toast = useConfiguration(
    configuration => configuration.scheme.hooks.toast
  );

  return {
    show: (options: ToastOptions) => {

    },
    clear: () => {

    },
  };
}
