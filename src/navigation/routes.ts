import { lazy } from "react";
import { RouteProps } from "react-router";

export interface PrivateRouteObject extends RouteProps {
  exact: boolean;
  path: string;
  breadcrumb: string;
  component: any;
  title: string;
}

const Home = lazy(() => import("../containers/Home"));

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: "Home",
    path: "/",
    component: Home,
  },
];

export { PUBLIC_ROUTES };
