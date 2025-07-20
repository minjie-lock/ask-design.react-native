import { Portal } from 'react-native-portalize';

type FixedProps = {
  /**
   * 子节点
   */
  children?: React.ReactNode;
};

/**
 * @function Fixed
 * @description 全屏渲染
 * @author Lock
 * @param props
 * @returns {React.ReactNode}
 */
export default function Fixed(props: FixedProps): React.ReactNode {
  const {
    children,
  } = props;

  return (
    <Portal>
      {children}
    </Portal>
  );
}
