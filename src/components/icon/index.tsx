import {
  IconOutline,
  OutlineGlyphMapType,
} from '@ant-design/icons-react-native';
import { TextProps } from 'react-native';
import { GRAY } from '@/styles/color';
export type IconNames = OutlineGlyphMapType

export interface IconProps extends TextProps {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number
  color?: string
  name: IconNames
}

export default function Icon(props: IconProps) {

  const {
    size,
    name,
    color,
    ...rest
  } = props;

  const sizes = {
    xxs: 15,
    xs: 18,
    sm: 21,
    md: 22,
    lg: 36,
  };

  const fontSize = typeof size === 'string' ? sizes[size] : size;
  return (
    <IconOutline
      size={fontSize}
      color={color ?? GRAY.seven}
      name={name}
      {...rest}
    />
  );
}
