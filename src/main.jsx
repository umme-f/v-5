import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import AfterLogin from './components/AfterLogin';
import VehicleManagerTableView from './components/VehicleManagerTableView';
import UserTableView from './components/UserTableView';
import Footer from './components/Footer';
import Error from './components/Error';
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/after-login",
    element: <AfterLogin />,
  },
  {
    path: "/vehicle-manager",
    element: <VehicleManagerTableView />,
  },
  {
    path: "/user-table",
    element: <UserTableView />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

