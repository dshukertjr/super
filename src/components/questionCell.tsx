import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { QuestionAnswerTwoTone } from "@material-ui/icons";
import React from "react";
import { Database, useDatabase, useUser } from "../hooks/supabaseHooks";
import { Question } from "../models/question";
import Vote from "../models/vote";

export default function QuestionCell(props: { question: Question }) {
    const question = props.question as Question;

    return <div className="questionCell">
        <h4>{question.question}</h4>
        <div className="voteButtons">
            {question.choices.map((choice, index) => <VoteButton key={index} questionId={question.id} index={index} choice={choice}></VoteButton>)}
        </div>
        <div className="results">
            {question.choices.map((choice, index) => <ResultCell key={index} votes={question.votes} choice={choice} index={index}></ResultCell>)}
        </div>
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

        if (!user?.id) {
            console.error('The user is not logged in')
            return;
        }

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

const useStyles = makeStyles({
    mine: {
        color: 'red'
    },
    notMine:
    {
        colod: 'black'
    }
});

function ResultCell(props: { votes: Vote[], choice: string, index: number }) {
    const classes = useStyles();
    const user = useUser();
    const index = props.index;
    const votes = props.votes;
    const totalVotes = votes.length;
    const votesForThisChoice = votes.filter(vote => vote.choice == index);
    const voteCountForThisChoice = votesForThisChoice.length;
    const percent = Math.round(voteCountForThisChoice * 100 / totalVotes);
    const isUsersChoice = votesForThisChoice.filter(vote => vote.userId == user?.id).length > 0;
    return <span className={isUsersChoice ? classes.mine : classes.notMine}>{props.choice} {percent}%</span>
}