/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, ViewStyle } from 'react-native';
import Item, { SwiperItemProps } from './item';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { useControllableValue } from '../../hooks';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SwiperContext = createContext({
  width: '100%',
  height: '100%',
  current: null,
});

/**
 * @function useSwiper
 * @description 轮播值
 * @returns
 */
export const useSwiper = () => {
  return useContext(SwiperContext);
};

type SwiperProps = {
  ref?: React.RefObject<unknown>;
  /**
   * 是否允许手势滑动
  */
  allowTouchMove?: boolean;
  /**
   * 是否允许切换
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
  width?: ViewStyle['width'];
  /**
   * 高度
  */
  height?: ViewStyle['height'];
}

export default function Swiper(props: SwiperProps) {

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
    width = '100%',
    height = 120,
    ...rest
  } = props ?? {};


  const [value, setValue] = useControllableValue<SwiperProps['value']>({
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange,
  });
  const current = useSharedValue(1);
  const translateX = useSharedValue(-width);

  // useImperativeHandle(ref, () => {
  //   return {
  //     next: () => {

  //     },
  //     prev: () => {

  //     },
  //     to: (index: number) => {
  //       int.onChange(index);
  //     },
  //   };
  // });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      // flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
    }, 3000); // 每 3 秒切换
    return () => clearInterval(interval);
  }, []);
  // const onLoop = useCallback(() => {
  //   if (time.current) {
  //     clearInterval(time.current);
  //   }
  //   time.current = setInterval(() => {
  //     if (count.current === Children.count(children)) {
  //       setValue(0);
  //       count.current = 0;
  //       animated.current.resetAnimation();
  //     } else {
  //       setValue((value) => {
  //         count.current++;
  //         Animated.timing(animated.current, {
  //           toValue: ++value,
  //           duration: autoplayInterval,
  //           useNativeDriver: true,
  //         }).start();
  //         return value;
  //       });
  //     }
  //   }, autoplayInterval);
  //   console.log(time.current, 'current');

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loop]);

  /**
   * 长按停止轮播
  */

  // useEffect(() => {
  //   onLoop();
  //   return () => {
  //     clearInterval(time.current);
  //   };
  // }, [onLoop]);
  const updateIndex = (index: number) => {
    current.value = index; // ✅ 变更索引
    translateX.value = -index * width; // ✅ 瞬间跳转
  };

  const transform = {
    horizontal: () => {
      const count = Children.count(children) + 2;
      return {
        gesture: Gesture.Pan().onUpdate((event) => {
          translateX.value = -current.value * width + event.translationX; // ✅ 滑动时实时更新位置
        }).onEnd((event) => {
          if (event.translationX > 50 && current.value > 0) {
            current.value -= 1; // 左滑
          } else if (event.translationX < -50 && current.value < count - 1) {
            current.value += 1;
          }
          runOnJS(setValue)(
            current.value,
          );
          translateX.value = withTiming(-current.value * width, {
            duration: 500,
          }, () => {
            if (current.value === count - 1) {
              console.log("动画结束，执行回调函数！");
              current.value = 1;
              translateX.value = -width;
            }
          }); // ✅ 平滑切换
        }),
      };
    },
    vertical: () => {
      const count = Children.count(children) + 1;
      return {
        style: {
          translateY: animated.current.interpolate({
            inputRange:
              [...Array.from({ length: count }).map(
                (...[, index]) => index
              )],
            outputRange: [

            ],
          }),
        },
      };
    },
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
      flexDirection: 'row',
      // transform: [
      //   transform[direction]?.().style,
      // ],
      ...style,
    },
    indicators: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      gap: 5,
      width: '100%',
      bottom: 10,
    },
  });


  return (
    <SwiperContext.Provider value={{
      width,
      height,
      curent: value,
    }}>
      <View style={styles.main}>
        <GestureHandlerRootView>
          <GestureDetector gesture={transform[direction]?.().gesture}>
            <Animated.View style={[
              styles.content,
              animatedStyle,
            ]}>
              {Children.toArray(children)?.at(-1)}
              {
                children && Children.map(children as React.ReactElement<SwiperItemProps>, (children) => {
                  return (
                    cloneElement(children, {
                      // ...children?.porps,
                    })
                  );
                })
              }
              {
                Children.toArray(children)?.at(0)
              }
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
                  const content = (value - 1) === index || index === 0 && total - 1 === value;
                  return (
                    <Animated.View key={index} style={{
                      width: content ? 15 : 4,
                      height: 4,
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

