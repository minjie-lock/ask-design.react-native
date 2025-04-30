
import { useControllableValue } from '../../hooks';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import Summary from './summary';
import { useConfiguration } from '../configuration';
import { Children, cloneElement, createContext } from 'react';

export const DetailsContext = createContext<{ current?: (string | number)[] }>({
  current: [],
});

type DetailsValue<T> = T extends true ? string | number : (string | number)[];

type DetailsProps<T extends boolean> = {
  children?: React.ReactNode;
  /**
   * 手风琴模式-只能展开一个
  */
  accordion?: T;
  /**
   * 展开时触发
  */
  onChange?: (value: DetailsValue<T>) => void;
  /**
   * 受控值
  */
  value?: DetailsValue<T>;
  /**
   * 默认值
  */
  defaultValue?: DetailsProps<T>;
}

/**
 * @function Details
 * @description 折叠面板
*/
export default function Details<T extends boolean>(props: DetailsProps<T>) {

  const {
    accordion = false,
    children,
  } = props;

  const [value, setValue] = useControllableValue<DetailsProps<T>['value']>({
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange,
  });

  const details = useConfiguration(
    configuration => configuration.scheme.components.Details
  );

  const styles = StyleSheet.create({
    main: {
      display: 'flex',
      paddingHorizontal: 12,
      backgroundColor: details.background,
    },
  });

  const onPress = (current: DetailsProps<T>['value']) => {
    if (!accordion) {
      if (value?.includes?.(current)) {
        setValue?.(
          value?.filter((item) => item !== current)
        );
      } else {
        setValue([...(value ?? []), current]);
      }
      return;
    }
    setValue?.(current);
  };

  return (
    <DetailsContext.Provider value={{ current: accordion ? [value] : value }}>
      <View style={styles.main}>
        {
          Children.map(children, (children) => {
            const props = children?.props;
            return cloneElement(children, props?.disabled ? props : {
              ...props,
              onPress: (event: GestureResponderEvent) => {
                props?.onPress?.(event);
                onPress?.(props?.value);
              },
            });
          })
        }
      </View>
    </DetailsContext.Provider>
  );
}

Details.Summary = Summary;

