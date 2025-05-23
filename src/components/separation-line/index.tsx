import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useConfiguration } from '../configuration';

type SeparationLine = {
  /**
   * 方向
  */
  direction?: 'horizontal' | 'vertical';
  /**
   * 文字
  */
  children?: string;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 文字位置，仅在 direction 为 horizontal 生效
  */
  position?: 'center' | 'left' | 'right';
}

/**
 * @function SeparationLine
 * @description 分割线
 * @author Lock
 * @returns {JSX.Element}
*/
export default function SeparationLine(props: SeparationLine) {

  const {
    children,
    direction = 'horizontal',
    position = 'center',
    style,
  } = props;

  const separatio = useConfiguration(
    (configuration) => configuration.scheme.components.SeparationLine
  );

  const styles = StyleSheet.create({
    main: {
      height: direction === 'horizontal' ? 1 : '100%',
      width: direction === 'horizontal' ? '100%' : 1,
      backgroundColor: separatio.background,
      marginVertical: direction === 'horizontal' ? 32 : 0,
      marginHorizontal: direction === 'vertical' ? 32 : 0,
      ...style,
    },
  });

  if (children && direction === 'horizontal') {
    const styles = StyleSheet.create({
      main: {
        width: '100%',
        height: 'auto',
        marginVertical: 32,
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      },
      text: {
        marginHorizontal: 10,
      },
      solid: {
        height: 1,
        borderStyle: 'solid',
        backgroundColor: separatio.background,
      },
      content: {
        color: separatio.color,
      },
    });

    return (
      <View style={styles.main}>
        <View style={{
          ...styles.solid,
          flex: {
            left: 1,
            center: 1,
            right: 3,
          }[position],
        }} />
        <View style={styles.text}>
          <Text style={styles.content}>{children}</Text>
        </View>
        <View style={{
          ...styles.solid,
          flex: {
            left: 3,
            right: 1,
            center: 1,
          }[position],
        }} />
      </View>
    );
  }

  return (
    <View style={styles.main} />
  );
}
