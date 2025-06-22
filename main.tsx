/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Text, View } from 'react-native';
import { Button, Card, Dialog, Drawer, Form, Image, Segmented, SeparationLine, SideBar, Space, Switch, Wait } from '@/components';
import { useToast, useDialog } from '@/components';
import { useEffect, useState } from 'react';
import { AskStatusBar } from '@/utils';

const Content = () => {

  const toast = useToast();
  const dialog = useDialog();

  return (
    <View>
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
        <SeparationLine />
        <Segmented
          options={
            Array.from({ length: 3 }, (_, i) => ({
              label: `选项${i + 1}`,
              value: i + 1,
              description: '米啊是',
            }))
          }

        />
      </Card>
    </View>
  );
};


export default function Root() {

  const screen = Dimensions.get('screen');
  const [open, setOpen] = useState(false);

  const dataSource = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const [position, setPosition] = useState('left')
  const [height, setHeight] = useState(screen.height);
  useEffect(() => {
    AskStatusBar.height.then((resolve) => {
      setHeight(resolve);
    });
  }, []);

  // const [form] = Form.useForm();


  const items = [
    {
      label: '浙江',
      value: '浙江',
      key: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
          key: '杭州',
        },
        {
          label: '宁波',
          value: '宁波',
          key: '宁波',
          children: [
            {
              label: '街道',
              value: '街道',
              key: '街道',
              children: [
                {
                  label: '小区1',
                  value: '小区1',
                  key: '小区1',
                },
              ],
            },
            {
              label: '街道2',
              value: '街道2',
              key: '街道2',
              children: [
                {
                  label: '小区2',
                  value: '小区2',
                  key: '小区2',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: '江苏',
      value: '江苏',
      key: '江苏',
      children: [
        {
          label: '南京',
          value: '南京',
          key: '南京',
        },
        {
          label: '苏州',
          value: '苏州',
          key: '苏州',
          children: [
            {
              label: '街道',
              value: '街道',
              key: '街道',
              children: [
                {
                  label: '小区2',
                  value: '小区2',
                  key: '小区2',
                },
              ],
            },
          ],
        },
      ],
    },
  ] as const;


  return (
    // <Configuration>
    //   <SafeAreaView style={{
    //     flex: 1,
    //   }}>
    //     <ScrollView style={{
    //       width: screen.width,
    //       // height: screen.height,
    //       flex: 1,
    //       backgroundColor: '#F6F6F6',
    //       paddingHorizontal: 20,
    //     }}>
    //       <Card>
    //         <Space gap={10} wrap>
    //           <Tag>Primary</Tag>
    //           <Tag color="success">success</Tag>
    //           <Tag color="processing">processing</Tag>
    //           <Tag color="warning">warning</Tag>
    //           <Tag color="error">danger</Tag>
    //           <Tag color="magenta">magenta</Tag>
    //           <Tag color="red">red</Tag>
    //           <Tag color="volcano">volcano</Tag>
    //           <Tag color="orange">orange</Tag>
    //           <Tag color="gold">gold</Tag>
    //           <Tag color="lime">lime</Tag>
    //           <Tag color="green">green</Tag>
    //           <Tag color="cyan">cyan</Tag>
    //           <Tag color="blue">blue</Tag>
    //           <Tag color="geekblue">geekblue</Tag>
    //           <Tag color="purple">purple</Tag>
    //           <Tag color="#87d068">87d068</Tag>
    //         </Space>
    //       </Card>
    //       <SeparationLine />
    //       <Content />
    //       <SeparationLine />
    //       <Details onChange={(value) => {
    //         console.log(value);
    //       }}>
    //         <Details.Summary title="内容" value={1}>
    //           Fugiat nostrud deserunt exercitation deserunt amet consequat nulla aliquip veniam sit ut elit ea ut dolore. Et laborum anim exercitation magna in proident labore. Aliqua eiusmod elit aute occaecat pariatur pariatur. Aliquip mollit laborum velit dolor adipisicing nulla occaecat eu Lorem ut sunt minim. Cillum eu officia adipisicing proident ipsum cillum ipsum exercitation.
    //         </Details.Summary>
    //         <Details.Summary title="内容" value={2}
    //           arrowIcon={(active) => {
    //             return active ? '向上' : '向下';
    //           }}
    //         >
    //           Fugiat nostrud deserunt exercitation deserunt amet consequat nulla aliquip veniam sit ut elit ea ut dolore. Et laborum anim exercitation magna in proident labore. Aliqua eiusmod elit aute occaecat pariatur pariatur. Aliquip mollit laborum velit dolor adipisicing nulla occaecat eu Lorem ut sunt minim. Cillum eu officia adipisicing proident ipsum cillum ipsum exercitation.
    //         </Details.Summary>
    //       </Details>
    //       <SeparationLine />
    //       <Swiper
    //         // height={200}
    //         height={200}
    //         autoplayInterval={2000}
    //         defaultValue={1}
    //         autoplay
    //         allowTouchMove={false}
    //         items={[
    //           {
    //             children: <View style={{ backgroundColor: 'blue' }}>
    //               <Text>1</Text>
    //             </View>,
    //             value: 1,
    //           },
    //           {
    //             children: <View style={{ backgroundColor: 'red' }}>
    //               <Text>2</Text>
    //             </View>,
    //             value: 2,
    //           }
    //         ]}
    //       />
    //       <SeparationLine />
    //       <Swiper
    //         direction="vertical"
    //         // height={200}
    //         height={200}
    //         autoplayInterval={2000}
    //         defaultValue={1}
    //         autoplay
    //         allowTouchMove={false}
    //         items={[
    //           {
    //             children: <View style={{ backgroundColor: 'blue' }}>
    //               <Text>1</Text>
    //             </View>,
    //             value: 1,
    //           },
    //           {
    //             children: <View style={{ backgroundColor: 'red' }}>
    //               <Text>2</Text>
    //             </View>,
    //             value: 2,
    //           }
    //         ]}
    //       />
    //       <SeparationLine />
    //       {/* <List
    //       header="列表"
    //       dataSource={dataSource}
    //       render={(item) => {
    //         return (
    //           <List.Item key={item}>
    //             {item}
    //           </List.Item>
    //         );
    //       }}
    //     /> */}
    //       <Card>
    //         <Space gap={10}>
    //           <Avatar
    //             src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
    //           />
    //           <Avatar
    //           />
    //           <Avatar>
    //             鲒
    //           </Avatar>
    //           <Avatar size="mini">
    //             鲒
    //           </Avatar>
    //         </Space>
    //       </Card>
    //       <SeparationLine />
    //       <Ellipsis rows={1} direction="clip">
    //         蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
    //       </Ellipsis>
    //       <SeparationLine />
    //       <Ellipsis rows={4}>
    //         常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件
    //         蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容
    //       </Ellipsis>
    //       <SeparationLine />
    //       <Input />
    //       <Card>
    //         <Selector mode="multiple" options={Array.from({ length: 10 }, (_, i) => ({
    //           label: `选项${i + 1}`,
    //           value: i + 1,
    //           description: '米啊是',
    //         }))} />
    //       </Card>
    //     </ScrollView>
    //     <Button onPress={() => setOpen(true)}>
    //       打开
    //     </Button>
    //   </SafeAreaView>
    //   {/* <Drawer open={open} onClose={() => setOpen(false)} position="bottom">
    //     <Result
    //       title="标题"
    //       description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
    //       status="success"
    //     />
    //     <Error />
    //   </Drawer> */}
    //   {/* <Picker items={[
    //     [
    //       {
    //         label: '1',
    //         value: '1',
    //       }
    //     ]
    //   ] as const} /> */}
    //   <Picker.Date precision="day" open={open} onClose={() => setOpen(false)}
    //     onChange={(value) => {
    //       console.log(value);
    //     }}
    //   />
    // </Configuration>
    // <Form>
    //   <Form.Field name={['name']}>

    //   </Form.Field>
    // </Form>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Switch onChange={(value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }} />
      <SeparationLine />
      <Switch shape="square" />
      {/* <Segmented
        items={[
          ...Array.from({ length: 3 }, (_, i) => ({
            label: `选项${i + 1}`,
            value: i + 1,
            description: '米啊是',
          })),
        ]}

      /> */}
      <SeparationLine />
      {/* <Wait size="large">
        <Text>
          常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件
          蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容
        </Text>
      </Wait> */}
      {/* <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
        }}
      /> */}
      {/* <Form> */}
      {/* <Form.Field name={['dfined']}>
          <Switch shape="square" />
        </Form.Field> */}
      {/* </Form> */}
      {/* <SideBar
        items={[
          {
            title: '选择一',
            badge: 1,
            key: 'one',
            children: (
              <View>
                <Text>
                  olore aliqua duis do quis cillum incididunt fugiat nostrud irure ullamco ullamco elit culpa sunt. Reprehenderit nostrud tempor aliqua nisi aute nisi incididunt dolore Lorem Lorem ipsum magna culpa aliqua. Cupidatat proident Lorem ea sunt excepteur qui exercitation. Laboris in anim consequat. Officia ullamco nulla ea. Laboris magna consectetur velit adipisicing ad ut nisi ipsum ex quis veniam voluptate. Do quis Lorem elit. Do ipsum tempor sunt tempor nulla consectetur. Sint voluptate cupidatat proident fugiat ipsum amet culpa aliquip nisi. Esse deserunt id adipisicing eiusmod proident ullamco commodo. Cupidatat aliqua proident qui ad quis ipsum ipsum culpa veniam cupidatat in ex. Fugiat in eu occaecat quis et reprehenderit. Reprehenderit et ex nostrud ad incididunt ea est aliquip incididunt commodo irure deserunt officia. Fugiat amet ad quis aliqua irure tempor. Eiusmod amet elit minim irure velit dolor minim tempor. Sint consequat tempor duis ex elit est cupidatat. Ad sit minim id duis nostrud minim et. Proident culpa consequat duis officia sint minim incididunt ipsum commodo ipsum sint proident in. Eu tempor occaecat officia mollit esse do. Culpa culpa ea est cupidatat pariatur adipisicing Lorem eiusmod magna culpa. Laborum mollit veniam exercitation minim quis veniam officia sit minim reprehenderit dolor. Lorem reprehenderit velit elit elit nulla adipisicing fugiat. Eu labore cillum consectetur ea aliquip adipisicing non nostrud aute amet dolor dolor magna culpa. Proident culpa voluptate nisi est cillum culpa proident non consequat sit aute qui in consequat est. Irure duis duis Lorem cillum dolor consectetur nisi minim cillum cillum qui qui minim officia. Reprehenderit laboris magna elit nisi ex. Et dolor do officia officia deserunt deserunt irure exercitation occaecat id. Sunt consequat ipsum non occaecat id enim qui. Lorem quis exercitation adipisicing cillum in aliqua sunt commodo excepteur eiusmod et magna pariatur do. Anim do dolor culpa do. Eiusmod cillum incididunt consectetur aliquip aliqua do irure. Consectetur in irure deserunt proident duis sint mollit qui consectetur enim Lorem est do. In tempor enim consectetur irure reprehenderit tempor aliqua. In est nostrud amet non esse. Anim aliqua adipisicing officia do aute aliquip ipsum et qui amet do et eiusmod. Qui laboris dolore proident labore laborum magna duis mollit sit quis. Ut id labore sunt reprehenderit eu eu eu in cupidatat tempor pariatur qui tempor. Adipisicing culpa minim nisi. Eiusmod esse ipsum duis in. Anim excepteur sunt enim officia enim. Duis do non cupidatat amet id magna esse. Non consequat ad do voluptate sunt consequat do Lorem consequat tempor consequat consequat minim nulla dolore. Voluptate eu sint duis quis adipisicing laboris dolor sit cupidatat anim exercitation pariatur excepteur deserunt. Cillum veniam Lorem officia consectetur sunt eu irure tempor. Reprehenderit in ad magna minim ex duis velit non sunt reprehenderit proident. Consectetur commodo ea irure adipisicing commodo occaecat in dolore ullamco ex cupidatat id culpa. Ipsum quis adipisicing deserunt sit. Pariatur excepteur culpa adipisicing sunt mollit ex pariatur. Ad incididunt est est aute. Culpa dolore amet aliqua anim duis esse aliqua laboris veniam ut aliqua aliquip. Consectetur amet voluptate enim id eu cupidatat irure Lorem excepteur deserunt velit Lorem do. Aliqua pariatur dolore ut cupidatat. Irure aute mollit elit ut ea tempor anim elit occaecat dolor esse nisi dolor proident.
                </Text>
              </View>
            )
          },
          {
            title: '选择二111',
            badge: 2,
            key: 'two',
            disabled: true,
            children: (
              <View>
                <Text>
                  olore aliqua duis do quis cillum incididunt fugiat nostrud irure ullamco ullamco elit culpa sunt. Reprehenderit nostrud tempor aliqua nisi aute nisi incididunt dolore Lorem Lorem ipsum magna culpa aliqua. Cupidatat proident Lorem ea sunt excepteur qui exercitation. Laboris in anim consequat. Officia ullamco nulla ea. Laboris magna consectetur velit adipisicing ad ut nisi ipsum ex quis veniam voluptate. Do quis Lorem elit. Do ipsum tempor sunt tempor nulla consectetur. Sint voluptate cupidatat proident fugiat ipsum amet culpa aliquip nisi. Esse deserunt id adipisicing eiusmod proident ullamco commodo. Cupidatat aliqua proident qui ad quis ipsum ipsum culpa veniam cupidatat in ex. Fugiat in eu occaecat quis et reprehenderit. Reprehenderit et ex nostrud ad incididunt ea est aliquip incididunt commodo irure deserunt officia. Fugiat amet ad quis aliqua irure tempor. Eiusmod amet elit minim irure velit dolor minim tempor. Sint consequat tempor duis ex elit est cupidatat. Ad sit minim id duis nostrud minim et. Proident culpa consequat duis officia sint minim incididunt ipsum commodo ipsum sint proident in. Eu tempor occaecat officia mollit esse do. Culpa culpa ea est cupidatat pariatur adipisicing Lorem eiusmod magna culpa. Laborum mollit veniam exercitation minim quis veniam officia sit minim reprehenderit dolor. Lorem reprehenderit velit elit elit nulla adipisicing fugiat. Eu labore cillum consectetur ea aliquip adipisicing non nostrud aute amet dolor dolor magna culpa. Proident culpa voluptate nisi est cillum culpa proident non consequat sit aute qui in consequat est. Irure duis duis Lorem cillum dolor consectetur nisi minim cillum cillum qui qui minim officia. Reprehenderit laboris magna elit nisi ex. Et dolor do officia officia deserunt deserunt irure exercitation occaecat id. Sunt consequat ipsum non occaecat id enim qui. Lorem quis exercitation adipisicing cillum in aliqua sunt commodo excepteur eiusmod et magna pariatur do. Anim do dolor culpa do. Eiusmod cillum incididunt consectetur aliquip aliqua do irure. Consectetur in irure deserunt proident duis sint mollit qui consectetur enim Lorem est do. In tempor enim consectetur irure reprehenderit tempor aliqua. In est nostrud amet non esse. Anim aliqua adipisicing officia do aute aliquip ipsum et qui amet do et eiusmod. Qui laboris dolore proident labore laborum magna duis mollit sit quis. Ut id labore sunt reprehenderit eu eu eu in cupidatat tempor pariatur qui tempor. Adipisicing culpa minim nisi. Eiusmod esse ipsum duis in. Anim excepteur sunt enim officia enim. Duis do non cupidatat amet id magna esse. Non consequat ad do voluptate sunt consequat do Lorem consequat tempor consequat consequat minim nulla dolore. Voluptate eu sint duis quis adipisicing laboris dolor sit cupidatat anim exercitation pariatur excepteur deserunt. Cillum veniam Lorem officia consectetur sunt eu irure tempor. Reprehenderit in ad magna minim ex duis velit non sunt reprehenderit proident. Consectetur commodo ea irure adipisicing commodo occaecat in dolore ullamco ex cupidatat id culpa. Ipsum quis adipisicing deserunt sit. Pariatur excepteur culpa adipisicing sunt mollit ex pariatur. Ad incididunt est est aute. Culpa dolore amet aliqua anim duis esse aliqua laboris veniam ut aliqua aliquip. Consectetur amet voluptate enim id eu cupidatat irure Lorem excepteur deserunt velit Lorem do. Aliqua pariatur dolore ut cupidatat. Irure aute mollit elit ut ea tempor anim elit occaecat dolor esse nisi dolor proident.
                </Text>
              </View>
            ),
          },
          {
            title: '选择三',
            key: 'three',
            children: (
              <View>
                <Text>
                  olore aliqua duis do quis cillum incididunt fugiat nostrud irure ullamco ullamco elit culpa sunt. Reprehenderit nostrud tempor aliqua nisi aute nisi incididunt dolore Lorem Lorem ipsum magna culpa aliqua. Cupidatat proident Lorem ea sunt excepteur qui exercitation. Laboris in anim consequat. Officia ullamco nulla ea. Laboris magna consectetur velit adipisicing ad ut nisi ipsum ex quis veniam voluptate. Do quis Lorem elit. Do ipsum tempor sunt tempor nulla consectetur. Sint voluptate cupidatat proident fugiat ipsum amet culpa aliquip nisi. Esse deserunt id adipisicing eiusmod proident ullamco commodo. Cupidatat aliqua proident qui ad quis ipsum ipsum culpa veniam cupidatat in ex. Fugiat in eu occaecat quis et reprehenderit. Reprehenderit et ex nostrud ad incididunt ea est aliquip incididunt commodo irure deserunt officia. Fugiat amet ad quis aliqua irure tempor. Eiusmod amet elit minim irure velit dolor minim tempor. Sint consequat tempor duis ex elit est cupidatat. Ad sit minim id duis nostrud minim et. Proident culpa consequat duis officia sint minim incididunt ipsum commodo ipsum sint proident in. Eu tempor occaecat officia mollit esse do. Culpa culpa ea est cupidatat pariatur adipisicing Lorem eiusmod magna culpa. Laborum mollit veniam exercitation minim quis veniam officia sit minim reprehenderit dolor. Lorem reprehenderit velit elit elit nulla adipisicing fugiat. Eu labore cillum consectetur ea aliquip adipisicing non nostrud aute amet dolor dolor magna culpa. Proident culpa voluptate nisi est cillum culpa proident non consequat sit aute qui in consequat est. Irure duis duis Lorem cillum dolor consectetur nisi minim cillum cillum qui qui minim officia. Reprehenderit laboris magna elit nisi ex. Et dolor do officia officia deserunt deserunt irure exercitation occaecat id. Sunt consequat ipsum non occaecat id enim qui. Lorem quis exercitation adipisicing cillum in aliqua sunt commodo excepteur eiusmod et magna pariatur do. Anim do dolor culpa do. Eiusmod cillum incididunt consectetur aliquip aliqua do irure. Consectetur in irure deserunt proident duis sint mollit qui consectetur enim Lorem est do. In tempor enim consectetur irure reprehenderit tempor aliqua. In est nostrud amet non esse. Anim aliqua adipisicing officia do aute aliquip ipsum et qui amet do et eiusmod. Qui laboris dolore proident labore laborum magna duis mollit sit quis. Ut id labore sunt reprehenderit eu eu eu in cupidatat tempor pariatur qui tempor. Adipisicing culpa minim nisi. Eiusmod esse ipsum duis in. Anim excepteur sunt enim officia enim. Duis do non cupidatat amet id magna esse. Non consequat ad do voluptate sunt consequat do Lorem consequat tempor consequat consequat minim nulla dolore. Voluptate eu sint duis quis adipisicing laboris dolor sit cupidatat anim exercitation pariatur excepteur deserunt. Cillum veniam Lorem officia consectetur sunt eu irure tempor. Reprehenderit in ad magna minim ex duis velit non sunt reprehenderit proident. Consectetur commodo ea irure adipisicing commodo occaecat in dolore ullamco ex cupidatat id culpa. Ipsum quis adipisicing deserunt sit. Pariatur excepteur culpa adipisicing sunt mollit ex pariatur. Ad incididunt est est aute. Culpa dolore amet aliqua anim duis esse aliqua laboris veniam ut aliqua aliquip. Consectetur amet voluptate enim id eu cupidatat irure Lorem excepteur deserunt velit Lorem do. Aliqua pariatur dolore ut cupidatat. Irure aute mollit elit ut ea tempor anim elit occaecat dolor esse nisi dolor proident.
                </Text>
              </View>
            ),
          },
        ] as const}
        scroll
        // value="one"
      /> */}
      <Drawer
        position="bottom"
        open={open}
        width={200}
        move={false}
        onClose={() => setOpen(false)}
      />
      <Button onPress={() => {
        setOpen(true);
        setPosition('left');
      }}>
        left
      </Button>
      <Button onPress={() => {
        setOpen(true);
        setPosition('right');
      }}>
        right
      </Button>
    </View>
  );
}


