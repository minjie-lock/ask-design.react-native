/* eslint-disable @typescript-eslint/no-shadow */
import { View, StyleSheet, TouchableHighlight, TextInput, ViewStyle } from 'react-native';
import Icon from '../icon';
import { useConfiguration } from '../configuration';
import { useControllableValue } from '@/hooks';
import { useDebounceFn, useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import Decimal from 'bignumber.js';


type architecture = 'root' | 'increase' | 'decrease' | 'input';

type StepperValue<T> = T extends 'string' ? string : number;


export type StepperPrps<T extends 'string' | 'number'> = {
  /**
   * 是否允许内容为空
  */
  allowEmpty?: boolean;
  /**
   * 默认值
   */
  defaultValue?: StepperValue<T>;
  /**
   * 格式化到小数点后固定位数，设置为 0 表示格式化到整数。配置 formatter 时展示会以 formatter 为准
   */
  digits?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 格式化展示数值
   */
  formatter?: (value: StepperValue<T>) => string;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   * 最大值
   */
  max?: StepperValue<T>;
  /**
   * 最小值
   */
  min?: StepperValue<T>;
  /**
   * 值变化回调
   */
  onChange?: (value: StepperValue<T>) => void;
  /**
   * 步进值
   */
  step?: StepperValue<T>;
  /**
   * 字符值模式，开启后支持高精度小数。开启后 defaultValue、value、min、max、onChange 等都将转换为 string 类型
   */
  mode?: T;
  /**
   * 受控值
   */
  value?: StepperValue<T>;
  /**
   * 类名
   */
  classNames?: {
    [K in architecture]?: string;
  };
  /**
   * 样式
   */
  styles?: {
    [K in architecture]?: ViewStyle;
  };
}

/**
 * @function Stepper
 * @description 步进器
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Stepper<T extends 'string' | 'number'>(props: StepperPrps<T>): React.ReactNode {

  const {
    step = 1,
    digits = 0,
    readonly = false,
    defaultValue = 0,
    max,
    min,
    mode = 'number',
    disabled = false,
    formatter,
    classNames,
    styles: style,
  } = props;

  const [value, setValue] = useControllableValue<StepperValue<T>>({
    value: props?.value,
    onChange: props.onChange,
    defaultValue: defaultValue as StepperValue<T>,
  });

  /**
   * 控制输入状态和展示状态
  */
  const [isFocus, setIsFocus] = useState(false);

  // 增加
  const onIncrease = () => {
    switch (mode) {
      case 'string':
        setValue((value: StepperValue<T>) => {
          if (mode === 'string') {
            const one = new Decimal(value);
            const two = new Decimal(step);
            return one.plus(two).toFormat();
          }
        });
        break;
      default:
        if (typeof step !== 'number') {
          return;
        }
        setValue((value: number) => value + step);
        break;
    }

  };

  // 减少
  const onDecrease = () => {
    switch (mode) {
      case 'string':
        setValue((value: StepperValue<T>) => {
          if (mode === 'string') {
            const one = new Decimal(value);
            const two = new Decimal(step);
            return one.minus(two).toFormat();
          }
        });
        break;
      default:
        if (typeof step !== 'number') {
          return;
        }
        setValue((value: number) => value - step);
        break;
    }

  };

  const stepper = useConfiguration(
    (configuration) =>
      configuration.scheme.components.Stepper
  );

  const createMeno = useMemoizedFn(() => {
    let one = false;
    let two = false;
    switch (mode) {
      case 'string':
        if (typeof max === 'string') {
          one = !new Decimal(value).comparedTo(new Decimal(max));
        }
        if (typeof min === 'string') {
          two = !new Decimal(value).comparedTo(new Decimal(min));
        }
        break;
      default:
        if (typeof value !== 'number') {
          return;
        }
        if (typeof max === 'number') {
          one = value >= max;
        }
        if (typeof min === 'number') {
          two = value <= min;
        }
        break;
    }
    return [one, two];
  });

  const [one, two] = createMeno() ?? [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 3,
      ...style?.root,
    },
    input: {
      backgroundColor: stepper.background?.default,
      height: 28,
      width: 'auto',
      minWidth: 40,
      // textAlignVertical: 'center'
      paddingHorizontal: 10,
      opacity: disabled ? 0.5 : 1,
      ...style?.input,
    },
    increase: {
      ...button,
      backgroundColor: stepper.background?.default,
      opacity: one ? 0.5 : 1,
      ...style?.increase,
    },
    decrease: {
      ...button,
      backgroundColor: stepper.background?.default,
      opacity: two ? 0.5 : 1,
      ...style?.decrease,
    },
  });
  // 限制输入且防抖
  const createRestrict = useDebounceFn((text) => {
    const one = typeof max === 'number' && +text >= max;
    const two = typeof min === 'number' && +text <= min;
    if (two) {
      setValue(min);
      return;
    }
    if (one) {
      setValue(max);
      return;
    }
  });

  const onChange = (text: string) => {
    setValue(+text.replace(/[^0-9]/g, ''));
    createRestrict.run(text);
  };

  // 值展示处理
  const end = Array?.from({ length: digits })?.map(() => '0')?.join('');
  const current = formatter?.(value) ?? digits ? value + '.' + end : value + '';

  return (
    <View style={styles.container} className={classNames?.root}>
      <TouchableHighlight
        onPress={onDecrease}
        style={styles.decrease}
        disabled={disabled || two}
        underlayColor={stepper.background?.active}
        className={classNames?.decrease}
      >
        <Icon
          name="minus"
          color={
            disabled ? stepper?.color?.inactive :
              two ? stepper.color.inactive : stepper.color.active
          }
        />
      </TouchableHighlight>
      <TextInput
        keyboardType="numeric"
        onChangeText={onChange}
        value={isFocus ? value + '' : current}
        readOnly={disabled ? disabled : readonly}
        textAlign="center"
        style={styles?.input}
        className={classNames?.input}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      <TouchableHighlight
        onPress={onIncrease}
        style={styles?.increase}
        disabled={disabled || one}
        underlayColor={stepper.background?.active}
        className={classNames?.increase}
      >
        <Icon name="plus"
          color={
            disabled ? stepper?.color.inactive :
              one ? stepper.color.inactive :
                stepper.color.active
          }
        />
      </TouchableHighlight>
    </View>
  );
}

const button: ViewStyle = {
  height: 28,
  width: 28,
  justifyContent: 'center',
  alignItems: 'center',
};
