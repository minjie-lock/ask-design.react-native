import { JSXElementConstructor, ReactElement } from 'react';
import { FlatList } from 'react-native';

interface GridItem {
  /**
   * @description 占比
  */
  span?: number;
  /**
   * @description 项目内容
  */
  children: React.ReactNode;
  /**
   * @description 关键值
  */
  key: React.Key;
}


type GridProps = {
  /**
   * @description 项目列表
   */
  items?: GridItem[];
  /**
   * @description 项目数量
  */
  columns?: number;
  /**
   * @description 间隙
  */
  gap?: number;
}

/**
 * @function Grid
 * @description 宫格
 * @author Lock
 * @param {GridProps} props
 * @returns {React.ReactNode}
 */
export default function Grid(props: GridProps): React.ReactNode {

  const {
    items = [],
    columns = 3,
    gap,
  } = props;

  return (
    <FlatList
      data={items}
      numColumns={columns}
      keyExtractor={(item) => item?.key as string}
      columnWrapperStyle={{
        gap,
      }}
      renderItem={({ item }) => {
        return (
          item.children
        ) as ReactElement<unknown, string | JSXElementConstructor<unknown>>;
      }}
    />
  );
}

