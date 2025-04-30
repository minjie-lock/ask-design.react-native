import { StyleSheet, View } from 'react-native';
import SeparationLine from '../separation-line';
import { Fragment } from 'react';
import { content } from '../../utils';
import { useConfiguration } from '../configuration';

type CardProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * @function Card
 * @description 卡片
*/
export default function Card(props: CardProps) {

  const {
    title,
    children,
    footer,
  } = props;

  const card = useConfiguration(
    configuration => configuration.scheme.components.Card
  );

  const styles = StyleSheet.create({
    main: {
      borderRadius: card.round,
      backgroundColor: card.background,
      padding: 12,
    },
    header: {

    },
    content: {

    },
    footer: {

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
                })
              }
            </View>
            <SeparationLine style={styles.line} />
          </Fragment>
        )
      }
      <View style={styles.content}>
        {content(children)}
      </View>
      {
        footer && (
          <Fragment>
            <SeparationLine style={styles.line} />
            <View style={styles.footer}>
              {content(footer)}
            </View>
          </Fragment>
        )
      }
    </View>
  );
}

