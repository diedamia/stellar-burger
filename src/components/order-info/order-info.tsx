import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  selectIsNumberOrderLoading,
  selectOrderModalData
} from '../../services/slices/order-slice';
import { selectIngredients, selectIsIngredientsLoading } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  if (!number) return <h1>No number</h1>;
  
  const isLoading = useSelector(selectIsNumberOrderLoading);
  const isIngredientsLoading = useSelector(selectIsIngredientsLoading);
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderModalData);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    console.log('OrderInfo component mounted, number:', number);
    if (!isIngredientsLoading) {
      dispatch(fetchOrderByNumber(+number));
    }
  }, [number, dispatch, isIngredientsLoading]);

  const orderInfo = useMemo(() => {
    console.log('Calculating orderInfo:', { orderData, ingredients });
    if (!orderData || !ingredients.length) {
      console.log('Missing data:', { orderData, ingredients });
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || isLoading || isIngredientsLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
