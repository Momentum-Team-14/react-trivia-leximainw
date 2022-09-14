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
        <div className='btn-group-vertical btn-group-toggle'>
            {categories.map(elem => <><input className='btn-check' type='radio' name='options' id={elem.name} autoComplete='off' /><label className='btn btn-primary' for={elem.name} key={elem.id}>{elem.name}</label></>)}
        </div>
    )
}

export default Trivia;
