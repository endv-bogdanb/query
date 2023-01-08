import { TUser } from "@models";
import { useSyncExternalStore } from "react";

export interface IState {
  token: string;
  refreshToken: string;
  user: TUser | null;
}

let state: IState = {
  token: "",
  refreshToken: "",
  user: null,
};

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
        state = { token, refreshToken, user: null };
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

  static set user(value: TUser | null) {
    state = { ...state, user: value };
    this.notify();
  }

  static get user() {
    return state.user;
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
      user: null,
    };
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("REFRESH_TOKEN");
    this.notify();
  };
}
