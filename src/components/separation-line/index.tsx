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
    const main: ViewStyle = {
      width: '100%',
      height: 'auto',
      marginVertical: 32,
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      flexDirection: 'row',
    };
    const text: ViewStyle = {
      marginHorizontal: 10,
    };
    const solid: ViewStyle = {
      flex: 1,
      height: 1,
      borderStyle: 'solid',
      backgroundColor: separatio.background,
    };

    return (
      <View style={main}>
        <View style={{
          ...solid,
          flex: {
            left: 1,
            center: 1,
            right: 3,
          }[position],
        }} />
        <View style={text}>
          <Text style={{
            color: separatio.color,
          }}>{children}</Text>
        </View>
        <View style={{
          ...solid,
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
