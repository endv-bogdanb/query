import { useSyncExternalStore } from "react";

type HandleSubscribe = Parameters<typeof useSyncExternalStore>[0];

export interface AnyAction {
  type: string;
}

export interface Reducer<TState, TAction extends AnyAction> {
  (state: TState | undefined, action: TAction): TState;
}

export interface Selector<TState, TReturn> {
  (state: TState): TReturn;
}

export const makeGlobalSlice = <TState, TAction extends AnyAction>(
  reducer: Reducer<TState, TAction>,
) => {
  const subscribers: Set<() => void> = new Set();

  let state: TState = reducer(
    undefined as unknown as TState,
    {
      type: "@@INIT",
    } as unknown as TAction,
  );

  const dispatch = (action: TAction) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber()); // NOTE: notify subscribers state has been changed
  };

  const handleSubscribe: HandleSubscribe = (subscriber) => {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  };

  const useSlice = <TReturn = TState>(
    selector: Selector<TState, TReturn> = (_state) =>
      _state as unknown as TReturn,
  ) => useSyncExternalStore(handleSubscribe, () => selector(state));

  return {
    dispatch,
    get state() {
      return state;
    },
    useSlice,
  };
};
