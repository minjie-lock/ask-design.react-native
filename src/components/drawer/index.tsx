import { StyleSheet, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import { useConfiguration } from '../configuration';
import Animate, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { content } from '../../utils';
import Icon from '../icon';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';



type DrawerProps = {
  /**
   * 显示
  */
  open?: boolean;
  /**
   * 是否可以拖动关闭
   */
  move?: boolean;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 关闭后触发
  */
  afterClose?: () => void;
  /**
   * 打开后触发
  */
  afterOpen?: () => void;
  /**
   * 关闭
   */
  onClose?: () => void;
  /**
   * 自定义关闭图标
  */
  closeIcon?: React.ReactNode;
  /**
   * 遮罩
   */
  mask?: boolean;
  /**
   * 遮罩点击事件
  */
  onMaskPress?: () => void;
  /**
   * 遮罩样式
  */
  maskStyle?: ViewStyle;
  /**
   * 样式
   */
  style?: ViewStyle;
  /**
   * 位置
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * 显示关闭图标
   */
  showClose?: boolean;
  /**
   * 高度
   */
  height?: number;
  /**
   * 宽度
  */
  width?: number | string;
}

/**
  @function Drawer
  @description 抽屉/侧边
  @param {DrawerProps} props
  @author Lock
  @returns {React.ReactNode}
 */
export default function Drawer(props: DrawerProps): React.ReactNode {

  const {
    open = false,
    children,
    width = 300,
    height = 500,
    onClose,
    position = 'bottom',
    mask = true,
    maskStyle,
    onMaskPress,
    afterClose,
    afterOpen,
    showClose = true,
    move = true,
    closeIcon,
  } = props;

  const include = {
    left: -width,
    right: width,
    top: -height,
    bottom: height,
  };

  const [show, setShow] = useState(open);

  const drawer = useConfiguration(
    configuration => configuration.scheme.components.Drawer
  );

  const transform = useSharedValue(include?.[position]);
  const maskValue = useSharedValue(0);

  const postions = {
    bottom: {
      left: 0,
      right: 0,
      bottom: 0,
      height,
    },
    top: {
      left: 0,
      right: 0,
      top: 0,
      height,
    },
    left: {
      left: 0,
      top: 0,
      bottom: 0,
      width,
      height: '100%',
    },
    right: {
      right: 0,
      top: 0,
      bottom: 0,
      width,
      height: '100%',
    },
  };


  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      height: '100%',
      inset: 0,
    },
    mask: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 99,
      inset: 0,
      ...maskStyle,
    },
    header: {
      alignItems: position === 'right' ? 'flex-start' : 'flex-end',
    },
    content: {
      zIndex: 100,
      position: 'absolute',
      ...(postions?.[position] as ViewStyle),
      padding: 20,
      borderTopLeftRadius: drawer.round,
      borderTopRightRadius: drawer.round,
      backgroundColor: drawer.background,
      ...(props?.style ?? {}),
    },
  });

  useEffect(() => {
    if (open) {
      setShow(open);
      maskValue.value = withTiming(1, { duration: 300 });
      transform.value = withTiming(0, { duration: 500 });
      if (afterOpen) {
        runOnJS?.(afterOpen)?.();
      }
    } else {
      maskValue.value = withTiming(0,
        { duration: 300 },
      );
      transform.value = withTiming(include?.[position],
        { duration: 500 },
        () => {
          runOnJS(setShow)(false);
          if (afterClose) {
            runOnJS?.(afterClose)?.();
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const containerStyle = useAnimatedStyle(() => {
    const translate = ['left', 'right'].includes(position) ?
      'translateX' : 'translateY';
    return {
      transform: [
        {
          [translate]: transform.value,
        },
      ],
    } as unknown as ViewStyle;
  });

  const createMaskStyle = useAnimatedStyle(() => ({
    opacity: maskValue.value,
  }));

  if (!show) {
    return null;
  }

  const onHide = () => {
    onClose?.();
  };


  // 添加滑动关闭
  const gesture = Gesture.Pan().onChange((event) => {

    if (!move) {
      return false;
    }

    const size = ['left', 'right'].includes(position) ?
      'translationX' : 'translationY';

    switch (position) {
      case 'left': case 'top':
        if (event?.[size] <= 0) {
          transform.value = event?.[size];
        }
        break;
      case 'right': case 'bottom':
        if (event?.[size] >= 0) {
          transform.value = event?.[size];
        }
        break;
    }


  }).onEnd(() => {
    if (!move) {
      return false;
    }
    switch (position) {
      case 'left': case 'top':
        if (+transform.value < -50) {
          runOnJS(onHide)();
          return;
        }
        break;
      case 'right': case 'bottom':
        if (+transform.value > 50) {
          runOnJS(onHide)();
          return;
        }
        break;

    }
    transform.value = withTiming(0, { duration: 500 });
  });

  return (
    <View style={[styles.container]}>
      {
        mask && (
          <TouchableNativeFeedback onPress={() => {
            onHide();
            onMaskPress?.();
          }}>
            <Animate.View style={[styles.mask, createMaskStyle]} />
          </TouchableNativeFeedback>
        )
      }
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animate.View style={[styles.content, containerStyle]}>
            <View style={styles.header}>
              {
                closeIcon ? content(closeIcon) : showClose &&
                  <Icon name="close" size="md" onPress={() => {
                    onHide();
                  }} />
              }
            </View>
            {content(children)}
          </Animate.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

