/* eslint-disable @typescript-eslint/no-shadow */

import { useControllableValue } from '@/hooks';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import type { SummaryProps } from './summary';
import { useConfiguration } from '../configuration';
import React, { Children, cloneElement, createContext, lazy } from 'react';
import Summary from './summary';

export const DetailsContext = createContext<{ current: (string | number)[] | void }>({
  current: [],
});

type DetailsValue<T> = T extends true ? string | number : (string | number)[];

type BaseDetailsProps<T extends boolean> = {
  /**
   * 手风琴模式-只能展开一个
  */
  accordion?: T;
  /**
   * 展开时触发
  */
  onChange?: (value?: DetailsValue<T>) => void;
  /**
   * 受控值
  */
  value?: DetailsValue<T>;
  /**
   * 默认值
  */
  defaultValue?: DetailsValue<T>;
}

// 两者只能其一
type DetailsProps<T extends boolean, C extends React.ReactNode | void> =
  C extends React.ReactNode ?
  BaseDetailsProps<T> & {
    /**
   * 值
  */
    children?: C;
  } : BaseDetailsProps<T> & {
    /**
   * 内容
   */
    items: SummaryProps[];
  };

/**
 * @function Details
 * @description 折叠面板
 * @author Lock
 * @param {DetailsProps<T>} props
 * @returns {React.ReactNode}
*/
export default function Details<T extends boolean,
  C extends React.ReactNode | void = void>(props: DetailsProps<T, C>): React.ReactNode {

  const {
    accordion = false,
    children,
    items,
  } = props as DetailsProps<T, React.ReactNode> & DetailsProps<T, void>;

  const [value, setValue] = useControllableValue<DetailsValue<T>>({
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

  const onPress = (current: DetailsValue<T>) => {
    if (!accordion) {
      const content = value as DetailsValue<false>;
      if (content?.includes?.(current as string | number)) {
        setValue<DetailsValue<false>>?.(
          content?.filter((item) => item !== (current)),
        );
      } else {
        setValue([...(content ?? []), current]);
      }
      return;
    }
    setValue?.(current);
  };

  const current = (accordion ? [value] : value) as DetailsValue<false>;

  return (
    <DetailsContext.Provider value={{ current }}>
      <View style={styles.main}>
        {
          items?.length ?
            items?.map(
              item => {
                return (
                  <Summary
                    key={item.value}
                    title={item.title}
                    arrowIcon={item.arrowIcon}
                    onPress={(event: GestureResponderEvent) => {
                      item?.onPress?.(event);
                      onPress?.(props?.value as DetailsValue<T>);
                    }}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.children}
                  </Summary>
                );
              }
            ) : children &&
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

Details.Summary = lazy(() => import('./summary'));

