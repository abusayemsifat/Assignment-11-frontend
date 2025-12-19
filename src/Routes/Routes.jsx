import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashBoard from "../Pages/Dashboard/MainDashboard/MainDashBoard";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'main',
        element: <MainDashBoard></MainDashBoard>
      },
      {
        path: 'add-product',
        element: <AddProduct></AddProduct>
      }
    ]
  }
]);

export default router;