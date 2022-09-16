import axios from 'axios'
import {useEffect, useState} from 'react'
import QuestionResults from './QuestionResults'
import TriviaQuestions from './TriviaQuestions'

const TriviaQuiz = ({category, difficulty, apiToken, resetToggle, onComplete = _ => {}}) => {
    const [answers, setAnswers] = useState([])
    const [questions, setQuestions] = useState(null)
    const [quizCompleted, setQuizCompleted] = useState(false)

    useEffect(() => {
        if (category) {
            setQuestions(null)
            axios.get(`https://opentdb.com/api.php?amount=10&category=${category.id}${difficulty ? `&difficulty=${difficulty.toLowerCase()}` : ''}${apiToken ? `&token=${apiToken}` : ''}`)
                .then(res => {
                    setQuestions(res.data.results)
                })
            setQuizCompleted(false)
        }
    }, [category, resetToggle, apiToken])

    if (!quizCompleted) {
        if (!questions) {
            return (
                <div>Loading questions, please wait...</div>
            )
        } else if (questions.length) {
            return (
                <TriviaQuestions
                    questions={questions}
                    onComplete={answers => {
                        setAnswers(answers)
                        setQuizCompleted(true)
                        onComplete(answers)
                    }}
                />
            )
        } else {
            return (
                <div>
                    <p>You've answered all the trivia questions matching your criteria!</p>
                    <p>Select another category, or click "clear token" to start over.</p>
                </div>
            )
        }
    } else {
        return <QuestionResults answers={answers} questions={questions} />
    }
}

export default TriviaQuiz
