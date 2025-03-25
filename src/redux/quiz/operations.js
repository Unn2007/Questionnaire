import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizes = createAsyncThunk(
  "quiz/fetchAll",

  async (_, thunkAPI) => {
    try {
      const url =
        "https://questionnaire-b22ca-default-rtdb.europe-west1.firebasedatabase.app/questionnaire/v1/quizData.json";
      const params = {
        orderBy: '"$key"',
        limitToFirst: 9,
      };
      const response = await axios.get(url, { params });
      if (!response.data) {
        return { quizes: [], lastKey: null, total: 0 };
      }

      const quizes = Object.entries(response.data).map(([id, obj]) => ({
        id,
        ...obj,
      }));
      const lastKey = quizes.length ? quizes[quizes.length - 1].id : null;

      const responseTotal = await axios.get(`${url}?shallow=true`);
      const total = responseTotal.data
        ? Object.keys(responseTotal.data).length
        : 0;

      return { quizes, lastKey, total };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const fetchNextPage = createAsyncThunk(
  "quiz/fetchNextPage",

  async (oldLastKey, thunkAPI) => {
    try {
      const url =
        "https://questionnaire-b22ca-default-rtdb.europe-west1.firebasedatabase.app/questionnaire/v1/quizData.json";

      const params = {
        orderBy: '"$key"',
        startAt: `"${oldLastKey}"`,
        limitToFirst: 10,
      };
      const response = await axios.get(url, { params });

      const quizes = Object.entries(response.data).map(([id, obj]) => ({
        id,
        ...obj,
      }));
      quizes.shift();

      const lastKey = quizes[quizes.length - 1]?.id || null;

      return { quizes, lastKey };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addQuiz = createAsyncThunk(
  "quiz/addQuizData",

  async (quizData, thunkAPI) => {
    try {
      const url =
        "https://questionnaire-b22ca-default-rtdb.europe-west1.firebasedatabase.app/questionnaire/v1/quizData.json";

      const response = await axios.post(url, { ...quizData });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateQuizAnswers = createAsyncThunk(
  "quiz/updateQuizAnswers",
  async ({ quizId, newAnswer, oldAnswers }, thunkAPI) => {
    try {
      const url = `https://questionnaire-b22ca-default-rtdb.europe-west1.firebasedatabase.app/questionnaire/v1/quizData/${quizId}.json`;

      const updatedAnswers = [...(oldAnswers || []), newAnswer];

      const response = await axios.patch(url, { answers: updatedAnswers });
      const responseQuiz = await axios.get(url);

     

      return {quizId,quiz:responseQuiz.data};
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (quizId, thunkAPI) => {
    try {
      const url = `https://questionnaire-b22ca-default-rtdb.europe-west1.firebasedatabase.app/questionnaire/v1/quizData/${quizId}.json`;

      await axios.delete(url);

      return quizId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

