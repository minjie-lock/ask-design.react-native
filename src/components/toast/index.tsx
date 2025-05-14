import { StyleSheet, Text, View } from 'react-native';
import { useImperativeHandle, useState } from 'react';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

export type ToastOptions = {
  onClose?: () => void;
  /**
   * 提示内容
   */
  content?: React.ReactNode;
  /**
   * 显示时长，若为 0 则不会自动关闭
  */
  duration?: number;
  /**
   * 图标
  */
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
  /**
   * 显示位置
  */
  position?: 'top' | 'bottom' | 'center';
}

export type ToastRef = {
  /**
   * 显示提示
  */
  show: (options: ToastOptions) => void;
  /**
   * 隐藏提示
  */
  hide: () => void;
}

type ToastProps = {
  ref: React.RefObject<ToastRef>;
}

export default function Toast({ ref }: ToastProps) {

  const [options, setOptions] = useState<ToastOptions>({
    position: 'center',
  });
  const shared = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      top: '-50%',
      left: '25%',
    },
    background: {
      width: '50%',
      height: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 17,
      borderRadius: 5,
    },
    content: {
      color: 'white',
      textAlign: 'center',
    },
  });

  useImperativeHandle(ref, () => ({
    show: (options: ToastOptions) => {
      setOptions(options);
      shared.value = withTiming(1,
        {
          duration: 500,
        },
        () => {
          shared.value = withDelay(
            options.duration ?? 2000,
            withTiming(0, {duration: 500})
          );
        }
      );
    },
    hide: () => {
      if (shared.value) {
        shared.value = withTiming(0,
          {
            duration: 500,
          }
        );
      }
    },
  }));

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: shared.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, opacityStyle]}>
        <Text style={styles.content}>
          {options?.content}
        </Text>
      </Animated.View>
    </View>
  );
}
