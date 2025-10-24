

import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
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
  };
}

/**
 * @function Swipeable
 * @description 滑动
 * @param {Swipeable} props
 * @author Lock
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

  // 跟踪当前状态：0-关闭，1-左侧打开，-1-右侧打开
  const currentState = useSharedValue(0);

  const onChange = (event: ChangeEvent) => {
    const { translationX } = event;
    const currentPos = currentState.value;

    // 根据当前状态计算新的位置
    let newTranslation = 0;

    if (currentPos === 0) {
      // 当前关闭状态，正常滑动
      const maxLeft = size.left;
      const maxRight = -size.right;

      if (translationX > 0) {
        // 向右滑动，显示左侧操作
        newTranslation = Math.min(translationX, maxLeft);
      } else {
        // 向左滑动，显示右侧操作
        newTranslation = Math.max(translationX, maxRight);
      }
    } else if (currentPos === 1) {
      // 当前左侧打开状态
      const basePosition = size.left;
      if (translationX < 0) {
        // 向左滑动，只允许关闭，不显示右侧操作栏
        newTranslation = Math.max(basePosition + translationX, 0);
      } else {
        // 向右滑动，保持左侧打开
        newTranslation = Math.min(basePosition + translationX, size.left);
      }
    } else if (currentPos === -1) {
      // 当前右侧打开状态
      const basePosition = -size.right;
      if (translationX > 0) {
        // 向右滑动，只允许关闭，不显示左侧操作栏
        newTranslation = Math.min(basePosition + translationX, 0);
      } else {
        // 向左滑动，保持右侧打开
        newTranslation = Math.max(basePosition + translationX, -size.right);
      }
    }

    translation.value = newTranslation;
  };

  const onEnd = (event: EndEvent) => {
    const { translationX, velocityX } = event;
    const threshold = 50; // 触发阈值
    const velocityThreshold = 500; // 速度阈值
    const currentPos = currentState.value;

    let targetPosition = 0;
    let newState = 0;

    if (currentPos === 0) {
      // 当前关闭状态
      if (translationX > 0) {
        // 向右滑动
        if (translationX > threshold || velocityX > velocityThreshold) {
          // 打开左侧操作
          targetPosition = size.left;
          newState = 1;
        }
      } else {
        // 向左滑动
        if (translationX < -threshold || velocityX < -velocityThreshold) {
          // 打开右侧操作
          targetPosition = -size.right;
          newState = -1;
        }
      }
    } else if (currentPos === 1) {
      // 当前左侧打开状态
      const currentTranslation = translation.value;
      const leftOpenPos = size.left;
      const closeThreshold = leftOpenPos * 0.3; // 关闭阈值：需要滑动超过30%才关闭
      const switchThreshold = leftOpenPos + threshold * 2; // 切换阈值：需要更大的滑动距离才能直接切换到右侧

      if (translationX < 0) {
        // 向左滑动
        if (currentTranslation < -switchThreshold) {
          // 大幅度向左滑动，直接切换到右侧
          targetPosition = -size.right;
          newState = -1;
        } else if (currentTranslation < closeThreshold) {
          // 中等程度滑动，关闭左侧
          targetPosition = 0;
          newState = 0;
        } else {
          // 滑动不足，保持左侧打开
          targetPosition = size.left;
          newState = 1;
        }
      } else {
        // 向右滑动，保持左侧打开
        targetPosition = size.left;
        newState = 1;
      }
    } else if (currentPos === -1) {
      // 当前右侧打开状态
      const currentTranslation = translation.value;
      const rightOpenPos = -size.right;
      const closeThreshold = rightOpenPos * 0.3; // 关闭阈值：需要滑动超过30%才关闭
      const switchThreshold = rightOpenPos - threshold * 2; // 切换阈值：需要更大的滑动距离才能直接切换到左侧
      if (translationX > 0) {
        // 向右滑动
        if (currentTranslation > -switchThreshold) {
          // 大幅度向右滑动，直接切换到左侧
          targetPosition = size.left;
          newState = 1;
        } else if (currentTranslation > closeThreshold) {
          // 中等程度滑动，关闭右侧
          targetPosition = 0;
          newState = 0;
        } else {
          // 滑动不足，保持右侧打开
          targetPosition = -size.right;
          newState = -1;
        }
      } else {
        // 向左滑动，保持右侧打开
        targetPosition = -size.right;
        newState = -1;
      }
    }

    translation.value = withTiming(targetPosition, {
      duration: 300,
    });

    currentState.value = newState;
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
      left: -size.left,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    right: {
      position: 'absolute',
      right: -size.right,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      minHeight: '100%',
    },
    content: {
      flex: 1,
      backgroundColor: '#fff',
    },
    block: {
      overflow: 'hidden',
    },
  });

  const onLeft = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent?.layout?.width || 0;
    setSize(prev => ({
      ...prev,
      left: width,
    }));
  };

  const onRight = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent?.layout?.width || 0;
    setSize(prev => ({
      ...prev,
      right: width,
    }));
  };

  const onCenter = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent?.layout?.width || 0;
    setSize(prev => ({
      ...prev,
      center: width,
    }));
  };


  return (
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
  );
}
