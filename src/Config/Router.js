import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../Components/Home/Home";
import Signup from "../Components/Authentications/Signup/Signup";
import Login from "../Components/Authentications/Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import UpdateProfile from "../Components/UpdateProfile/UpdateProfile";
import Transaction from "../Components/Transactions/Transaction";
import TotalBudget from "../Components/TotalBudget/TotalBudget";
import Graphs from "../Components/Graphs/Graphs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/updateprofile",
    element: <UpdateProfile />,
  },
  {
    path: "/totalamount",
    element: <TotalBudget />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
  },
  {
    path: "/graphs",
    element: <Graphs />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
