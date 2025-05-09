import { StyleSheet, Text, View } from 'react-native';

type TagProps = {
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 颜色
  */
  color?: keyof typeof colors;
  /**
   * 边框
   */
  bordered?: boolean;
};

const colors = {
  default: {
    background: '#f5f5f5',
    color: '#595959',
    border: '#d9d9d9',
  },
  magenta: {
    background: '#fff0f6',
    color: '#c41d7f',
    border: '#ffadd2',
  },
  red: {
    background: '#fff2f0',
    color: '#cf1322',
    border: '#ffa39e',
  },
  volcano: {
    background: '#fff2e8',
    color: '#d4380d',
    border: '#ffbb96',
  },
  orange: {
    background: '#fff7e6',
    color: '#d46b08',
    border: '#ffd591',
  },
  gold: {
    background: '#fffbe6',
    color: '#d48806',
    border: '#ffe58f',
  },
  lime: {
    background: '#fcffe6',
    color: '#7cb305',
    border: '#eaff8f',
  },
  green: {
    background: '#f6ffed',
    color: '#389e0d',
    border: '#b7eb8f',
  },
  cyan: {
    background: '#e6fffb',
    color: '#08979c',
    border: '#87e8de',
  },
  blue: {
    background: '#e6f7ff',
    color: '#096dd9',
    border: '#91d5ff',
  },
  geekblue: {
    background: '#f5f5ff',
    color: '#2f54eb',
    border: '#d3dCE6',
  },
  purple: {
    background: '#f9f0ff',
    color: '#531dab',
    border: '#d3adf7',
  },
} as const;

export default function Tag(props: TagProps) {

  const {
    children,
    bordered = false,
    color = 'default',
  } = props;

  const styles = StyleSheet.create({
    container: {
      padding: 3,
      width: 'auto',
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(bordered ? {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors?.[color].border,
      } : {}),
      borderRadius: 5,
      backgroundColor: colors?.[color].background,
    },
    content: {
      color: colors?.[color].color,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {children}
      </Text>
    </View>
  );
}
