import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

interface WatermarkProps {
  content?: string | string[];
  image?: string;
  gapX?: number;
  gapY?: number;
  rotate?: number;
  imageWidth?: number;
  imageHeight?: number;
  opacity?: number;
  children: React.ReactNode;
}

const WaterMark = (props: WatermarkProps) => {
  const {
    content = 'Watermark',
    image,
    gapX = 150,
    gapY = 120,
    rotate = -22,
    imageWidth = 120,
    imageHeight = 64,
    opacity = 0.4,
    children,
  } = props;
  const watermarkItems = [];

  for (let y = 0; y < height; y += gapY) {
    for (let x = 0; x < width; x += gapX) {
      watermarkItems.push(
        <View key={`${x}-${y}`} style={[styles.watermarkItem, { left: x, top: y, opacity, transform: [{ rotate: `${rotate}deg` }] }]}>
          {image ? (
            <Image source={{ uri: image }} style={{ width: imageWidth, height: imageHeight }} />
          ) : (
            Array.isArray(content) ? (
              content.map((item, index) => (
                <Text key={index} style={styles.watermarkText}>
                  {item}
                </Text>
              ))
            ) : (
              <Text style={styles.watermarkText}>{content}</Text>
            )
          )}
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {children}
      {watermarkItems}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width,
    height,
    pointerEvents: 'none',
  },
  watermarkItem: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  watermarkText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default WaterMark;
