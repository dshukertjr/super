import React from 'react'
import Button from '@material-ui/core/Button'
import { Database, useDatabase, useUser } from '../hooks/supabaseHooks'
import { Question } from '../models/question'
import TextField from '@material-ui/core/TextField'
import * as yup from 'yup';
import { useFormik } from 'formik'

export default function CreateQuestion() {
    const questionsTable = useDatabase<Question>(Database.questions);
    const user = useUser();

    const validationSchema = yup.object({
        question: yup
            .string()
            .required('Question is required'),
        choice1: yup
            .string()
            .required('Choice 1 is required'),
        choice2: yup
            .string()
            .required('Choice 2 is required'),
    });

    const formik = useFormik({
        initialValues: {
            question: 'Favorite alphabet?',
            choice1: 'A',
            choice2: 'B',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { data, error } = await questionsTable.insert([
                {
                    question: values.question,
                    choices: [values.choice1, values.choice2],
                    user_id: user!.id,
                }
            ]);
            console.log('data', data);
            if (error) console.error('question insert error: ', error);

        },
    });

    return (
        <div>
            <h1>Create Question</h1>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="question"
                    name="question"
                    label="question"
                    value={formik.values.question}
                    onChange={formik.handleChange}
                    error={formik.touched.question && Boolean(formik.errors.question)}
                    helperText={formik.touched.question && formik.errors.question}
                />
                <TextField
                    fullWidth
                    id="choice1"
                    name="choice1"
                    label="choice1"
                    type="choice1"
                    value={formik.values.choice1}
                    onChange={formik.handleChange}
                    error={formik.touched.choice1 && Boolean(formik.errors.choice1)}
                    helperText={formik.touched.choice1 && formik.errors.choice1}
                />
                <TextField
                    fullWidth
                    id="choice2"
                    name="choice2"
                    label="choice2"
                    type="choice2"
                    value={formik.values.choice2}
                    onChange={formik.handleChange}
                    error={formik.touched.choice2 && Boolean(formik.errors.choice2)}
                    helperText={formik.touched.choice2 && formik.errors.choice2}
                />
                <Button color="primary" variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )
}
