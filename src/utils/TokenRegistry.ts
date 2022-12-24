import { useSyncExternalStore } from "react";

const state = { token: "" };

const subscribers = new Set<() => void>();

export function useSession() {
  return useSyncExternalStore(
    (subscriber) => {
      subscribers.add(subscriber);
      return () => {
        subscribers.delete(subscriber);
      };
    },
    () => state,
    () => undefined
  );
}

export class TokenRegistry {
  static set token(value: string) {
    state.token = value;
    TokenRegistry.notify();
    sessionStorage.setItem("TOKEN", JSON.stringify(state.token));
  }

  static get token() {
    if (!state.token) {
      const token = sessionStorage.getItem("TOKEN");
      if (token) {
        TokenRegistry.token = JSON.parse(token);
      }
    }
    return state.token;
  }

  static notify = () => {
    for (const subscriber of subscribers) {
      subscriber();
    }
  };

  static reset = () => {
    state.token = "";
  };
}
