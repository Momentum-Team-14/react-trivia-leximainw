import {useEffect, useState} from 'react'
import axios from 'axios'
import QuestionResults from './QuestionResults';
import QuizQuestions from './QuizQuestions';

const SELECTING_CATEGORY = 0;
const TAKING_QUIZ = 1;
const QUIZ_RESULTS = 2;

const Trivia = () => {
    const [categories, setCategories] = useState([])
    const [quizState, setQuizState] = useState(0)
    const [currCategory, setCurrCategory] = useState(null)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(res.data.trivia_categories))
    }, [])
    useEffect(() => {
        if (quizState === TAKING_QUIZ) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${currCategory.id}`)
                .then(res => {
                    setQuestions(res.data.results)
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
                                htmlFor={elem.name}
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
                <QuizQuestions
                    questions={questions}
                    onComplete={answers => {
                        setAnswers(answers)
                        setQuizState(QUIZ_RESULTS)
                    }}
                />
            )
        case QUIZ_RESULTS:
            return <QuestionResults answers={answers} questions={questions} />
        default:
            return <div>Unexpected quiz state {quizState}</div>
    }
}

export default Trivia;
