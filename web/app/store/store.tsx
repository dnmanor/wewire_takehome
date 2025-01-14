import {configureStore} from "@reduxjs/toolkit";
import {currencyAPI} from "@/app/api/api";

export const store = configureStore({
  reducer: {
    [currencyAPI.reducerPath]: currencyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currencyAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
