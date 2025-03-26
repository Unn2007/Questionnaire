import { useSelector } from "react-redux";
import { selectQuizes } from "../../redux/quiz/selectors.js";
import { selectFilter } from '../../redux/filters/selectors.js';
import { QuizCard } from "../../components/QuizCard/QuizCard.jsx";
import { sortByName, sortArray } from '../../utils/sort.js';

import css from "./QuizCardList.module.css";
export const QuizCardList = () => {
  const quizes = useSelector(selectQuizes);
  const filterValue = useSelector(selectFilter);

  const filterQuizes = (list, filter) => {
    switch (filter) {
      case 'Show all':
        return list;
      case '':
        return list;

      case 'Name A to Z':
        return sortByName([...list], 'asc');
      case 'Name Z to A':
        return sortByName([...list], 'desc');
      case 'amount of questions by growth':
        return sortArray(list, 'questions', 'desc');
      case 'amount of questions by decline':
        return sortArray(list, 'questions', 'asc');
      case 'amount of completions by growth':
        return sortArray(list, 'answers', 'desc');
      case 'amount of completions by decline':
        return sortArray(list, 'answers', 'asc');

      default:
        return list;
    }
  };
  const filteredListQuizes = filterQuizes(
    quizes,
    filterValue
  );

  return (
    <ul className={css.list}>
      {filteredListQuizes.map((quiz) => {
        return (
          <li key={quiz.id} className={css.item}>
            <QuizCard quiz={quiz} />
          </li>
        );
      })}
    </ul>
  );
};
