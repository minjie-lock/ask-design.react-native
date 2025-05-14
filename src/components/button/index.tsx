
import {
  GestureResponderEvent,
  ButtonProps as NButtonProps,
  View,
  ViewStyle,
  TouchableHighlight,
  TextStyle,
} from 'react-native';
import { useConfiguration } from '../configuration';
import { content } from '../../utils';

type ButtonProps = {
  /**
   * 是否块级元素
  */
  block?: boolean;
  /**
   * 按钮颜色
  */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * 是否禁用
  */
  disabled?: boolean;
  /**
   * 填充模式
  */
  fill?: 'solid' | 'outline' | 'none';
  /**
   * 是否处于加载状态，'auto' 模式会监听 onClick 的 Promise 状态自动更新 loading
  */
  loading?: boolean;
  /**
   * 加载状态下的 icon 图标
  */
  loadingIcon?: React.ReactNode;
  /**
   * 加载状态下额外展示的文字
  */
  loadingText?: string;
  /**
   * 触摸事件
  */
  onPress?: NButtonProps['onPress'];
  /**
   * 按钮形状
  */
  shape?: 'default' | 'rounded' | 'rectangular';
  /**
   * 大小
  */
  size?: 'mini' | 'small' | 'middle' | 'large';
  /**
   * 内容
  */
  children?: React.ReactNode;
};

const height = {
  mini: 26,
  small: 30,
  middle: 40,
  large: 50,
};

const sizes = {
  mini: 15,
  small: 16,
  middle: 17,
  large: 18,
};



/**
 * @function Button
 * @description 按钮
 * @author Lock
 * @param props
 * @returns
 */
export default function Button(props: ButtonProps) {

  const {
    children,
    size = 'middle',
    block = false,
    shape = 'default',
    color = 'primary',
    fill = 'solid',
    disabled = false,
    onPress,
  } = props;

  const button = useConfiguration(configuration => {
    return configuration.scheme?.components.Button;
  });

  const radius = {
    default: button?.round,
    rectangular: 0,
    rounded: '30%',
  };

  const background = {
    none: {
      backgroundColor: 'none',
      color: button?.color[color]?.default,
      opacity: disabled ? 0.4 : 1,
    },
    solid: {
      backgroundColor: button?.color[color]?.default,
      color: '#fff',
      opacity: disabled ? 0.4 : 1,
    },
    outline: {
      backgroundColor: 'none',
      color: button?.color[color]?.default,
      opacity: disabled ? 0.4 : 1,
      borderWidth: 1,
      borderColor: button?.color[color]?.default,
    },
  };

  const style: ViewStyle = {
    width: block ? '100%' : 'auto',
    height: height[size],
    borderRadius: radius[shape],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    ...background[fill],
  };

  const onEnd = (event: GestureResponderEvent) => {
    onPress?.(event);
  };

  const obvious = {
    none: {
      color: '',
    },
    solid: {
      color: button?.color[color]?.obvious,
    },
    outline: {
      color: '',
    },
  };

  const text: TextStyle = {
    color: background?.[fill].color,
    fontSize: sizes?.[size],
    fontWeight: 700,
    lineHeight: sizes?.[size],
  };

  return (
    <TouchableHighlight
      onPress={onEnd}
      disabled={disabled}
      style={style}
      underlayColor={obvious[fill].color}
    >
      <View>
        {
          content(children, text)
        }
      </View>
    </TouchableHighlight>
  );
}
