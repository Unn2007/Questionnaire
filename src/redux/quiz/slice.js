import { createSlice } from '@reduxjs/toolkit';
import {
  addQuiz,
  // fetchNextPage,
  // addAppointmen,
  // addFavorite,
  // getFavorite,
  // fetchFavoritePsychologists,
} from './operations';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
   
    loading: false,
    error: null,
  },
  // reducers: {
  //   nextPage: (state) => {
  //     state.page += 1;
  //   },
  //   clearFavorites(state) {
  //     state.favorites = [];
  //   },
  //   pushFavorites(state, action) {
  //     state.favorites.push(action.payload);
  //   },
  //   popFavorites(state, action) {
  //     const newList = state.favorites.filter((item) => item !== action.payload);
  //     state.favorites = [...newList];
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(addQuiz.pending, handlePending)
      .addCase(addQuiz.fulfilled, (state) => {
            
        state.loading = false;
        state.error = null;
       
      })
      .addCase(addQuiz.rejected, handleRejected);
  },
});

export const quizReducer = quizSlice.reducer;
// export const { nextPage, clearFavorites, pushFavorites, popFavorites } =
//   psychologistsSlice.actions;
