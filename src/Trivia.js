import axios from 'axios'
import {useEffect, useState} from 'react'
import CategoryList from './CategoryList'
import TriviaQuiz from './TriviaQuiz'

const Trivia = () => {
    const [apiToken, setApiToken] = useState(null)
    const [currCategory, setCurrCategory] = useState(null)
    const [currDifficulty, setCurrDifficulty] = useState(null)
    const [resetToggle, setResetToggle] = useState(false)
    const reset = () => setResetToggle(!resetToggle)
    const [resetApiToggle, setResetApiToggle] = useState(false)
    const resetApiToken = () => setResetApiToggle(!resetApiToggle)

    useEffect(() => {
        axios.get('https://opentdb.com/api_token.php?command=request')
            .then(res => setApiToken(res.data.token))
    }, [resetApiToggle])

    const categoryList = <CategoryList
        onCategoryChanged={category => {
            setCurrCategory(category)
            reset()
        }}
        onDifficultyChanged={difficulty => {
            setCurrDifficulty(difficulty === 'Any' ? null : difficulty)
        }}
    />

    if (!currCategory) {
        return (
            <div style={{display: 'flex'}}>
                {categoryList}
                <div>
                    <button
                        className='btn btn-secondary'
                        style={{marginBottom: '2rem'}}
                        onClick={resetApiToken}
                    >Reset Token</button>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{display: 'flex'}}>
                {categoryList}
                <div>
                    <button
                        className='btn btn-secondary'
                        style={{marginBottom: '2rem'}}
                        onClick={resetApiToken}
                    >Reset Token</button>
                    <TriviaQuiz
                        category={currCategory}
                        difficulty={currDifficulty}
                        apiToken={apiToken}
                        resetToggle={resetToggle}
                    />
                </div>
            </div>
        )
    }
}

export default Trivia
