import css from './QuizCard.module.css'
export const QuizCard = ({quiz})=>{
return (
    <div>
        <h3>{quiz.name}</h3>
        <p>{quiz.description}</p>
        <p>{`Questions:${quiz.question.length}`}</p>
        <p>{`Completions:${quiz.answers.length}`}</p>


    </div>
)
} 