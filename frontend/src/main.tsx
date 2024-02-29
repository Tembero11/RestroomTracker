import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import "./styles/theme.scss";
import IndexPage from "./routes";
import LoginPage from "./routes/login";
import { CompleteAccountPage } from "./routes/account/complete";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <IndexPage/>
      },
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/account/complete",
        element: <CompleteAccountPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);