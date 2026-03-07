
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./Components/ErrorBoundary"

import Browse from "./Components/browse/Browse"

import Chat from "./Components/chat/Chat"
import Home from "./Components/home/Home.jsx"
import AddItem from './Components/addItem/AddItem.jsx'
import LoginForm from './Components/Header/headerAction/LoginForm.jsx'
import RegisterForm from './Components/Header/headerAction/RegisterForm.jsx'
import ProductDetailPage from './Components/browse/productDetail/ProductDetailPage.jsx'


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Profile from "./Components/profile/Profile.jsx";
import OwnerProductDetail from "./Components/profile/OwnerProductDetail.jsx";
import EditProfile from "./Components/profile/EditProfile.jsx";
import EditProduct from "./Components/profile/EditProduct.jsx";
import Favorites from "./Components/favorites/Favorites.jsx";



import { Provider } from "react-redux";
import store from "./store/store";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,         // <-- Main Layout (Header, Footer, Outlet)
        children: [
            {
                index: true,          // default route
                element: <Home />
            },
            {
                path: "browse",
                element: <Browse />
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                     <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "chat",
                 element: (
                    <ProtectedRoute>
                    <Chat />
                    </ProtectedRoute>
                ),
            }
            ,
            {
                path: "add-item",
                 element: (
                    <ProtectedRoute>
                    <AddItem />
                    </ProtectedRoute>
                ),
            }
            ,
            {
                path: "login",
                element: <LoginForm />
            }
            ,
            {
                path: "register",
                element: <RegisterForm />
            }
            ,
            {
                path: "/product/:id",
                element: <ProductDetailPage />,
            }
            ,
            {
                path: "/profile/product/:id",
                element: <OwnerProductDetail />,
            }
            ,
            {
                path: "/profile/edit",
                element: <EditProfile /> ,

            }
            ,
            {
                path: "/edit-product/:id",
                element: <EditProduct /> ,

            },
            {
                path: "/favorites",
                element: (
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: (
                  <div className="min-h-[70vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-6">Page not found</p>
                      <button
                        onClick={() => window.location.href = "/"}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Go Home
                      </button>
                    </div>
                  </div>
                )
            }

        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
);

