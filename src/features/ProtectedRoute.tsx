import { Navigate, Outlet } from "react-router";
import { tokenSlice } from "@utils";

export function ProtectedRoute() {
  const session = tokenSlice.useSlice((state) => ({
    token: state.token,
    refreshToken: state.refreshToken,
  }));

  if (!session.token || !session.refreshToken) {
    return <Navigate to={""} />;
  }

  return <Outlet />;
}
