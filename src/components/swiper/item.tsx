import { StyleSheet, View, ViewStyle } from 'react-native';
import { content } from '@/utils';

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

  const styles = StyleSheet.create({
    content: {
      width: '100%',
      height: '100%',
      ...style,
    },
  });

  return (
    <View style={styles.content}>
      {content(children)}
    </View>
  );
}


