/* eslint-disable @typescript-eslint/no-shadow */
import { View, StyleSheet, TouchableHighlight, TextInput, ViewStyle, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import Icon from '../icon';
import { useConfiguration } from '../configuration';
import { useControllableValue } from '@/hooks';
import { useDebounceFn } from 'ahooks';


export type StepperPrps = {
  /**
   * 是否允许内容为空
  */
  allowEmpty?: boolean;
  /**
   * 默认值
   */
  defaultValue?: number;
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
  formatter?: (value: number) => string;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 值变化回调
   */
  onChange?: (value: number) => void;
  /**
   * 步进值
   */
  step?: number;
  /**
   * 字符值模式，开启后支持高精度小数。开启后 defaultValue、value、min、max、onChange 等都将转换为 string 类型
   */
  mode?: 'string' | 'number';
  /**
   * 受控值
   */
  value?: number;
  /**
   * 类名
   */
  classNames?: {
    /**
     * 增加按钮类名
    */
    increase?: string;
    /**
     * 减少按钮类名
    */
    decrease?: string;
    /**
     * 输入框类名
    */
    input?: string;
    /**
     * 根节点类名
    */
    root?: string;
  }
}

/**
 * @function Stepper
 * @description 步进器
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Stepper(props: StepperPrps): React.ReactNode {

  const {
    step = 1,
    readonly = false,
    defaultValue = 1,
    max,
    min,
    disabled = false,
    formatter,
    classNames,
  } = props;

  const [value, setValue] = useControllableValue<number>({
    value: props?.value,
    onChange: props.onChange,
    defaultValue,
  });

  // 增加
  const onIncrease = () => {
    if (typeof max === 'number') {
      if (value >= max) { return; }
    }
    setValue((value: number = 0) => +value + step);
  };

  // 减少
  const onDecrease = () => {
    if (typeof min === 'number') {
      if (value <= min) { return; }
    }
    setValue((value: number = 0) => +value - step);
  };

  const stepper = useConfiguration(
    (configuration) =>
      configuration.scheme.components.Stepper
  );

  const one = typeof max === 'number' && value >= max;
  const two = typeof min === 'number' && value <= min;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 3,
    },
    input: {
      backgroundColor: stepper.background?.default,
      height: 28,
      width: 'auto',
      minWidth: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      opacity: disabled ? 0.5 : 1,
    },
    increase: {
      ...button,
      backgroundColor: stepper.background?.default,
      opacity: one ? 0.5 : 1,
    },
    descrease: {
      ...button,
      backgroundColor: stepper.background?.default,
      opacity: two ? 0.5 : 1,
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


  return (
    <View style={styles.container} className={classNames?.root}>
      <TouchableHighlight
        onPress={onDecrease}
        style={styles.descrease}
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
        value={formatter?.(value) ?? value + ''}
        readOnly={disabled ? disabled : readonly}
        textAlign="center"
        style={styles?.input}
        className={classNames?.input}
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
