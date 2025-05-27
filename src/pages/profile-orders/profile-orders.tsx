import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrdersList, selectIsOrdersListLoading, selectOrders } from '../../services/slices/order-slice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const isOrdersLoading = useSelector(selectIsOrdersListLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  const handleOrderClick = (number: number) => {
    navigate(`/profile/orders/${number}`);
  };

  if (isOrdersLoading) {
    return <h1>Загрузка</h1>;
  }

  return (
    <ProfileOrdersUI 
      orders={orders} 
      handleOrderClick={handleOrderClick}
    />
  );
};
