import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/login";
import Signup from "../features/auth/signup";
import Profile from "../features/profile/profile";
import EditProfile from "../features/profile/editProfile";
import FeedPage from "../pages/FeedPage";
import MarketplacePage from "../pages/MarketplacePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import MessagesInbox from "../features/chat/messagesInbox";
import ChatPage from "../pages/ChatPage";
import ProtectedRoute from "../routes/protectedRoutes";
import IndexRoute from "./indexRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root entry */}
      <Route path="/" element={<IndexRoute />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <MarketplacePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketplace/:id"
        element={
          <ProtectedRoute>
            <ProductDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesInbox />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages/:id"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
