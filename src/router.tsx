import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import TopUp from "./pages/topup";
import Transaction from "./pages/transaction";
import Account from "./pages/account";

import * as Handle from "./helpers/handleRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Handle.DirectToLogin />,
  },
  {
    path: "/login",
    element: (
      <Handle.PreventBackPage>
        <Handle.Title onTitle="Login">
          <Login />
        </Handle.Title>
      </Handle.PreventBackPage>
    ),
  },
  {
    path: "/register",
    element: (
      <Handle.PreventBackPage>
        <Handle.Title onTitle="Register">
          <Register />
        </Handle.Title>
      </Handle.PreventBackPage>
    ),
  },
  {
    path: "/home",
    element: (
      <Handle.PrivateRoute>
        <Handle.Title onTitle="Home">
          <Home />
        </Handle.Title>
      </Handle.PrivateRoute>
    ),
  },
  {
    path: "/top-up",
    element: (
      <Handle.PrivateRoute>
        <Handle.Title onTitle="Top Up">
          <TopUp />
        </Handle.Title>
      </Handle.PrivateRoute>
    ),
  },
  {
    path: "/transaction",
    element: (
      <Handle.PrivateRoute>
        <Handle.Title onTitle="Transaction">
          <Transaction />
        </Handle.Title>
      </Handle.PrivateRoute>
    ),
  },
  {
    path: "/account",
    element: (
      <Handle.PrivateRoute>
        <Handle.Title onTitle="Akun">
          <Account />
        </Handle.Title>
      </Handle.PrivateRoute>
    ),
  },
]);

export default router;
