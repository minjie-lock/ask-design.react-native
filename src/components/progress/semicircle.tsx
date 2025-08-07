
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useConfiguration } from '../configuration';
import { Percent } from './type';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { content } from '@/utils';

export type ProgressSemicircleProps = {
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

const AnimatedPath = Animated.createAnimatedComponent(Path);


/**
 * @function ProgressSemicircle
 * @description 半圆形进度
 * @param {ProgressSemicircleProps} props
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function ProgressSemicircle(props: ProgressSemicircleProps): React.ReactNode {

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
      height: size / 2,
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

  const center = size / 2;
  const circumference = Math.PI * radius;
  const animatedProps = useAnimatedProps(() => {
    const offset = circumference * (1 - percent.value / 100);
    return {
      strokeDashoffset: offset,
    };
  });

  const path = `
    M ${center - radius} ${center}
    A ${radius} ${radius} 0 0 1 ${center + radius} ${center}
  `;

  return (
    <View style={styles?.section} className={className}>
      <Svg width={size} height={size}>
        <Path
          d={path}
          stroke={progress?.background?.default}
          strokeWidth={width}
          fill="none"
          strokeLinecap="round"
        />
        <AnimatedPath
          d={path}
          stroke={progress?.background?.active}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
        />
      </Svg>
      <View style={styles?.text}>
        {content(children)}
      </View>
    </View>
  );
}

