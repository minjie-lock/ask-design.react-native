import { useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';

type AnchorBarProps = {
  ref?: React.RefObject<{
    to: (index: number) => void;
  }>;
  /**
   * 自动吸顶
  */
  sticky?: boolean;
  /**
   * 值回调
  */
  onChange?: (value: number) => void;
}

export default function AnchorBar(props: AnchorBarProps){

  const {
    ref,
    sticky = true,
    onChange,
  } = props;


  const styles = StyleSheet.create({

  });

  useImperativeHandle(ref, () => {
    return {
      to: () => {

      },
    };
  });

  return (
    <View>

    </View>
  );
}

