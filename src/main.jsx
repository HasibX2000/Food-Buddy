import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import RequireAuth from "./components/auth/RequireAuth";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import LoginForm from "./features/auth/LoginForm";
import ErrorBoundary from "./components/common/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
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
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "reservations",
            element: <Reservations />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "customers",
            element: <Customers />,
          },
          {
            path: "settings",
            element: <Settings />,
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
