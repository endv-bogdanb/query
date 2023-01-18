import { RouteObject } from "react-router";
import { GqlRoot } from "./Gql";
import { GqlUsers } from "./GqlUsers";

export const gqlRoutes: RouteObject = {
  path: "gql",
  element: <GqlRoot />,
  children: [
    {
      index: true,
      element: <GqlUsers />,
    },
  ],
};
