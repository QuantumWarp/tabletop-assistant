import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import configurationReducer from './config-slice';
import mainReducer from './main-slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedMainReducer = persistReducer({ key: "main", storage }, mainReducer);
const persistedConfigReducer = persistReducer({ key: "main", storage }, configurationReducer);

const store = configureStore({
  reducer: {
    main: persistedMainReducer,
    config: persistedConfigReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
