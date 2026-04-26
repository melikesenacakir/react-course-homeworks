import {configureStore} from "@reduxjs/toolkit"
import paginationSlice from "./pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;