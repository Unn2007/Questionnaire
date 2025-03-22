import { Choice } from "../Choice/Choice.jsx";
import css from "./Answers.module.css";

export const Answers = ({ question, updateChoices }) => {
  const addChoice = () => {
    updateChoices([...question.choices, { id: Date.now(), text: "" }]);
  };

  const updateChoice = (id, text) => {
    updateChoices(
      question.choices.map((choice) =>
        choice.id === id ? { ...choice, text } : choice
      )
    );
  };

  const removeChoice = (id) => {
    updateChoices(question.choices.filter((choice) => choice.id !== id));
  };

  return (
    <div className={css.answers}>
      <h3>Answers</h3>
      <ol className={css.answerList}>
        {question.choices.map((choice) => (
          <li className={css.answerItem} key={choice.id}>
            <Choice
              choice={choice}
              updateChoice={updateChoice}
              removeChoice={removeChoice}
            />
          </li>
        ))}
      </ol>
      <button onClick={addChoice} className="button">
        Add Answer
      </button>
    </div>
  );
};
