
import { View, StyleSheet, Image } from 'react-native';
import { content } from '@/utils';
import { useConfiguration } from '../configuration';

type ResultProps = {
  /**
   * 描述内容
   */
  description?: React.ReactNode;
  /**er
   * 图标
  */
  status?: 'success' | 'error' | 'info' | 'waiting' | 'warning' | React.ReactNode;
  /**
   * 显示位置
  */
  title?: React.ReactNode;
}

/**
 * @function Result
 * @description 结果
 * @param props
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Result(props: ResultProps): React.ReactNode {
  const {
    description,
    status = 'info',
    title,
  } = props;


  const result = useConfiguration(
    configuration => configuration.scheme.components.Result
  );

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginBottom: 16,
      width: 48,
      height: 48,
    },
    title: {
      fontSize: 20,
      color: result.title,
    },
    description: {
      marginTop: 8,
      textAlign: 'center',
      lineHeight: 20,
      color: result.description,
    },
  });

  const source = {
    success: require('@/static/images/result-info.png'),
    error: require('@/static/images/result-error.png'),
    ifno: require('@/static/images/result-info.png'),
    waiting: require('@/static/images/result-waiting.png'),
    warning: require('@/static/images/result-warning.png'),
  };

  type Key = Exclude<keyof typeof status, React.ReactNode>;

  return (
    <View style={styles.container}>
      {
        source?.[status as Key] ?
          <Image style={styles.icon} source={source?.[status as Key]} /> :
          status
      }
      <View>
        {content(title, styles.title)}
      </View>
      <View>
        {content(description, styles.description)}
      </View>
    </View>
  );
}
