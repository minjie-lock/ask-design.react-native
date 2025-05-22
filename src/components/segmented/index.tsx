/* eslint-disable @typescript-eslint/no-shadow */
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useControllableValue } from '../../hooks';
import { content } from '../../utils';
import { useConfiguration } from '../configuration';
import Animate, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';


type SegmentedProps = {
  /**
   * @description 默认值
   */
  defaultValue?: string | number;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 选项
   */
  options: Array<{
    label: React.ReactNode;
    value: string | number;
  }>;
  /**
   * 值变化回调
   * @param value
   * @returns
   */
  onChange?: (value: string | number) => void;
  /**
   * @description 当前值
  */
  value?: string | number;
}

/**
 * @function Segmented
 * @description 分段选择器
 * @author Lock
 * @param {Object} props 组件参数
 * @returns {React.ReactNode}
 */
export default function Segmented(props: SegmentedProps): React.ReactNode {


  const {
    disabled = false,
    options,
  } = props;

  const [value, setValue] = useControllableValue({
    defaultValue: props.defaultValue ?? options?.at(0)?.value,
    onChange: props.onChange,
    value: props.value,
  });

  const active = useSharedValue(0);

  const segmented = useConfiguration(
    configuration => configuration.scheme.components.Segmented
  );

  const styles = StyleSheet.create({
    container: {
      width: 'auto',
      flexDirection: 'row',
      backgroundColor: segmented.background.default,
      height: 32,
      position: 'relative',
      alignItems: 'center',
      borderRadius: segmented.round,
    },
    item: {
      paddingHorizontal: 11,
      backgroundColor: 'transparent',
      zIndex: 2,
      width: `${100 / options?.length}%`,
    },
    active: {
      position: 'absolute',
      // width: 'white',
      zIndex: 1,
      inset: 0,
      margin: 3,
      width: `${100 / options?.length}%`,
      borderRadius: segmented.round,
      backgroundColor: segmented.background.active,
    },
  });

  const activeStyles = useAnimatedStyle(() => ({
    transform: [{
      translateX: `${active?.value}%`,
    }],
  }));

  useEffect(() => {
    if (value) {
      const index = options.findIndex(item => item.value === value);
      active.value = withTiming(
        (100 / options?.length) * index,
        {
          duration: 200,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onPress = (value: number | string) => {
    if (disabled) {
      return;
    }
    setValue(value);
  };

  return (
    <View style={styles.container}>
      {
        options.map((item) => {
          return (
            <TouchableWithoutFeedback onPress={() => onPress(item.value)} key={item.value}>
              <View style={styles.item}>
                {content(item.label, {
                  fontSize: 12,
                  textAlign: 'center',
                  color: value === item.value ?
                    segmented.text.active : segmented.text.default,
                })}
              </View>
            </TouchableWithoutFeedback>
          );
        })
      }
      <Animate.View style={[styles.active, activeStyles]} />
    </View>
  );
}
