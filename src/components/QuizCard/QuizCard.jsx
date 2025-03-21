import css from './QuizCard.module.css'
export const QuizCard = ({quiz})=>{
return (
    <div>
        <h3>{quiz.name}</h3>
        <p>{quiz.description}</p>
        <p>{`Questions:${quiz.question.length}`}</p>
        <p>{`Completions:${quiz.answers.length}`}</p>
        <button type='button'>
        <svg className={css.icon} width={15} height={25} >
      <use href="../../assets/kebab-menu-svgrepo-com.svg"></use>
    </svg>

        </button>
        <ul className={css.menu}>
            <li><button type='button'>Edit</button></li>
            <li><button type='button'>Run</button></li>
            <li><button type='button'>Delete</button></li>
        </ul>


    </div>
)
} 