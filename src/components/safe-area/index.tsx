import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AskStatusBar } from '@/utils';

type SafeAreaProps = {
  /**
   * @description 显示位置
  */
  position?: 'top' | 'bottom';
}

/**
 * @function SafeArea
 * @description 全面屏下提供自适应的边距调整
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function SafeArea(props: SafeAreaProps): React.ReactNode {

  const {
    position = 'bottom',
  } = props;

  const [status, setStatus] = useState(0);

  const styles = StyleSheet.create({
    top: {
      marginTop: status + 10,
    },
    bottom: {
      paddingBottom: status,
    },
  });

  useEffect(() => {
    AskStatusBar.height.then((resolve) => {
      setStatus(resolve);
    });
  }, []);

  useEffect(() => {

  }, []);

  return (
    <View style={styles?.[position]} />
  );
}

