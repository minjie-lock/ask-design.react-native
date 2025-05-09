/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, ViewStyle } from 'react-native';
import Item from './item';
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useControllableValue } from '../../hooks';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SwiperContext = createContext<number | null>(null);

/**
 * @function useSwiper
 * @description 轮播值
 * @returns
 */
export const useSwiper = () => {
  return useContext(SwiperContext);
};

export const useSwiperRef = () => {
  return useRef<{
    to: (index: number) => void;
    next: () => void;
    prev: () => void;
  }>(null);
};

type SwiperProps = {
  ref?: React.RefObject<unknown>;
  /**
   * 是否允许手势滑动
  */
  allowTouchMove?: boolean;
  /**
   * 自动播放
  */
  autoplay?: boolean;
  /**
   * 自动切换的间隔，单位为 ms
  */
  autoplayInterval?: number;
  /**
   * 方向
  */
  direction?: 'horizontal' | 'vertical';
  /**
   * 自定义指示器
  */
  indicator?: (total: number, current: number) => React.ReactNode;
  /**
   * 指示器的相关属性
  */
  indicatorProps?: unknown;
  /**
   * 是否循环
  */
  loop?: boolean;
  /**
   * 值
  */
  value?: number;
  /**
   * 默认值
  */
  defaultValue?: number;
  /**
   * 切换触发
  */
  onChange?: (current?: number) => void;
  /**
   * 子级
  */
  children?: React.ReactNode;
  /**
   * 样式
   */
  style?: ViewStyle;
  /**
   * 宽度
  */
  width?: number;
  /**
   * 高度
  */
  height?: number;
}

export default function Swiper({ ref, ...props }: SwiperProps) {

  const {
    allowTouchMove = true,
    autoplay = false,
    autoplayInterval = 1000,
    direction = 'horizontal',
    indicator,
    loop = true,
    onChange,
    style,
    children,
    width = 100,
    height = 120,
    ...rest
  } = props ?? {};

  const horizontal = direction === 'horizontal';
  const count = Children.count(children) + 2;
  const [value, setValue] = useControllableValue<Required<SwiperProps>['value']>({
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange,
  });

  const current = useSharedValue(1);
  const interval = useRef(null);
  const timeout = useRef(null);
  const translate = useSharedValue(
    horizontal ? -width : -height
  );
  useImperativeHandle(ref, () => {
    return {
      next: () => {
        current.value += 1;
        setValue(value + 1);
      },
      prev: () => {
        current.value -= 1;
        setValue(value - 1);
      },
      to: (index: number) => {
        current.value = index;
        setValue(index);
      },
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        [
          horizontal ?
            'translateX'
            : 'translateY'
        ]: translate.value,
      }],
    };
  });

  const onAutoplay = useCallback(() => {
    if (autoplay) {
      interval.current = setInterval(() => {
        current.value++;
        runOnJS(setValue)(current.value);
        translate.value = withTiming(-current.value * (horizontal ? width : height), {
          duration: 1000,
        }, () => {
          /**
           * 值会滞前所以减一
           */
          if (current.value - 1 === count - 1) {
            current.value = 1;
            translate.value = -(horizontal ? width : height);
          }
        });
        if (!loop) {
          clearInterval(interval.current!);
        }
      }, autoplayInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, autoplayInterval, autoplay]);

  const clearTimer = () => {
    if (autoplay) {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  };

  /**
   * 长按停止轮播
  */
  useEffect(() => {
    onAutoplay();
    return clearTimer;
  }, [onAutoplay]);

  const setTimer = () => {
    clearTimeout(timeout.current!);
    timeout.current = setTimeout(() => {
      onAutoplay?.();
    }, 1000);
  };

  const transform = (
    translation: 'translationX' | 'translationY',
    dimension: number
  ) => {
    if (!allowTouchMove) {
      return Gesture.Pan();
    }
    return Gesture.Simultaneous(
      Gesture.LongPress().onStart(() => {
        runOnJS(clearTimer)();
      }),
      Gesture.Pan().onStart(() => {
        runOnJS(clearTimer)();
      }).onUpdate((event) => {
        translate.value = -current.value * dimension + event[translation]; // ✅ 滑动时实时更新位置
      }).onEnd((event) => {
        if (event[translation] > 50 && current.value > 0) {
          current.value -= 1; // 左滑
        } else if (event[translation] < -50 && current.value < count - 1) {
          current.value += 1;
        }
        runOnJS(setValue)(
          current.value,
        );
        translate.value = withTiming(-current.value * dimension, {
          duration: 500,
        }, () => {
          if (current.value === count - 1) {
            current.value = 1;
            translate.value = -dimension;
            return;
          }
          if (current.value === 0) {
            current.value = count - 2;
            translate.value = -current.value * dimension;
            return;
          }
          if (!interval.current) {
            // runOnJS(setTimer)();
          }
        }); // ✅ 平滑切换
      })
    );
  };

  const gesture = {
    horizontal: transform('translationX', width),
    vertical: transform('translationY', height),
  };

  const styles = StyleSheet.create<{
    main: ViewStyle;
    content: ViewStyle;
    indicators: ViewStyle;
  }>({
    main: {
      width,
      height,
      overflow: 'hidden',
      position: 'relative',
    },
    content: {
      width,
      height,
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      // transform: [
      //   transform[direction]?.().style,
      // ],
      ...style,
    },
    indicators: {
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      justifyContent: 'center',
      position: 'absolute',
      gap: 5,
      width: horizontal ? '100%' : 'auto',
      height: horizontal ? 'auto' : '100%',
      bottom: horizontal ? 10 : '-10%',
      right: horizontal ? 'auto' : 10,
    },
  });


  return (
    <SwiperContext.Provider value={value}>
      <View style={styles.main}>
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture[direction]}>
            <Animated.View style={[
              styles.content,
              animatedStyle,
            ]}>
              {Children.toArray(children)?.at(-1)}
              {children}
              {Children.toArray(children)?.at(0)}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={styles.indicators}>
          {
            typeof indicator === 'function' ? indicator(Children.count(children), value) :
              (
                Array.from({
                  length: Children.count(children),
                })?.map((...[, index]) => {
                  const total = Children.count(children) + 2;
                  const content = (value - 1) === index || (index === 0 && total - 1 === value) || (index === total - 3 && value === 0);
                  return (
                    <Animated.View key={index} style={{
                      width: horizontal ? content ? 15 : 4 : 4,
                      height: horizontal ? 4 : content ? 15 : 4,
                      backgroundColor: content ? 'blue' : '#CCC',
                    }} />
                  );
                })
              )
          }
        </View>
      </View>
    </SwiperContext.Provider>
  );
};

Swiper.Item = Item;

