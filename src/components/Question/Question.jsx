import { Answers } from '../Answers/Answers.jsx';
import css from './Question.module.css'
export  const Question = ({ question, updateQuestion, removeQuestion }) => {
    return (
       
      <li className={css.question}>
        <h3 className={css.questionHeader}>Question</h3>
        <div className={css.questionWrapper}>
        <input
          type="text"
          value={question.text}
          onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
          placeholder="Введіть питання"
          className={css.input}
        />
        <select
          className={css.select}
          value={question.type}
          onChange={(e) => updateQuestion({ ...question, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="single">Single choice</option>
          <option value="multiple">Multiple choices</option>
        </select>
       
        <button onClick={() => removeQuestion(question.id)} className="button">Remove</button>
        </div>
        {(question.type === "single" || question.type === "multiple") && (
          <Answers question={question} updateChoices={(choices) => updateQuestion({ ...question, choices })} />
        )}
      </li>
    );
  };
