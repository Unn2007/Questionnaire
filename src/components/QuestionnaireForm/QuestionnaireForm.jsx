import { useState } from "react";
import { Question } from "../Question/Question.jsx";
import css from "./QuestionnaireForm.module.css";

export const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      text: "",
      type: "text",
      choices: [
        { id: 1, text: "" },
        { id: 2, text: "" },
      ],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: "",
        type: "text",
        choices: [
          { id: 1, text: "" },
          { id: 2, text: "" },
        ],
      },
    ]);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    console.log("Отправленные данные:", questions);
    alert("Данные отправлены! Смотрите в консоли.");
  };

  return (
    <div className={css.QuestionnaireForm}>
      <div className="container">
        <h2>Create Quiz</h2>
        <ol className={css.questionsList}>
          {questions.map((q) => (
            <Question
              key={q.id}
              question={q}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
            />
          ))}
        </ol>

        <button onClick={addQuestion} className="button">
          Add Question
        </button>
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
    </div>
  );
};
