/* eslint-disable no-void */
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useConfiguration } from '../configuration';
import { useEffect } from 'react';


type SkeletonProps = {
  /**
   * 动画效果
  */
  animated?: boolean;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 加载
  */
  loading?: boolean;
  /**
   * 行数
  */
  line?: number;
};


/**
 * @function Skeleton
 * @description 骨架屏
 * @author Lock
 * @param {SkeletonProps} props
 * @returns {React.ReactNode}
*/
export default function Skeleton(props: SkeletonProps): React.ReactNode {

  const {
    animated = false,
    children,
    line = 4,
    loading = false,
  } = props;

  const active = useSharedValue(0);
  const progress = useSharedValue(0);

  const skeleton = useConfiguration(
    (configuration) => configuration.scheme?.components?.Skeleton
  );


  // useEffect(() => {
  //   progress.value = withRepeat(
  //     withTiming(1, { duration: 1000 }),
  //     -1,
  //     true // reverse
  //   );
  // }, []);



  const actionStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#e1e9ee', skeleton?.background?.active]
    );

    return {
      width: `${active?.value}%`,
      backgroundColor,
    };
  });

  const styles = StyleSheet.create({
    sections: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1,
      width: '100%',
      position: 'relative',
    },
    title: {
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      gap: 10,
    },
    line: {
      width: '100%',
      height: 18,
      overflow: 'hidden',
      backgroundColor: skeleton?.background?.default, // 浅色光带
    },
    shimmer: {
      width: 0,
      position: 'absolute',
      backgroundColor: skeleton?.background?.active, // 基础骨架色
      height: 18,
      zIndex: 1,
    },
  });

  useEffect(() => {
    if (animated) {
      active.value = withRepeat(
        withTiming(100, {
          duration: 1200,
          easing: Easing.linear,
        }),
        -1,
        false
      );
      progress.value = withRepeat(
        withTiming(1, { duration: 1200 }),
        -1,
        true // reverse
      );
    } else {
      active.value = 0;
      progress.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated]);

  if ((typeof loading === 'boolean' && loading) || !loading) {
    return (
      <View style={styles.sections}>
        <View style={styles?.title}>
          <View style={styles?.line} />
          <Animated.View
            style={[styles?.shimmer, actionStyle]}
          />
        </View>
        {
          Array.from({ length: line })?.
            map(
              (...[, index]) => {
                return (
                  <View style={styles?.sections}>
                    <View style={styles?.line} />
                    <Animated.View
                      style={[styles?.shimmer, actionStyle]}
                      key={index}
                    />
                  </View>
                );
              }
            )
        }
      </View>
    );
  }

  return children;
}
