import { useState } from 'react';


export default function useSetState<T extends {}>(initialState?: T) {

  const [state, setState] = useState(initialState ?? {});

  const setStateWrapper = (newState: T) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, setStateWrapper] as const;
}
