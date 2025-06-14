
import { useEffect, useRef } from 'react';
import { Gesture, GestureStateChangeEvent, GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const positions = Object.freeze({
  horizontal: 'translationX',
  vertical: 'translationY',
} as const);

export default function useGesture(
  type: 'horizontal' | 'vertical',
  dimension: number,
  count: number,
  onChange: (index: number) => void
) {

  const position = positions[type];

  const current = useSharedValue(1);
  const translate = useSharedValue(0);
  const interval = useRef(0);
  const size = useRef(0);

  const onStart = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    // translate.value = withTiming(translate.value, { duration: 100 });
    clearInterval(interval.current);
  };

  const onUpdate = (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    translate.value = -current.value * dimension + event[position]; // ✅ 滑动时实时更新位置
  };

  const onEnd = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event[position] > 50 && current.value > 0) {
      current.value -= 1; // 左滑
    } else if (event[position] < -50 && current.value < count - 1) {
      current.value += 1;
    }
    runOnJS(onChange)(
      current.value,
    );
    translate.value = withTiming(-current.value * dimension, {
      duration: 500,
    }, () => {
      if (current.value === count - 1) {
        current.value = 1;
        translate.value = -dimension;
        return;
      }
      if (current.value === 0) {
        current.value = count - 2;
        translate.value = -current.value * dimension;
        return;
      }
      // if (!interval.current) {
      // runOnJS(setTimer)();
      // }
    }); // ✅ 平滑切换
  };

  const gesture = Gesture.Simultaneous(
    Gesture.Tap().onStart(() => {
      clearInterval(interval.current);
    }),
    Gesture.Pan().onStart(onStart).onUpdate(onUpdate).onEnd(onEnd)
  );

  const main = useAnimatedStyle(() => {

    return {
      transform: [
        type === 'horizontal'
          ? { translateX: translate.value }
          : { translateY: translate.value },
      ],
    };
  });


  // 等待尺寸更新
  useEffect(() => {
    if (dimension) {
      size.current = dimension;
      translate.value = -dimension;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimension]);

  const createSwiper = () => {
    interval.current = setInterval(() => {
      current.value++;
      runOnJS(onChange)(current.value);
      translate.value = withTiming(
        -current?.value * size.current,
        { duration: 500 },
        () => {
          if (current.value - 1 === count - 1) {
            current.value = 1;
            translate.value = -dimension;
          }
        }
      );
    }, 2000);
  };

  useEffect(() => {
    createSwiper();
    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const createAutoplay = () => {
  //   // if (autoplay) {
  //   interval.current = setInterval(() => {
  //     current.value++;
  //     runOnJS(onChange)(current.value);
  //     translate.value = withTiming(-current.value * (dimension), {
  //       duration: 1000,
  //     }, () => {
  //       /**
  //        * 值会滞前所以减一
  //        */
  //       if (current.value - 1 === count - 1) {
  //         current.value = 1;
  //         translate.value = -(dimension);
  //       }
  //     });
  //     // if (!loop) {
  //       // clearInterval(interval.current!);
  //     // }
  //   }, autoplayInterval);
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // };

  // useEffect(() => {
  //   onAutoplay();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const createSwiper = () => {

  // };

  return {
    styles: {
      main,
    },
    gesture,
  };

}
