import { useState, useCallback, useRef, useEffect } from 'react';

interface Options<T> {
  defaultValue?: T;
  value?: T;
  onChange?: (value?: T) => void;
}

export default  function useControllableValue<T>(options: Options<T> = {}): [T, (value: T) => void] {

  const { defaultValue, value, onChange } = options;

  // 使用 useRef 保存当前是否处于受控状态
  const controlledRef = useRef(value !== undefined);

  // 内部状态，用于非受控组件
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T);

  // 确定当前使用的值：受控值优先，否则使用内部状态
  const mergedValue = controlledRef.current ? value as T : internalValue;

  // 更新值的函数
  const setValue = useCallback((value: T) => {
    // 如果是受控组件，只触发 onChange 回调
    if (controlledRef.current) {
      onChange?.(value);
    } else {
      // 如果是非受控组件，更新内部状态并触发 onChange 回调
      setInternalValue(value);
      onChange?.(value);
    }
  }, [onChange]);

  // 监听 value prop 的变化，更新 controlledRef
  useEffect(() => {
    // eslint-disable-next-line no-void
    controlledRef.current = value !== void 0;
  }, [value]);

  // 返回当前值和更新值的函数
  return [mergedValue, setValue];
}
