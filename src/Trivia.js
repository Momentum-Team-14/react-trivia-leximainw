import axios from 'axios'
import {useEffect, useState} from 'react'
import CategoryList from './CategoryList'
import TriviaQuiz from './TriviaQuiz'

const Trivia = () => {
    const [currCategory, setCurrCategory] = useState(null)
    const [apiToken, setApiToken] = useState(null)
    const [resetToggle, setResetToggle] = useState(false)
    const reset = () => setResetToggle(!resetToggle)

    useEffect(() => {
        axios.get('https://opentdb.com/api_token.php?command=request')
            .then(res => setApiToken(res.data.token))
    }, [])

    const categoryList = <CategoryList
        onSelected={category => {
            setCurrCategory(category)
            reset()
        }}
    />

    if (!currCategory) {
        return categoryList
    } else {
        return (
            <div style={{display: 'flex'}}>
                {categoryList}
                <TriviaQuiz
                    category={currCategory}
                    apiToken={apiToken}
                    resetToggle={resetToggle}
                />
            </div>
        )
    }
}

export default Trivia
