import { TOrder } from '@utils-types';

export type OrdersListProps = {
  orders: TOrder[];
  handleOrderClick: (number: number) => void;
};
