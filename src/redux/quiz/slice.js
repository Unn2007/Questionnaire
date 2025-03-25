import { createSlice } from "@reduxjs/toolkit";
import {
  addQuiz,
  fetchNextPage,
  fetchQuizes,
  updateQuizAnswers,
  deleteQuiz,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    items: [],
    lastKey: undefined,
    total: 0,
    page: 1,
    loading: false,
    error: null,
    isQuizInfo: false,
  },
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    setIsQuizInfo(state, action) {
      state.isQuizInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuiz.pending, handlePending)
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.items = state.items.filter((quiz) => quiz.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteQuiz.rejected, handleRejected)
      .addCase(updateQuizAnswers.pending, handlePending)
      .addCase(updateQuizAnswers.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (quiz) => quiz.id === action.payload.quizId
        );
        state.items[index].answers = [...action.payload.quiz.answers];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateQuizAnswers.rejected, handleRejected)
      .addCase(fetchNextPage.pending, handlePending)
      .addCase(fetchNextPage.fulfilled, (state, action) => {
        const { quizes, lastKey } = action.payload;
        state.lastKey = lastKey;
        state.items.push(...quizes);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNextPage.rejected, handleRejected)
      .addCase(addQuiz.pending, handlePending)
      .addCase(addQuiz.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addQuiz.rejected, handleRejected)
      .addCase(fetchQuizes.pending, handlePending)
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        const { quizes, lastKey, total } = action.payload;
        state.page = 1;
        state.lastKey = lastKey;
        state.loading = false;
        state.error = null;
        state.items = quizes;
        state.total = total;
      })
      .addCase(fetchQuizes.rejected, handleRejected);
  },
});

export const quizReducer = quizSlice.reducer;
export const { nextPage, setIsQuizInfo } = quizSlice.actions;
