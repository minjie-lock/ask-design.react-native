import { Text, TextStyle } from 'react-native';


export default function content(
  children: React.ReactNode,
  style?: TextStyle,
  className?: string,
) {
  const text = [
    'number',
    'string',
  ].includes(typeof children);

  return text ? (
    <Text style={style} className={className}>
      {children}
    </Text>
  ) : children;
}

