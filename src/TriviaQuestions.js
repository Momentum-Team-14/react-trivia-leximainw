import { useState } from "react"
import TriviaQuestion from "./TriviaQuestion"

const TriviaQuestions = ({questions, onComplete}) => {
    const [answered, setAnswered] = useState(Array(questions.length).fill(null))

    return (
        <div>{questions.map((elem, index) => (
            <TriviaQuestion
                question={elem}
                setCorrect={answer => {
                    let newAnswered = [...answered]
                    newAnswered[index] = answer
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

export default TriviaQuestions
