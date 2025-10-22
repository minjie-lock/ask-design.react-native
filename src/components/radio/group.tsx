import { StyleSheet, View, ViewStyle } from 'react-native';
import Radio, { RadioProps } from '.';
import { useControllableValue } from '@/hooks';
import { useMemoizedFn } from 'ahooks';

type Value<T extends Option[]> = T[number]['value'];

type Option = Omit<RadioProps, 'value'> & {
  value: React.Key;
}

export type RaidoGroupProps<T extends Option[]> = {
  /**
   * @description 值
  */
  value?: Value<T>;
  /**
   * @description 值变化回调
   */
  onChange?: (value: Value<T>) => void;
  /**
   * @description 默认值
   */
  defaultValue?: Value<T>;
  /**
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @description 样式
   */
  style?: ViewStyle;
  /**
   * @description 类
   */
  className?: string;
  /**
   * @description 项目
   */
  items?: T;
}

export default function Group<T extends Option[]>
  (props: RaidoGroupProps<T>) {

  const {
    disabled,
    className,
    style,
    items,
    defaultValue,
  } = props;

  const [value, setValue] = useControllableValue<Value<T>>({
    value: props?.value,
    onChange: props?.onChange,
    defaultValue,
  });

  const styles = StyleSheet.create({
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      ...style,
    },
  });

  const onChange = useMemoizedFn((state: Option) => {
    setValue(state?.value);
  });

  return (
    <View style={styles.group} className={className}>
      {
        items?.map(
          (item) => {
            return (
              <Radio
                {...item}
                key={item?.value}
                disabled={disabled ?? item?.disabled}
                value={value === item?.value}
                onChange={() => onChange?.(item)}
              >
                {item?.children}
              </Radio>
            );
          }
        )
      }
    </View>
  );
}
