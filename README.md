# @ASK-DESIGN/REACT-NATIVE

## 介绍

_Ask Design for React Native_ 是一个 React Native 设计系统，它提供了一组可用于构建原生应用的组件

## 安装
```bash
yarn add @ask-design/react-native
```

## 依赖
Ask Deisgn for React Native 中部分模块依赖于以下包，需要额外下载才能正常运行
```bash
yarn add react-native-gesture-handler react-native-portalize react-native-reanimated
```

## 配置
在 babel 配置文件里引入
```json
{
  "presets": [
    "module:@react-native/babel-preset"
  ],
  "plugins": [
    // 依赖项
    "react-native-reanimated/plugin",
  ]
}
```

## 启动
使用 Ask Design 提供的 **AskDesignMetro** 方法，替换掉原先的启动函数
```ts
const { getDefaultConfig } = require('@react-native/metro-config');
const { AskDesignMetro } = require('@ask-design/react-native/metro');


module.exports = AskDesignMetro(
  getDefaultConfig(__dirname)
);
```

## 使用

```tsx
import { Button } from '@ask-design/react-native';

export default function Start(){

  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  }

  return (
    <Button onPress={onPress}>Click me</Button>
  )
}
```

## 声明

本库图标来源于 [@ant-design/icons-react-native](https://rn.mobile.ant.design/components/icon-cn/)

### 链接
将字体资源路径配置到根目录下的 **react-native.config.js** 文件中 ( 如果没有，请创建 )
```ts
const ask = require('@ask-design/react-native/configuration');
module.exports = {
  ...ask,
};
```
运行命令行
```bash
npx react-native-asset
```
字体文件将会自动复制到 **ios** 和 **android** 资源文件中。

## 贡献
PLEASE READ THE CONTRIBUTING GUIDE BEFORE MAKING A PULL REQUEST.

## 许可
MIT © [@ask-design](https://github.com/minjie-lock/ask-design.react-native)

