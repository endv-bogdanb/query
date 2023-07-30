import { TUser } from "@models";
import { makeGlobalSlice } from "./makeGlobalSlice";

export interface IState {
  token: string;
  refreshToken: string;
  user: TUser | null;
}

type TAction =
  | { type: "setup" }
  | { type: "reset" }
  | { type: "set"; payload: Partial<IState> };

const initialState: IState = {
  token: "",
  refreshToken: "",
  user: null,
};

export const tokenSlice = makeGlobalSlice<IState, TAction>(
  (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      case "setup": {
        try {
          const token = JSON.parse(sessionStorage.getItem("TOKEN")!);
          const refreshToken = JSON.parse(
            sessionStorage.getItem("REFRESH_TOKEN")!,
          );
          if (token && refreshToken) {
            return { ...state, token, refreshToken };
          }
        } catch {}
        return state;
      }
      case "reset": {
        sessionStorage.removeItem("TOKEN");
        sessionStorage.removeItem("REFRESH_TOKEN");
        return {
          token: "",
          refreshToken: "",
          user: null,
        };
      }
      case "set": {
        if (action.payload.token) {
          sessionStorage.setItem("TOKEN", JSON.stringify(action.payload.token));
        }

        if (action.payload.refreshToken) {
          sessionStorage.setItem(
            "REFRESH_TOKEN",
            JSON.stringify(action.payload.refreshToken),
          );
        }

        return { ...state, ...action.payload };
      }
      default: {
        return state;
      }
    }
  },
);
