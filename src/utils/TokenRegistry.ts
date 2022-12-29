import { useSyncExternalStore } from "react";

let state = { token: "", refreshToken: "" };

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
  static setup = () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("TOKEN")!);
      const refreshToken = JSON.parse(sessionStorage.getItem("REFRESH_TOKEN")!);

      if (token && refreshToken) {
        state = { token, refreshToken };
      }
    } catch {}
  };

  static set token(value: string) {
    state = { ...state, token: value };
    this.persist();
    this.notify();
  }

  static get token() {
    return state.token;
  }

  static set refreshToken(value: string) {
    state = { ...state, refreshToken: value };
    this.persist();
    this.notify();
  }

  static get refreshToken() {
    return state.refreshToken;
  }

  static notify = () => {
    for (const subscriber of subscribers) {
      subscriber();
    }
  };

  static persist = () => {
    sessionStorage.setItem("TOKEN", JSON.stringify(state.token));
    sessionStorage.setItem("REFRESH_TOKEN", JSON.stringify(state.refreshToken));
  };

  static reset = () => {
    state = {
      token: "",
      refreshToken: "",
    };
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("REFRESH_TOKEN");
    this.notify();
  };
}
