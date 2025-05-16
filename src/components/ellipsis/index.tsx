/* eslint-disable @typescript-eslint/no-shadow */

import { LayoutChangeEvent, StyleSheet, TextProps, TouchableOpacity, useWindowDimensions, ViewStyle } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useGetState, usePrevious, useSetState } from '../../hooks';


type Props<T> = {
  /**
   * 折叠内容
  */
  children: string | number;
  /**
   * 折叠行数
  */
  rows?: number;
  /**
   * 折叠内容样式
  */
  style?: ViewStyle;
  /**
   * 省略位置
   */
  direction?: T;
}

type EllipsisProps<T> = T extends 'tail' ? Props<T> & {
  /**
   * 展开
  */
  expand?: React.ReactNode;
  /**
   * 收起
  */
  collapse?: React.ReactNode;
} : Props<T>;

/**
 * @function Ellipsis
 * @description 折叠文本
 * @author Lock
 * @param {EllipsisProps}props
 * @returns {React.ReactNode}
*/
export default function Ellipsis<T extends TextProps['ellipsizeMode']>(props: EllipsisProps<T>): React.ReactNode {
  const {
    rows = 1,
    style,
    direction = 'tail',
    expand = '展开',
    collapse = '收起',
    children,
  } = props as EllipsisProps<'tail'>;

  const [show, setShow, getShow] = useGetState(false);
  const [text, setText] = useState(children);
  const previous = usePrevious<string>(text as string);
  const [position, setPosition] = useState(0);
  const dimensions = useRef(0);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // 让文本和按钮并排显示
      alignItems: 'center', // 让按钮和文字对齐
      position: 'relative',
      ...style,
    },
    text: {
      // marginRight: direction === 'tail' ? show ? 0 : 24 : 0, // 让文本适应按钮
      fontSize: 14,
    },
    toggleContainer: {
      position: 'absolute',
      ...(
        show ? {
          left: position,
          bottom: position === 0 ? 20 : 0,
        } : {
          right: 0,
          bottom: 0,
        }
      ),
    },
    toggle: {
      color: 'blue',
    },
  });

  const onSlice = () => {
    if (dimensions.current) {
      const text = children?.toString();
      const size = Math.floor(dimensions.current / 14.5);
      const content = text?.slice(0, (size * rows) - (direction === 'tail' ? 1.5 : 1));
      const max = Math.ceil(text?.length / size);
      const end = Array.from({
        length: max ?? 0,
      })?.map((...[, index]) => text?.slice(size * index, size * (index + 1)))?.at(-1);
      const position = ((end?.length ?? 0) * 14.5);
      setPosition(position > dimensions.current ? 0 : position);
      setText(show ? children : content + '...');
    }
  };

  // 根据宽度计算每行文字
  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    dimensions.current = width;
    onSlice();
  };

  const onPress = () => {
    setShow(!show);
    setText(getShow() ? children : previous);
  };

  useEffect(() => {
    onSlice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text
        // ellipsizeMode={direction}
        style={styles.text}>
        {text}
      </Text>
      {
        direction === 'tail' &&
        (
          <TouchableOpacity onPress={onPress} style={styles.toggleContainer}>
            <Text style={styles.toggle}>
              {show ? collapse : expand}
            </Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}
