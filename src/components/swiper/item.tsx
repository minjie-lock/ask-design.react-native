import { View } from 'react-native';

type SwiperItemProps = {
  children?: React.ReactNode;
}

export default function Item(props: SwiperItemProps) {

  const {
    children,
  } = props;

  return (
    <View>
      {children}
    </View>
  );
};

