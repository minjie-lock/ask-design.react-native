import { useRef } from 'react';

type Resolvers<T> = {
  promise: Promise<T>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

const withResolvers = <T>() => {

  let resolve, reject;
  const promise = new Promise((...args) => {
    [resolve, reject] = args;
  });

  return {
    promise,
    resolve,
    reject,
  } as unknown as Resolvers<T>;
};

/**
 * @function useWithResolvers
 * @description 等待成功的异步
 * @author Lock
 * @returns
 */
export default function useWithResolvers<S>() {
  const promise = useRef(withResolvers<S>());
  return {
    promise: promise.current.promise,
    resolve: (value: S) => {
      promise.current?.resolve?.(value);
      promise.current = withResolvers<S>();
    },
    reject: promise?.current.reject,
  };
}
