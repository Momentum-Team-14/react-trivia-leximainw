import {useEffect, useState} from 'react'
import axios from 'axios'
import QuestionResults from './QuestionResults';
import QuizQuestions from './QuizQuestions';
import CategoryList from './CategoryList';

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
        if (currCategory) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${currCategory.id}`)
                .then(res => {
                    setQuestions(res.data.results)
                })
        }
    }, [currCategory])

    const categoryList = <CategoryList
        categories={categories}
        onSelected={category => {
            setCurrCategory(category)
            setQuizState(TAKING_QUIZ)
        }}
    />

    switch (quizState) {
        case SELECTING_CATEGORY:
            return categoryList
        case TAKING_QUIZ:
            return (
                <div style={{display: 'flex'}}>
                    {categoryList}
                    <QuizQuestions
                        questions={questions}
                        onComplete={answers => {
                            setAnswers(answers)
                            setQuizState(QUIZ_RESULTS)
                        }}
                    />
                </div>
            )
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

export default Trivia;
