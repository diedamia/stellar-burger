import { getFeedsApi, TFeedsResponse } from "../../utils/burger-api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TOrdersData } from "../../utils/types";
import { RootState } from "../store";

// храним данные о ленте заказов
export interface FeedState {
  items: TOrdersData | null;  // данные о заказах
  loading: boolean;  // загружаются или нет
  error: SerializedError | null;  // ошибка если есть
}

export const initialState: FeedState = {
  items: null,
  loading: false,
  error: null
};

// получаем данные о заказах
export const getFeed = createAsyncThunk<TFeedsResponse, void>(
  'feed/fetch',
  async () => await getFeedsApi()
);

const feedBuilder = createSlice({
    name: "feed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // начали загружать
        .addCase(getFeed.pending, (state) => {
            state.loading = true;
            state.items = null;
        })
        // загрузили успешно
        .addCase(getFeed.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        // ошибка при загрузке
        .addCase(getFeed.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
    },
})

// функции для получения данных из стора
export const selectFeed = (state: RootState) => state.feed.items;
export const selectIsLoading = (state: RootState) => state.feed.loading;
export const selectError = (state: RootState) => state.feed.error;
export const selectFeedOrders = (state: RootState) => state.feed.items?.orders || [];

export default feedBuilder.reducer; 