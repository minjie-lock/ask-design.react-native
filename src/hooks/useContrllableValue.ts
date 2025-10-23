/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-shadow */
// import { useMemoizedFn } from 'ahooks';
import { useState, useRef, useEffect } from 'react';

interface Options<T> {
  /**
   * @description 指定当前是否选中
  */
  value?: T;
  /**
   * @description 默认是否选中
  */
  defaultValue?: T;
  /**
   * @description 值变化时的回调函数
  */
  onChange?: (value: T) => void;
}

export default function useControllableValue<T>(options: Options<T> = {}):
  [T, <S>(value: S | T) => void] {

  const { defaultValue, value, onChange } = options;

  // 使用 useRef 保存当前是否处于受控状态
  const controlledRef = useRef(value === void 0);

  // 内部状态，用于非受控组件
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T);

  // 确定当前使用的值：受控值优先，否则使用内部状态
  const mergedValue = controlledRef.current ? internalValue : value as T;

  // 更新值的函数
  const setValue = <S>(value: T | S) => {
    console.log(value === void 0, value);
    if (controlledRef.current) {
      // 如果是非受控组件，更新内部状态并触发 onChange 回调
      setInternalValue(value as T);
      return onChange?.(internalValue as T);
    } else {
      return onChange?.(value as T);
    }
  };

  // // 监听 value prop 的变化，更新 controlledRef
  useEffect(() => {
    controlledRef.current = value === void 0;
  }, [value]);

  // 返回当前值和更新值的函数
  return [mergedValue, setValue];
}
