import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersList, selectOrders, selectIsOrdersListLoading } from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsOrdersListLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <div>Нет доступных заказов</div>;
  }

  return (
    <ProfileOrdersUI 
      orders={orders}
    />
  );
};
