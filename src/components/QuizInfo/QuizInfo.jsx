import { useDispatch, useSelector } from "react-redux";
import { setIsQuizInfo } from "../../redux/quiz/slice.js";
import { updateQuizAnswers } from "../../redux/quiz/operations.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { selectIsLoading } from "../../redux/quiz/selectors.js";
import css from "./QuizInfo.module.css";

export const QuizInfo = ({ info }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const questions = info.quiz.questions;
  const answers = info.answers;
  const quizId = info.quiz.id;
  const oldAnswers = info.quiz.answers;
  const setDisabled = info.setDisabled;
  const setAnswers= info.setAnswers;

  const handleClick = async () => {
    await dispatch(
      updateQuizAnswers({ quizId, newAnswer: answers, oldAnswers })
    )
      .unwrap()
      .then(() => {
        dispatch(setIsQuizInfo(false));
        setDisabled(false);
        setAnswers({});
        toast.success("Answers succesfully saved", { duration: 4000 });
      })
      .catch((error) => {
        toast.error(`${error}`, { duration: 4000 });
      });
  };

  return (
    <div className={css.infoContainer}>
      <h3 className={css.infoHeader}>Your answers</h3>
      <ul className={css.list}>
        {questions.map((q) => {
          if (q.type === "text") {
            return (
              <li key={q.id} className={css.listItem}>
                <p className={css.questionText}>
                  {" "}
                  <span className={css.span}>Question: </span> {q.text}
                </p>
                <p>
                  {" "}
                  <span className={css.span}>Answer: </span>{" "}
                  {answers[q.id] || "No answer provided"}
                </p>
              </li>
            );
          }
          if (q.type === "single") {
            const selectedChoice = q.choices.find(
              (choice) => choice.id === answers[q.id]
            );
            return (
              <li key={q.id} className={css.listItem}>
                <p>
                  <span className={css.span}>Question: </span>
                  {q.text}
                </p>
                <p>
                  <span className={css.span}>Answer: </span>
                  {selectedChoice ? selectedChoice.text : "No answer selected"}
                </p>
              </li>
            );
          }
          if (q.type === "multiple") {
            return (
              <li key={q.id} className={css.listItem}>
                <p>
                  {" "}
                  <span className={css.span}>Question: </span>
                  {q.text}
                </p>
                {Array.isArray(answers[q.id]) && answers[q.id].length > 0 ? (
                  answers[q.id].map((id) => {
                    const choice = q.choices.find((choice) => choice.id === id);
                    return (
                      <p key={id}>
                        <span className={css.span}>Answer: </span>
                        {choice ? choice.text : "Invalid choice"}
                      </p>
                    );
                  })
                ) : (
                  <p>No answers selected</p>
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <p
        className={css.time}
      >{`Time spent on responses: ${info.timeSpent} seconds.`}</p>
      {isLoading && <Loader />}
      <button type="button" onClick={handleClick}>
        Save Answers
      </button>
    </div>
  );
};
