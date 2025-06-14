/* eslint-disable @typescript-eslint/no-shadow */
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useControllableValue } from '../../hooks';

type InputProps = {
  /**
   * 默认值
  */
  defaultValue?: string;
  /**
   * 值
  */
  value?: string;
  /**
   * 改变事件
  */
  onChange?: (value: string) => void;
  /**
   * 输入框的样式
  */
  style?: ViewStyle;
} & Omit<TextInputProps, 'onChangeText' | 'onChagne' | 'value' | 'defaultValue'>;

/**
 * @function Input
 * @description 输入框
 * @returns {React.ReactNode}
 */
export default function Input(props: InputProps): React.ReactNode {

  const {
    placeholder = 'Please enter...',
  } = props;

  const styles = StyleSheet.create({
    main: {
      width: '100%',
      height: 40,
    },
    input: {
      ...(props?.style ?? {}),
    },
  });

  const [value, setValue] = useControllableValue<Exclude<InputProps['value'], void>>({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
  });

  const onChange = (value: string) => {
    setValue(value);
  };


  return (
    <View style={styles.main}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
}
