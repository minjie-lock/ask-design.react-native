import { StyleSheet, View } from 'react-native';
import { DialogRef } from '.';
import Button, { ButtonProps } from '../button';
import Space from '../space';
import SeparationLine from '../separation-line';

type ActionButtonOptions<T extends keyof DialogRef> =  T extends 'alert' ? DialogOptions.Alert :
  T extends 'confirm' ? DialogOptions.Confirm : DialogOptions.Show;


type Action = Omit<ButtonProps, 'childeren' | 'fill'> & {
  key: string;
  text: ButtonProps['children'];
};

export namespace DialogOptions {
  export type Show = {
    /**
     * 标题
     */
    title?: React.ReactNode;
    /**
     * 内容
     */
    content?: React.ReactNode;
    /**
     * 按钮组
    */
    actions?: Action[];
    /**
     * 是否显示遮罩
    */
    mask?: boolean;
    /**
     * 是否点击
    */
    maskClose?: boolean;
  };

  export type Alert = Show & {
    confirmText?: string;
    onConfirm?: () => (void | Promise<void>);
  };

  export type Confirm = Alert & {
    cancelText?: string;
    onCancel?: () => (void | Promise<void>);
  };
}

export default function ActionButton<T extends keyof DialogRef>(
  props:
    {
      type: T;
      onHide?: (value: boolean | 'alert') => void;
      options?: ActionButtonOptions<T>;
    }
) {
  const {
    type,
    onHide,
    options,
  } = props;


  const styles = StyleSheet.create({
    line: {
      marginHorizontal: 0,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      width: '50%',
    },
  });

  switch (type) {
    case 'show':
      return null;
    case 'alert':
      const onPress = () => {
        options?.onConfirm?.();
        onHide?.('alert');
      };
      return (
        <Button fill="text" onPress={onPress}>
          {options?.confirmText ?? '我知道了'}
        </Button>
      );
    case 'confirm':
      return (
        <Space justif="space-between">
          <View style={styles.button}>
            <Button fill="text" onPress={async () => {
              await options?.onCancel?.();
              onHide?.(false);
            }}>
              取消
            </Button>
          </View>
          <SeparationLine
            style={styles.line}
            direction="vertical"
          />
          <View style={styles.button}>
            <Button fill="text" onPress={async () => {
              await options?.onConfirm?.();
              onHide?.(true);
            }}>
              确定
            </Button>
          </View>
        </Space>
      );
    default:
      return null;
  }
}
