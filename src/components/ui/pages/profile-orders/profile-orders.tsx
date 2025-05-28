import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const navigate = useNavigate();

  const handleOrderClick = (number: number) => {
    navigate(`/profile/orders/${number}`);
  };

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} handleOrderClick={handleOrderClick} />
      </div>
    </main>
  );
};
