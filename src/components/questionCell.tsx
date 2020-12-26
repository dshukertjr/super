import Button from "@material-ui/core/Button";
import React from "react";
import { Question } from "../models/question";

export default function QuestionCell(props: { question: Question }) {
    function answer(index: number) {
        console.log('answer', index);
    }

    const question = props.question as Question;

    return <div className="questionCell">
        <h4>{question.question}</h4>
        {question.choices.map((choice, index) => <Button key={index} color="secondary" onClick={() => answer(index)}>{choice}</Button>)}
    </div>;
}