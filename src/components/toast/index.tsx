/* eslint-disable @typescript-eslint/no-shadow */
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useImperativeHandle, useState } from 'react';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../icon';

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

/**
 * @function Toast
 * @description 提示
 * @author Lock
 * @param props
 * @returns
 */
export default function Toast({ ref }: ToastProps) {

  const [options, setOptions] = useState<ToastOptions>({
    position: 'center',
  });
  const shared = useSharedValue(0);
  const loading = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      top: '-50%',
      left: '30%',
    },
    background: {
      maxWidth: '40%',
      height: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingVertical: 30,
      borderRadius: 5,
    },
    content: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
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
          if (options.duration) {
            shared.value = withDelay(
              options.duration ?? 2000,
              withTiming(0, { duration: 500 })
            );
            cancelAnimation(loading);
          }
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

  const loadingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${loading.value}deg` }],
    };
  });

  useEffect(() => {
    if (options.icon === 'loading') {
      loading.value = withRepeat(
        withTiming(-360, { duration: 1000 }),
        -1, // 无限循环
      );
    }
    return () => {
      // cancelAnimation?.(loading);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.icon]);

  const icon = {
    'success': <Icon name="check" size={40} color="white" />,
    'fail': <Icon name="close" size={40} color="white" />,
    'loading': (
      <Animated.View style={[loadingStyle]}>
        <Icon name="loading-3-quarters" size={40} color="white" />
      </Animated.View>
    ),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, opacityStyle]}>
        <View style={styles.icon}>
          {
            typeof options?.icon === 'string' ?
              icon?.[options.icon as keyof typeof icon] :
              options?.icon
          }
        </View>
        <Text style={styles.content}>
          {options?.content}
        </Text>
      </Animated.View>
    </View>
  );
}
