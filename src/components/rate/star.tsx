import { GestureResponderEvent, Pressable } from 'react-native';
import Svg, { Rect, Path, Mask, Text } from 'react-native-svg';
import { useConfiguration } from '../configuration';
import { useEffect, useId } from 'react';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedRect =
  Animated.createAnimatedComponent(Rect);


type StarProps = {
  /**
   * @description 当前值
  */
  current?: number;
  /**
   * @description 回调函数
  */
  onChange?: (value: number) => void;
  /**
   * @description 值
   */
  value?: number;
  /**
   * @description 可否半课星
  */
  allowHalf?: boolean;
  /**
   * @description 可否取消选择
   */
  allowClear?: boolean;
  /**
   * @description 尺寸
   */
  size?: number;
  /**
   * @description 自定义字符
   */
  children?: string;
  /**
   * @description 禁用
   */
  disabled?: boolean;
}

export default function Star(props: StarProps) {
  const {
    current = 0,
    value,
    onChange,
    allowHalf,
    size = 35,
    allowClear,
    children,
    disabled,
  } = props;

  const rate = useConfiguration(
    configuration => configuration?.scheme?.components?.Rate
  );

  const onPress = (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const state = allowHalf
      ? locationX < size / 2
        ? 0.5
        : 1
      : 1;
    const content = current + state;

    if (allowClear && content === value) {
      onChange?.(0);
    } else {
      onChange?.(content);
    }
    onChange?.(current + state);
  };

  const fill = Math.max(0, Math.min(1, (value ?? 0) - current));

  const viewBoxSize = 24; // 固定路径坐标系大小
  const clip = useSharedValue(viewBoxSize * fill);

  const id = useId();

  const d =
    'M12 2.5l2.9 6 6.6.9-4.8 4.7 1.1 6.5L12 17.8l-5.8 3 1.1-6.5-4.8-4.7 6.6-.9L12 2.5z';

  useEffect(() => {
    clip.value = withTiming(viewBoxSize * fill, { duration: 250 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill]);

  const animatedProps = useAnimatedProps(() => ({
    width: clip.value,
  }));

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        {
          children ? (
            <Text
              x="12"
              y="18"
              fontSize="18"
              textAnchor="middle"
              fill={rate?.background?.default}
            >
              {children}
            </Text>
          ) :
            <Path d={d} fill={rate?.background?.default} />
        }

        {/* 遮罩层 */}
        <Mask id={id}>
          <AnimatedRect
            x="0"
            y="0"
            height={viewBoxSize}
            fill="white"
            animatedProps={animatedProps}
          />
        </Mask>

        {
          children ? <Text
            x="12"
            y="18"
            fontSize="18"
            textAnchor="middle"
            fill={rate?.background?.active}
            mask={`url(#${id})`}
          >
            {children}
          </Text> :
            <Path
              d={d}
              fill={rate?.background?.active}
              mask={`url(#${id})`}
            />
        }

      </Svg>
    </Pressable>
  );
}
