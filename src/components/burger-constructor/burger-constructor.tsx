import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearBuilder, selectConstructorItems } from '../../services/slices/constructor-slice';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, selectOrderModalData, selectOrderRequest, setOrderModalData } from '../../services/slices/order-slice';
import { selectIsAuthed } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { getFeed } from '../../services/slices/feed-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthed = useSelector(selectIsAuthed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if(!isAuthed){
      navigate('login');
      return;
    }
    try{
      console.log('Creating order with ingredients:', constructorItems.ingredients.map(v => v._id));
      const result = await dispatch(createOrder(constructorItems.ingredients.map(v => v._id))).unwrap();
      console.log('Order created:', result);
      dispatch(clearBuilder());
      console.log('Updating feed...');
      const feedResult = await dispatch(getFeed()).unwrap();
      console.log('Feed updated:', feedResult);
    }
    catch(error){
      console.error('Error in order creation or feed update:', error);
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null))
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
