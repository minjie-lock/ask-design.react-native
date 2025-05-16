import { useRef, useEffect } from 'react';

export default function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value; // 在每次渲染后更新 ref
  }, [value]);

  return ref.current; // 返回上一次的值
}
