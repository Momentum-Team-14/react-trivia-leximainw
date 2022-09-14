import {htmlDecode, shuffleArray} from './utils'

const TriviaQuestion = ({question, setCorrect}) => {
    let allAnswers = [...question.incorrect_answers]
    allAnswers.push(question.correct_answer)
    allAnswers = shuffleArray(allAnswers)
    return (
        <article>
            {htmlDecode(question.question)}
            <div>{allAnswers.map(answer => (
                <button
                    className='btn btn-primary'
                    key={answer}
                    onClick={() => setCorrect(answer === question.correct_answer)}
                >{answer}</button>
            ))}</div>
        </article>
    )
}

export default TriviaQuestion;
