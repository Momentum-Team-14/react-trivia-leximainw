import {useEffect, useState} from "react"
import axios from "axios"

const CategoryList = ({onSelected}) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(
                res.data.trivia_categories.sort(
                    (a, b) => a.name.localeCompare(b.name)
            )))
    }, [])

    return (
        <div className='btn-group-vertical btn-group-toggle' style={{flexShrink: 0, marginRight: '2rem'}}>
            {categories.map(category => (
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
                        onClick={() => onSelected(category)}
                    >{category.name}</label>
                </>
            ))}
        </div>
    )
}

export default CategoryList;
