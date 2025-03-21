import { useState } from "react";
import kebabIcon from "../../assets/icons8-kebab-menu-24.png";
import css from "./QuizCard.module.css";

export const QuizCard = ({ quiz }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={css.card}>
      <h3 className={css.header}>{quiz.name}</h3>
      <p className={css.description}>{quiz.description}</p>
      <p>{`Questions: ${quiz.questions.length}`}</p>
      <p>{`Completions: ${quiz.answers.length}`}</p>

     
      <button type="button" className={css.menuButton} onClick={toggleMenu}>
        <img className={css.icon} width={25} height={25} src={kebabIcon} alt="menu" />
      </button>

      
      {isMenuOpen && (
        <ul className={css.menu}>
          <li><button type="button" className={css.actionButton}>Edit</button></li>
          <li><button type="button" className={css.actionButton}>Run</button></li>
          <li><button type="button" className={css.actionButton}>Delete</button></li>
        </ul>
      )}
    </div>
  );
};
