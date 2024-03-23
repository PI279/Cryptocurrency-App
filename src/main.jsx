import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Home from "./pages/Home";
import CryptoList from "./pages/List";
import LayoutMain from "./pages/Layout";
import './styles/styles.css'
import CryptoDetails from './pages/CryptoDetails';
import Crypto from './pages/Crypto';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <CryptoList />,
        children:[
          {
            path: "/list",
            element: <Crypto />,
          },
          {
            path: ":coinID",
            element: <CryptoDetails />,
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
