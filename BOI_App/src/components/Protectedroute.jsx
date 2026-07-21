import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'Please log in to make a payment.', from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;