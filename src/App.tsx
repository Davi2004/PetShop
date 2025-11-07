import { createBrowserRouter } from "react-router-dom"

import { Home } from "./pages/home"
import { Cart } from "./pages/cart"
import { ProductDetails } from "./pages/productdetails";

import { Layout } from "./components/layout" 

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
    ]
  }
])

export { router }
