import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { baseApiWithGraphql } from "../services/baseApi"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof baseApiWithGraphql.reducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config

export const store = configureStore({
  reducer: {
    [baseApiWithGraphql.reducerPath]: baseApiWithGraphql.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([baseApiWithGraphql.middleware])
  },
})
// configure listeners using the provided defaults
// optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
setupListeners(store.dispatch)
