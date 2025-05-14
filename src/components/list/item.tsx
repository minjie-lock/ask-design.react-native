import { StyleSheet, View } from 'react-native';
import { content } from '../../utils';
import SeparationLine from '../separation-line';

type ListItemProps = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
  */
  children?: React.ReactNode;
  /**
   * 值
  */
  value?: number | string;
  /**
   * 禁用
  */
  disabled?: boolean;
}

export default function Item(props: ListItemProps) {

  const {
    title,
    children,
    value,
    disabled,
  } = props;

  const styles = StyleSheet.create({
    container: {
      padding: 12,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    line: {
      marginVertical: 0,
    },
  });

  return (
    <View>
      <SeparationLine style={styles.line} />
      <View style={styles.container}>
        {content(children)}
      </View>
    </View>
  );
}
