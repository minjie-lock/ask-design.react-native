import { View, ViewStyle } from "react-native";

type SpaceProps = {
  /**
   * 交叉轴对齐方式
  */
  align?: ViewStyle['alignItems'];
  /**
   * 
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
}

export default function Space(props: SpaceProps){

  const { 
    align = 'flex-start',
    justif = 'flex-start',
    children,
    gap,
  } = props;

  return (
    <View
      style={{
        display: 'flex',
        alignItems: align,
        justifyContent: justif,
        gap,
      }}
    >
      {children}
    </View>
  )
}