import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from './pages/Product.jsx';
import { CartProvider } from 'react-use-cart';
import Bag from './pages/BAg.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "bag",
        element: <Bag />
      }
    ]
  }
], {basename: "/"});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <CartProvider>
    <RouterProvider router={router}/>
   </CartProvider>
  </React.StrictMode>,
)
