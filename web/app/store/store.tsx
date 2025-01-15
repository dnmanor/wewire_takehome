import {configureStore} from "@reduxjs/toolkit";
import {currencyAPI} from "@/app/api/api";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [currencyAPI.reducerPath]: currencyAPI.reducer,
  },
  middleware: (gDM) => gDM().concat(currencyAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
