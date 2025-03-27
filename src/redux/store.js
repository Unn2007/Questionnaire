import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./quiz/slice.js";
import { filtersReducer } from './filters/slice.js';
import {completeQuizReducer} from './completeQuiz/slice.js'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const completeQuizPersistConfig = {
  key: 'completeQuiz',
  storage,
  whitelist: ['answers'],
};

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    filters: filtersReducer,
    completeQuiz:persistReducer(completeQuizPersistConfig,completeQuizReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
