/* eslint-disable @typescript-eslint/no-shadow */
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { content } from '../../utils';
import { useConfiguration } from '../configuration';
import { useControllableValue } from '../../hooks';
import Icon from '../icon';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

type SelectorMode = 'single' | 'multiple';

type SelecorOpetions = {
  /**
   * 选项值
  */
  value: string | number;
  /**
   * 描述
  */
  description: React.ReactNode;
  /**
   * 标签
  */
  label: React.ReactNode;
  /**
   * 是否禁用
   */
  disabled: boolean;
}

type SelectorValue<T> = T extends 'single' ? string | number : (string | number)[];

type SelectorProps<T> = {
  /**
   * 选项
  */
  options: Array<SelecorOpetions>;
  /**
   * 列数
  */
  columns?: number;
  /**
   * 默认值
  */
  defaultValue?: SelectorValue<T>;
  /**
   * 是否全部禁用
  */
  disabled?: boolean;
  /**
   * 字段映射
  */
  fieldNames?: {
    [key in keyof SelecorOpetions]: string;
  };
  /**
   * 模式
  */
  mode?: T;
  /**
   * 值改变回调
  */
  onChange?: (value: SelectorValue<T>) => void;
  /**
   * 值
   */
  value?: SelectorValue<T>;
}

/**
 * @function Selector
 * @description 选择组
 * @returns {React.ReactNode}
 */
export default function Selector<T extends SelectorMode>(props: SelectorProps<T>):
  React.ReactNode {


  const {
    disabled = false,
    options,
    columns = 3,
    mode = 'single',
    fieldNames = {
      label: 'label',
      value: 'value',
      disabled: 'disabled',
      description: 'description',
    },
  } = props;

  const selector = useConfiguration(
    configuration => configuration.scheme.components.Selector
  );

  const badge = useSharedValue(1.1);

  const [value, setValue] = useControllableValue<SelectorValue<T>>({
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange,
  });

  const current = Array.isArray(value) ? value : [value];

  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // justifyContent: 'space-between',
      gap: 10,
    },
    item: {
      width: ((100 / columns - 1) - 5) + '%' as `${number}%`,
      minHeight: 37,
      backgroundColor: selector.background.default,
      borderRadius: selector.round,
      position: 'relative',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    items: { flex: 1, padding: 10 },
    label: {
      textAlign: 'center',
    },
    icons: {
      position: 'absolute',
      bottom: -20,
      right: -20,
      width: 37,
      height: 37,
      borderColor: selector.text.label.active,
      borderStyle: 'solid',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{
        rotate: '45deg',
      }],
      backgroundColor: selector.text.label.active,
    },
    icon: {
      color: '#FFFFFF',
      fontSize: 10,
      position: 'absolute',
      left: 2,
      transform: [{
        rotate: '-50deg',
      }],
    },
  });

  const onPress = (data: string | number) => {
    switch (mode) {
      case 'single':
        setValue(data);
        break;
      case 'multiple':
        const content = value as SelectorValue<'multiple'>;
        if (content?.includes(data)) {
          setValue(content.filter((item) => item !== data));
        } else {
          setValue([...(content ?? []), data]);
        }
        break;
    }
    badge.value = withSpring(1, {
      duration: 400,
    }, () => {
      badge.value = 1;
    });
  };

  return (
    <View style={styles.main}>
      {
        options?.map((item: any) => {
          const includes = current?.includes(item?.[fieldNames?.value]);

          const itemsStyles = StyleSheet.create({
            container: {
              ...styles.item,
              backgroundColor: includes ?
                selector.background.active : selector.background.default,
              opacity: disabled ? 0.5 : item?.[fieldNames?.disabled] ? 0.5 : 1,
            },
            label: {
              textAlign: 'center',
              color: includes ? selector.text.label.active :
                selector.text.label.default,
            },
            description: {
              marginTop: 4,
              color: includes ? selector.text.description.active :
                selector.text.description.default,
              fontSize: 12,
              textAlign: 'center',
            },
          });

          return (
            <TouchableHighlight key={item?.[fieldNames?.value]}
              onPress={() => onPress(item?.[fieldNames?.value])}
              style={itemsStyles.container}
              underlayColor={selector.background.active}
            >
              <View style={styles.items}>
                {content(item?.[fieldNames?.label], itemsStyles.label)}
                {content(item?.[fieldNames?.description], itemsStyles.description)}
                {includes && (
                  <Animated.View style={[styles.icons]}>
                    <Icon name="check" style={styles.icon} />
                  </Animated.View>
                )}
              </View>
            </TouchableHighlight>
          );
        })
      }
    </View>
  );
}
