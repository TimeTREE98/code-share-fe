import { useNavigate } from 'react-router-dom';
import { logout, me } from '../api/LoginApi';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response.status === 'Success') {
      localStorage.setItem('isLoggedIn', false);
      const meCheck = await me();
      navigate('/');
      if (meCheck.status === 'fail') {
        localStorage.setItem('isLoggedIn', false);
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  };

  return handleLogout;
};
