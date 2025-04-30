import { StyleSheet, View, ViewStyle } from 'react-native';
import Item from './item';
import { Children, useEffect, useImperativeHandle, useRef } from 'react';
import { useOnChangeValue } from 'ask-hooks';

type SwiperProps = {
  ref?: ReturnType<typeof useRef>;
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
   * 开始位置
  */
  start?: number;
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
   * 切换触发
  */
  onChange?: (current: number) => void;
  /**
   * 
  */
  children?: React.ReactNode;
}

export default function Swiper(props: SwiperProps) {

  const {
    allowTouchMove = true,
    autoplay = false,
    autoplayInterval = 1000,
    start = 0,
    direction = 'horizontal',
    indicator,
    loop = true,
    onChange,
    children,
    ...rest
  } = props ?? {};


  const [int] = useOnChangeValue(start, (index) => {
    onChange?.(index);
    return index;
  });

  const time = useRef(0);

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

  useEffect(() => {
    clearInterval(time.current);
    time.current = setInterval(() => {
      // int.onChange()
    }, autoplayInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop]);


  return (
    <View style={styles.main}>
      <View>
        {children}
      </View>
      <View>{indicator?.(Children.count(children), int.value)}</View>
    </View>
  );
};


const styles = StyleSheet.create<{
  main: ViewStyle
}>({
  main: {
    width: '100%',
    height: '',
  },
});

Swiper.Item = Item;

