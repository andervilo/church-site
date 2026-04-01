import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import RootLayout from "./components/layout/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import MinistryDetails from "./components/pages/MinistryDetails";
import Events from "./components/pages/events/Events";

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
  {
    path: "/ministerios/:id",
    element: <MinistryDetails />,
  },
  {
    path: "/eventos",
    element: <Events />,
  },
];

export const router = createBrowserRouter(routes);
