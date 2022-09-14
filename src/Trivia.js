import {useEffect, useState} from 'react'
import axios from 'axios'
import TriviaQuestion from './TriviaQuestion';
import QuestionResult from './QuestionResult';

const SELECTING_CATEGORY = 0;
const TAKING_QUIZ = 1;
const QUIZ_RESULTS = 2;

const Trivia = () => {
    const [categories, setCategories] = useState([])
    const [quizState, setQuizState] = useState(0)
    const [currCategory, setCurrCategory] = useState(null)
    const [questions, setQuestions] = useState([])
    const [answered, setAnswered] = useState([])
    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(res.data.trivia_categories))
    }, [])
    useEffect(() => {
        if (quizState === TAKING_QUIZ) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${currCategory.id}`)
                .then(res => {
                    setQuestions(res.data.results)
                    setAnswered(Array(res.data.results.length).fill(null))
                })
        }
    }, [currCategory])

    switch (quizState) {
        case SELECTING_CATEGORY:
            return (
                <div className='btn-group-vertical btn-group-toggle'>
                    {categories.map(elem => (
                        <>
                            <input
                                className='btn-check'
                                type='radio'
                                name='options'
                                id={elem.name}
                                autoComplete='off'
                            />
                            <label
                                className='btn btn-primary'
                                for={elem.name}
                                key={elem.id}
                                onClick={() => {
                                    setCurrCategory(elem)
                                    setQuizState(TAKING_QUIZ)
                                }}
                            >{elem.name}</label>
                        </>
                    ))}
                </div>
            )
        case TAKING_QUIZ:
            return (
                <div>{questions.map((elem, index) => (
                    <TriviaQuestion
                        question={elem}
                        setCorrect={correct => {
                            let newAnswered = [...answered]
                            newAnswered[index] = correct
                            console.log(newAnswered)
                            setAnswered(newAnswered)
                        }}
                        key={elem.question}
                    />
                ))}
                <button
                    className='btn btn-success'
                    style={{marginTop: '1rem'}}
                    onClick={() => setQuizState(QUIZ_RESULTS)}
                >Complete Quiz</button></div>
            )
        case QUIZ_RESULTS:
            const numAnswered = answered.reduce((accum, el) => accum += el != null, 0)
            const numCorrect = answered.reduce((accum, el) => accum += el ? el[0] : 0, 0)
            return (
                <div><div>You answered {numAnswered}/10 questions and got {numCorrect}/{numAnswered} right!</div>
                {questions.map((question, index) => <QuestionResult question={question} answer={answered[index] ? answered[index][1] : null} />)}</div>
            )
        default:
            return (
                <div>Unexpected quiz state {quizState}</div>
            )
    }
}

export default Trivia;
