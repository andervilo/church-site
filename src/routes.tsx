import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import RootLayout from "./components/layout/RootLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
];

export default routes;
