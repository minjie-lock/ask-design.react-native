import { Dimensions, View } from 'react-native';
import { Button, Card, Details, SeparationLine } from './src/components';

export default function Root() {

  const screen = Dimensions.get('screen');

  return (
    <View style={{
      width: screen.width,
      height: screen.height,
      backgroundColor: '#F6F6F6',
      padding: 40,
    }}>
      <Card title="标题" footer={
        <Button onPress={() => {
          console.log(1);

        }}>按钮</Button>
      }>
        内容
      </Card>
      <SeparationLine />
      <Details onChange={(value) => {
        console.log(value);

      }}>
        <Details.Summary title="内容" value={1} disabled>
          Fugiat nostrud deserunt exercitation deserunt amet consequat nulla aliquip veniam sit ut elit ea ut dolore. Et laborum anim exercitation magna in proident labore. Aliqua eiusmod elit aute occaecat pariatur pariatur. Aliquip mollit laborum velit dolor adipisicing nulla occaecat eu Lorem ut sunt minim. Cillum eu officia adipisicing proident ipsum cillum ipsum exercitation.
        </Details.Summary>
        <Details.Summary title="内容" value={2}
          arrowIcon={(active) => {
            return active ? '向上' : '向下';
          }}
        >
          Fugiat nostrud deserunt exercitation deserunt amet consequat nulla aliquip veniam sit ut elit ea ut dolore. Et laborum anim exercitation magna in proident labore. Aliqua eiusmod elit aute occaecat pariatur pariatur. Aliquip mollit laborum velit dolor adipisicing nulla occaecat eu Lorem ut sunt minim. Cillum eu officia adipisicing proident ipsum cillum ipsum exercitation.
        </Details.Summary>
      </Details>
    </View>
  );
};

