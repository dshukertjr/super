import Button from "@material-ui/core/Button";
import { QuestionAnswerTwoTone } from "@material-ui/icons";
import React from "react";
import { Database, useDatabase, useUser } from "../hooks/supabaseHooks";
import { Question } from "../models/question";
import Vote from "../models/vote";

export default function QuestionCell(props: { question: Question }) {
    const question = props.question as Question;

    return <div className="questionCell">
        <h4>{question.question}</h4>
        {question.choices.map((choice, index) => <VoteButton key={index} questionId={question.id} index={index} choice={choice}></VoteButton>)}
    </div>;
}

function VoteButton(props: { index: number, choice: string, questionId: number }) {
    const questionTable = useDatabase<Vote>(Database.votes);
    const user = useUser();

    const index = props.index;
    const choice = props.choice;
    const questionId = props.questionId;

    async function answer() {
        console.log('answered', choice)

        const { data, error } = await questionTable.insert({
            userId: user!.id,
            choice: index,
            questionId,
        });

        console.log('data', data);
        if (error) console.error(error);
    }

    return <Button color="secondary" onClick={answer}>{props.choice}</Button>;
}