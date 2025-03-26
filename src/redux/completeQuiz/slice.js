import { createSlice } from "@reduxjs/toolkit";



const completeQuizSlice = createSlice({
  name: "completeQuiz",
  initialState: {
    answers: {},
  
    
  },
  reducers: {
    updateAnswers: (state,action) => {
     
      state.answers = { ...state.answers, [action.payload.questionId]: action.payload.value };
    },
    updateAnswersCheckbox(state, action) {
      
      const prevAnswers = state.answers[action.payload.questionId] || [];
      state.answers = {...state.answers,[action.payload.questionId]: prevAnswers.includes(action.payload.choiceId)
        ? prevAnswers.filter((id) => id !== action.payload.choiceId)
        : [...prevAnswers, action.payload.choiceId],}
       
       
    },
    clearAnswers: (state) => {
     
      state.answers = {};
    },
  },
 
});


export const { updateAnswers, updateAnswersCheckbox,clearAnswers } = completeQuizSlice.actions;
export const completeQuizReducer = completeQuizSlice.reducer;
