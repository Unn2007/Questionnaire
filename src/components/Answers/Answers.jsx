import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Choice } from "../Choice/Choice.jsx";
import css from "./Answers.module.css";

const SortableChoice = ({ choice, updateChoice, removeChoice }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: choice.id }); 

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className={css.answerItem}>
      <Choice choice={choice} updateChoice={updateChoice} removeChoice={removeChoice} />
    </li>
  );
};

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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = question.choices.findIndex((c) => c.id === active.id);
      const newIndex = question.choices.findIndex((c) => c.id === over.id);
      updateChoices(arrayMove(question.choices, oldIndex, newIndex));
    }
  };

  return (
    <div className={css.answers}>
      <h3>Answers</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={question.choices} strategy={verticalListSortingStrategy}>
          <ol className={css.answerList}>
            {question.choices.map((choice) => (
              <SortableChoice
                key={choice.id}
                choice={choice}
                updateChoice={updateChoice}
                removeChoice={removeChoice}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      <button onClick={addChoice} className="button">
        Add Answer
      </button>
    </div>
  );
};
