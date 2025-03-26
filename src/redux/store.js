import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./quiz/slice.js";
import { filtersReducer } from './filters/slice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    filters: filtersReducer,
  },
});
