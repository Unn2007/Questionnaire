import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./quiz/slice.js";
import { filtersReducer } from './filters/slice.js';
import {completeQuizReducer} from './completeQuiz/slice.js'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    filters: filtersReducer,
    completeQuiz:completeQuizReducer,
  },
});
