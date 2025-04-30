import { Animated, Easing, GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useConfiguration } from '../configuration';
import { content } from '../../utils';
import { useContext, useEffect, useRef } from 'react';
import { DetailsContext } from '.';

export type SummaryProps = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
  */
  children?: React.ReactNode;
  /**
   * 自定义箭头图标
   */
  arrowIcon?: React.ReactNode | ((avitve: boolean) => React.ReactNode);
  /**
   * 点击事件
  */
  onPress?: ((event: GestureResponderEvent) => void);
  /**
   * 值
  */
  value: number | string;
  /**
   * 禁用
  */
  disabled?: boolean;
}
/**
 * @function Details.Summary
 * @description 折叠面板的详细栏
 * @param props
 * @returns {React.JSX.Element}
 */
export default function Summary(props: SummaryProps) {

  const {
    title,
    children,
    onPress,
    value,
    arrowIcon,
    disabled = false,
  } = props;

  const { current } = useContext(DetailsContext);

  const details = useConfiguration(
    configuration => configuration?.scheme.components.Details
  );

  // 折叠动画
  const height = useRef(new Animated.Value(0));
  const arrow = useRef(new Animated.Value(0));

  const styles = StyleSheet.create({
    main: {
      backgroundColor: details.background,
      opacity: disabled ? 0.4 : 1,
      display: 'flex',
      flexDirection: 'column',
    },
    pressable: {
      paddingVertical: 12,
      fontSize: 17,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderStyle: details.border.type,
      borderBottomWidth: 1,
      borderBottomColor: details.border.color,
    },
    title: {
      fontSize: 17,
      fontWeight: 700,
    },
    content: {
      maxHeight: height.current,
      height: 'auto',
      ...(current?.includes?.(value) ? {
        borderStyle: details.border.type,
        borderBottomWidth: 1,
        borderBottomColor: details.border.color,
      } : {}),
    },
  });

  useEffect(() => {
    /**
     * 恢复动画
    */
    // const rest = () => {
    //   height.current.resetAnimation();
    //   arrow.current.resetAnimation();
    // };
    if (current) {
      if (current.includes(value)) {
        Animated.timing(height.current, {
          toValue: 1000,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
        Animated.timing(arrow.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(height.current, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
        Animated.timing(arrow.current, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }
    // return rest;
  }, [value, current]);

  return (
    <View style={styles.main}>
      <Pressable onPress={onPress} style={styles?.pressable}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{
          transform: [{
            rotate: arrow.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            }),
          }],
        }}>
          {
            typeof arrowIcon === 'function' ?
              content(arrowIcon?.(current?.includes?.(value) ?? false)) :
              arrowIcon
          }
        </Animated.View>
      </Pressable>
      <Animated.View style={styles.content}>
        <View style={{ paddingVertical: 12 }}>
          {content(children)}
        </View>
      </Animated.View>
    </View>
  );
}
