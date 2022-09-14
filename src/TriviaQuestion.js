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
                <>
                    <input
                        className='btn-check'
                        type='radio'
                        name={`${question.question}-options`}
                        id={`${question.question}${answer}`}
                        autoComplete='off'
                    />
                    <label
                        className='btn btn-primary'
                        for={`${question.question}${answer}`}
                        key={answer}
                        onClick={() => setCorrect([answer === question.correct_answer, answer])}
                    >{htmlDecode(answer)}</label>
                </>
            ))}</div>
        </article>
    )
}

export default TriviaQuestion;
