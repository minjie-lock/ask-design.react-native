import { StyleSheet, Text, View } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import { useConfiguration } from '../configuration';
import { useState } from 'react';
import Icon from '../icon';
import { GREEN } from '@/styles/color';

type Props<T> = {
  /**
   * 头像大小
  */
  size?: keyof typeof sizes;
  /**
   * 头像形状
  */
  shape?: 'circle' | 'square';
  /**
   * 头像颜色
  */
  color?: string;
  /**
   * 头像内容
  */
  children?: T;
};

type AvatarProps<T> = T extends string ? Props<T> : Omit<Props<T>, 'children' | 'color'> & {
  /**
   * 占位
  */
  fallback?: React.ReactNode;
  /**
   * 头像图片
  */
  src?: string;
  /**
   * 缩放模式
  */
  fit?: ResizeMode;
};


const sizes = {
  mini: 20,
  small: 32,
  middle: 48,
  large: 64,
} as const;

/**
 * @function Avatar
 * @description 头像
 * @author Lock
 * @param {AvatarProps} props
 * @returns {React.ReactNode}
 */
export default function Avatar<T extends string | void>(props: AvatarProps<T>):  React.ReactNode {

  const {
    size = 'middle',
    shape = 'square',
    fallback,
    fit = 'cover',
    src,
    children,
    color = GREEN.four,
  } = (props ?? {}) as AvatarProps<string> & AvatarProps<void>;

  const [imageError, setImageError] = useState(false);
  const avatar = useConfiguration(
    configuration => configuration.scheme.components.Avatar
  );

  const onError = () => {
    setImageError(true);
  };

  const styles = StyleSheet.create({
    container: {
      width: sizes[size],
      height: sizes[size],
      borderRadius: shape === 'square' ? avatar.round : '50%',
      overflow: 'hidden',
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    fallback: {
      backgroundColor: children ? color : avatar?.background,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: sizes[size] / 2,
      fontWeight: 'bold',
    },
  });

  // 文字头像
  if (children) {
    return (
      <View style={styles.container}>
        <View style={[styles.avatar, styles.fallback]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        imageError ? (
          fallback ? (
            fallback
          ) : (
            <View style={[styles.avatar, styles.fallback]}>
              <Icon name="user" size="lg" />
            </View>
          )
        ) : (
          // 图片头像
          <FastImage
            style={styles.avatar}
            source={{
              uri: src,
            }}
            resizeMode={fit}
            onError={onError}
          />
        )
      }
    </View>
  );
}
