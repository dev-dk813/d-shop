import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../reducers/cartReducer";
import drawerReducer from "../reducers/drawerReducer";
import couponReducer from "../reducers/couponReducer";
import searchReducer from "../reducers/searchReducer";
import CodReducer from "../reducers/CodReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  search: searchReducer,
  COD: CodReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "../reducers/userReducer";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default store;
