import { content } from '@/utils';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useConfiguration } from '../configuration';

type StepsPropsItem = {
  /**
   * 描述
  */
  description?: React.ReactNode;
  /**
   * 图标
   */
  icon?: React.ReactNode;
  /**
   * 状态
  */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 唯一标识
   */
  key: string | number;
};

type StepsProps<T extends StepsPropsItem[]> = {
  /**
   * 步骤项
  */
  items?: T;
  /**
   * 排列方向
  */
  direction?: 'horizontal' | 'vertical';
  /**
   * 当前步骤
   */
  value?: T['length'];
}


/**
 * @function Steps
 * @description 步骤条
 * @param {StepsProps} props
 * @returns {React.ReactNode}
 * @author Lock
 */
export default function Steps<T extends StepsPropsItem[]>(props: StepsProps<T>): React.ReactNode {

  const {
    items,
    direction = 'horizontal',
    value,
  } = props;

  const steps = useConfiguration(
    configuration => configuration.scheme.components.Steps
  );

  const horizontal = direction === 'horizontal';
  // const vertical = direction === 'vertical';

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width: '100%',
      position: 'relative',
      left: horizontal ? '15%' : 0,
      flexDirection: horizontal ? 'row' : 'column',
    },
    items: {
      flex: horizontal ? 1 : 0,
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      flexDirection: horizontal ? 'column' : 'row',
      // position: 'relative',
      minHeight: horizontal ? 'auto' : 72,
    },
    item: {
      // justifyContent: 'center',
      // alignItems: 'center',
      flex: 1,
      display: 'flex',
      // justifyContent: 'center',
      flexDirection: horizontal ? 'column' : 'row',
    },
    icon: {
      width: 10,
      height: 10,
      borderRadius: 30,
      backgroundColor: steps?.border?.default,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: horizontal ? 'center' : 'flex-start',
    },
    title: {
      textAlign: horizontal ? 'center' : 'left',
      color: steps?.color?.title.default,
    },
    description: {
      color: steps?.color?.description,
      textAlign: horizontal ? 'center' : 'left',
    },
    section: {
      position: 'relative',
      width: '100%',
    },
    text: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      gap: 5,
      top: horizontal ? 0 : 12,
      left: horizontal ? '-45%' : '-95%',
    },
  });

  const status = {
    error: steps?.status?.error,
  };

  return (
    <View style={styles.container}>
      {
        items?.map(
          (item, index) => {
            const state = status?.[item?.status as keyof typeof status];
            const icon: ViewStyle = {
              width: 10,
              height: 10,
              borderRadius: 30,
              backgroundColor: (value ?? 0) >= index ?
                item?.status ? state :
                  steps?.border?.active :
                steps?.border?.default,
              position: 'relative',
              zIndex: 2,
            };

            const line: ViewStyle = {
              width: 1.5,
              height: horizontal ? 1.5 : '100%',
              position: 'absolute',
              top: horizontal ? 5 : 0,
              left: horizontal ? 0 : 4,
              right: horizontal ? index : 10,
              zIndex: 1,
              backgroundColor: (value ?? 0) > index ? steps?.border?.active :
                steps?.border?.default,
            };

            const color = (value ?? 0) >= index ? item?.status ? state :
              steps?.color?.title?.active :
              steps?.color?.title?.default;


            return (
              <View style={styles.items} key={item.key}>
                <View style={styles.section}>
                  {
                    item?.icon ? content(item?.icon) :
                      <View style={icon} />
                  }
                  {
                    index < items.length - 1 && <View style={line} />
                  }
                </View>
                <View style={styles?.text}>
                  {content(item?.title, {
                    ...styles?.title,
                    color,
                  })}
                  {content(item?.description, styles?.description)}
                </View>
              </View>
            );
          }
        )
      }
    </View>
  );
}

