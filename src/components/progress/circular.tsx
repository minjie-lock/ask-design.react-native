
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useConfiguration } from '../configuration';
import { Percent } from './type';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';
import { content } from '@/utils';

export type ProgressCircularProps = {
  /**
   * 宽度
  */
  width?: number;
  /**
   * 尺寸
   */
  size?: number;
  /**
   * 进度条百分比
  */
  value?: Percent<100>;
  /**
   * 子内容
  */
  children?: React.ReactNode;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 类
  */
  className?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


/**
 * @function ProgressCircular
 * @description 圆形进度
 * @param {ProgressCircularProps} props
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function ProgressCircular(props: ProgressCircularProps): React.ReactNode {

  const {
    size = 100,
    width = 10,
    value = 0,
    children,
    style,
    className,
  } = props;

  const percent = useSharedValue(0);

  const progress = useConfiguration(
    (configuration) => configuration.scheme.components.Progress,
  );

  const radius = (size - width) / 2;

  const styles = StyleSheet.create({
    section: {
      width: size,
      height: size,
      ...style,
    },
    text: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


  useEffect(() => {
    // 限制区间
    if (value >= 0 && value <= 100) {
      percent.value = withTiming(value, {
        duration: 500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const circumference = 2 * Math.PI * radius;
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - percent.value / 100),
    };
  });

  const transform = useMemo(() => `rotate(-90 ${size / 2} ${size / 2})`, [size]);

  return (
    <View style={styles?.section} className={className}>
      <Svg width={size} height={size}>
        <G transform={transform}>
          {/* 背景圆环 */}
          <Circle
            stroke={progress?.background?.default}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={width}
          />
          {/* 进度圆环 */}
          <AnimatedCircle
            stroke={progress?.background?.active}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={width}
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles?.text}>
        {content(children)}
      </View>
    </View>
  );
}

