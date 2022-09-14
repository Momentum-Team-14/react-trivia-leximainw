import {useEffect, useState} from 'react'
import axios from 'axios'

const Trivia = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => setCategories(res.data.trivia_categories))
    }, [])
    console.log(categories)
    return (
        <ul>
            {categories.map((elem, index) => (
                <li
                    key={elem.id}
                >
                    {elem.name}
                </li>
            ))}
        </ul>
    )
}

export default Trivia;
