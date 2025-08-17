/* eslint-disable @typescript-eslint/no-shadow */
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PickerItem } from '.';
import { content } from '@/utils';
import { useConfiguration } from '../configuration';
import { useEffect } from 'react';

type PickerGestureProps = {
  items?: PickerItem[];
  onChange?: (value: PickerItem) => void;
  value: number | string;
}

export default function PickerGesture(props: PickerGestureProps) {

  const {
    items,
    onChange,
    value,
  } = props;

  const picker = useConfiguration(
    (configuration) => configuration.scheme.components.Picker
  );

  const max = items?.map((item, index) => ({
    key: item.value,
    ...item,
    value: -(index * 38),
  }));

  const min = max?.find((item) => item.key === value);

  const translateY = useSharedValue(min?.value ?? 0);

  // 项目变化重置 translateY 值
  useEffect(() => {
    translateY.value = withTiming(min?.value ?? 0, {
      duration: 500,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const createGesture = () => {
    const gesture = Gesture.Pan().onUpdate((event) => {
      translateY.value = event.translationY;
    }).onEnd((event) => {
      const all = max?.filter((item) => item.value > (event.translationY - 19));
      // 为空时，重置最后一个
      if (!all?.length) {
        translateY.value = withTiming(0, {
          duration: 500,
        }, () => {
          onChange && runOnJS(onChange)(items?.[0] as PickerItem);
        });
        return;
      }
      const min = Math.min(...(all?.map((item) => item.value) ?? []));
      const find = max?.find((item) => item.value === min);
      translateY.value = withTiming(min, {
        duration: 500,
      }, () => {
        onChange && runOnJS(onChange)(find as PickerItem);
      });
    });
    return gesture;
  };

  const gesture = createGesture();

  const gestureStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const styles = StyleSheet.create({
    text: {
      height: 38,
      justifyContent: 'center',
    },
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[gestureStyles]}>
        {
          items?.map?.((item) => {
            return (
              <View key={item.key} style={styles.text}>
                {
                  content(item.label, {
                    fontSize: 16,
                    lineHeight: 38,
                    color: picker.color,
                  })
                }
              </View>
            );
          })
        }
      </Animated.View>
    </GestureDetector>
  );
}

