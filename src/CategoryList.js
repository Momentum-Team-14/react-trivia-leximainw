import {useEffect, useState} from "react"
import axios from "axios"
import DifficultyButtons from "./DifficultyButtons"

const CategoryList = ({onCategoryChanged, onDifficultyChanged}) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(
                res.data.trivia_categories.sort(
                    (a, b) => a.name.localeCompare(b.name)
            )))
    }, [])

    const difficulty = <DifficultyButtons
        className='btn'
        onChanged={difficulty => onDifficultyChanged(difficulty)}
    />

    return (
        <div className='btn-group-vertical btn-group-toggle' style={{flexShrink: 0, marginRight: '2rem'}}>
            {difficulty}
            {categories.map((category, index) => (
                <>
                    <input
                        className='btn-check'
                        type='radio'
                        name='options'
                        id={category.name}
                        autoComplete='off'
                        />
                    <label
                        className='btn btn-primary'
                        htmlFor={category.name}
                        onClick={() => onCategoryChanged(category)}
                        style={index === 0 ? {borderTopLeftRadius: 0, borderTopRightRadius: 0} : {}}
                    >{category.name}</label>
                </>
            ))}
        </div>
    )
}

export default CategoryList;
