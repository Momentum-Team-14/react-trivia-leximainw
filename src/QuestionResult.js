import { htmlDecode } from "./utils"

const QuestionResult = ({question, answer}) => {
    return (
        <div>
            <div>{htmlDecode(question.question)}</div>
            {answer === null ?
                <div className="btn-group">
                    <div className="btn btn-success">The correct answer was {htmlDecode(question.correct_answer)}.</div>
                    <div className="btn btn-warning">You chose not to answer.</div>
                </div> : answer !== question.correct_answer ?
                <div className="btn-group">
                    <div className="btn btn-success">The correct answer was {htmlDecode(question.correct_answer)}.</div>
                    <div className="btn btn-danger">You answered {htmlDecode(answer)}.</div>
                </div> :
                <div className="btn-group">
                    <div className="btn btn-success">You chose the correct answer, {htmlDecode(answer)}.</div>
                </div>
            }
        </div>
    )
}

export default QuestionResult
