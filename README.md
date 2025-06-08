# @ASK-DESIGN/REACT-NAIVE

## 介绍

_Ask Design for React Native_ 是一个 React Native 设计系统，它提供了一组可用于构建原生应用的组件

## 安装
```bash
yarn add @ask-design/react-native
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

## 贡献
PLEASE READ THE CONTRIBUTING GUIDE BEFORE MAKING A PULL REQUEST.

## 许可
MIT © [@ask-design](https://github.com/minjie-lock/ask-design.react-native)

