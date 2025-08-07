import { Platform, SafeAreaView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';

type SafeAreaProps = {
  /**
   * @description 内容
  */
  children?: React.ReactNode;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 类名
  */
  className?: string;
}

/**
 * @function SafeArea
 * @description 全面屏下提供自适应的边距调整
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function SafeArea(props: SafeAreaProps): React.ReactNode {

  const {
    // position = 'bottom',
    children,
    style,
    ...rest
  } = props;

  // const [status, setStatus] = useState(0);
  const type = Platform.OS;
  const currentHeight = StatusBar?.currentHeight;
  const styles = StyleSheet.create({
    ios: {
      ...style,
    },
    android: {
      paddingTop: currentHeight,
      ...style,
    },
  });

  // useAsyncEffect(async () => {
  //   const height = await AskStatusBar.height;
  //   setStatus(height);
  // }, []);

  // useEffect(() => {

  // }, []);

  if (type === 'ios') {
    return (
      <SafeAreaView style={styles.ios} {...rest}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.android} {...rest}>
      {children}
    </View>
  );
}

