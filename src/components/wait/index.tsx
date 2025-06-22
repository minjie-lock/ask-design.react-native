/* eslint-disable react-native/no-inline-styles */
import { useMount } from 'ahooks';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useConfiguration } from '../configuration';
import Space from '../space';

type WaitDotProps = {
  /**
   * 延迟时间
   */
  delay: number;
  /**
   * 样式
   */
  style?: ViewStyle;
}

function WaitDot(porps: WaitDotProps) {

  const {
    delay,
    style,
  } = porps;

  const translateY = useSharedValue(0);

  // 开启动画
  useMount(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-10, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      )
    );
  });

  const styles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, styles]} />;
}

type WaitProps = {
  /**
   *  加载大小
  */
  size?: 'small' | 'large';
  /**
   *  加载状态
   */
  loading?: boolean;
  /**
   *  子内容
  */
  children?: React.ReactNode;
};

const sizes = {
  small: 3,
  large: 10,
};


export default function Wait(props: WaitProps) {

  const {
    loading = false,
    children,
    size = 'small',
  } = props;

  const rotate = useSharedValue(0);

  const wait = useConfiguration(
    configuration => configuration.scheme.components.Wait
  );

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    content: {
      inset: 0,
      backgroundColor: '#fff',
      zIndex: 1,
      opacity: 0.6,
    },
    dots: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
    },
    item: {
      width: sizes?.[size],
      height: sizes?.[size],
      backgroundColor: wait.color?.one,
      borderRadius: '50%',
    },
  });

  const top_dots = [
    {
      size: 10,
      color: wait?.color?.one,
      key: 'one',
    },
    {
      size: 10,
      color: wait.color?.two,
      key: 'two',
    },
  ];

  const bottom_dots = [
    {
      size: 10,
      color: wait?.color?.one,
      key: 'one',
    },
    {
      size: 10,
      color: wait.color?.two,
      key: 'two',
    },
  ];

  const dots = [
    top_dots,
    bottom_dots,
  ];

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate?.value}deg`,
        },
      ],
    };
  });

  useMount(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 1000,
      }),
      -1,
      false
    );
  });

  return (
    <View style={styles?.container}>
      <View>
        <Animated.View style={[rotateStyle]}>
          <Space vertical gap={5}>
            {
              dots?.map((items, key) => {
                return (
                  <View style={styles?.dots} key={key}>
                    {
                      items?.map(
                        item => {
                          return (
                            <View key={item?.key}
                              style={{
                                width: item?.size,
                                height: item?.size,
                                borderRadius: '50%',
                                backgroundColor: item?.color,
                              }}
                            />
                          );
                        }
                      )
                    }
                  </View>
                );
              })
            }
          </Space>
        </Animated.View>
      </View>
      {/* <View style={styles.content}>
        {children}
      </View> */}
    </View >
  );
}
