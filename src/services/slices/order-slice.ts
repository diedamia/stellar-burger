import { getOrderByNumberApi, getOrdersApi, orderBurgerApi, TNewOrderResponse, TFeedsResponse } from "@api";
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

// храним данные о заказах
export interface IOrderState {
  orders: TOrder[];  // список заказов
  orderRequest: boolean;  // создается заказ или нет
  orderError: null | SerializedError;  // ошибка если есть
  orderModalData: TOrder | null;  // данные для модального окна
  isLoadingNumber: boolean;  // загружается номер заказа
  isLoadingOrders: boolean;  // загружается список заказов
}

export const initialState: IOrderState = {
  orders: [],
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  isLoadingNumber: true,
  isLoadingOrders: true
};

// создаем новый заказ
export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>("order/createOrder", async(ingredients, {rejectWithValue}) =>{
    const data = await orderBurgerApi(ingredients);
    if(!data.success) rejectWithValue(data);
    return data;
})

// получаем заказ по номеру
export const fetchOrderByNumber = createAsyncThunk<TOrder, number>("order/getOrder", async(num, {rejectWithValue}) =>{
    console.log('Fetching order by number:', num);
    const data = await getOrderByNumberApi(num);
    console.log('API response:', data);
    if(!data.success) {
        console.error('API error:', data);
        return rejectWithValue(data);
    }
    return data.data[0];
});

// получаем список всех заказов
export const getOrdersList = createAsyncThunk<TOrder[], void>("order/list", async(_, {rejectWithValue}) =>{
    const data = await getOrdersApi();
    if(!data.success) return rejectWithValue(data);
    return data.orders;
})

export const orderBuilder = createSlice({
    name: "order",
    initialState,
    reducers: {
      // обновляем данные в модальном окне
      setOrderModalData(state, action: PayloadAction<TOrder | null>){
        state.orderModalData = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
        // создаем заказ
        .addCase(createOrder.pending, (state) =>{
            state.orderRequest = true;
            state.orderModalData = null;
        })
        .addCase(createOrder.fulfilled, (state, action) =>{
            state.orderRequest = false;
            state.orderModalData = action.payload.order;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.orderRequest = false;
            state.orderModalData = null;
      })
      // получаем заказ по номеру
      .addCase(fetchOrderByNumber.pending, (state) =>{
        state.isLoadingNumber = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) =>{
        state.isLoadingNumber = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) =>{
        state.isLoadingNumber = false;
        state.orderModalData = null;
      })
      // получаем список заказов
      .addCase(getOrdersList.pending, (state) =>{
        state.isLoadingOrders = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = [];
        state.orderError = action.error;
      })
    },
})

// функции для получения данных из стора
export const selectOrders = (state: RootState): TOrder[] => state.order.orders;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectIsNumberOrderLoading = (state: RootState) => state.order.isLoadingNumber;
export const selectIsOrdersListLoading = (state: RootState) => state.order.isLoadingOrders;

export const {setOrderModalData} = orderBuilder.actions;

export default orderBuilder.reducer; 