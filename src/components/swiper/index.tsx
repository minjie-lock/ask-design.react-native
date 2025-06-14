/* eslint-disable react-native/no-inline-styles */
import { LayoutChangeEvent, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import React, {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useControllableValue } from '@/hooks';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated,
{
  useSharedValue,
} from 'react-native-reanimated';
import useGesture from './hook';

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

type SwiperProps<T> = {
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
  direction?: T;
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
  // /**
  //  * 子级
  // */
  // children?: React.ReactNode;
  items?: {
    children?: React.ReactNode;
    value?: number;
  }[];
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

/**
 * @function Swiper
 * @description 轮播
 * @author Lock
 * @param props;
 * @returns {React.ReactNode}
 */

export default function Swiper<T extends 'horizontal' | 'vertical' = 'horizontal'>({ ref, ...props }: SwiperProps<T>):
  React.ReactNode {

  const {
    allowTouchMove = true,
    autoplay = false,
    autoplayInterval = 1000,
    direction = 'horizontal',
    indicator,
    loop = true,
    onChange,
    style,
    items,
    width = 100,
    height = 120,
  } = props ?? {};

  const horizontal = direction === 'horizontal';
  const count = (items?.length ?? 0) + 2;

  const [dimension, setDimension] = useState(0);

  const [value, setValue] = useControllableValue<Required<SwiperProps<T>>['value']>({
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange,
  });

  const current = useSharedValue(1);

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

  const { styles: gestureStyles, gesture } = useGesture(
    direction,
    dimension,
    count,
    setValue
  );

  const styles = StyleSheet.create({
    main: {
      width: '100%',
      height,
      overflow: 'hidden',
      position: 'relative',
    },
    content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
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

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent?.layout;
    setDimension(direction === 'horizontal' ? width : height);
  };

  const children = [
    items?.at(-1),
    ...(items ?? []),
    items?.at(0),
  ];

  return (
    <View style={styles.main}>
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View onLayout={onLayout} style={[
            styles.content,
            gestureStyles.main,
          ]}>
            {
              children?.map((item, key) => {
                const style = isValidElement<ViewProps>(item?.children)
                  ? item?.children?.props?.style ?? {}
                  : {};
                return cloneElement(
                  item?.children as React.ReactElement<ViewProps>,
                  {
                    key: key,
                    style: {
                      ...(style as ViewStyle),
                      width: '100%',
                      height: '100%',
                    },
                  }
                );
              })
            }
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      {/* <View style={styles.indicators}>
        {
          typeof indicator === 'function' ? indicator(items?.length, value) :
            (
              Array.from({
                length: items?.length,
              })?.map((...[, index]) => {
                const total = count + 2;
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
      </View> */}
    </View>
  );
}


