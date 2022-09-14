const CategoryList = ({categories, onSelected}) => {
    return (
        <div className='btn-group-vertical btn-group-toggle'>
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
