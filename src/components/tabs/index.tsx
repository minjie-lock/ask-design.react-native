/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import SeparationLine from '../separation-line';
import { content } from '@/utils';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useControllableValue } from '@/hooks';
import { useConfiguration } from '../configuration';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUpdateEffect } from 'ahooks';

/**
 * 提取列数据，对值类型做枚举提醒
 */
export type TabsValue<T extends readonly Tab[]> = T[number]['key'];

interface Tab {
  /**
   * @description 禁用标签页
   */
  disabled?: boolean;
  /**
   * @description 标签页名称
   */
  key: React.Key;
  /**
   * @description 标签页名称
   */
  title: React.ReactNode;
  /**
   * @description 标签页名称
   */
  children: React.ReactNode;
}

type TabsProps<T extends Tab[]> = {
  /**
   * @description 标签页数据
   */
  items?: T;
  /**
   * @description 默认选中的标签页
   */
  defaultValue?: TabsValue<T>;
  /**
   * @description 选中的标签页
   */
  value?: TabsValue<T>;
  /**
   * @description 标签页切换事件
    * @param {TabsValue<T>} value 选中的标签页
   */
  onChange?: (value: TabsValue<T>) => void;
};


/**
 * @function Tabs
 * @description 标签页
 * @returns {React.ReactNode}
 */
export default function Tabs<T extends Tab[]>(props: TabsProps<T>): React.ReactNode {

  const {
    items,
    defaultValue,
    onChange,
  } = props;

  const active = useSharedValue(0);
  const translate = useSharedValue(0);

  const tabs = useConfiguration(
    configuration => configuration?.scheme?.components?.Tabs
  );

  const [value, setValue] = useControllableValue({
    defaultValue,
    onChange,
    value: props?.value,
  });

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    tabBarContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '100%',
      justifyContent: 'space-between',
    },
    tab: {
      fontSize: 17,
      height: 38,
      flex: 1,
      textAlign: 'center',
    },
    line: {
      marginVertical: 0,
    },
    section: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    active: {
      height: 2,
      backgroundColor: tabs?.line?.active,
    },
  });

  const onPress = (value: TabsValue<T>) => {
    const current = items?.findIndex(item => item.key === value) ?? 0;
    active.value = withTiming(
      100 / current,
      {
        duration: 500,
      }
    );
    // runOnJS(setValue)(value);
  };

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: `${active?.value}%`,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()?.onChange((event) => {
    if (event?.translationX) {
      translate.value = event?.translationX;
    }
  })?.onEnd((event) => {

    // const current = items?.findIndex(item => item.key === value) ?? 0;
    translate.value = withTiming(
      event?.translationX,
    );
  });

  const sectionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: `${translate.value}%`,
        },
      ],
    };
  });

  useUpdateEffect(() => {
    const current = items?.findIndex(item => item.key === value) ?? 0;
    translate.value = withTiming(current * 100, {
      duration: 300,
    });
  }, [value]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <View style={styles?.title}>
          <View style={styles?.tabs}>
            {
              items?.map(
                item => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.key}
                      onPress={() => onPress(item.key)}
                    >
                      {content(item.title, styles.tab)}
                    </TouchableWithoutFeedback>
                  );
                }
              )
            }
          </View>
          <Animated.View style={[activeStyle, styles.active]} />
          <SeparationLine style={styles?.line} />
        </View>
      </ScrollView>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles?.section, sectionStyle]}>
            {
              items?.map((item) => {
                return (
                  <View key={item.key}>
                    {item?.children}
                  </View>
                );
              })
            }
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}


