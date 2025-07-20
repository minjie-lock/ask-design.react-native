import { StyleSheet, View, ViewStyle } from 'react-native';
import SeparationLine from '../separation-line';
import { Fragment } from 'react';
import { content } from '@/utils';
import { useConfiguration } from '../configuration';

type CardProps = {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 底部
   */
  footer?: React.ReactNode;
  /**
   * 样式
  */
  style?: ViewStyle;
  /**
   * 多个样式
  */
  styles?: {
    title?: ViewStyle;
    body?: ViewStyle;
  };
}

/**
 * @function Card
 * @description 卡片
 * @author Lock
 * @returns {JSX.Element}
*/
export default function Card(props: CardProps) {

  const {
    title,
    children,
    footer,
    style,
    styles: stylesBase,
  } = props;

  const card = useConfiguration(
    configuration => configuration.scheme.components.Card
  );

  const styles = StyleSheet.create({
    main: {
      borderRadius: card.round,
      backgroundColor: card.background,
      ...style,
      paddingVertical: 12,
    },
    header: {
      paddingHorizontal: 12,
      ...stylesBase?.title,
    },
    content: {
      paddingHorizontal: 12,
      ...stylesBase?.body,
    },
    footer: {
      paddingHorizontal: 12,
    },
    line: {
      marginVertical: 12,
    },
  });


  return (
    <View style={styles.main}>
      {
        title && (
          <Fragment>
            <View style={styles.header}>
              {
                content(title, {
                  fontWeight: '700',
                  fontSize: 15,
                  color: card?.text?.title,
                })
              }
            </View>
            <SeparationLine style={styles.line} />
          </Fragment>
        )
      }
      <View style={styles.content}>
        {content(children, {
          color: card?.text?.content,
        })}
      </View>
      {
        footer && (
          <Fragment>
            <SeparationLine style={styles.line} />
            <View style={styles.footer}>
              {content(footer, {
                color: card?.text?.footer,
              })}
            </View>
          </Fragment>
        )
      }
    </View>
  );
}

