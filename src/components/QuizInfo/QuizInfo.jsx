import { useDispatch } from "react-redux";
import { updateQuizAnswers } from "../../redux/quiz/operations.js";
import css from './QuizInfo.module.css';

export const QuizInfo = ({ info }) => {
    const dispatch = useDispatch();
    const questions = info.quiz.questions;
    const answers = info.answers;
    const quizId=info.quiz.id;
    const oldAnswers=info.quiz.answers;
    
    const handleClick = ()=>{
        dispatch(updateQuizAnswers({quizId:quizId,newAnswer:answers,oldAnswers:oldAnswers}));

    };

    return (
        <div>
            <h3></h3>
            <ul>
                {questions.map((q) => {
                    if (q.type === "text") {
                        return (
                            <li key={q.id}>
                                <p>{q.text}</p>
                                <p>{answers[q.id] || "No answer provided"}</p>
                            </li>
                        );
                    }
                    if (q.type === "single") {
                        const selectedChoice = q.choices.find((choice) => choice.id === answers[q.id]);
                        return (
                            <li key={q.id}>
                                <p>{q.text}</p>
                                <p>{selectedChoice ? selectedChoice.text : "No answer selected"}</p>
                            </li>
                        );
                    }
                    if (q.type === "multiple") {
                        return (
                            <li key={q.id}>
                                <p>{q.text}</p>
                                {Array.isArray(answers[q.id]) && answers[q.id].length > 0 ? (
                                    answers[q.id].map((id) => {
                                        const choice = q.choices.find((choice) => choice.id === id);
                                        return <p key={id}>{choice ? choice.text : "Invalid choice"}</p>;
                                    })
                                ) : (
                                    <p>No answers selected</p>
                                )}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <p>{`Time spent on responses: ${info.timeSpent}`}</p>
            <button type='button' onClick={handleClick}>Save Answers</button>
        </div>
    );
};
