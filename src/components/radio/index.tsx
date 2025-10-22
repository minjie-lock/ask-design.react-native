
import { StyleSheet, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useBoolean } from 'ahooks';
import Icon from '../icon';
import { useConfiguration } from '../configuration';
import { useControllableValue } from '@/hooks';
import { lazy, useEffect } from 'react';
import { content } from '@/utils';

type Fields = 'icon' | 'text';

export type RadioProps = {
  /**
   * @description 是否渲染为块级元素
  */
  block?: boolean;
  /**
   * @description 指定当前是否选中
  */
  value?: boolean;
  /**
   * @description 默认是否选中
  */
  defaultValue?: boolean;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 图标
   */
  icon?: React.ReactNode;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * @description 值变化时的回调函数
   */
  onChange?: (value: boolean) => void;
  /**
   * @description 触摸
   */
  onPress?: () => void;
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: ViewStyle;
  /**
   * @description 类集合
   */
  classNames?: Record<Fields, string>;
  /**
   * @description 样式集合
  */
  styles?: Record<Fields, ViewStyle>;
}



/**
 * @function Radio
 * @description 单选框
 * @author Lock
 * @param {RadioProps} props
 * @returns {React.ReactNode}
 */
export default function Radio(props: RadioProps): React.ReactNode {

  const {
    onChange,
    defaultValue,
    style,
    className,
    children,
    classNames,
  } = props;

  const [value, setValue] = useControllableValue({
    value: props?.value,
    onChange,
    defaultValue,
  });

  const icon = useSharedValue(0);
  const [show, { setTrue, setFalse }] = useBoolean(false);

  const radio = useConfiguration(
    configuration => configuration?.scheme?.components?.Radio
  );

  const styles = StyleSheet.create({
    radio: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      ...style,
    },
    container: {
      width: 19,
      height: 19,
      borderColor: radio?.border,
      borderWidth: 1,
      borderRadius: radio?.round,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: value ? radio?.background?.active :
        radio?.background?.default,
    },
    icon: {
      color: '#FFF',
    },
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: icon.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (value) {
      runOnJS(setTrue)();
      icon.value = withSpring(
        1,
        {
          duration: 300,
        }
      );
    } else {
      icon.value = withSpring(
        0,
        {
          duration: 300,
        },
        () => {
          runOnJS(setFalse)();
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onPress = () => {
    setValue(true);
  };

  return (
    <View style={styles?.radio} className={className}>
      <TouchableNativeFeedback onPress={onPress}>
        <Animated.View style={[styles?.container]}>
          {
            show && (
              <Animated.View style={[iconStyle]}>
                <Icon
                  name="check"
                  style={[styles?.icon, props?.styles?.icon]}
                  className={classNames?.icon}
                />
              </Animated.View>
            )
          }
        </Animated.View>
      </TouchableNativeFeedback>
      {
        content(
          children,
          props?.styles?.text,
          classNames?.text
        )
      }
    </View>
  );
}


Radio.Gruop = lazy(() => import('./group'));
