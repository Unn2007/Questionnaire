import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./quiz/slice.js";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
