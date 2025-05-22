import { StyleSheet, View } from 'react-native';
import Drawer from '../drawer';
import SeparationLine from '../separation-line';
import Button from '../button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PickerGesture from './gesture';
import { useControllableValue } from '../../hooks';
import { useConfiguration } from '../configuration';

type PickerValue = string | number;

export type PickerItem = {
  label: React.ReactNode
  value: PickerValue;
  key?: string | number
}

/**
 * 提取列数据，对值类型做枚举提醒
 */
type PickerState<T extends readonly PickerItem[][]> = {
  [K in keyof T]: T[K][number]['value'];
};

type PickerProps<T extends PickerItem[][]> = {
  /**
   * 默认值
   */
  defaultValue?: PickerState<T>;
  /**
   * 值
   */
  value?: PickerState<T>;
  /**
   * 变化回调
   */
  onChange?: (value: PickerState<T>) => void;
  /**
   * 项目
   */
  items?: T;
  /**
   * 打开
   */
  open?: boolean;
  /**
   * 关闭
   */
  onClose?: () => void;
}


/**
 * @function Picker
 * @description 弹出选择器
 * @author Lock
 * @param {PickerProps} props
 * @returns {React.ReactNode}
 */
export default function Picker<T extends PickerItem[][]>
  (props: PickerProps<T>): React.ReactNode {
  const {
    items,
    open,
    onClose,
  } = props;

  const [
    value,
    setValue,
  ] = useControllableValue({
    defaultValue: props.defaultValue,
    value: props?.value,
    onChange: props.onChange,
  });

  const picker = useConfiguration(
    (configuration) => configuration.scheme.components.Picker
  );

  const mask = StyleSheet.create({
    top: {
      position: 'absolute',
      height: '40%',
      inset: 0,
      backgroundColor: picker.background,
      zIndex: 1,
      opacity: 0.6,
    },
    bottom: {
      position: 'absolute',
      height: '40%',
      left: 0,
      bottom: 0,
      right: 0,
      top: '60%',
      backgroundColor: picker.background,
      zIndex: 1,
      opacity: 0.6,
    },
  });

  return (
    <Drawer open={open} onClose={onClose} height={300} showClose={false} style={styles.drawer}>
      <View style={styles.header}>
        <Button fill="text" style={styles.button}>取消</Button>
        <Button fill="text" style={styles.button}>确定</Button>
      </View>
      <SeparationLine style={styles.line} />
      <View style={styles.container}>
        <View style={mask.top} />
        <View style={styles.main}>
          <SeparationLine style={styles.line} />
          <GestureHandlerRootView>
            <View style={styles.content}>
              {
                items?.map((item, index) => {
                  const onChange = (state: PickerValue) => {
                    const data = [...(value ?? [])];
                    data?.splice(index, 1, state);
                    setValue(data);
                  };
                  return (
                    <View style={styles.items} key={index}>
                      <PickerGesture
                        onChange={onChange}
                        value={value?.[index]}
                        items={item}
                      />
                    </View>
                  );
                })
              }
            </View>
          </GestureHandlerRootView>
          <SeparationLine style={styles.line} />
        </View>
        <View style={mask.bottom} />
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  line: {
    marginVertical: 0,
  },
  main: {
    width: '100%',
    height: 38,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 0,
  },
  drawer: {
    padding: 0,
  },
});
