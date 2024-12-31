import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import RequireAuth from "./components/auth/RequireAuth";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import LoginForm, { action as loginAction } from "./features/auth/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
        action: loginAction,
      },
      {
        path: "/",
        element: (
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
