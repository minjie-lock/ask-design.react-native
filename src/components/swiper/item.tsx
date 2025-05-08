import { StyleSheet, View, ViewStyle } from 'react-native';
import { content } from '../../utils';
import { useSwiper } from '.';

export type SwiperItemProps = {
  /**
   * 内容
  */
  children?: React.ReactNode;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 索引
   */
  value: number | string;
}

export default function Item(props: SwiperItemProps) {

  const {
    children,
    style,
  } = props;

  const { width, height, current } = useSwiper();

  const styles = StyleSheet.create({
    content: {
      width,
      height,
      ...style,
    },
  });

  return (
    <View style={styles.content}>
      {content(children)}
    </View>
  );
};

