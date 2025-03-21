import { useState } from "react";
import { Question } from "../Question/Question.jsx";
import { useDispatch } from "react-redux";
import { addQuiz } from "../../redux/quiz/operations.js";
import css from "./QuestionnaireForm.module.css";

export const QuestionnaireForm = ({ initialData = null }) => {
  const dispatch = useDispatch();

  const [quizName, setQuizName] = useState(initialData?.name || "");
  const [quizDescription, setQuizDescription] = useState(initialData?.description || "");
  const [questions, setQuestions] = useState(
    initialData?.questions || [
      {
        id: 0,
        text: "",
        type: "text",
        choices: [
          { id: 1, text: "" },
          { id: 2, text: "" },
        ],
      },
    ]
  );

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
    const quizData = {
      name: quizName,
      description: quizDescription,
      questions: questions,
    };

    dispatch(addQuiz(quizData));
    

    setQuizName("");
    setQuizDescription("");
    setQuestions([
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
  };

  return (
    <div className={css.QuestionnaireForm}>
      <div className="container">
        <h2 className={css.quizHeader}>Create Quiz</h2>
        <div className={css.inputsContainer}>
          <div className={css.inputWrapper}>
            <label className={css.label}>Quiz Name:</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Enter quiz name"
              className={css.input}
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.label}>Quiz Description:</label>
            <textarea
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              placeholder="Enter quiz description"
              className={css.textarea}
            />
          </div>
        </div>

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
