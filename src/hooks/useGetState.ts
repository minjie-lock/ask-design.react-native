import { useState, useRef, useCallback } from 'react';

/**
 * @function useGetState
 * @description 允许获取最新状态，而不会因闭包问题导致值滞后
 */
export default function useGetState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const stateRef = useRef(state);

  // 更新状态
  const setStateWrapper = useCallback((value: T) => {
    setState((prevState) => {
      const newValue = typeof value === 'function' ? value?.(prevState) : value;
      stateRef.current = newValue; // 保持最新状态
      return newValue;
    });
  }, []);

  // 获取最新状态
  const getState = useCallback(() => stateRef.current, []);

  return [state, setStateWrapper, getState] as const;
}
