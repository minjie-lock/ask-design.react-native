
import { useControllableValue } from '../../hooks';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import Summary, { SummaryProps } from './summary';
import { useConfiguration } from '../configuration';
import React, { Children, cloneElement, createContext, JSX } from 'react';

export const DetailsContext = createContext<{ current: (string | number)[] | void }>({
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
  defaultValue?: DetailsValue<T>;
}

/**
 * @function Details
 * @description 折叠面板
 * @author Lock
 * @returns {JSX.Element}
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

  const onPress = (current: Required<DetailsProps<T>>['value']) => {
    if (!accordion) {
      if (value?.includes?.(current as string | number)) {
        setValue?.(
          value?.filter((item) => item !== (current))
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
          children &&
          Children.map(children as React.ReactElement<SummaryProps>, (children) => {
            const props = children?.props;
            return cloneElement(children, props?.disabled ? props : {
              ...props,
              onPress: (event: GestureResponderEvent) => {
                props?.onPress?.(event);
                onPress?.(props?.value as DetailsValue<T>);
              },
            });
          })
        }
      </View>
    </DetailsContext.Provider>
  );
}

Details.Summary = Summary;

