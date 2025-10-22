import { View, ViewStyle, StyleSheet, TouchableNativeFeedback } from 'react-native';
import
Animated,
{
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { content } from '../../utils';
import { useConfiguration } from '../configuration';
import { useBoolean, useMemoizedFn } from 'ahooks';
import Icon from '../icon';
import { lazy, useEffect, useImperativeHandle } from 'react';
import { useControllableValue } from '@/hooks';

export type CheckboxRef = {
  /**
   * @function check
   * @description 触发选中
   * @returns {void}
   */
  check: () => void;
  /**
   * @function uncheck
   * @description 触发取消选中
   * @returns {void}
   */
  uncheck: () => void;
  /**
   * @function toggle
   * @description 触发选中状态切换
   * @returns {void}
   */
  toggle: () => void;
};

export type CheckboxProps = {
  /**
   * @description 获取内部方法句柄
   */
  ref?: React.Ref<CheckboxRef>;
  /**
   * @description 是否渲染为块级元素
  */
  block?: boolean;
  /**
   * @description 指定当前是否选中
  */
  value?: boolean;
  /**
   * @description 默认是否选中
  */
  defaultValue?: boolean;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 图标
   */
  icon?: React.ReactNode;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * @description 设置半选状态，只负责样式控制
   */
  indeterminate?: boolean;
  /**
   * @description 值变化时的回调函数
   */
  onChange?: (value: boolean) => void;
  /**
   * @description 触摸
   */
  onPress?: () => void;
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: ViewStyle;
}


/**
 * @function Checkbox
 * @description 复选框
 * @author Lock
 * @param {CheckboxProps} props
 * @returns {React.ReactNode}
 */
export default function Checkbox(props: CheckboxProps): React.ReactNode {

  const {
    style,
    className,
    onChange,
    block,
    ref,
    value: current = false,
    indeterminate,
    children,
    disabled,
    defaultValue,
  } = props;

  const [value, setValue] = useControllableValue({
    value: current,
    defaultValue,
    onChange,
  });

  const checkbox = useConfiguration(
    configuration => configuration?.scheme?.components?.Checkbox,
  );

  const indeterminates = useSharedValue(0);
  const background = useSharedValue(0);
  const icon = useSharedValue(0);
  const [hide, { set }] = useBoolean(false);
  const [show, { setFalse, setTrue }] = useBoolean(false);

  const onPress = useMemoizedFn(() => {
    setValue(!value);
    if (props?.onPress) {
      props?.onPress?.();
    }
  });

  useEffect(() => {
    if (indeterminate) {
      runOnJS(setTrue)();
      indeterminates.value = withSpring(1, {
        duration: 500,
      });
    } else {
      indeterminates.value = withSpring(0, {
        duration: 500,
      }, () => {
        runOnJS(setFalse)();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indeterminate]);

  useEffect(() => {
    if (value) {
      runOnJS(set)(value);
      background.value = 1;
      icon.value = withSpring(
        1,
        {
          duration: 500,
        },
      );
    } else {
      background.value = 0;
      icon.value = withSpring(
        0,
        {
          duration: 500,
        },
        () => {
          runOnJS(set)(value);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const indeterminateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: indeterminates?.value,
        },
      ],
    };
  });

  // const checkboxStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: value ? checkbox?.background?.active :
  //     checkbox?.background?.default,
  //   };
  // });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: icon?.value,
        },
      ],
    };
  });

  useImperativeHandle(ref, () => {
    return {
      toggle: () => {
        setValue(!value);
      },
      uncheck: () => {
        setValue(false);
      },
      check: () => {
        setValue(true);
      },
    };
  });

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      opacity: disabled ? 0.7 : 1,
      width: block ? '100%' : 'auto',
      ...style,
    },
    checkbox: {
      width: 19,
      height: 19,
      backgroundColor: value ? checkbox?.background?.active :
        checkbox?.background?.default,
      borderColor: checkbox?.border,
      borderWidth: 1,
      borderRadius: checkbox?.round,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // ...(value ? {} : {
      //   borderColor: checkbox?.border,
      //   borderWidth: 1,
      //   borderRadius: checkbox?.round,
      // }),
    },
    icon: {
      color: 'white',
    },
    indeterminate: {
      width: 12,
      height: 12,
      borderRadius: checkbox?.round,
      backgroundColor: checkbox?.background?.active,
    },
  });

  return (
    <View style={styles.container} className={className}>
      <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
        <Animated.View style={[styles?.checkbox]}>
          {
            hide && (
              <Animated.View style={[iconStyle]}>
                {
                  props?.icon ? content(props?.icon) : (
                    value && <Icon name="check" style={styles.icon} />
                  )
                }
              </Animated.View>
            )
          }
          {
            (!value && show) && (
              <Animated.View
                style={[styles?.indeterminate, indeterminateStyle]}
              />
            )
          }
        </Animated.View>
      </TouchableNativeFeedback>
      <View>
        {content(children)}
      </View>
    </View>
  );
}


Checkbox.Group = lazy(() => import('./group'));
