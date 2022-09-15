import {useEffect, useState} from 'react'
import axios from 'axios'
import QuestionResults from './QuestionResults'
import TriviaQuestions from './TriviaQuestions'
import CategoryList from './CategoryList'

const SELECTING_CATEGORY = 0
const TAKING_QUIZ = 1
const QUIZ_RESULTS = 2

const Trivia = () => {
    const [categories, setCategories] = useState([])
    const [quizState, setQuizState] = useState(0)
    const [currCategory, setCurrCategory] = useState(null)
    const [categoryUpdateFlag, setCatUpFlag] = useState(false)
    const [questions, setQuestions] = useState(null)
    const [answers, setAnswers] = useState([])
    const [apiToken, setApiToken] = useState(null)

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(
                res.data.trivia_categories.sort(
                    (a, b) => a.name.localeCompare(b.name)
            )))
    }, [])
    useEffect(() => {
        axios.get('https://opentdb.com/api_token.php?command=request')
            .then(res => setApiToken(res.data.token))
    }, [])
    useEffect(() => {
        if (currCategory) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${currCategory.id}${apiToken && `&token=${apiToken}`}`)
                .then(res => {
                    setQuestions(res.data.results)
                })
        }
    }, [currCategory, categoryUpdateFlag, apiToken])

    const categoryList = <CategoryList
        categories={categories}
        onSelected={category => {
            setQuestions(null)
            setCurrCategory(category)
            setQuizState(TAKING_QUIZ)
            setCatUpFlag(!categoryUpdateFlag)
        }}
    />

    switch (quizState) {
        case SELECTING_CATEGORY:
            return categoryList
        case TAKING_QUIZ:
            if (!questions) {
                return (
                    <div style={{display: 'flex'}}>
                        {categoryList}
                        <div>Loading questions, please wait...</div>
                    </div>
                )
            } else if (questions.length) {
                return (
                    <div style={{display: 'flex'}}>
                        {categoryList}
                        <TriviaQuestions
                            questions={questions}
                            onComplete={answers => {
                                setAnswers(answers)
                                setQuizState(QUIZ_RESULTS)
                            }}
                        />
                    </div>
                )
            } else {
                return (
                    <div style={{display: 'flex'}}>
                        {categoryList}
                        <div>
                            <p>You've answered all the trivia questions matching your criteria!</p>
                            <p>Select another category, or click "clear token" to start over.</p>
                        </div>
                    </div>
                )
            }
        case QUIZ_RESULTS:
            return (
                <div style={{display: 'flex'}}>
                    {categoryList}
                    <QuestionResults answers={answers} questions={questions} />
                </div>
            )
        default:
            return (
                <div style={{display: 'flex'}}>
                    <div>Unexpected quiz state {quizState}</div>
                </div>
            )
    }
}

export default Trivia
