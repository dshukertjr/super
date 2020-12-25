import React from 'react'
import Button from '@material-ui/core/Button'
import { useDatabase } from '../hooks/supabaseHooks'
import { Question } from '../models/question'
import TextField from '@material-ui/core/TextField'

export default function CreateQuestion() {
    const questionsTable = useDatabase<Question>('questions');

    const createQuestion = async () => {
        // const { data, error } = await questionsTable.insert([
        //     {
        //         // question: 
        //     }
        // ]);
        // console.log('data', data);
        // if (error) console.error('question insert error: ', error);
    }

    return (
        <div>
            <h1>Create Question</h1>
            <Form>
                <TextField id="question" label="Question" variant="outlined" helperText="Incorrect entry." />
                <TextField id="choice1" label="Choice 1" variant="outlined" />
                <TextField id="choice2" label="Choice 2" variant="outlined" />
            </Form>
            <Button variant="contained" onClick={createQuestion}>Create Question</Button>
        </div>
    )
}
