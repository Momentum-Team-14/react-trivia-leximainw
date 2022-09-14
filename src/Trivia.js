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
        <div className='btn-group-vertical'>
            {categories.map(elem => <button className='btn btn-primary' key={elem.id}>{elem.name}</button>)}
        </div>
    )
}

export default Trivia;
