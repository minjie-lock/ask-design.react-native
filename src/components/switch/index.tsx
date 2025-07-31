import { useControllableValue } from '@/hooks';
import { StyleSheet, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useConfiguration } from '../configuration';
import { useEffect, useState } from 'react';
import Icon from '../icon';
import { NAVY_BLUE } from '@/styles/color';
import { useDebounceEffect } from 'ahooks';

type SwitchProps = {
  /**
   * 指定当前是否打开
  */
  value?: boolean;
  /**
   * 变化时的回调函数，当返回 Promise 时，会自动显示加载状态
  */
  onChange?: (value: boolean) => void | Promise<void>;
  /**
   * 默认值
  */
  defaultValue?: boolean;
  /**
   * 文字
   */
  text?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 加载状态
  */
  loading?: boolean;
  /**
   * 类名
  */
  className?: string;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 激活颜色
  */
  color?: string;
  /**
   * 尺寸
  */
  size?: 'small' | 'medium' | 'large';
  /**
   * 类型
   * @enum circle 圆角
   * @enum square 方形
  */
  shape?: 'circle' | 'square';
}

/**
 * @function Switch
 * @description 开关
 * @author Lock
 * @param {SwitchProps} porps
 * @returns {React.ReactNode}
 */
export default function Switch(porps: SwitchProps): React.ReactNode {

  const {
    text,
    disabled = false,
    className,
    style,
    color,
    shape = 'circle',
  } = porps;

  const [value, setValue] = useControllableValue({
    value: porps?.value,
    defaultValue: porps?.defaultValue,
    onChange: porps?.onChange,
  });

  const [loading, setLoading] = useState(porps.loading);

  const scheme = useConfiguration(
    configuration => configuration.scheme.components.Switch
  );

  const active = useSharedValue(15);
  const container = useSharedValue(scheme.background.default);
  const contents = useSharedValue(65);
  const load = useSharedValue(0);
  // const border = useSharedValue(scheme.border);

  const activeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: `${active.value}%`,
      },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: container.value,
    // borderColor: border.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: `${contents.value}%`,
      },
    ],
  }));

  const loadingStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${load.value}deg`,
      },
    ],
  }));

  const onPress = async () => {
    const result = porps?.onChange?.(!value);
    if (result instanceof Promise) {
      setLoading(true);
      await result;
      setLoading(false);
      setValue(!value);
      return;
    }
    setValue(!value);
  };

  useEffect(() => {
    active.value = withTiming(
      value ? 100 : 15,
      {
        duration: 500,
      }
    );
    contents.value = withTiming(
      value ? 55 : 65,
      {
        duration: 500,
      }
    );
    container.value = withTiming(
      value ? color ?? scheme.background.active :
        scheme.background.default,
      {
        duration: 500,
      }
    );
    // border.value = withTiming(
    //   value ? color ?? scheme.background.active :
    //     scheme.border,
    //   {
    //     duration: 500,
    //   }
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 开启加载动画
  useDebounceEffect(() => {
    if (loading) {
      load.value = withRepeat(
        withTiming(360, {
          duration: 1000,
        }), -1);
    } else {
      load.value = 0;
    }
    return () => {
      load.value = 0;
    };
  }, [loading], {
    wait: 300,
  });

  useDebounceEffect(() => {
    setLoading(porps?.loading);
  }, [porps?.loading]);


  const styles = StyleSheet.create({
    container: {
      width: 57,
      height: 32,
      borderRadius: shape === 'square' ? 5 : 30,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      opacity: disabled || loading ? 0.5 : 1,
      // borderWidth: 2,
      // borderColor: value ? 'transparent' : scheme.border,
      ...style,
    },
    active: {
      width: 25.5,
      height: 25.5,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      borderRadius: shape === 'square' ? 5 : '50%',
      elevation: 10, // 仅适用于 Android
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    text: {
      position: 'absolute',
      ...(value ? {} : { right: 18 }),
    },
    content: {
      color: value ? scheme.text.active :
        scheme.text.default,
    },
  });

  return (
    <Animated.View className={className} style={
      [
        styles.container,
        containerStyle,
      ]
    }>
      <TouchableWithoutFeedback
        disabled={disabled || loading}
        onPress={onPress}>
        <Animated.View style={
          [
            styles?.active,
            activeStyle,
          ]
        }>
          {
            loading && <Animated.View style={[loadingStyle]}>
              <Icon name="loading-3-quarters" color={NAVY_BLUE.five} />
            </Animated.View>
          }
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[
        styles.text,
        contentStyle,
      ]}>
        <Text style={styles?.content}>
          {value ? text?.checked : text?.unchecked}
        </Text>
        {/* {
          content(
            value ? text?.checked : text?.unchecked,
            styles.text,
          )
        } */}
      </Animated.View>
    </Animated.View>
  );
}

