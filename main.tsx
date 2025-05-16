/* eslint-disable react-native/no-inline-styles */
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Card, Configuration, Details, Ellipsis, SafeArea, SeparationLine, Space, Swiper, Tag } from './src/components';
import { useToast, useDialog } from './src/components';
import { useEffect, useState } from 'react';
import { AskStatusBar } from './src/utils';

const Content = () => {

  const toast = useToast();
  const dialog = useDialog();


  return (
    <Card title="标题" footer={
      <Space gap={10} wrap>
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
        <Button color="danger" onPress={() => {
          toast.show({
            content: '提示内容',
            icon: 'fail',
          });
        }}>
          error
        </Button>
        <Button color="warning" onPress={() => {
          toast.show({
            content: '提示内容',
            icon: 'loading',
            duration: 0,
          });
        }}>
          loading
        </Button>
      </Space>
    }>
      <Space gap={10} wrap>
        <Button color="success" onPress={() => {
          dialog.show({
            content: '提示内容',
          });
        }}>
          show
        </Button>
        <Button color="warning" onPress={async () => {
          await dialog.alert({
            content: '提示内容',
          });
          console.log('await');
        }}>
          alert
        </Button>
        <Button color="warning" onPress={async () => {
          const confirm = await dialog.confirm({
            content: '提示内容',

          });
          console.log(confirm);
        }}>
          confirm
        </Button>
        <Button color="warning" onPress={async () => {
          const confirm = await dialog.confirm({
            content: '提示内容',
            actions: [
              {
                key: 'download',
                text: '取消',
                onPress: () => {
                  console.log('取消');
                },
              },
              {
                key: 'confirm',
                text: '确定',
                onPress: () => {
                  console.log('确定');
                },
              },
            ],
          });
          console.log(confirm);
        }}>
          action
        </Button>
        <Button onPress={async () => {
          const confirm = await dialog.confirm({
            content: '提示内容',
            mask: false,
            actions: [
              {
                key: 'download',
                text: '取消',
                onPress: () => {
                  console.log('取消');
                },
              },
              {
                key: 'confirm',
                text: '确定',
                onPress: () => {
                  console.log('确定');
                },
              },
            ],
          });
          console.log(confirm);
        }}>
          not mask
        </Button>
      </Space>
    </Card>
  );
};


export default function Root() {

  const screen = Dimensions.get('screen');

  const dataSource = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  console.log(screen.height);
  const [height, setHeight] = useState(screen.height);
  useEffect(() => {
    AskStatusBar.height.then((resolve) => {
      setHeight(resolve);
    });
  }, []);

  return (
    <Configuration>
      {/* <Watermark content={['@ask-design', 'react-native']}> */}
      {/* <SafeArea position="top" /> */}
      <SafeAreaView style={{
        flex: 1,
      }}>
        <ScrollView style={{
          width: screen.width,
          // height: screen.height,
          flex: 1,
          backgroundColor: '#F6F6F6',
          paddingHorizontal: 20,
        }}>
          <Card>
            <Space gap={10} wrap>
              <Tag>Primary</Tag>
              <Tag color="success">success</Tag>
              <Tag color="processing">processing</Tag>
              <Tag color="warning">warning</Tag>
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
              <Tag color="#87d068">87d068</Tag>
            </Space>
          </Card>
          <SeparationLine />
          <Content />
          <SeparationLine />
          <Details onChange={(value) => {
            console.log(value);
          }}>
            <Details.Summary title="内容" value={1}>
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
          <Swiper width={screen.width - 40}
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
          <Swiper width={screen.width - 40}
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
          <Card>
            <Space gap={10}>
              <Avatar
                src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              />
              <Avatar
              />
              <Avatar>
                鲒
              </Avatar>
              <Avatar size="mini">
                鲒
              </Avatar>
            </Space>
          </Card>
          <SeparationLine />
          <Ellipsis rows={1} direction="clip">
            蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
          </Ellipsis>
          <SeparationLine />
          <Ellipsis rows={4}>
            常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件
            蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容
          </Ellipsis>
          <SeparationLine />
        </ScrollView>
      </SafeAreaView>
      {/* <SafeArea position="bottom" /> */}
      {/* </Watermark> */}
    </Configuration>
  );
}


