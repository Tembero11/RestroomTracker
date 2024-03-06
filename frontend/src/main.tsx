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
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import Private from "./components/Private/Private";
import NewPage from "./routes/new";
import ProfilePage from "./routes/account/profile";

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
        element: <Private><CompleteAccountPage/></Private>
      },
      {
        path: "/account/profile",
        element: <Private><ProfilePage/></Private>
      },
      {
        path: "/new",
        element: <Private><NewPage/></Private>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);