import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import jobReducer from '../features/jobs/jobSlice'
import taskReducer from '../features/tasks/taskSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jobs:jobReducer,
    tasks:taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
