import { Navigate, Outlet } from "react-router";
import { useSession } from "@utils";

export function ProtectedRoute() {
  const session = useSession();

  if (!session?.token || !session.refreshToken) {
    return <Navigate to={""} />;
  }

  return <Outlet />;
}
