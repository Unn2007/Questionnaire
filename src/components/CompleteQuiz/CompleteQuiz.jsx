import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsQuizInfo } from "../../redux/quiz/slice.js";
import { selectIsQuizInfo } from "../../redux/quiz/selectors.js";
import { QuizInfo } from "../QuizInfo/QuizInfo.jsx";
import css from "./CompleteQuiz.module.css";

export const CompleteQuiz = ({ quiz }) => {
  const [index, setIndex] = useState(1);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const isQuizInfo = useSelector(selectIsQuizInfo);
  const dispatch = useDispatch();
  const currentQuestion = quiz.questions[index - 1];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleNextClick = () => {
    setIndex(index + 1);
    setError(null);
  };

  const handleBackClick = () => {
    setIndex(index - 1);
    setError(null);
    dispatch(setIsQuizInfo(false));
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId, choiceId) => {
    setAnswers((prev) => {
      const prevAnswers = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: prevAnswers.includes(choiceId)
          ? prevAnswers.filter((id) => id !== choiceId)
          : [...prevAnswers, choiceId],
      };
    });
  };

  const handleSubmit = () => {
    const unansweredQuestions = quiz.questions.filter((q) => {
      const answer = answers[q.id];
      return !answer || (Array.isArray(answer) && answer.length === 0);
    });

    if (unansweredQuestions.length > 0) {
      setError("Please answer all questions before submitting.");
      return;
    }

    clearInterval(timerRef.current);
    dispatch(setIsQuizInfo(true));
    setError(null);
    setIndex(1);
    setDisabled(true);
  };

  

  return (
    <section>
      <h2 className={css.name}>{quiz.name}</h2>
      <p className={css.description}>{quiz.description}</p>
      <div className={css.questionContainer}>
        <p
          className={css.quizCounter}
        >{`Question № ${index} of ${quiz.questions.length}`}</p>
        <p className={css.question}>{currentQuestion.text}</p>

        {currentQuestion.type === "single" && (
          <ul className={css.answersList}>
            {currentQuestion.choices.map((choice) => (
              <li key={choice.id} className={css.answerContainer}>
                <label className={css.label} htmlFor={choice.id}>{choice.text}  </label>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  id={choice.id}
                  value={choice.id}
                  checked={answers[currentQuestion.id] === choice.id}
                  onChange={() =>
                    handleAnswerChange(currentQuestion.id, choice.id)
                  }
                  className={css.input}
                />
              </li>
            ))}
          </ul>
        )}

        {currentQuestion.type === "multiple" && (
          <ul className={css.answersList}>
            {currentQuestion.choices.map((choice) => (
              <li key={choice.id} className={css.answerContainer}>
                <input
                  type="checkbox"
                  value={choice.id}
                  checked={
                    answers[currentQuestion.id]?.includes(choice.id) || false
                  }
                  onChange={() =>
                    handleCheckboxChange(currentQuestion.id, choice.id)
                  }
                  className={css.input}
                  id={choice.id}
                />
                <label htmlFor={choice.id}>{choice.text}</label>
              </li>
            ))}
          </ul>
        )}

        {currentQuestion.type === "text" && (
          <input
          ref={inputRef}
            type="text"
            placeholder="Enter the answer"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.id, e.target.value)
            }
            className={css.input}
          />
        )}

        {error && <p className={css.error}>{error}</p>}

        <div className={css.buttonContainer}>
          <button
            type="button"
            onClick={handleBackClick}
            disabled={index === 1}
          >
            Prev
          </button>
          {index === quiz.questions.length ? (
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextClick}
              disabled={isDisabled}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {isQuizInfo && (
        <QuizInfo
          info={{ quiz: quiz, answers: answers, timeSpent: timeSpent, setDisabled:setDisabled, setAnswers:setAnswers }}
        />
      )}
    </section>
  );
};
