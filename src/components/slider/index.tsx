/* eslint-disable @typescript-eslint/no-shadow */
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useConfiguration } from '../configuration';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated,
{
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
}
  from 'react-native-reanimated';
import { useRef } from 'react';
import { useControllableValue } from '@/hooks';
import { useBoolean, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { content } from '@/utils';

type Value<T> = T extends true ? number : [number, number];

type Fields = 'icon' | 'active';


type SliderProps<T extends boolean> = {
  /**
   * @description 默认值
   */
  defaultValue?: Value<T>;
  /**
   * @description 值
  */
  value?: Value<T>;
  /**
   * @function onChange
   * @description 值变化时触发
   * @param value
   * @returns {void}
   */
  onChange?: (value: Value<T>) => void;
  /**
   * @description 是否禁用
  */
  disabled?: boolean;
  /**
   * @description 最小值
  */
  min?: number;
  /**
   * @description 最大值
  */
  max?: number;
  /**
   * @description 双滑块
   */
  range?: T;
  /**
   * @description 步长
   */
  step?: number;
  /**
   * @description 图标
   */
  icon?: React.ReactNode;
  /**
   * @description 样式集合
   */
  styles?: Record<Fields, ViewStyle>;
  /**
   * @description 类名集合
   */
  classNames?: Record<Fields, string>;
  /**‘
   * @description 类
  */
  className?: string;
  /**
   * @description 样式
  */
  style?: ViewStyle;
}

/**
 * @function Slider
 * @description CN 滑块
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Slider<T extends boolean>
  (props: SliderProps<T>): React.ReactNode {

  const {
    icon,
    range = false,
    defaultValue,
    className,
    classNames,
    style,
    // step,
    disabled,
    max = 100,
    min = 0,
  } = props;

  const translationX = useSharedValue(0);
  const start = useSharedValue(0);
  const smooth = useSharedValue(0);
  const [active, { setFalse, setTrue }] = useBoolean(false);


  const width = useRef(0);

  const [value, setValue] = useControllableValue({
    value: props?.value,
    defaultValue,
    onChange: props?.onChange,
  });

  const slider = useConfiguration(
    (configuration) => configuration?.scheme?.components?.Slider
  );

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: 10,
      borderRadius: 30,
      backgroundColor: slider?.background?.default,
      opacity: disabled ? 0.7 : 1,
      zIndex: 1,
      ...style,
    },
    track: {
      position: 'absolute',
      top: 0,
      height: 10,
      borderRadius: 30,
      width: `${value as number}%`,
      backgroundColor: slider?.background?.active,
      zIndex: 10,
      ...props?.styles?.active,
    },
    icon: {
      backgroundColor: slider?.icon?.background,
      color: slider?.icon?.color,
      width: 19,
      height: 19,
      top: -5,
      position: 'absolute',
      borderRadius: '50%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10, // 仅适用于 Android
      zIndex: 10,
      ...props?.styles?.icon,
    },
    smooth: {
      position: 'absolute',
      top: 5,
      height: 5,
      filter: 'blur(12px)',
      zIndex: 1,
      width: '100%',
      backgroundColor: slider?.background?.active,
    },
    gesture: { zIndex: 20, inset: 0, position: 'absolute' },
    trackContainer: {
      zIndex: 10,
      position: 'relative',
      inset: 0,
    },
  });

  const onStart = () => {
    if (disabled) {
      return;
    }
    start.value = translationX?.value;
    if (!active) {
      runOnJS(setTrue)();
      smooth.value = withTiming(1, {
        duration: 200,
      });
    }
  };

  const onChange = (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    if (disabled) {
      return;
    }
    if (range) {
      return;
    }
    if (typeof value === 'number') {
      if (value >= max) {
        return;
      }
      if (value <= min) {
        return;
      }
      const maxTranslate = width.current - 19;
      const latest = start.value + event.translationX;
      const clamped = Math.min(Math.max(latest, 0), maxTranslate);
      const percent = (clamped / maxTranslate) * 100;
      translationX.value = clamped;
      runOnJS(setValue)?.(percent);
    }
  };

  const onEnd = () => {
    if (disabled) {
      return;
    }
    if (active) {
      smooth.value = withTiming(0, {
        duration: 200,
      }, () => {
        runOnJS(setFalse)();
      });
    }
  };

  const gesture = Gesture.Pan()?.activeOffsetX([-5, 5])
    .onStart(onStart).onChange(onChange)
    .onEnd(onEnd);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
      ],
    };
  });

  // const trackStyle = useAnimatedStyle(() => {
  //   return {
  //     width: `${progress.value as number}%`,
  //   };
  // });

  // const smoothStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: smooth?.value,
  //   };
  // });

  const onValue = (width: number) => {
    if (Array.isArray(value)) {
      return;
    }
    if (typeof value === 'number') {
      const clampedPercent = Math.min(Math.max(value, 0), 100);
      translationX.value = (clampedPercent / 100) *
        (width - 19);
    }
  };

  const onLayout = useMemoizedFn(({ nativeEvent }) => {
    width.current = nativeEvent?.layout?.width;
    onValue(nativeEvent?.layout?.width);
  });

  useUpdateEffect(() => {
    onValue(width.current);
  }, [value]);

  return (
    <View
      style={styles.container}
      className={className}
      onLayout={onLayout}
    >
      <View style={styles.trackContainer}>
        <Animated.View
          style={[styles.track]}
          className={classNames?.active}
        />
      </View>
      {/* {
        active && <Animated.View
          style={[styles.smooth, smoothStyle]}
        />
      } */}
      <GestureHandlerRootView style={styles?.gesture}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[iconStyle, styles?.icon]}
            className={classNames?.icon}
          >
            {content(icon)}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
