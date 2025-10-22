import { StyleSheet, View, ViewStyle } from 'react-native';
import Checkbox, { CheckboxProps } from '.';
import { useControllableValue } from '@/hooks';
import { useMemoizedFn } from 'ahooks';

type Value<T extends Option[]> = T[number]['value'][];

type Option = Omit<CheckboxProps, 'value'> & {
  value: React.Key;
}

type CheckboxGroupProps<T extends Option[]> = {
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
  (props: CheckboxGroupProps<T>) {

  const {
    disabled,
    className,
    style,
    items,
    // onChange,
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
    if (value?.includes(state?.value)) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setValue((value: Value<T>) => {
        return value?.filter(key => key !== state?.value);
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setValue((value: Value<T>) => {
        return [...(value ?? []), state?.value];
      });
    }
  });

  return (
    <View style={styles.group} className={className}>
      {
        items?.map(
          (item) => {
            return (
              <Checkbox
                {...item}
                key={item?.value}
                disabled={disabled ?? item?.disabled}
                value={value?.includes(item?.value)}
                onChange={() => onChange?.(item)}
              >
                {item?.children}
              </Checkbox>
            );
          }
        )
      }
    </View>
  );
}
