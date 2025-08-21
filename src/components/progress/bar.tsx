
import { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useConfiguration } from '../configuration';
import { content } from '@/utils';
import { type Percent } from './type';

export type ProgressBarProps = {
  /**
   * 进度条百分比
  */
  value?: Percent<100>;
  /**
   * 子内容
  */
  children?: React.ReactNode;
  /**
   * 圆角
  */
  rounded?: boolean;
  /**
   * 样式
  */
  styles?: {
    /**
     * 背景
    */
    background: ViewStyle;
    /**
     * 激活
    */
    active: ViewStyle;
  };
  /**
   * 类
  */
  className?: string;
}

/**
 * @function ProgressBar
 * @description 进度
 * @author Lock
 * @param {ProgressBarProps} props
 * @returns {React.ReactNode}
 */
export default function ProgressBar(props: ProgressBarProps): React.ReactNode {
  const {
    value = 0,
    styles: Styles = {
      background: {},
      active: {},
    },
    children,
    className,
    rounded = true,
  } = props;

  const progress = useConfiguration(
    (configuration) => configuration.scheme.components.Progress,
  );

  const percent = useSharedValue(0);
  const styles = StyleSheet.create({
    contents: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    section: {
      height: 10,
      flex: 1,
      backgroundColor: progress?.background?.active,
      borderRadius: rounded ? 30 : 0,
      ...(Styles?.active ?? {}),
    },
    background: {
      height: 10,
      borderRadius: rounded ? 30 : 0,
      flex: 1,
      backgroundColor: progress?.background?.default,
      ...(Styles?.background ?? {}),
    },
    text: {
      color: progress.text,
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

  const percentStyle = useAnimatedStyle(() => {
    return {
      width: `${percent?.value}%`,
    };
  });

  return (
    <View style={styles?.contents}>
      <View style={styles?.background} className={className}>
        <Animated.View style={[styles?.section, percentStyle]} />
      </View>
      {
        content(children, styles?.text)
      }
    </View>
  );
}
