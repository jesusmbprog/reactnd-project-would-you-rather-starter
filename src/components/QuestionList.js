import React from "react";
import QuestionCard from "./QuestionCard";

function QuestionList(props) {
    const { questionIds } = props;

    return (<ul>
        {questionIds.map((id) => (
            <div key={id} className="question-list">
                <QuestionCard id={id}/>
            </div>
        ))}
    </ul>)
}

export default (QuestionList);