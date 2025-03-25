import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { selectIsLoading } from "../../redux/quiz/selectors.js";
import { deleteQuiz } from "../../redux/quiz/operations.js";
import kebabIcon from "../../assets/icons8-kebab-menu-24.png";
import css from "./QuizCard.module.css";

export const QuizCard = ({ quiz }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await dispatch(deleteQuiz(quiz.id))
        .unwrap()
        .then(() => {
          toast.success("Quiz succesfully deleted", { duration: 4000 });
        })
        .catch((error) => {
          toast.error(`${error}`, { duration: 4000 });
        });
    }
  };

  return (
    <div className={css.card}>
      {isLoading && <Loader />}
      <h3 className={css.header}>{quiz.name}</h3>
      <p className={css.description}>{quiz.description}</p>
      <p>{`Questions: ${quiz.questions.length}`}</p>
      <p>{`Completions: ${quiz.answers ? quiz.answers.length : 0}`}</p>
      <button type="button" className={css.menuButton} onClick={toggleMenu}>
        <img
          className={css.icon}
          width={25}
          height={25}
          src={kebabIcon}
          alt="menu"
        />
      </button>

      {isMenuOpen && (
        <ul className={css.menu}>
          <li>
            <Link
              to="/builder"
              state={{ quizData: quiz }}
              className={css.actionButton}
            >
              <span>Edit</span>
            </Link>
          </li>
          <li>
            <Link
              to="/complete"
              state={{ quizData: quiz }}
              className={css.actionButton}
            >
              <span>Run</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={css.actionButton}
              onClick={handleDelete}
            >
              <span>Delete</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
