import { useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

type ImageProps = Omit<FastImageProps, 'style'> & {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  style?: ViewStyle;
}

export default function Image(porps: ImageProps) {

  const {
    width,
    height,
    style,
    ...rest
  } = porps;

  const [open, setOpen] = useState(false);
  const onPress = () => {
    setOpen(true);
  };

  const stles = StyleSheet.create({
    image: {
      width,
      height,
      ...style,
    },
  });

  const centerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        
      ]
    };
  });

  return (
    <View>
      <TouchableNativeFeedback onPress={onPress}>
        <FastImage
          {...rest}
          style={stles.image}

        />
      </TouchableNativeFeedback>
      <Animated.View style={[centerStyle]}>
        <FastImage
          {...rest}
          style={stles.image}
        />
      </Animated.View>
    </View>
  );
}
