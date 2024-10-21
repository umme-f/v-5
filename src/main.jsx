import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import 'regenerator-runtime/runtime';
import i18n from './i18n';  // Import i18n configuration
import Login from './components/Login';
import AfterLogin from './components/AfterLogin';
import VehicleManagerTableView from './components/VehicleManagerTableView';
import UserTableView from './components/UserTableView';
import Footer from './components/Footer';
import Error from './components/Error';
import './index.css';
import AddButton from './components/AddButton';
import EditButton from './components/EditButton';
import CarNotification from './components/CarNotification';
import CarDetails from './components/CarDetails';
import UserMenuDropdown from './components/UserMenuDropdown';
import MoreInformation from './components/moreInformation';
import VehicleDetails from './components/VehicleDetails';
import SupplierDetails from './components/SupplierDetails';
import AddSupplier from './components/AddSupplier';
import VehicleManagerDetails from './components/VehicleManagerDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: '/footer',
        element: <Footer />,
      }
    ]
  },
  
  {
    path: "/after-login",
    element: <AfterLogin />,
  },
  {
    path: "/vehicle-manager-view",
    element: <VehicleManagerTableView />,
  },
  {
    path: "/vehicle-manager-details",
    element: <VehicleManagerDetails />,
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
    path: "/add-button",
    element: <AddButton />,
  },
  {
    path: "/edit-button",
    element: <EditButton />,
  },
  {
    path: "/car-notification",
    element: <CarNotification />,
  },
  {
    path: "/car-details",
    element: <CarDetails />,
  },
  {
    path: "/usermenudropdown",
    element: <UserMenuDropdown />,
  },
  {
    path: "/more-information",
    element: <MoreInformation />,
  },
  {
    path: "/vehicle-details",
    element: <VehicleDetails />,
  },
  {
    path: "/supplier-details",
    element: <SupplierDetails />,
  },
  {
    path: "/add-supplier",
    element: <AddSupplier />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>,
);
