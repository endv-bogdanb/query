import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

export function ToolkitRoot() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}
