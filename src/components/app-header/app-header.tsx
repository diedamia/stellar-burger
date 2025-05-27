import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '../../services/slices/user-slice';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUserData);
  const location = useLocation();
  
  return <AppHeaderUI 
    userName={userData?.name || ''} 
    location={location.pathname}
  />;
};
