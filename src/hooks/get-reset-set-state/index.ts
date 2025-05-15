/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
type GetStateAction<S> = () => S;
type ResetStateAction = () => void;

type State<S> = [
  S,
  Dispatch<SetStateAction<S>>,
  GetStateAction<S>,
  ResetStateAction,
  Dispatch<SetStateAction<S>>,
];
/**
 * @function useGetResetSetState
 * @description 一次满足 useGetState 和 useResetState 和 useSetState
 * @author Lock
 * @param initialState 初始值
 * @returns {State}
 */
export default function useGetResetSetState<S>(initialState: S): State<S> {
  const [state, setState] = useState(initialState);
  const data = useRef<S>(initialState);

  const getState = () => data.current;

  const restState = useCallback(() => {
    setState(initialState);
  }, []);

  const setSetState = (value: S | ((value: S) => S)) => {
    setState({
      ...state,
      ...value,
    });
  };

  return [
    state,
    setState,
    getState,
    restState,
    setSetState,
  ];
}
