import css from './QuizInfo.module.css';
export const QuizInfo  = ({info}) => {
    const questions = info.questions;
    const answers=info.answers;
    return (
        <div>
            <ul>
                {questions.map((q)=>{
                    
                        if (q.type==="text") {
                            return (<li><p>{q.text}</p><p>{answers[q.id]}</p></li>)
                        }
                        if (q.type==="single") {
                            return (<li><p>{q.text}</p><p>{q.choices.find(choice.id===answers[q.id])}</p></li>)
                        }
                        return (
                            <li><p>{q.text}</p>{answers[q.id].map((id)=>(<p>{q.choices.find(choice.id===id)}</p>))}</li>
                        )
                    
                })}
            </ul>
            

{/* <button type="button" onClick={info.handleSubmit}>Submit</button> */}

        </div>

    );

}