import { useState } from "react";
import css from './CompleteQuiz.module.css';

export const CompleteQuiz = ()=>{
    const [index, setIndex] = useState(1);
    const handleNextClick = () => {
        setIndex(index+1);
    }
    const handleBackClick = () => {
        setIndex(index-1);
    }
    const quiz= {
        "description": "Leters of Alphabet",
        "name": "Alphabet",
        "questions": [
          {
            "choices": [
              {
                "id": 1,
                "text": "A"
              },
              {
                "id": 2,
                "text": "B"
              }
            ],
            "id": 0,
            "text": "First letter?",
            "type": "single"
          },
          {
            "choices": [
              {
                "id": 1,
                "text": ""
              },
              {
                "id": 2,
                "text": ""
              }
            ],
            "id": 1742484773375,
            "text": "Second Letter?",
            "type": "text"
          },
          {
            "choices": [
              {
                "id": 1,
                "text": "X"
              },
              {
                "id": 2,
                "text": "Y"
              }
            ],
            "id": 1742484776294,
            "text": "Third Letter?",
            "type": "multiple"
          }
        ]
      }
    return (
    
    <section>
        <h2>{quiz.name}</h2>
        <p>{quiz.description}</p>
        <p>{`Question №${index} of ${quiz.questions.length}`}</p>
        <p>{quiz.questions[index-1].text}</p>
        {(quiz.questions[index-1].type==="single")&&(quiz.questions[index-1].choices.map((choise)=>{
            return (<div key={choise.id}>
                <label>{choise.text}</label>
                <input
          type="radio"
          
          className={css.input}
        />
            </div>)
        }))}
        {(quiz.questions[index-1].type==="multiple")&&(quiz.questions[index-1].choices.map((choise)=>{
            return (<div key={choise.id}>
                <label>{choise.text}</label>
                <input
          type="checkbox"
          
          className={css.input}
        />
            </div>)
        }))}


        {(quiz.questions[index-1].type==="text")&&(<input
          type="text"
          placeholder="Enter answer"
          className={css.input}
        />)}
         <button type='button' onClick={handleBackClick} disabled={index===1}>Back</button>
        <button type='button' onClick={handleNextClick} disabled={index===(quiz.questions.length)}>Next</button>
       
    </section>
    
    )
}

