import { useSelector } from 'react-redux';
import {selectQuizes} from '../../redux/quiz/selectors.js';
import {QuizCard} from '../../components/QuizCard/QuizCard.jsx';
import css from './QuizCardList.module.css';
export const QuizCardList = ()=> {
    const quizes = useSelector(selectQuizes);
  
    return (
        <ul className={css.list}>
      {quizes.map((quiz) => {
        return (
          <li key={quiz.id} className={css.item}>
            <QuizCard quiz={quiz} />
          </li>
        );
      })}
    </ul>
    )
}



