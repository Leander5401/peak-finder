import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./components/Filter/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
