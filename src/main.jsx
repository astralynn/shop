import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from './pages/Product.jsx';
import { CartProvider } from 'react-use-cart';
import Bag from './pages/Bag.jsx';

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: "/shop",
        element: <Home />
      },
      {
        path: "/shop/product/:id",
        element: <Product />
      },
      {
        path: "/shop/bag",
        element: <Bag />
      }
    ]
  }
], { basename: "/" });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)
