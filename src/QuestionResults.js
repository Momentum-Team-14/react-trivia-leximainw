import QuestionResult from './QuestionResult';

const QuestionResults = ({answers, questions}) => {
    const numAnswered = answers.reduce((accum, el) => accum += el != null, 0)
    const numCorrect = answers.reduce((accum, el) => accum += el ? el[0] : 0, 0)

    return (
        <>
            <div><div>You answered {numAnswered}/10 questions and got {numCorrect}/{numAnswered} right!</div>
            {questions.map((question, index) => <QuestionResult question={question} answer={answers[index] ? answers[index][1] : null} />)}</div>
        </>
    )
}

export default QuestionResults;
