import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from "./features/toolbarSlice";
import { useDispatch } from "react-redux";
import memberSlice from "./features/members"

const store = configureStore({
  reducer: {
    toolbar: toolbarReducer,
    members: memberSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
