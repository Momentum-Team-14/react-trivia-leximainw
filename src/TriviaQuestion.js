import {useState} from 'react'
import {htmlDecode, shuffleArray} from './utils'

const TriviaQuestion = ({question, setCorrect}) => {
    const [answers, setAnswers] = useState([])
    if (!answers.length) {
        let allAnswers = [...question.incorrect_answers]
        allAnswers.push(question.correct_answer)
        allAnswers = shuffleArray(allAnswers)
        setAnswers(allAnswers)
    }
    return (
        <article>
            <div>{htmlDecode(question.question)}</div>
            <div className='btn-group'>{answers.map(answer => (
                <button
                    className='btn btn-primary'
                    key={answer}
                    onClick={() => setCorrect(answer === question.correct_answer)}
                >{htmlDecode(answer)}</button>
            ))}</div>
        </article>
    )
}

export default TriviaQuestion;
