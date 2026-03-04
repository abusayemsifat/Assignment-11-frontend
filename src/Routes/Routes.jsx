import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashBoard from "../Pages/Dashboard/MainDashboard/MainDashBoard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/My Request/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Profile from "../Pages/Dashboard/Profile";
import AllRequests from "../Pages/AllRequests/AllRequests";
import ManageRequests from "../Pages/Dashboard/ManageRequests/ManageRequests";
import Reports from "../Pages/Dashboard/Reports/Reports";
import DashBlog from "../Pages/Dashboard/DashBlog/DashBlog";
import Settings from "../Pages/Dashboard/Settings/Settings";
import BlogList from "../Pages/Blog/BlogList";
import BlogDetail from "../Pages/Blog/BlogDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: '/',               Component: Home },
      { path: '/login',          Component: Login },
      { path: '/signup',         Component: Register },
      { path: '/donate',         element: <PrivateRoute><Donate /></PrivateRoute> },
      { path: '/payment-success', Component: PaymentSuccess },
      { path: '/search',         Component: SearchRequest },
      { path: '/all-requests',   Component: AllRequests },
      { path: '/blog',           Component: BlogList },
      { path: '/blog/:id',       Component: BlogDetail },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: '/dashboard',          element: <MainDashBoard /> },
      { path: 'add-request',         element: <AddRequest /> },
      { path: 'all-users',           element: <AllUsers /> },
      { path: 'my-request',          element: <MyRequest /> },
      { path: 'profile',             element: <Profile /> },
      { path: 'manage-requests',     element: <ManageRequests /> },
      { path: 'reports',             element: <Reports /> },
      { path: 'blog',                element: <DashBlog /> },
      { path: 'settings',            element: <Settings /> },
    ]
  }
]);

export default router;