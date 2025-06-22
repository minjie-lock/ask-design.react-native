/* eslint-disable react-native/no-inline-styles */
import { useControllableValue } from '@/hooks';
import { content } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import { View, StyleSheet, TouchableNativeFeedback, Text, FlatList, FlatListProps, ViewStyle } from 'react-native';
import { useConfiguration } from '../configuration';
import { RED } from '@/styles/color';
import { useRef } from 'react';

type Event<T> = FlatListProps<T>['onViewableItemsChanged'];

type SideBaseItem = {
  /**
   * @description 标题
  */
  title?: React.ReactNode;
  /**
   * @description 角标
   */
  badge?: (() => React.ReactNode) | number;
  /**
   * 内容
   */
  children: React.ReactNode;
  /**
   * @description 点击事件
   */
  onPress?: (value: number | string) => void;
  /**
   * 唯一键
   */
  key: string | number;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
};

type SideBarItem<M extends boolean> = M extends true ? SideBaseItem & {
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
} : SideBaseItem;

type Value<T extends SideBarItem<M>[], M extends boolean> = T extends SideBarItem<M>[]
  ? T[number]['key'] : string | number;

type SideBarProps<T extends SideBarItem<M>[], M extends boolean> = {
  /**
   * @description 列表
  */
  items: T;
  /**
   * 值回调
   */
  onChange?: (value: Value<T, M>) => void;
  /**
   * @description 默认值
   */
  defaultValue?: Value<T, M>;
  /**
   * @description 值
   */
  value?: Value<T, M>;
  /**
   * @description 滚动模式
  */
  scroll?: M;
  /**
   * @description 样式
   */
  style?: ViewStyle;
  /**
   * @description 类名
   */
  className?: string;
}

/**
 * @function SideBar
 * @description 侧边栏
 * @author Lock
 * @param {SideBarProps} props
 * @returns {React.ReactNode}
 */
export default function SideBar<T extends SideBarItem<M>[], M extends boolean = false>
  (props: SideBarProps<T, M>): React.ReactNode {

  const {
    items,
    className,
    scroll = false,
  } = props;

  const flatListRef = useRef<FlatList>(null);
  const first = useRef(true);

  const [value, setValue] = useControllableValue({
    value: props?.value,
    onChange: props.onChange,
    defaultValue: props?.defaultValue,
  });

  const side = useConfiguration(
    (configuration) =>
      configuration.scheme.components.SideBar
  );

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    side: {
      display: 'flex',
      width: 105,
      backgroundColor: side?.background?.side.default,
      height: 'auto',
    },
    content: {

    },
    scroll: {
      // height: '100%',
      flex: 1,
    },
    sideItem: {
      height: 50,
      paddingHorizontal: 10,
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box',
      borderLeftWidth: 3,
    },
    badge: {
      backgroundColor: RED.five,
      width: 14,
      height: 14,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: -5,
    },
    sideItemText: {
      position: 'relative',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
    },
  });

  const render = useMemoizedFn(() => {
    const current = items?.find(
      item => item?.key === value,
    );
    return current?.children;
  });

  // 检测当前滚动位置
  const onViewableItemsChanged: Event<SideBarItem<M>> = ({ viewableItems }) => {
    if (viewableItems.length && first.current) {
      const [current] = viewableItems ?? [];
      setValue(current?.key);
    }
  };

  return (
    <View style={styles.container} className={className}>
      <View style={styles?.side}>
        {
          items?.map(
            (item, index) => {

              const onPrees = () => {
                setValue(item.key);
                item?.onPress?.(item.key);
                // 滚动模式滚到指定位置
                if (scroll) {
                  first.current = false;
                  flatListRef.current?.scrollToIndex({
                    index,
                    animated: true,
                  });
                }
              };

              return (
                <TouchableNativeFeedback
                  key={item.key}
                  disabled={scroll ? false : item.disabled}
                  onPress={onPrees}
                >
                  <View style={{
                    ...styles.sideItem,
                    backgroundColor: value === item?.key ? 'white' : '',
                    borderLeftColor: value === item?.key ? side.color.active
                      : 'transparent',
                    // 滚动模式禁用无效
                    ...(scroll ? {} : {
                      opacity: item?.disabled ? 0.5 : 1,
                    }),
                  }}>
                    <View style={styles.sideItemText}>
                      {content(item?.title, {
                        color: value === item.key ?
                          side?.color.active : side?.color.default,
                      })}
                      {
                        item?.badge && (
                          <View style={styles.badge}>
                            {
                              typeof item?.badge === 'function' ?
                                item?.badge() :
                                <Text style={styles.badgeText}>{item?.badge}</Text>
                            }
                          </View>
                        )
                      }
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            }
          )
        }
      </View>
      {
        scroll ? (
          <FlatList<SideBarItem<M>> style={styles?.scroll} ref={flatListRef}
            data={items}
            onViewableItemsChanged={onViewableItemsChanged}
            onMomentumScrollEnd={() => {
              first.current = true;
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  {item.children}
                </View>
              );
            }}
          />

        ) : (
          <View style={styles.content}>
            {render()}
          </View>
        )
      }
    </View>
  );
}
