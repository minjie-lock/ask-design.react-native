import { Image, StyleSheet } from 'react-native';
import Result from '../result';

type ErrorProps = {
  /**
   * 描述
   */
  description?: React.ReactNode;
  /**
   * 错误类型
  */
  status?: 'default' | 'disconnected' | 'empty' | 'busy';
  /**
   * 标题
  */
  title?: React.ReactNode;
}

/**
 * @function Error
 * @description 错误处理
 * @param props
 * @author Lock
 * @returns {React.ReactNode}
 */
export default function Error(props: ErrorProps): React.ReactNode {

  const {
    description,
    status = 'default',
    title,
  } = props;


  const Status = {
    default: {

      title: '错误',
      description: '请稍后再试',
      image: require('@/static/images/error-default.png'),
    },
    disconnected: {
      title: '网络错误',
      description: '请检查网络设置',
      image: require('@/static/images/error-disconnected.png'),
    },
    empty: {
      title: '没有内容',
      description: '请稍后再试',
      image: require('@/static/images/error-empty.png'),
    },
    busy: {
      title: '正在处理中',
      description: '请稍后再试',
      image: require('@/static/images/error-busy.png'),
    },
  };

  const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
    },
  });

  return (
    <Result
      title={title ?? Status?.[status].title}
      description={description ??  Status?.[status].description}
      status={
        <Image style={styles?.image} source={Status?.[status].image} />
      }
    />
  );
}
