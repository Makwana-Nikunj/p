import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import LoadingSpinner from "./Components/LoadingSpinner"

import { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { fetchProducts } from "./store/productSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import authService from "./services/authService";
import profileService from './services/profileService';

import ProtectedRoute from "./Components/ProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";

// Lazy loaded pages to match PAPERCHAT style roughly
import Home from "./pages/HomePage.jsx"
import Browse from "./pages/BrowsePage"
import Profile from "./pages/ProfilePage.jsx";
import Chat from "./pages/ChatPage"
import AddItem from './pages/AddItemPage.jsx'
import LoginForm from './pages/LoginPage.jsx'
import RegisterForm from './pages/RegisterPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import OwnerProductDetail from "./pages/OwnerProductDetailPage.jsx";
import EditProfile from "./pages/EditProfilePage.jsx";
import EditProduct from "./pages/EditProductPage.jsx";
import Favorites from "./pages/FavoritesPage.jsx";
import AdminDashboard from "./pages/AdminDashboardPage.jsx";

// Base layout wrapping routes
function Layout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="grow pt-16 md:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          const photoUrl = profileService.getProfilePhoto(user.avatar);
          dispatch(
            login({
              userData: user,
              profilePhoto: photoUrl,
            })
          );
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        dispatch(fetchProducts());
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/browse" element={<Layout><Browse /></Layout>} />
          
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Layout><Chat /></Layout></ProtectedRoute>} />
          <Route path="/add-item" element={<ProtectedRoute><Layout><AddItem /></Layout></ProtectedRoute>} />
          
          <Route path="/login" element={<Layout><LoginForm /></Layout>} />
          <Route path="/register" element={<Layout><RegisterForm /></Layout>} />
          
          <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/profile/product/:id" element={<ProtectedRoute><Layout><OwnerProductDetail /></Layout></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><Layout><EditProfile /></Layout></ProtectedRoute>} />
          <Route path="/edit-product/:id" element={<ProtectedRoute><Layout><EditProduct /></Layout></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Layout><Favorites /></Layout></ProtectedRoute>} />
          
          <Route path="/admin" element={<AdminProtectedRoute><Layout><AdminDashboard /></Layout></AdminProtectedRoute>} />
          
          <Route path="*" element={
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
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
