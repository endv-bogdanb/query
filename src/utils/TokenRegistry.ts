import { useSyncExternalStore } from "react";

const state = { token: "", refreshToken: "" };

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

  static set refreshToken(value: string) {
    state.refreshToken = value;
    TokenRegistry.notify();
    sessionStorage.setItem("REFRESH_TOKEN", JSON.stringify(state.refreshToken));
  }

  static get refreshToken() {
    if (!state.refreshToken) {
      const token = sessionStorage.getItem("REFRESH_TOKEN");
      if (token) {
        TokenRegistry.refreshToken = JSON.parse(token);
      }
    }
    return state.refreshToken;
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
