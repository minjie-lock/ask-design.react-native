import { Dimensions, ScrollView } from 'react-native';
import { Button, Card, Configuration, Details, List, SeparationLine, Space, Swiper, Tag, Watermark } from './src/components';
import useToast from './src/hooks/toast';

const Content = () => {

  const toast = useToast();

  return (
    <Card title="标题" footer={
      <Space gap={10}>
        <Button onPress={() => {
          toast.show({
            content: '提示内容',
            icon: 'success',
          });
        }}>Show</Button>
        <Button color="danger" onPress={() => {
          toast.hide();
        }}>
          Hide
        </Button>
      </Space>
    }>
      内容
    </Card>
  )
}

export default function Root() {

  const screen = Dimensions.get('screen');

  const dataSource = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <Configuration>
      {/* <Watermark content={['@ask-design', 'react-native']}> */}
      <ScrollView style={{
        width: screen.width,
        height: screen.height,
        backgroundColor: '#F6F6F6',
        padding: 40,
      }}>
        <Card>
          <Space gap={10} wrap>
            <Tag>Primary</Tag>
            <Tag color="success">success</Tag>
            <Tag color="processing">processing</Tag>
            <Tag color="error">danger</Tag>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
          </Space>
        </Card>
        <SeparationLine />
        <Content />
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
        <SeparationLine />
        <Swiper width={screen.width - 80}
          height={200}
          autoplayInterval={2000}
          defaultValue={1}
          autoplay
          allowTouchMove={false}
        >
          <Swiper.Item style={{
            backgroundColor: 'red',
          }} value={1}>
            1
          </Swiper.Item>
          <Swiper.Item style={{
            backgroundColor: 'blue',
          }} value={2}>
            2
          </Swiper.Item>
        </Swiper>
        <SeparationLine />
        <Swiper width={screen.width - 80}
          height={200}
          autoplayInterval={2000}
          defaultValue={1}
          autoplay
          direction="vertical"
        >
          <Swiper.Item style={{
            backgroundColor: 'red',
          }} value={1}>
            1
          </Swiper.Item>
          <Swiper.Item style={{
            backgroundColor: 'blue',
          }} value={2}>
            2
          </Swiper.Item>
        </Swiper>
        <SeparationLine />
        {/* <List
          header="列表"
          dataSource={dataSource}
          render={(item) => {
            return (
              <List.Item key={item}>
                {item}
              </List.Item>
            );
          }}
        /> */}
      </ScrollView>
      {/* </Watermark> */}
    </Configuration>
  );
}


