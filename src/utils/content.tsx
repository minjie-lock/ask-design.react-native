import { Text, TextStyle } from 'react-native';


export default function content(
  children: React.ReactNode,
  style?: TextStyle
) {
  const text = [
    'number',
    'string',
  ].includes(typeof children);

  return text ? <Text style={style}>{children}</Text> : children;
}

