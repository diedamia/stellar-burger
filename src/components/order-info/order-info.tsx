import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { selectOrderModalData } from '../../services/slices/order-slice';
import { useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { useEffect, useState } from 'react';

type TOrderData = {
  createdAt: string;
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  updatedAt: string;
  number: number;
};

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const [orderData, setOrderData] = useState<TOrderData | null>(null);
  const ingredients = useSelector(selectIngredients);
  const orderModalData = useSelector(selectOrderModalData);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderByNumberApi(Number(number));
        if (response.success) {
          setOrderData(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    if (number) {
      fetchOrder();
    } else if (orderModalData) {
      setOrderData(orderModalData);
    }
  }, [number, orderModalData]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
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
      (acc: number, item: TIngredient & { count: number }) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
