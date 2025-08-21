

import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  type GestureUpdateEvent,
  type PanGestureHandlerEventPayload,
  type PanGestureChangeEventPayload,
} from 'react-native-gesture-handler';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { content } from '@/utils';
import { useState } from 'react';

type ChangeEvent = GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>;

type EndEvent = GestureUpdateEvent<PanGestureHandlerEventPayload>;


type SwipeableProps = {
  /**
   * 内容
  */
  children?: React.ReactNode;
  /**
   * 操作
  */
  actions?: {
    /**
     * @function left
     * @description 左边渲染
     * @returns {React.ReactNode}
     */
    left: () => React.ReactNode;
    /**
     * @function right
     * @description 右边渲染
     * @returns {React.ReactNode}
     */
    right: () => React.ReactNode;
  }
}

/**
 * @function Swipeable
 * @description 滑动
 * @param {Swipeable} props
 * @returns {React.ReactNode}
 */
export default function Swipeable(props: SwipeableProps): React.ReactNode {

  const {
    children,
    actions,
  } = props;

  const translation = useSharedValue(0);
  const [size, setSize] = useState({
    left: 0,
    center: 0,
    right: 0,
  });

  const onChange = (event: ChangeEvent) => {
    // if (event?.translationX <= size?.current?.left / 2) {
      translation.value = event?.translationX;
    // }
  };

  const onEnd = (event: EndEvent) => {
    // if (event?.translationX > 50) {
    //   translation.value = withTiming(
    //     -size?.current.left,
    //     {
    //       duration: 500,
    //     }
    //   );
    //   return;
    // }

    // if (event?.translationX < -50) {
    //   translation.value = withTiming(
    //     -size?.current.right,
    //     {
    //       duration: 500,
    //     }
    //   );
    // }
  };

  const gesture = Gesture.Pan().onChange(onChange).onEnd(onEnd);

  const translationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translation.value,
        },
      ],
    };
  });

  const styles = StyleSheet.create({
    left: {
      position: 'absolute',
      left: -50,
    },
    right: {
      position: 'absolute',
      right: -size?.right,
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      position: 'relative',
    },
    content: {
      flex: 1,
    },
    block: {
      overflow: 'hidden',
      flex: 1,
    },
  });

  const onLeft = (event: LayoutChangeEvent) => {
    setSize({
      ...size,
      left: event.nativeEvent?.layout?.width / 2,
    });
  };

  const onRight = (event: LayoutChangeEvent) => {
    // size.current.right = event.nativeEvent?.layout?.width / 2;
  };

  const onCenter = (event: LayoutChangeEvent) => {
    setSize({
      ...size,
      right: event.nativeEvent?.layout?.width,
    });
  };


  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={styles?.block}>
          <Animated.View style={[styles?.section, translationStyle]}>
            {
              typeof actions?.left === 'function' &&
              <View style={styles?.left} onLayout={onLeft}>
                {actions?.left?.()}
              </View>
            }
            <View style={styles?.content} onLayout={onCenter}>
              {content(children)}
            </View>
            {
              typeof actions?.right === 'function' &&
              <View style={styles?.right} onLayout={onRight}>
                {actions?.right?.()}
              </View>
            }
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
