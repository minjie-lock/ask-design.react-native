/* eslint-disable react-native/no-inline-styles */
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useConfiguration } from '../configuration';
import { content } from '../../utils';
import { useContext, useEffect } from 'react';
import { DetailsContext } from '.';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from '../icon';

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
  const height = useSharedValue(0);
  const arrow = useSharedValue('0deg');
  const border = useSharedValue(0);
  // const arrow = useRef(new Animated.Value(0));

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
      color: details.text.title,
    },
    content: {
      height: 'auto',
    },
  });

  useEffect(() => {
    if (current) {
      if (current?.includes?.(value)) {
        height.value = 1000;
        border.value = 1;
        arrow.value = '180deg';
      } else {
        height.value = 0;
        border.value = 0;
        arrow.value = '0deg';
      }
    }
    // return rest;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, current]);

  const heightStyle = useAnimatedStyle(() => ({
    maxHeight: withTiming(height.value, {
      duration: 500,
    }),
  }));


  const borderStyle = useAnimatedStyle(() => ({
    borderStyle: details.border.type,
    borderBottomWidth: withTiming(border.value, { duration: 1000 }),
    borderBottomColor: details.border.color,
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(arrow.value, { duration: 500 }) }],
  }));



  return (
    <View style={styles.main}>
      <Pressable onPress={onPress} style={styles?.pressable}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={[arrowStyle]}>
          {
            arrowIcon ? typeof arrowIcon === 'function' ?
              content(arrowIcon?.(current?.includes?.(value) ?? false)) :
              arrowIcon : <Icon name="down" size={20} />
          }
        </Animated.View>
      </Pressable>
      <Animated.View style={[heightStyle, borderStyle, styles.content]}>
        <View style={{ paddingVertical: 12 }}>
          {content(children, {
            color: details.text.content,
          })}
        </View>
      </Animated.View>
    </View>
  );
}
