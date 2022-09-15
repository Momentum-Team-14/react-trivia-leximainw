import { useState } from "react"
import TriviaQuestion from "./TriviaQuestion"

const QuizQuestions = ({questions, onComplete}) => {
    const [answered, setAnswered] = useState(Array(questions.length).fill(null))

    return (
        <div>{questions.map((elem, index) => (
            <TriviaQuestion
                question={elem}
                setCorrect={correct => {
                    let newAnswered = [...answered]
                    newAnswered[index] = correct
                    setAnswered(newAnswered)
                }}
                key={elem.question}
            />
        ))}
        <button
            className='btn btn-success'
            style={{marginTop: '1rem'}}
            onClick={() => onComplete(answered)}
        >Complete Quiz</button></div>
    )
}

export default QuizQuestions
