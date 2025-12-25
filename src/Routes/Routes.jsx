import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashBoard from "../Pages/Dashboard/MainDashboard/MainDashBoard";
import ManageProduct from "../Pages/Dashboard/ManageProduct/ManageProduct";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/My Request/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Profile from "../Pages/Dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: '/',
        Component: Home
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/signup',
        Component: Register
      },
      {
        path:'/donate',
        element: <PrivateRoute> <Donate></Donate> </PrivateRoute>
      },
      {
        path:'/payment-success',
        Component: PaymentSuccess
      },
      {
        path:'/search',
        Component: SearchRequest
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <MainDashBoard></MainDashBoard>
      },
      {
        path: 'add-request',
        element: <AddRequest></AddRequest>
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'my-request',
        element: <MyRequest></MyRequest>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      }
    ]
  }
]);

export default router;