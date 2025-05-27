import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, selectFeedOrders, selectIsLoading, selectError } from '../../services/slices/feed-slice';
import { useNavigate } from 'react-router-dom';

export const Feed: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  const handleOrderClick = (number: number) => {
    navigate(`/feed/${number}`);
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
      handleOrderClick={handleOrderClick}
    />
  );
};
