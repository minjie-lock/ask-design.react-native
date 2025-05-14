import { lazy } from 'react';
import Card from '../card';
import { ListRenderItem, StyleSheet, View, VirtualizedList } from 'react-native';
import { content } from '../../utils';
import { useConfiguration } from '../configuration';
type ListProps<T> = {
  /**
   * 是否有边框
  */
  bordered?: boolean;
  /**
   * 列表数据
  */
  dataSource?: T[];
  /**
   * 列表头部
  */
  header?: React.ReactNode;
  /**
   * 渲染列表项
  */
  render?: ListRenderItem<T>;
  /**
   * 虚拟滚动
  */
  virtualized?: boolean;
}

/**
 * @function List
 * @description 列表
 * @author Lock
 * @param props
 * @returns
 */
export default function List<T>(props: ListProps<T>) {

  const {
    dataSource,
    header,
    render,
  } = props;

  const list = useConfiguration(
    configuration => configuration.scheme.components.List
  );

  const styles = StyleSheet.create({
    main: {
      paddingHorizontal: 0,
      backgroundColor: 'none',
    },
    container: {
      paddingHorizontal: 0,
    },
    header: {
      paddingBottom: 12,
      paddingHorizontal: 12,
      backgroundColor: list.header.background,
    },
  });

  return (
    // <View
    //   style={styles.main}
    // >
    //   <View style={styles.header}>
    //     {content(header, {
    //       color: list.header.color,
    //       fontWeight: '700',
    //     })}
    //   </View>
    //   <Card styles={{
    //     body: styles.container,
    //   }}>
    //     {
    //       render && dataSource?.map?.(render)
    //     }
    //   </Card>
    // </View>
    <VirtualizedList
      data={dataSource}
      renderItem={render}
      initialNumToRender={10}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

List.Item = lazy(() => import('./item'));
