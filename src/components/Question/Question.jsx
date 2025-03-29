import { useSortable } from "@dnd-kit/sortable";
import { Answers } from "../Answers/Answers.jsx";
import { CSS } from "@dnd-kit/utilities";
import css from "./Question.module.css";

const SortableQuestion = ({ id, classNm, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id }); 
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className={classNm} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
};


export const Question = ({ question, updateQuestion, removeQuestion }) => {
  return (
    <SortableQuestion id={question.id} classNm={css.question}> 
         
      <h3 className={css.questionHeader}>Question</h3>
      <div className={css.questionWrapper}>
        <input
          type="text"
          value={question.text}
          onChange={(e) =>
            updateQuestion({ ...question, text: e.target.value })
          }
          placeholder="Enter the question"
          className={css.input}
        />
        <select
          className={css.select}
          value={question.type}
          onChange={(e) =>
            updateQuestion({ ...question, type: e.target.value })
          }
        >
          <option value="text">Text</option>
          <option value="single">Single choice</option>
          <option value="multiple">Multiple choices</option>
        </select>

        <button onClick={() => removeQuestion(question.id)} className="button">
          Remove
        </button>
      </div>
      {(question.type === "single" || question.type === "multiple") && (
        <Answers
          question={question}
          updateChoices={(choices) => updateQuestion({ ...question, choices })}
        />
      )}
   
    </SortableQuestion>

  );
};
