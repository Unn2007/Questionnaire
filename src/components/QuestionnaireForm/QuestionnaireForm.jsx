import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { selectIsLoading } from "../../redux/quiz/selectors.js";
import { useState } from "react";
import { Question } from "../Question/Question.jsx";
import { addQuiz } from "../../redux/quiz/operations.js";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import css from "./QuestionnaireForm.module.css";

export const QuestionnaireForm = ({ initialData = null }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const [quizName, setQuizName] = useState(initialData?.name || "");
  const [quizDescription, setQuizDescription] = useState(
    initialData?.description || ""
  );
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
  const [error, setError] = useState("");

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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      setQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!quizName.trim()) {
      setError("Quiz name is required.");
      return;
    }
    if (!quizDescription.trim()) {
      setError("Quiz description is required.");
      return;
    }

    for (let question of questions) {
      if (!question.text.trim()) {
        setError("All questions must have text.");
        return;
      }

      if (
        (question.type === "single" || question.type === "multiple") &&
        question.choices.every((choice) => !choice.text.trim())
      ) {
        setError(
          "At least one choice must have text for single/multiple choice questions."
        );
        return;
      }
    }

    const quizData = {
      name: quizName,
      description: quizDescription,
      questions: questions,
      answers: [],
    };

    await dispatch(addQuiz(quizData))
      .unwrap()
      .then(() => {
        toast.success("Quiz succesfully saved", { duration: 4000 });
      })
      .catch((error) => {
        toast.error(`${error}`, { duration: 4000 });
      });

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
    setError("");
  };

  return (
    <div className={css.QuestionnaireForm}>
      {isLoading && <Loader />}
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

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={questions} strategy={verticalListSortingStrategy}>
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
          </SortableContext>
        </DndContext>

        {error && <p className={css.error}>{error}</p>}

        <div className={css.buttonContainer}>
          <button onClick={addQuestion} className="button">
            Add Question
          </button>
          <button onClick={handleSubmit} className="button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
