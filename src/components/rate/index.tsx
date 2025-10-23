import { StyleSheet, View, ViewStyle } from 'react-native';
import Star from './star';
// import { useState } from 'react';
import { useControllableValue } from '@/hooks';

type RateProps = {
  /**
   * @description 是否允许再次点击后清除
   * @default true
   */
  allowClear?: boolean;
  /**
   * @description 是否允许半选
   * @default false
  */
  allowHalf?: boolean;
  /**
   * @description 自定义字符
   */
  children?: string;
  /**
   * @description star 数量
   * @default 5
  */
  total?: number;
  /**
   * @description 值
   */
  value?: number;
  /**
   * @description 默认值
   */
  defaultValue?: number;
  /**
   * @description 值变化回调
  */
  onChange?: (value: number) => void;
  /**
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @description 样式
   */
  style?: ViewStyle;
  /**
   * @description 类名
   */
  className?: string;
};

/**
 * @function Rate
 * @description 评分
 * @param {RateProps}
 * @returns {React.ReactNode}
 */
export default function Rate(props: RateProps): React.ReactNode {

  const {
    onChange,
    defaultValue,
    total = 5,
    allowClear = true,
    allowHalf = false,
    children,
    style,
    disabled = false,
    className,
  } = props;

  const [value, setValue] = useControllableValue({
    value: props?.value,
    onChange,
    defaultValue,
  });

  const totals = Array.from({ length: total });

  const styles = StyleSheet.create({
    rate: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      ...style,
    },
  });

  return (
    <View style={styles?.rate} className={className}>
      {
        totals?.map(
          (...[, key]) => {
            return (
              <Star
                key={key}
                current={key}
                value={value}
                allowClear={allowClear}
                onChange={setValue}
                allowHalf={allowHalf}
                disabled={disabled}
              >
                {children}
              </Star>
            );
          }
        )
      }
    </View>
  );
}
