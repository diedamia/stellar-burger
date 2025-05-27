import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthed } from '../../services/slices/user-slice';

interface ProtectedRouteProps {
  children: JSX.Element;
  anonymous?: boolean;
}

const ProtectedRoute = ({ children, anonymous = false }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthed);

  if (anonymous && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute; 