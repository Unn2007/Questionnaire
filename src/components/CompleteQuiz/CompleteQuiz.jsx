import { useState, useEffect, useRef } from "react";
import { QuizInfo } from "../QuizInfo/QuizInfo.jsx";
import css from "./CompleteQuiz.module.css";

export const CompleteQuiz = () => {
    const [index, setIndex] = useState(1);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState(null);
    const [isQuizInfo, setIsQuizInfo] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timerRef.current); 
    }, []);
    

    const quiz = {
        "description": "Letters of Alphabet",
        "name": "Alphabet",
        "questions": [
            { "choices": [{ "id": 1, "text": "A" }, { "id": 2, "text": "B" }], "id": 0, "text": "First letter?", "type": "single" },
            { "choices": [], "id": 1742484773375, "text": "Second Letter?", "type": "text" },
            { "choices": [{ "id": 1, "text": "X" }, { "id": 2, "text": "Y" }], "id": 1742484776294, "text": "Third Letter?", "type": "multiple" }
        ]
    };

    const handleNextClick = () => {
        setIndex(index + 1);
        setError(null);
    };

    const handleBackClick = () => {
        setIndex(index - 1);
        setError(null);
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleCheckboxChange = (questionId, choiceId) => {
        setAnswers(prev => {
            const prevAnswers = prev[questionId] || [];
            return {
                ...prev,
                [questionId]: prevAnswers.includes(choiceId) 
                    ? prevAnswers.filter(id => id !== choiceId) 
                    : [...prevAnswers, choiceId]
            };
        });
    };

    const handleSubmit = () => {
        const unansweredQuestions = quiz.questions.filter(q => {
            const answer = answers[q.id];
            return !answer || (Array.isArray(answer) && answer.length === 0);
        });

        if (unansweredQuestions.length > 0) {
            setError("Пожалуйста, ответьте на все вопросы перед отправкой.");
            return;
        }

        clearInterval(timerRef.current);
        setIsQuizInfo(true);

        console.log( answers);
        
    };

    const currentQuestion = quiz.questions[index - 1];

    return (
        <section>
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
            <p>{`Question №${index} of ${quiz.questions.length}`}</p>
            <p>{currentQuestion.text}</p>
          
            {currentQuestion.type === "single" && currentQuestion.choices.map((choice) => (
                <div key={choice.id}>
                    <label>{choice.text}</label>
                    <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={choice.id}
                        checked={answers[currentQuestion.id] === choice.id}
                        onChange={() => handleAnswerChange(currentQuestion.id, choice.id)}
                        className={css.input}
                    />
                </div>
            ))}

            {currentQuestion.type === "multiple" && currentQuestion.choices.map((choice) => (
                <div key={choice.id}>
                    <label>{choice.text}</label>
                    <input
                        type="checkbox"
                        value={choice.id}
                        checked={answers[currentQuestion.id]?.includes(choice.id) || false}
                        onChange={() => handleCheckboxChange(currentQuestion.id, choice.id)}
                        className={css.input}
                    />
                </div>
            ))}

            {currentQuestion.type === "text" && (
                <input
                    type="text"
                    placeholder="Enter the answer"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className={css.input}
                />
            )}

            {error && <p className="text-red-500">{error}</p>}

            <button type="button" onClick={handleBackClick} disabled={index === 1}>Назад</button>
            {index === quiz.questions.length
                ? <button type="button" onClick={handleSubmit}>Отправить</button>
                : <button type="button" onClick={handleNextClick}>Далее</button>
            }

            {isQuizInfo && <QuizInfo info={{ questions: quiz.questions, answers: answers, timeSpent: timeSpent }} />}
        </section>
    );
};
