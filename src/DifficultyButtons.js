const DifficultyButtons = ({onChanged}) => {
    const buttons = ['Easy', 'Medium', 'Hard', 'Any']

    return (
        <div className="btn-group">
            {
                buttons.map(elem => (
                    <>
                        <input
                            className='btn-check'
                            type='radio'
                            name={`difficulty-options`}
                            id={`difficulty-${elem}`}
                            autoComplete='off'
                            defaultChecked={elem === 'Any'}
                        />
                        <label
                            className='btn btn-primary'
                            htmlFor={`difficulty-${elem}`}
                            key={elem}
                            onClick={() => onChanged(elem)}
                        >{elem}</label>
                    </>
                ))
            }
        </div>
    )
}

export default DifficultyButtons
