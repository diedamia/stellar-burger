import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, selectFeedOrders, selectIsLoading, selectError } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!orders.length) {
    return <div>Нет доступных заказов</div>;
  }

  return (
    <FeedUI 
      orders={orders} 
      handleGetFeeds={handleGetFeeds}
    />
  );
};
