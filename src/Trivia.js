import {useEffect, useState} from 'react'
import axios from 'axios'
import TriviaQuestion from './TriviaQuestion';

const SELECTING_CATEGORY = 0;
const TAKING_QUIZ = 1;

const Trivia = () => {
    const [categories, setCategories] = useState([])
    const [quizState, setQuizState] = useState(0)
    const [currCategory, setCurrCategory] = useState(null)
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(res.data.trivia_categories))
    }, [])
    useEffect(() => {
        if (quizState === TAKING_QUIZ) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${currCategory.id}`)
                .then(res => setQuestions(res.data.results))
        }
    }, [currCategory])
    console.log(categories)

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
                <div>{questions.map(elem => <TriviaQuestion question={elem} key={elem.question}/>)}</div>
            )
        default:
            return (
                <div>Unexpected quiz state {quizState}</div>
            )
    }
}

export default Trivia;
