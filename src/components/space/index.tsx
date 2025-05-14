import { View, ViewStyle } from 'react-native';

type SpaceProps = {
  /**
   * 交叉轴对齐方式
  */
  align?: ViewStyle['alignItems'];
  /**
   * 子级
  */
  children?: React.ReactNode;
  /**
   * 排列方向
  */
  vertical?: boolean;
  /**
   * 主轴对齐方向
  */
  justif?: ViewStyle['justifyContent'];
  /**
   * 间隙
  */
  gap?: number;
  /**
   * 允许换行
   */
  wrap?: boolean;
}

/**
 * @function Space
 * @description 弹性布局
 * @author Lock
 * @param props
 * @returns
 */
export default function Space(props: SpaceProps){

  const {
    align = 'flex-start',
    justif = 'flex-start',
    vertical = false,
    children,
    wrap = false,
    gap,
  } = props;

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        display: 'flex',
        alignItems: align,
        justifyContent: justif,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flexDirection: vertical ? 'column' : 'row',
        gap,
      }}
    >
      {children}
    </View>
  );
}
